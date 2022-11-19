import { Router } from "express";


const files = Router();

files.get("/impressum", (req, res) => {

    return res.sendFile(path.join(__dirname, './public/files', 'impressum.pdf'))

})