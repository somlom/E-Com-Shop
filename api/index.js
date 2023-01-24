#! /usr/bin/env node

import express from "express";
import cors from 'cors';
import { SafeString } from 'handlebars'
require('dotenv').config()

import { connect } from "./db/init"
import products from './controllers/products';
import files from './controllers/files';
import { error_handler } from "./middlewares/error_handler";
import auth from "./controllers/auth";
import payment from "./controllers/payment";
import Mailer from "./lib/mailer";
import TOTP from "./lib/totp";
import { generatePath } from "react-router-dom";


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
auther.generateQRCode("supersnus1331@gmail.com")
// mailer.send_email("supersnus1331@gmail.com", "Admin access", "admin", { code: new SafeString(qr_code) })


app.use(error_handler)

app.listen(process.env.NODE_ENV === "development" ? process.env.API_PORT = 4000 : process.env.API_PORT, () => {
  console.log(`app is listening to port ${process.env.API_PORT}`)
})