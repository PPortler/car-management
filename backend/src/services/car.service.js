import { pool } from "../config/db.js";

export const getAllCars = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;

  const keyword = `%${search}%`;

  const whereClause = `
    WHERE
      plate_number ILIKE $1
      OR brand ILIKE $1
      OR model ILIKE $1
  `;

  const totalResult = await pool.query(
    `
      SELECT COUNT(*)::int AS total
      FROM cars
      ${whereClause}
    `,
    [keyword]
  );

  const total = totalResult.rows[0].total;

  const result = await pool.query(
    `
      SELECT
        id,
        plate_number,
        brand,
        model,
        note,
        created_at,
        updated_at
      FROM cars
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `,
    [keyword, limit, offset]
  );

  return {
    data: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCarById = async (id) => {
  const res = await pool.query("SELECT * FROM cars WHERE id=$1", [id]);
  return res.rows[0];
};

export const createCar = async (data) => {
  const { plate_number, brand, model, note } = data;

  const res = await pool.query(
    `INSERT INTO cars (plate_number, brand, model, note)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [plate_number, brand, model, note]
  );

  return res.rows[0];
};

export const updateCar = async (id, data) => {
  const { plate_number, brand, model, note } = data;

  const res = await pool.query(
    `UPDATE cars
     SET plate_number=$1, brand=$2, model=$3, note=$4, updated_at=NOW()
     WHERE id=$5
     RETURNING *`,
    [plate_number, brand, model, note, id]
  );

  return res.rows[0];
};

export const deleteCar = async (id) => {
  await pool.query("DELETE FROM cars WHERE id=$1", [id]);
  return { message: "deleted" };
};