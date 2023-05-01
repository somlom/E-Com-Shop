import {unlink, existsSync} from 'fs';
import {readdir} from 'fs/promises';

const path_to_file = 'public/img/';

export const delete_photos = async (files = []) => {
  if (files.length > 0) {
    files.forEach(img => {
      const file_exists = existsSync(path_to_file + img);
      if (file_exists === true) {
        console.log('removed ' + path_to_file + img);
        unlink(path_to_file + img, err => {
          if (err) console.log('err', err);
        });
      }
    });
  }
};

export const find_files_on_server = async files => {
  const found_files = await readdir(path_to_file);

  const difference = files.filter(data => found_files?.includes(data, 0));

  return {
    files: difference,
    same: JSON.stringify(files) === JSON.stringify(difference),
  };
};
