install:
				npm install
start:
				npm run babel-node -- src/bin/page-loader.js --output /tmp/test  https://hexlet.io/courses
lint:
				npm run eslint -- src __tests__
publish:
				npm run publish
test:
				npm test
testwatch:
				npm run testwatch
