import Stripe from 'stripe';
import {Products} from '../db/products';
import {delete_photos, find_files_on_server} from '../lib/files/files';
import {create_product, update_product} from '../lib/stripe';

export async function add_product(req, res) {
    const {name, text, price, quantity, technical_data} = req.body;
    const product_text = JSON.parse(req.body.product_text);

    const filename = req.files.map(item => item.filename);

    const product_text_upd = [];
    filename.forEach((obj, i) => {
        product_text_upd.push({pic: obj, text: product_text[i].text});
    });

    const product_db = await Products.create({
        text: text,
        name: name,
        price: price,
        photos: filename,
        quantity: quantity,
        technical_data: technical_data,
        product_text: product_text_upd,
    });
    const product_stripe = await create_product(
        product_db.id,
        name,
        price,
        filename
    );

    if (product_db && product_stripe) {
        return res.json();
    } else {
        if (product_stripe) {
            const stripe = new Stripe(process.env.STRIPE_SECRET);
            const error = await stripe.products.del(product_db.id);
            res.status(400);
            throw new Error(error);
        }
        if (product_db) {
            const error = await Products.remove({_id: product_db.id});
            res.status(400);
            throw new Error(error);
        }
    }
}

export async function edit_product(req, res) {
    const {text, name, price, quantity, id, technical_data, remaining_photos} =
        req.body;

    const filename = req.files.map(item => item.filename);

    const item = await Products.findById(id);

    if (item) {
        try {
            const difference = item.photos.filter(data =>
                (!remaining_photos || [])?.includes(data, 0)
            );
            if (difference) {
                const files_to_delete = await find_files_on_server(difference);
                if (files_to_delete.same) {
                    delete_photos(files_to_delete);
                }
            }

            const files_to_update =
                typeof remaining_photos === Array && remaining_photos.length > 0
                    ? [
                          ...filename,
                          ...item.photos.filter(data =>
                              (remaining_photos || [])?.includes(data)
                          ),
                      ]
                    : [...filename];

            await item
                .updateOne({
                    text: text,
                    name: name,
                    price: price,
                    photos: files_to_update,
                    quantity: quantity,
                    technical_data: technical_data,
                })
                .then(
                    async () => await update_product(id, name, filename, price)
                )
                .catch(onrejected => {
                    res.status(500);
                    throw new Error(onrejected);
                });

            return res.json();
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    } else {
        res.status(400);
        throw new Error('No items specified');
    }
}
