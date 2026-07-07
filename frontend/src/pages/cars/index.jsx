import { useMemo, useState } from "react";
import { Plus, Car, Edit3, Trash2 } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import CommonTable from "@/components/common/Table";
import CommonButton from "@/components/common/Button";
import CarFormModal from "@/components/Modals/CarFormModal";
import { useDebounce } from "@/hooks/common/useDebounce";
import { usePaginationState } from "@/hooks/pagination/usePaginationState";
import { useLoadInitialData } from "./hooks/useLoadInitialData";
import { carService } from "@/services/cars/cars.services";
import { showConfirm } from "@/utils/modal";
import { alert } from "@/utils/alert";

const CarsPage = () => {
  //state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedCar, setSelectedCar] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [search, setSearch] = useState("");

  // hooks
  const debouncedSearch = useDebounce(search);
  const {
    page,
    limit,
    setPage,
    setLimit,
    setTotal,
    setTotalPages,
    total,
    totalPages,
  } = usePaginationState();

  const { cars, loadInitialData, reload } = useLoadInitialData({
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

  // columns
  const columns = useMemo(
    () => [
      {
        title: "Plate Number",
        dataIndex: "plate_number",
        key: "plate_number",
        render: (text) => (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 font-mono font-semibold text-xs md:text-sm rounded-md border border-slate-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#37bcec]" />
            {text}
          </div>
        ),
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
        render: (text) => (
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-500">
              <Car size={15} />
            </span>
            {text}
          </div>
        ),
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
        render: (text) => (
          <span className="text-slate-600 font-medium">{text}</span>
        ),
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        render: (text) => (
          <span className="text-slate-400 text-sm italic">{text || "—"}</span>
        ),
      },
      {
        title: "Action",
        key: "action",
        width: 160,
        render: (_, row) => (
          <div className="flex items-center gap-1.5">
            <CommonButton
              type="link"
              onClick={() => handleEdit(row)}
              icon={<Edit3 size={13} />}
            >
              <span>Edit</span>
            </CommonButton>

            <CommonButton
              danger
              type="link"
              onClick={() => handleDelete(row)}
              icon={<Trash2 size={13} />}
            >
              <span>Delete</span>
            </CommonButton>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className="w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-100 border border-slate-100">
        {/* สีไล่เฉดตกแต่งขอบบนการ์ด */}
        <div className="h-4 w-full bg-gradient-to-r from-[#37bcec] to-[#21509c]" />

        <div className="p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Car Management
              </h1>
              <p className="text-sm text-slate-400">
                Manage your fleet and vehicles efficiently.
              </p>
            </div>

            <CommonButton
              type="primary"
              icon={<Plus size={18} />}
              onClick={() => {
                setMode("create");
                setSelectedCar(null);
                setOpen(true);
              }}
            >
              Add Car
            </CommonButton>
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="w-full md:max-w-md">
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
            loading={loadInitialData}
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
      </div>

      <CarFormModal
        open={open}
        mode={mode}
        loading={submitLoading}
        initialValues={selectedCar}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CarsPage;
