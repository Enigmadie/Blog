install: install-deps

start:
	heroku local -f Procfile

start-backend:
	npx nodemon --exec npx babel-node server/bin/blog.js

start-frontend:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
