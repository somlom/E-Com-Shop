import express from "express";
import cors from 'cors';
import { connect } from "./db/init"

import products from './controllers/products';
import files from './controllers/files';
import { error_handler } from "./middlewares/error_handler";
import auth from "./controllers/auth";
import { loger } from "./middlewares/log_middleware";


const app = express()

connect();
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      return callback(null, true)

    callback(new Error('Not allowed by CORS'));
  }
}


app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/products", products)
app.use("/auth", auth)
app.use("/download", files)

app.use(error_handler)
app.use(loger);

app.listen(4000, () => {
  console.log(`app is listening to port 4000`)
})