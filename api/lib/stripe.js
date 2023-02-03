import Stripe from "stripe";

import Mailer from './mailer';


const stripe = Stripe(process.env.STRIPE_SECRET);

export class Stripe_Api {
    constructor() {
        this.stripe_secret = process.env.STRIPE_SECRET;
    }

    async create_stripe_session(order = {}) {
        if (order) {
            try {
                const search = {
                    data: [],
                    ids: []
                }
                console.log(search)
                order.products.map(obj => {
                    search.data.push({ id: obj.id, quantity: obj.quantity })
                    search.ids.push(obj.id)
                });

                const products = await stripe.products.list({
                    ids: search.ids
                }, {
                    apiKey: this.stripe_secret
                });
                console.log(products)
                const new_arr = search.data.map(item => {

                    const element = products.data.find(obj => obj.id === item.id)
                    if (element) {
                        return { quantity: item.quantity, price: element.default_price }
                    }
                })
                console.log(new_arr)
                const session = await stripe.checkout.sessions.create({
                    shipping_address_collection: { allowed_countries: ['DE'] },
                    line_items: new_arr,
                    mode: 'payment',
                    success_url: `${process.env.PUBLIC_URL}/order?success=true`,
                    cancel_url: `${process.env.PUBLIC_URL}/order?success=false`,
                }, {
                    apiKey: this.stripe_secret
                });
                // console.log(session)
                return { status: true, data: session.url }
            } catch (error) {
                console.log(error)
                const mailer = new Mailer();
                mailer.send_email(process.env.ADMIN_EMAIL, "error", "error", { error: error, logs: "https://dashboard.stripe.com/test/logs" })
                return { status: false, data: "Sorry, we are having some problems with trafic right now. Please, try agein later" }
            }
        }
        return { status: false, data: "No order" }
    }

    async create_product(id = "", name = "", price = "", filename = []) {

        const photos = filename.map(photo => process.env.API_URL + "/img/" + photo)

        return await stripe.products.create({
            id: id,
            name: name,
            default_price_data: {
                currency: "EUR",
                unit_amount_decimal: (price * 100).toString(),
            },
            shippable: true,
            url: process.env.PUBLIC_URL + "/products" + id,
            images: photos
        }, {
            apiKey: this.stripe_secret
        });
    }

    async update_product(id = "", name = "", filename = []) {
        try {
            const photos = filename.map(photo => process.env.API_URL + "/img/" + photo)

            const updated = await stripe.products.update(
                id,
                {
                    name: name,
                    shippable: true,
                    url: process.env.PUBLIC_URL + "/products" + id,
                    images: photos
                    
                },
                {
                    apiKey: this.stripe_secret
                }
            )

            return updated
        } catch (error) {
            return "No product on stripe"
        }
    }
}