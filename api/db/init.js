import mongoose from "mongoose";


export const connect = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0")

        console.log(('DB connected: '+conn.connection.host))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}