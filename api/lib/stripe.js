const stripe = require('stripe')(process.env.STRIPE_SECRET);


export const create_stripe_session = async (order) => {
    if (order) {
        try {
            const search = {
                data: [],
                ids: []
            }
            order.products.map(obj => {
                search.data.push({ id: obj.id, quantity: obj.quantity })
                search.ids.push(obj.id)
            });

            const products = await stripe.products.list({
                ids: search.ids
            });


            const new_arr = search.data.map((item, i) => {

                const element = products.data.find(obj => obj.id === item.id)
                if (element) {
                    return { quantity: item.quantity, price: element.default_price }
                }
            })

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ['DE'] },
                line_items: new_arr,
                mode: 'payment',
                success_url: `${process.env.PUBLIC_URL}?success=true`,
                cancel_url: `${process.env.PUBLIC_URL}?canceled=true`,
            });
            return session.url
        } catch (error) {
            return console.error(error)
        }
    }
    return console.error(error)
}