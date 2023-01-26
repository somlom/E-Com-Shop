import mongoose from "mongoose";
import process from "process";
import Mailer from "../lib/mailer";


export const connect = async () => {
    mongoose.set('strictQuery', false)
    try {
        const conn = await mongoose.connect(process.env.NODE_ENV === "test" ? process.env.TEST_API : process.env.API)

        console.log(('DB connected: ' + conn.connection.host))
    } catch (error) {
        const mailer = new Mailer();
        mailer.send_email("supersnus1331@gmail.com", "Error with server", "error", { error: error, logs: "https://dashboard.stripe.com/test/logs" })
        console.log(error)
        process.exit(1)
    }
}