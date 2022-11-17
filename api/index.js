import path from 'path';
import express from "express";
import bodyParser from "body-parser"
import cors from 'cors';


const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static('./public'))

app.get("/get_file", (req, res) => {

    return res.sendFile(path.join(__dirname, './public', '1.exe'))

})

app.get("/products", (req, res) => {

    return res.json({
        keyboards: [
            {
                name: "J-Key",
                price: 109,
                text: "Perfect for home use",
            },
            {
                name: "S-Key",
                price: 159,
                text: "smth",
            },
            {
                name: "M-Key",
                price: 209,
                text: "God's thing",
            }
        ]
    })

})

app.listen(4000, () => {
    console.log(`app is listening to port 4000`)
})