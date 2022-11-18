import path from 'path';
import express from "express";
// import bodyParser from "body-parser"
import cors from 'cors';
import products from './controllers/products';


const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')));
app.use("/products", products)

app.get("/get_file", (req, res) => {

    return res.sendFile(path.join(__dirname, './public/files', '1.exe'))

})

app.listen(4000, () => {
    console.log(`app is listening to port 4000`)
})