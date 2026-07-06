# Car Management

โปรเจกต์นี้เป็นระบบจดบันทึกและจัดการข้อมูลรถยนต์ของบริษัท ใช้สำหรับเก็บรายการรถยนต์ในระบบ เพิ่ม แก้ไข ลบ และค้นหาข้อมูลได้จากหน้าเว็บ 

โปรเจกต์นี้แบ่งเป็น 3 ส่วนหลัก:
- Database: PostgreSQL รันผ่าน Docker
- Backend: Node.js/Express
- Frontend: Vite/React

## สิ่งที่ต้องมี

### Docker (จำเป็นสำหรับ database)
- Docker Desktop
- Docker Compose

### Node.js
- Node.js >= 18

### Make และ migration tool
- `make` สำหรับสั่งรัน migration
- `migrate` CLI สำหรับใช้กับคำสั่งใน `backend/Makefile`

## ตั้งค่าโปรเจกต์

1. clone โปรเจกต์

```bash
git clone https://github.com/PPortler/car-management.git
cd car-management
```

2. ตรวจสอบไฟล์ env

Backend ใช้ไฟล์ [backend/.env](backend/.env)

```dotenv
PORT=5000
DB_URL=postgres://postgres:postgres@localhost:6000/car_db?sslmode=disable
```

Frontend ใช้ไฟล์ [frontend/.env](frontend/.env)

```dotenv
VITE_API_URL=http://localhost:5000/api
```

## รัน Database

เริ่ม PostgreSQL ผ่าน Docker:

```bash
docker compose up -d
```

Database จะเปิดที่:
- Host: `localhost`
- Port: `6000`
- Database: `car_db`

## รัน Migration

เข้าโฟลเดอร์ backend แล้วรัน migration:

```bash
cd backend
make migrate-up
```

## รัน Backend

```bash
cd backend
npm install
npm run dev
```

Backend API จะรันที่:
- `http://localhost:5000`

## รัน Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend จะรันที่:
- `http://localhost:5173`

## Service URL

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Database: `localhost:6000`
