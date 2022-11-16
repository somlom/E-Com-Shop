import express from "express"
import bodyParser from "body-parser"
const cors = require('cors')


const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.post("/get_form", (req, res) => {

    const { title } = req.body

    res.json({
        title: title,
        fields: [
            {
                email: {
                    type: "email",
                    placeholder: "E-Mail"
                },
                password: {
                    type: "password",
                    placeholder: "Password"
                },
            }

        ],
    })
})
app.listen(4000, () => {
    console.log(`app is listening to port 4000`)
})