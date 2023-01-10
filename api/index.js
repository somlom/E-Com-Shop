import express from "express";
import cors from 'cors';
import { connect } from "./db/init"

import products from './controllers/products';
import files from './controllers/files';
import { error_handler } from "./middlewares/error_handler";
import auth from "./controllers/auth";
import payment from "./controllers/payment";


export const app = express()

connect();

app.use(cors());
app.use(express.json())
app.use('/img', express.static('api/public/img'))
app.use(express.urlencoded({ extended: false }))

app.use("/products", products)
app.use("/auth", auth)
app.use("/payment", payment)
app.use("/download", files)

app.use(error_handler)

app.listen(4000, () => {
  console.log(`app is listening to port 4000`)
})

