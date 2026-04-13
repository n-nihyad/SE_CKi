import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { products } from "../../fakeDB";
import Stat from "../../../components/Stat";

/* ================= TYPES ================= */

type Batch = {
  id: number;
  productName: string;
  batchName: string;
  quantity: number;
  expiryDate: string;
  warehouse: string;
  position: string;
};

type ImportRequest = {
  id: number;
  productName: string;
  batchName: string;
  quantity: number;
  note: string;
  status: "pending";
};

/* ================= MOCK ================= */

const initialBatches: Batch[] = [
  {
    id: 1,
    productName: "Paracetamol",
    batchName: "PARA-2026-A1",
    quantity: 120,
    expiryDate: "2026-06-10",
    warehouse: "Kho A",
    position: "A1-01",
  },
  {
    id: 2,
    productName: "Amoxicillin",
    batchName: "AMOX-2025-B2",
    quantity: 40,
    expiryDate: "2026-04-20",
    warehouse: "Kho B",
    position: "B2-03",
  },
];

const fakeImportRequests: ImportRequest[] = [];

/* ================= STATUS ================= */

const getStatus = (date: string) => {
  const today = new Date();
  const exp = new Date(date);
  const diff = (exp.getTime() - today.getTime()) / (1000 * 3600 * 24);

  if (diff < 0) return "expired";
  if (diff <= 30) return "near";
  return "safe";
};

const statusConfig = {
  safe: { label: "An toàn", cls: "bg-green-50 text-green-700" },
  near: { label: "Gần hết hạn", cls: "bg-amber-50 text-amber-700" },
  expired: { label: "Hết hạn", cls: "bg-red-50 text-red-600" },
};

/* ================= PAGE ================= */

