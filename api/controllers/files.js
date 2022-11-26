import { Router } from "express";
import path from 'path';


const files = Router();

files.get("/impressum", (req, res) => {

    return res.sendFile(path.join(__dirname, '../public/files', 'impressum.pdf'))

})

export default files;