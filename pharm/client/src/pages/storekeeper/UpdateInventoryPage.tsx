import { useState } from "react";

type Batch = {
  id: number;
  batchCode: string;
  productName: string;
  quantity: number;
  expiryDate: string;
  location: string;
};

const initialBatches: Batch[] = [
  {
    id: 1,
    batchCode: "PARA-001",
    productName: "Paracetamol",
    quantity: 120,
    expiryDate: "2026-06-10",
    location: "A1-01",
  },
  {
    id: 2,
    batchCode: "AMOX-002",
    productName: "Amoxicillin",
    quantity: 50,
    expiryDate: "2026-04-20",
    location: "B2-03",
  },
];

export default function UpdateInventoryPage() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<Batch, "id">>({
    batchCode: "",
    productName: "",
    quantity: 0,
    expiryDate: "",
    location: "",
  });

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      batchCode: "",
      productName: "",
      quantity: 0,
      expiryDate: "",
      location: "",
    });
    setOpenModal(true);
  };

  const openEditModal = (batch: Batch) => {
    setEditingId(batch.id);
    setForm({
      batchCode: batch.batchCode,
      productName: batch.productName,
      quantity: batch.quantity,
      expiryDate: batch.expiryDate,
      location: batch.location,
    });
    setOpenModal(true);
  };

  const handleSave = () => {
    if (!form.batchCode || !form.productName) return;

    if (editingId === null) {
      // ADD
      setBatches((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    } else {
      // UPDATE
      setBatches((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, ...form } : b)),
      );
    }

    setOpenModal(false);
  };

  const handleDelete = (id: number) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Cập nhật thông tin kho</h1>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Thêm lô
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 bg-slate-100 p-3 text-sm font-semibold">
          <div>Mã lô</div>
          <div>Thuốc</div>
          <div>Số lượng</div>
          <div>HSD</div>
          <div>Vị trí</div>
          <div>Hành động</div>
        </div>

        {batches.map((b) => (
          <div
            key={b.id}
            className="grid grid-cols-6 p-3 border-t text-sm items-center"
          >
            <div>{b.batchCode}</div>
            <div>{b.productName}</div>
            <div>{b.quantity}</div>
            <div>{b.expiryDate}</div>
            <div>{b.location}</div>

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
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-105 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">
              {editingId ? "Cập nhật lô" : "Thêm lô mới"}
            </h2>

            <input
              className="border p-2 rounded"
              placeholder="Mã lô"
              value={form.batchCode}
              onChange={(e) => setForm({ ...form, batchCode: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              placeholder="Tên thuốc"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Số lượng"
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
            />

            <input
              className="border p-2 rounded"
              type="date"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              placeholder="Vị trí kho"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setOpenModal(false)}
                className="px-3 py-1 text-sm"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
