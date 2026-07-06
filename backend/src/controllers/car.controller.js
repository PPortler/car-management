import * as service from "../services/car.service.js";

export const getCars = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const data = await service.getAllCars({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const getCarById = async (req, res) => {
  const data = await service.getCarById(req.params.id);
  res.json(data);
};

export const createCar = async (req, res) => {
  const data = await service.createCar(req.body);
  res.status(201).json(data);
};

export const updateCar = async (req, res) => {
  const data = await service.updateCar(req.params.id, req.body);
  res.json(data);
};

export const deleteCar = async (req, res) => {
  const data = await service.deleteCar(req.params.id);
  res.json(data);
};