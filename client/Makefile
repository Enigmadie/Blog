install: install-deps

# start:
# 	heroku local -f Procfile

start:
	npx webpack-dev-server

build:
	rm -rf dist
	npm run build-app

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
