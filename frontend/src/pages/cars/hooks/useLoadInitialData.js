import { useEffect, useState } from "react";
import { carService } from "@/services/cars/cars.services";

export const useLoadInitialData = ({
  page,
  limit,
  search,
  setTotal,
  setTotalPages,
}) => {
  const [cars, setCars] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const loadCars = async () => {
    try {
      setLoadingInitial(true);

      const response = await carService.getCars({
        page,
        limit,
        search,
      });

      const { success, message, data, pagination } = response.data;

      if (!success) {
        throw new Error(message);
      }

      setCars(data);
      setTotal(pagination.total);
      setTotalPages(pagination.totalPages);
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, [page, limit, search]);

  return {
    cars,
    loadingInitial,
    reload: loadCars,
  };
};