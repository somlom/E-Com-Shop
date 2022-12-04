import { Router } from "express";
import path from 'path';


const files = Router();

files.get("/impressum", get_impressum)

export async function get_impressum(req, res) {
    return await res.sendFile(path.join(__dirname, '../public/files', 'impressum.pdf'))
}

export default files;