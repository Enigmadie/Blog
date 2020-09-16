start:
	docker-compose down; COMPOSE_HTTP_TIMEOUT=120 docker-compose up --build -d

