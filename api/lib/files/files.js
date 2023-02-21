import { unlink, existsSync } from 'fs';
import { readdir } from 'fs/promises';


export const delete_photos = async (files = []) => {
    if (files.length > 0) {
        files.forEach(img => {
            const file_exists = existsSync('api/public/img/' + img)
            if (file_exists === true) {
                console.log("removed " + 'api/public/img/' + img)
                unlink('api/public/img/' + img, (err) => {
                    if (err) console.log("err", err);
                });
            }
        })
    }
}

export const find_files_on_server = async (files) => {

    const found_files = await readdir("api/public/img");

    const difference = files.filter(data => found_files?.includes(data, 0))

    return { files: difference, same: JSON.stringify(files) === JSON.stringify(difference) }
}