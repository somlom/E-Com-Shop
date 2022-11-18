import { Router } from "express";


const products = Router();

products.get('/', function (req, res) {
    res.send('hello world')
  })