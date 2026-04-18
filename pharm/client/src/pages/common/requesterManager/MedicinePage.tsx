import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MedicineCard from "../../../components/MedicineCard";
import type { RootState } from "../../../app/store";
import { ROLES } from "../../../constants/role";
import {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  restoreMedicine,
} from "../../../api/medicineApi";
import type { Medicine } from "../../../types/medicine";

type ModalState =
  | { type: "add" }
  | { type: "edit"; data: Medicine }
  | { type: "delete"; data: Medicine }
  | { type: "restore"; data: Medicine }
  | null;

export default function MedicinePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [products, setProducts] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState<ModalState>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return products;

    return products.filter((p) =>
      `${p.name} ${p.description ?? ""}`.toLowerCase().includes(keyword),
    );
  }, [search, products]);

  const resetForm = () => {
    setName("");
    setDescription("");
  };

  const handleEditOpen = (medicine: Medicine) => {
    setName(medicine.name);
    setDescription(medicine.description);
    setImage(null);
    setModal({ type: "edit", data: medicine });
  };

  const handleDeleteOpen = (medicine: Medicine) => {
    setModal({ type: "delete", data: medicine });
  };

  const fetchMedicines = async () => {
    try {
      const res = await getMedicines("all");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getMedicines("all");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    await createMedicine(formData);

    await fetchMedicines();

    resetForm();
    setImage(null);
    setModal(null);
  };

  const handleUpdate = async () => {
    if (!modal || modal.type !== "edit") return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (image) formData.append("image", image);

    await updateMedicine(modal.data.id, formData);

    await fetchMedicines();

    resetForm();
    setModal(null);
    setImage(null);
  };

  const handleDelete = async () => {
    if (!modal || modal.type !== "delete") return;

    try {
      await deleteMedicine(modal.data.id); // 🔥 gọi API

      await fetchMedicines(); // 🔄 reload list

      setModal(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleRestore = async (medicine: Medicine) => {
    try {
      await restoreMedicine(medicine.id);
      await fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Danh sách thuốc
          </h1>
          <p className="text-sm text-gray-500 mt-1">Tìm kiếm, tra cứu thuốc</p>
        </div>

        {user?.role === ROLES.MANAGER && (
          <button
            onClick={() => setModal({ type: "add" })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"
          >
            + Thêm thuốc
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, mô tả..."
            className="w-full max-w-5/6 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="text-sm text-slate-600 flex justify-end">
          <div className="me-3">
            Tổng: <b>{filteredProducts.length}</b>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 overflow-y-auto content-start">
        {filteredProducts.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            role={user?.role}
            onEdit={handleEditOpen}
            onDelete={handleDeleteOpen}
            onRestore={handleRestore}
          />
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          {/* ADD / EDIT */}
          {(modal.type === "add" || modal.type === "edit") && (
            <div className="bg-white w-96 rounded-xl p-6 shadow-xl">
              <h2 className="text-lg font-bold mb-4">
                {modal.type === "add"
                  ? "Thêm thuốc"
                  : "Cập nhật thông tin thuốc"}
              </h2>

              <div className="space-y-3">
                <label htmlFor="" className="text-sm">
                  Ảnh thuốc
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên thuốc"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => {
                    setModal(null);
                    resetForm();
                    setImage(null); // 👈 thêm ở đây
                  }}
                  className="px-4 py-2 bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>

                <button
                  onClick={modal.type === "add" ? handleCreate : handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Lưu
                </button>
              </div>
            </div>
          )}

          {/* DELETE CONFIRM */}
          {modal.type === "delete" && (
            <div className="bg-white w-80 rounded-xl p-6 shadow-xl">
              <h2 className="text-lg font-bold mb-3">Xác nhận xoá</h2>
              <p className="text-sm text-gray-600">
                Xoá thuốc: <b>{modal.data.name}</b> ?
              </p>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-2 bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Xoá
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
