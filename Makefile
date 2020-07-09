deploy:
	docker-compose down; docker-compose up --build -d
	docker tag pet_client registry.heroku.com/blog-al/client
	docker push registry.heroku.com/blog-al/client
	docker tag pet_server registry.heroku.com/blog-al/server
	docker push registry.heroku.com/blog-al/server
	heroku container:release client server --app=blog-al

