# Car Management

โปรเจกต์นี้เป็นระบบจดบันทึกและจัดการข้อมูลรถยนต์ของบริษัท ใช้สำหรับเก็บรายการรถยนต์ในระบบ เพิ่ม แก้ไข ลบ และค้นหาข้อมูลได้จากหน้าเว็บ 

โปรเจกต์นี้แบ่งเป็น 3 ส่วนหลัก:
- Database: PostgreSQL
- Backend: Node.js/Express
- Frontend: Vite/React

## สิ่งที่ต้องมี

- Docker Desktop
- Docker Compose

## วิธีเริ่มใช้งาน

1. clone โปรเจกต์

```bash
git clone https://github.com/PPortler/car-management.git
cd car-management
```

2. รันโปรเจกต์ด้วย Docker

```bash
docker compose up --build -d
```

หลังจากรันเสร็จ สามารถเข้าใช้งานได้ที่:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Database: `localhost:5432`

## วิธีปิดโปรเจกต์

```bash
docker compose down
```