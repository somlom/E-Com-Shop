import {isValidObjectId} from 'mongoose';
import {Products} from '../db/products';

export async function get_cart_items(req, res) {
    const {data} = req.body;

    if (data[0] !== undefined && Array.isArray(data)) {
        try {
            const value = await Products.find({
                _id: {
                    $in: data
                        .map(a => {
                            return a._id;
                        })
                        .filter(a => a),
                },
            });
            const in_cart = [];

            data.map(item => {
                const found = value.find(x => x.id === item._id);
                if (found) {
                    found.quantity = parseInt(item.quantity);
                    return in_cart.push({
                        name: found.name,
                        photos: found.photos[0],
                        quantity: found.quantity,
                        price: found.price,
                        _id: found._id,
                    });
                }
            });
            return res.json(in_cart);
        } catch (error) {
            return res.json([]);
        }
    } else {
        return res.json([]);
    }
}

export async function check_cart(req, res) {
    const {data} = req.body;

    if (data[0] !== undefined && Array.isArray(data)) {
        const value = await Products.find({
            _id: {
                $in: data
                    .map(a => {
                        return a._id;
                    })
                    .filter(a => a),
            },
        });

        // create find files function

        const updated_arr = data.filter(obj =>
            value.find(x => x.id === obj._id)
        );

        let quantity = 0;

        updated_arr.forEach(obj => (quantity += parseInt(obj.quantity)));

        return res.json({cart: Array.from(updated_arr), quantity: quantity});
    } else {
        return res.json({cart: [], quantity: 0});
    }
}

export async function get_product_by_id(req, res) {
    const {id} = req.params;

    if (isValidObjectId(id)) {
        const product = await Products.findById(id);

        if (product) {
            return res.json(product);
        }
    }
    return res.status(404).json();
}

export async function get_products(req, res) {
    return res.json(await Products.find());
}
