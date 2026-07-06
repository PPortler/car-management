import { useMemo, useState } from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import CommonTable from "@/components/common/Table";
import { usePaginationState } from "@/hooks/pagination/usePaginationState";
import { useLoadInitialData } from "./hooks/useLoadInitialData";
import { useDebounce } from "@/hooks/common/useDebounce";
import CarFormModal from "@/components/cars/CarFormModal";
import { showConfirm } from "@/utils/modal";
import { alert } from "@/utils/alert";
import { carService } from "@/services/cars/cars.services";

const CarsPage = () => {
  //state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedCar, setSelectedCar] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [search, setSearch] = useState("");

  // hooks
  const debouncedSearch = useDebounce(search);
  const { page, limit, setPage, setLimit,setTotal, setTotalPages, total, totalPages } =
    usePaginationState();

  const { cars, loading, reload } = useLoadInitialData({
    page: page,
    limit: limit,
    search: debouncedSearch,
    setTotal: setTotal,
    setTotalPages: setTotalPages,
  });

  // handlers
  const handleEdit = (row) => {
    setMode("edit");
    setSelectedCar(row);
    setOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitLoading(true);

      const payload = {
        plate_number: values.plate_number.trim(),
        brand: values.brand.trim(),
        model: values.model.trim(),
        note: values.note?.trim() || "",
      };

      const isEdit = mode === "edit";

      const response = isEdit
        ? await carService.updateCar(selectedCar.id, payload)
        : await carService.createCar(payload);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      alert.success(response.data.message);

      setOpen(false);
      setSelectedCar(null);

      await reload();
    } catch (error) {
      alert.error(
        error.response?.data?.message ??
          error.message ??
          "Something went wrong",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = (car) => {
    showConfirm({
      title: "Delete Car",
      content: `Are you sure you want to delete "${car.plate_number}"?`,
      okText: "Delete",
      okType: "danger",

      onOk: async () => {
        try {
          const response = await carService.deleteCar(car.id);

          if (!response.data.success) {
            throw new Error(response.data.message);
          }

          alert.success(response.data.message);

          await reload();
        } catch (error) {
          alert.error(
            error.response?.data?.message ??
              error.message ??
              "Something went wrong",
          );
        }
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        title: "Plate Number",
        dataIndex: "plate_number",
      },
      {
        title: "Brand",
        dataIndex: "brand",
      },
      {
        title: "Model",
        dataIndex: "model",
      },
      {
        title: "Note",
        dataIndex: "note",
      },
      {
        title: "Action",
        width: 150,
        render: (_, row) => (
          <div className="flex gap-2">
            <Button type="link" onClick={() => handleEdit(row)}>
              Edit
            </Button>

            <Button danger type="link" onClick={() => handleDelete(row)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Car Management</h1>

            <p className="mt-1 text-gray-500">Manage your cars easily.</p>
          </div>

          <Button
            type="primary"
            icon={<Plus size={18} />}
            onClick={() => {
              setMode("create");
              setSelectedCar(null);
              setOpen(true);
            }}
          >
            Add Car
          </Button>
        </div>

        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-sm">
            <SearchInput
              value={search}
              placeholder="Search plate, brand or model..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <CommonTable
          columns={columns}
          dataSource={cars}
          loading={loading}
          pagination
          current={page}
          pageSize={limit}
          total={total}
          onPageChange={(page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          }}
        />
      </div>

      <CarFormModal
        open={open}
        mode={mode}
        loading={submitLoading}
        initialValues={selectedCar}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CarsPage;
