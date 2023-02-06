echo "Installing deps..."
yarn

echo "Building..."
webpack --config webpack.prod.js

echo "Done!"