export default function InventoryPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;
  const navigate = useNavigate();

  const [batches, setBatches] = useState<Batch[]>(initialBatches);

  /* ===== FILTER ===== */
  const [filters, setFilters] = useState({
    keyword: "",
    warehouse: "",
  });

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchKeyword =
        !filters.keyword ||
        `${b.productName} ${b.batchName}`
          .toLowerCase()
          .includes(filters.keyword.toLowerCase());

      const matchWarehouse =
        !filters.warehouse || b.warehouse === filters.warehouse;

      return matchKeyword && matchWarehouse;
    });
  }, [batches, filters]);

  /* ===== STATS ===== */
  const stats = useMemo(() => {
    let totalQuantity = 0;
    let near = 0;
    let expired = 0;

    filteredBatches.forEach((b) => {
      totalQuantity += b.quantity;

      const s = getStatus(b.expiryDate);
      if (s === "near") near++;
      if (s === "expired") expired++;
    });

    return {
      totalBatches: filteredBatches.length,
      totalQuantity,
      near,
      expired,
    };
  }, [filteredBatches]);

  /* ================= STOREKEEPER ================= */

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<Batch, "id">>({
    productName: "",
    batchName: "",
    quantity: 0,
    expiryDate: "",
    warehouse: "",
    position: "",
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      productName: "",
      batchName: "",
      quantity: 0,
      expiryDate: "",
      warehouse: "",
      position: "",
    });
    setOpenModal(true);
  };

  const openEditModal = (b: Batch) => {
    setEditingId(b.id);
    setForm(b);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!form.productName || !form.batchName) return;

    if (editingId === null) {
      setBatches((prev) => [...prev, { id: Date.now(), ...form }]);
    } else {
      setBatches((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, ...form } : b)),
      );
    }

    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  /* ================= MANAGER ================= */

  const [openRequest, setOpenRequest] = useState(false);

  const [requestForm, setRequestForm] = useState({
    productId: 0,
    quantity: 1,
    note: "",
  });

  const handleSendImportRequest = () => {
    if (!requestForm.productId) return;

    const product = products.find((p) => p.id === requestForm.productId);

    fakeImportRequests.push({
      id: fakeImportRequests.length + 1,
      productName: product?.name || "",
      batchName: "",
      quantity: requestForm.quantity,
      note: requestForm.note,
      status: "pending",
    });

    alert("Đã gửi yêu cầu nhập kho!");
    setOpenRequest(false);
  };

  if (!user) return <div className="p-6 text-red-500">Chưa đăng nhập</div>;

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Quản lý kho</h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổng quan và danh sách lô thuốc trong kho
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/inventory/map")}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg"
          >
            Sơ đồ kho
          </button>

          {role === "storekeeper" && (
            <button
              onClick={openAddModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Thêm lô thuôc
            </button>
          )}

          {role === "manager" && (
            <button
              onClick={() => setOpenRequest(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Gửi thông báo nhập kho
            </button>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="Tổng lô" value={stats.totalBatches} />
        <Stat title="Tồn kho" value={stats.totalQuantity} blue />
        <Stat title="Gần hết hạn" value={stats.near} amber />
        <Stat title="Hết hạn" value={stats.expired} red />
      </div>

      {/* FILTER */}
      <div className="flex gap-3 bg-white p-4 rounded-xl border">
        <input
          className="border p-2 rounded w-64"
          placeholder="Tìm..."
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={filters.warehouse}
          onChange={(e) =>
            setFilters({ ...filters, warehouse: e.target.value })
          }
        >
          <option value="">Tất cả kho</option>
          {[...new Set(batches.map((b) => b.warehouse))].map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>

        <button
          onClick={() => setFilters({ keyword: "", warehouse: "" })}
          className="text-sm text-gray-500"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden flex-1">
        <div className="grid grid-cols-8 bg-gray-100 p-3 text-sm font-semibold">
          <div>Lô</div>
          <div>Thuốc</div>
          <div>Số lượng</div>
          <div>HSD</div>
          <div>Trạng thái</div>
          <div>Kho</div>
          <div>Vị trí</div>
          <div>Hành động</div>
        </div>

        {filteredBatches.map((b) => {
          const s = statusConfig[getStatus(b.expiryDate)];

          return (
            <div
              key={b.id}
              className="grid grid-cols-8 p-3 border-t text-sm items-center"
            >
              <div>{b.batchName}</div>
              <div>{b.productName}</div>
              <div>{b.quantity}</div>
              <div>{b.expiryDate}</div>
              <div>
                <span className={`px-2 py-1 rounded text-xs ${s.cls}`}>
                  {s.label}
                </span>
              </div>
              <div>{b.warehouse}</div>
              <div>{b.position}</div>
              <div>
                {role === "storekeeper" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(b)}
                      className="px-2 py-1 text-xs bg-amber-500 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== STOREKEEPER MODAL ===== */}
      {openModal && role === "storekeeper" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">
              {editingId ? "Cập nhật" : "Thêm lô"}
            </h2>

            <input
              className="border p-2 rounded"
              placeholder="Thuốc"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Lô"
              value={form.batchName}
              onChange={(e) => setForm({ ...form, batchName: e.target.value })}
            />

            <input
              type="number"
              className="border p-2 rounded"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />

            <input
              type="date"
              className="border p-2 rounded"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              placeholder="Vị trí"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpenModal(false)}>Hủy</button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MANAGER MODAL (TÁCH RIÊNG) ===== */}
      {openRequest && role === "manager" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-100 rounded-xl p-5 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Gửi thông báo nhập kho</h2>

            {/* SELECT */}
            <select
              className="border p-2 rounded"
              value={requestForm.productId}
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  productId: Number(e.target.value),
                })
              }
            >
              <option value={0}>-- Chọn thuốc --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* QUANTITY */}
            <input
              type="number"
              min={1}
              className="border p-2 rounded"
              value={requestForm.quantity}
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  quantity: Number(e.target.value),
                })
              }
            />

            {/* NOTE */}
            <textarea
              className="border p-2 rounded"
              placeholder="Ghi chú"
              value={requestForm.note}
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  note: e.target.value,
                })
              }
            />

            {/* ACTION */}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setOpenRequest(false)}
                className="text-slate-500"
              >
                Hủy
              </button>

              <button
                onClick={handleSendImportRequest}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
