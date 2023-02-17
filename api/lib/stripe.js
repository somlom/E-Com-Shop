import Stripe from "stripe";

import Mailer from './mailer';


const stripe = new Stripe(process.env.STRIPE_SECRET);

const report_error = (error_name = "", error = "") => {
    const mailer = new Mailer();
    console.log(stack)
    return mailer.send_email(process.env.ADMIN_EMAIL, error_name, "error", { error: error, logs: "https://dashboard.stripe.com/test/logs" })
}

export const create_client = async (name = { name: "", surname: "" }, email = "") => {
    const customer = await stripe.customers.create({
        name: name.name + " " + name.surname,
        email: email,
    });
    return customer
}

export const create_stripe_session = async (order = {}, id = "", email = "") => {
    if (order) {
        try {

            const search = {
                products: [],
                ids: []
            }

            order.products.map(obj => {
                search.products.push({ id: obj.id, quantity: obj.quantity })
                search.ids.push(obj.id)
            });

            const products = await stripe.products.list({
                ids: search.ids
            }, {
                apiKey: process.env.STRIPE_SECRET
            });

            search.ids = []
            search.products.map(item => {

                const element = products.data.find(obj => obj.id === item.id)
                if (element) {
                    return search.ids.push({ quantity: item.quantity, price: element.default_price })
                }
            })

            const session_object = {
                shipping_address_collection: { allowed_countries: ['DE'] },
                line_items: search.ids,
                mode: 'payment',
                success_url: `${process.env.PUBLIC_URL}/order_status?order=${id}&success=true`,
                cancel_url: `${process.env.PUBLIC_URL}/order_status?success=false`,
                customer_email: email
            }

            if (order.id) {
                session_object.client_reference_id = order.id
            }

            const session = await stripe.checkout.sessions.create(session_object, {
                apiKey: process.env.STRIPE_SECRET
            });

            console.log(session.status)

            return { status: true, data: session.url, id: session.id }
        } catch (error) {
            report_error("Error on Stripe Session", error)
            return { status: false, data: "Sorry, we are having some problems with trafic right now. Please, try agein later" };
        }
    }
    report_error("No order Stripe", error)
    return { status: false, data: "No order" }
}

export const create_product = async (id = "", name = "", price = 0, filename = []) => {

    const photos = filename.map(photo => process.env.API_URL + "/img/" + photo)
    try {
        const result = await stripe.products.create({
            id: id,
            name: name,
            default_price_data: {
                currency: "EUR",
                unit_amount_decimal: price * 100,
            },
            shippable: true,
            url: process.env.PUBLIC_URL + "/products/" + id,
            images: photos
        }, {
            apiKey: process.env.STRIPE_SECRET
        });
        return { status: true, data: result }
    } catch (error) {
        report_error("Error on Stripe create product", error)
        return { status: false, data: error }
    }
}


export const create_new_price = async (product_id = "", price = "", active = true) => {
    try {
        const new_price = await stripe.prices.create({
            product: product_id,
            unit_amount: price * 100,
            currency: 'eur',
            product: product_id,
            active: active
        }, {
            apiKey: process.env.STRIPE_SECRET
        });
        return { status: true, data: new_price }
    } catch (error) {
        report_error("Error on Stripe create price", error)
        return { status: false, data: "error price" }
    }

}

export const update_product = async (id = "", name = "", filename = [], price = "") => {
    const product_on_stripe = await stripe.products.retrieve(id, {
        apiKey: process.env.STRIPE_SECRET
    });

    if (product_on_stripe) {
        try {
            const photos = filename.map(photo => process.env.API_URL + "/img/" + photo)

            const price_obj = await create_new_price(id, price, true)

            const updated = await stripe.products.update(
                id,
                {
                    name: name,
                    shippable: true,
                    url: process.env.PUBLIC_URL + "/products" + id,
                    images: photos,
                    default_price: price_obj.data.id
                },
                {
                    apiKey: process.env.STRIPE_SECRET
                }
            )

            await stripe.prices.update(
                product_on_stripe.default_price,
                {
                    active: false
                },
                {
                    apiKey: process.env.STRIPE_SECRET
                }
            )

            return { status: true, data: updated }
        } catch (error) {
            report_error("Error on Stripe update product", error)
            return { status: false, data: error }
        }
    } else {
        report_error("No product on stripe", ["no stack"])
        return { status: false, data: "No product on stripe" }
    }
}
