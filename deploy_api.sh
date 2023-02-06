echo "Backuping files..."
cp -r build/public/img api/public/img_old

echo "Installing deps..."
yarn

echo "Copying from backup"
cp -r api/public/img_old/img build/public

echo "Compiling..."
rimraf build && babel api --ignore node_modules,test --out-dir build --copy-files 

echo "Done!"
# yarn && babel api --ignore node_modules,test --out-dir build --copy-files