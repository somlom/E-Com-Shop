import express from "express";
import cors from 'cors';
import { crossOriginResourcePolicy } from 'helmet';
import { config } from "dotenv"

import { connect } from "./db/init"
import { products } from './controllers/products';
import { error_handler } from "./middlewares/error_handler";
import { auth } from "./controllers/auth";
import { payment } from "./controllers/payment";
import { reviews } from "./controllers/reviews";
import { admin } from "./controllers/admin";
import { upload_photos } from "./lib/files/photo";
import { auth_middleware } from "./middlewares/auth_handler";
import { user_router } from "./controllers/user";


// SETUP

config()

if (process.env.NODE_ENV === "development") {
  process.env.API_PORT = 4000;
  process.env.API_URL = "http://localhost:4000";
  process.env.PUBLIC_URL = "http://localhost:3000";
}

const corsOptions = {
  origin: process.env.PUBLIC_URL
};

connect();

const app = express().disable('x-powered-by')
  .use(crossOriginResourcePolicy({ policy: "cross-origin" }))
  // .use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
  .use(cors(corsOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
// ROUTES
app
  .use('/img', express.static('api/public/img'))
  .use("/products", products)
  .use("/reviews", reviews)
  .use("/auth", auth)
  .use("/payment", auth_middleware, payment)
  .use("/admin", upload_photos, admin)
  .use("/user", auth_middleware, user_router)
  .use(error_handler)

app.listen(process.env.API_PORT, () => {
  console.log(`app is listening to port ${process.env.API_PORT}`)
})