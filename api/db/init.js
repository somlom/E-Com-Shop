import mongoose from "mongoose";
import process from "process";
import { send_email } from "../lib/mailer";


export const connect = async () => {
    mongoose.set('strictQuery', false)
    try {
        const conn = await mongoose.connect(process.env.NODE_ENV === "test" ? process.env.TEST_API : process.env.API)

        console.log(('DB connected: ' + conn.connection.host))
    } catch (error) {
        send_email("supersnus1331@gmail.com", "Error: "+toString(error), "<p>sorry</p>")
        console.log(error)
        process.exit(1)
    }
}