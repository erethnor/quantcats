#!/bin/sh

rm -r dist/ .sass-cache/

echo "compass and webpack MUST be available globally."
echo "npm and bower should also be available."

if ! [ -d "bower_components" ]; then
	echo "Loading bower dependencies..."
	bower install
fi

if ! [ -d "node_modules" ]; then
	echo "Loading npm dependencies..."
	npm install
fi

mkdir dist dist/js

cp src/*.html dist/

compass compile
webpack --module-bind --display-error-details src/js/main.js dist/js/packed.js

cp bower_components/promise-polyfill/Promise.min.js dist/js/
cp bower_components/fetch/fetch.js dist/js/
cp bower_components/normalize.css/normalize.css dist/css/