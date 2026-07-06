DB_URL=postgres://ptpspp:123456@localhost:5432/car_db?sslmode=disable

migrate-up:
	migrate -path migrations -database "$(DB_URL)" up

migrate-down:
	migrate -path migrations -database "$(DB_URL)" down 1

migrate-version:
	migrate -path migrations -database "$(DB_URL)" version

migrate-drop:
	migrate -path migrations -database "$(DB_URL)" drop -f