import mongoose from "mongoose";
import process from "process";

import {API} from "../../config"

export const connect = async () => {
    // console.log(typeof process.env.api)
    try {
        const conn = await mongoose.connect(process.env.api)

        console.log(('DB connected: ' + conn.connection.host))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}