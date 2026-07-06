import apiClient from "@/lib/axios";

const getCars = async (params) => {
    const response = await apiClient.get("/cars", {
        params,
    });
    return response;
};

const getCarById = async (id) => {
    const response = await apiClient.get(`/cars/${id}`);
    return response;
};

const createCar = async (payload) => {
    const response = await apiClient.post("/cars", payload);
    return response;
};

const updateCar = async (id, payload) => {
    const response = await apiClient.put(`/cars/${id}`, payload);
    return response;
};

const deleteCar = async (id) => {
    const response = await apiClient.delete(`/cars/${id}`);
    return response;
};

export const carService = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};