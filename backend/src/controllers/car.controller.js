import * as service from "../services/car.service.js";
import * as response from "../utils/response.js";

export const getCars = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await service.getAllCars({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return response.success(res, {
      message: "Get cars successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const car = await service.getCarById(req.params.id);

    return response.ok(res, car, "Get car successfully");
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req, res, next) => {
  try {
    const car = await service.createCar(req.body);

    return response.created(res, car, "Create car successfully");
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const car = await service.updateCar(req.params.id, req.body);

    return response.ok(res, car, "Update car successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    await service.deleteCar(req.params.id);

    return response.ok(res, null, "Delete car successfully");
  } catch (error) {
    next(error);
  }
};