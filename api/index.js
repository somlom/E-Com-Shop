import express from "express";
import cors from 'cors';
import path from "path";
require('dotenv').config()

import { connect } from "./db/init"
import products from './controllers/products';
import files from './controllers/files';
import { error_handler } from "./middlewares/error_handler";
import auth from "./controllers/auth";
import payment from "./controllers/payment";
import TOTP from "./lib/totp";


if (process.env.NODE_ENV === "development") {
  process.env.API_PORT = 4000;
  process.env.API_URL = "http://localhost:4000";
  process.env.PUBLIC_URL = "http://localhost:3000";
}


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


const auther = new TOTP();
auther.generateQRCode(process.env.ADMIN_EMAIL)

app.use(error_handler)

app.listen(process.env.API_PORT, () => {
  console.log(`app is listening to port ${process.env.API_PORT}`)
})