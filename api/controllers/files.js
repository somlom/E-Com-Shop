import { Router } from "express";
import path from 'path';


const files = Router();

const files_path = '../public/files';

files.get("/impressum", get_impressum)

export async function get_impressum(req, res) {
    return await res.sendFile(path.join(__dirname, files_path, 'impressum.pdf'))
}

export default files;