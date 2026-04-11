import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

/* ================= TYPES ================= */

type Batch = {
  id: number;
  productName: string;
  batchName: string;
  quantity: number;
  expiryDate: string;
  location: string;
  status?: "safe" | "near_date" | "expired";
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
    location: "A1-01",
    status: "safe",
  },
  {
    id: 2,
    productName: "Amoxicillin",
    batchName: "AMOX-2025-B2",
    quantity: 40,
    expiryDate: "2026-04-20",
    location: "B2-03",
    status: "near_date",
  },
];

const fakeImportRequests: ImportRequest[] = [];

/* ================= STATUS ================= */

const statusConfig = {
  safe: {
    label: "An toàn",
    cls: "bg-green-50 text-green-700",
  },
  near_date: {
    label: "Gần hết hạn",
    cls: "bg-amber-50 text-amber-700",
  },
  expired: {
    label: "Hết hạn",
    cls: "bg-red-50 text-red-600",
  },
};

/* ================= PAGE ================= */

export default function InventoryPage() {
  /* ================= GET ROLE FROM AUTHSLICE ================= */
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;

  const [batches, setBatches] = useState<Batch[]>(initialBatches);

  /* STOREKEEPER */
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<Batch, "id" | "status">>({
    productName: "",
    batchName: "",
    quantity: 0,
    expiryDate: "",
    location: "",
  });

  /* MANAGER */
  const [openRequest, setOpenRequest] = useState(false);
  const [requestForm, setRequestForm] = useState({
    productName: "",
    batchName: "",
    quantity: 1,
    note: "",
  });

  /* ================= STOREKEEPER ACTIONS ================= */

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      productName: "",
      batchName: "",
      quantity: 0,
      expiryDate: "",
      location: "",
    });
    setOpenModal(true);
  };

  const openEditModal = (b: Batch) => {
    setEditingId(b.id);
    setForm({
      productName: b.productName,
      batchName: b.batchName,
      quantity: b.quantity,
      expiryDate: b.expiryDate,
      location: b.location,
    });
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!form.productName || !form.batchName) return;

    if (editingId === null) {
      setBatches((prev) => [
        ...prev,
        { id: Date.now(), ...form, status: "safe" },
      ]);
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

  /* ================= MANAGER ACTION ================= */

  const handleSendImportRequest = () => {
    if (!requestForm.productName) return;

    fakeImportRequests.push({
      id: fakeImportRequests.length + 1,
      ...requestForm,
      status: "pending",
    });

    alert("Đã gửi yêu cầu nhập kho!");

    setRequestForm({
      productName: "",
      batchName: "",
      quantity: 1,
      note: "",
    });

    setOpenRequest(false);
  };

  /* ================= SAFETY ================= */

  if (!user) {
    return <div className="p-6 text-red-500">Chưa đăng nhập</div>;
  }

  /* ================= UI ================= */

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Quản lý kho ({role})</h1>
        </div>

        {/* ROLE BUTTONS */}
        {role === "storekeeper" && (
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Thêm lô
          </button>
        )}

        {role === "warehouse_manager" && (
          <button
            onClick={() => setOpenRequest(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Gửi nhập kho
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="flex-1 border rounded-lg overflow-auto bg-white">
        <div className="grid grid-cols-6 bg-slate-100 p-3 text-sm font-semibold">
          <div>Thuốc</div>
          <div>Lô</div>
          <div>Số lượng</div>
          <div>HSD</div>
          <div>Vị trí</div>
          <div>Hành động</div>
        </div>

        {batches.map((b) => {
          const s = statusConfig[b.status || "safe"];

          return (
            <div
              key={b.id}
              className="grid grid-cols-6 p-3 border-t text-sm items-center"
            >
              <div>{b.productName}</div>
              <div>{b.batchName}</div>
              <div>{b.quantity}</div>
              <div>{b.expiryDate}</div>
              <div>{b.location}</div>

              <div className="flex gap-2">
                {role === "storekeeper" ? (
                  <>
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
                  </>
                ) : (
                  <span className={`px-2 py-1 text-xs rounded ${s.cls}`}>
                    {s.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* STOREKEEPER MODAL */}
      {openModal && role === "storekeeper" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
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
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
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

      {/* MANAGER MODAL */}
      {openRequest && role === "warehouse_manager" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Gửi nhập kho</h2>

            <input
              className="border p-2 rounded"
              placeholder="Thuốc"
              value={requestForm.productName}
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  productName: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="border p-2 rounded"
              value={requestForm.quantity}
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  quantity: Number(e.target.value),
                })
              }
            />

            <textarea
              className="border p-2 rounded"
              value={requestForm.note}
              onChange={(e) =>
                setRequestForm({ ...requestForm, note: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button onClick={() => setOpenRequest(false)}>Hủy</button>
              <button
                onClick={handleSendImportRequest}
                className="bg-blue-600 text-white px-3 py-1 rounded"
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
