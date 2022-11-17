import { Router } from "express";


const products = Router();

products.get("/", get_products);
// products.get("/:id", get_product_by_slug);

function get_product_by_id(req, res) {

}



function get_products(req, res) {


    return res.json(
        [
            {
                name: "J-Key",
                price: 109,
                text: "Perfect for home use",
            },
            {
                name: "S-Key",
                price: 159,
                text: "smth",
            },
            {
                name: "M-Key",
                price: 209,
                text: "God's thing",
            }
        ]
    );

}

export default products;