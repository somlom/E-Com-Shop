import mongoose from "mongoose";
import process from "process";

// import { API } from "../../config"

export const connect = async () => {
    mongoose.set('strictQuery', false)
    try {
        const conn = await mongoose.connect(process.env.NODE_ENV === "test" ? process.env.TEST_API : process.env.API)

        console.log(('DB connected: ' + conn.connection.host))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}