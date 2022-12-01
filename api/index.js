import express from "express";
import cors from 'cors';
import { connect } from "./db/init"

import products from './controllers/products';
import files from './controllers/files';
import { error_handler } from "./middlewares/error_handler";


const app = express()

connect();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/products", products)
app.use("/download", files)

app.use(error_handler)

app.listen(4000, () => {
    console.log(`app is listening to port 4000`)
})