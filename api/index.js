import express from "express"
import bodyParser from "body-parser"


const app = express()
app.use(bodyParser.json())
app.get("/get_form", (req, res) => {
    res.json({
        title: "Login",
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