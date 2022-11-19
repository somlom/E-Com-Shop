import { Router } from "express";


const products = Router();

products.get("/", get_products);
products.post("/", get_product_by_id)

const arr = [
    {
        id: "1",
        name: "J-Key",
        price: 109,
        text: "Perfect for home use",
    },
    {
        id: "2",
        name: "S-Key",
        price: 159,
        text: "smth",
    },
    {
        id: "3",
        name: "M-Key",
        price: 209,
        text: "God's thing",
    }
];

function get_product_by_id(req, res) {

    const { id } = req.body;

    const result = arr.find(obj => {
        return obj.id === id
    })

    return res.json(result)
}



function get_products(req, res) {

    return res.json(
        arr
    );

}

export default products;