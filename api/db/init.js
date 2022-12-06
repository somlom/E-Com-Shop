import mongoose from "mongoose";
import process from "process";
import { API } from "../../config";


export const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.api || API)

        console.log(('DB connected: ' + conn.connection.host))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}