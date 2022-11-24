import express from "express";
import cors from 'cors';

import products from './controllers/products';
import files from './controllers/files';


const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/products", products)
app.use("/download", files)


app.listen(4000, () => {
    console.log(`app is listening to port 4000`)
})