include .env
export

migrate-up:
	migrate -path migrations -database "$(DB_URL)" up

migrate-down:
	migrate -path migrations -database "$(DB_URL)" down 1

migrate-version:
	migrate -path migrations -database "$(DB_URL)" version

migrate-drop:
	migrate -path migrations -database "$(DB_URL)" drop -f

how to use:
	make migrate-up 
	make migrate-down
	make migrate-version
	make migrate-drop