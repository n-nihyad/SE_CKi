import { useState } from "react";

type ImportRequest = {
  id: number;
  productName: string;
  batchName: string;
  quantity: number;
  note: string;
  status: "pending";
};

type Batch = {
  id: number;
  productName: string;
  batchName: string;
  quantity: number;
  expiryDate: string;
  location: string;
  status: "safe" | "near_date" | "expired";
};

const fakeImportRequests: ImportRequest[] = [];

const fakeBatches: Batch[] = [
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
  {
    id: 3,
    productName: "Ibuprofen",
    batchName: "IBU-2025-C3",
    quantity: 0,
    expiryDate: "2025-12-01",
    location: "C3-02",
    status: "expired",
  },
];

const statusConfig: Record<
  Batch["status"],
  { label: string; cls: string; dot: string }
> = {
  safe: {
    label: "An toàn",
    cls: "bg-green-50 text-green-700",
    dot: "bg-green-400",
  },
  near_date: {
    label: "Gần hết hạn",
    cls: "bg-amber-50 text-amber-700",
    dot: "bg-amber-400",
  },
  expired: {
    label: "Hết hạn",
    cls: "bg-red-50 text-red-600",
    dot: "bg-red-400",
  },
};

export default function InventoryPage() {
  const [batches] = useState<Batch[]>(fakeBatches);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    batchName: "",
    quantity: 1,
    note: "",
  });

  const handleSendImportRequest = () => {
    if (!form.productName || form.quantity <= 0) return;

    fakeImportRequests.push({
      id: fakeImportRequests.length + 1,
      ...form,
      status: "pending",
    });

    alert("Đã gửi thông tin nhập kho cho thủ kho!");
    setForm({ productName: "", batchName: "", quantity: 1, note: "" });
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Quản lý kho thuốc
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách lô thuốc trong kho
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition"
        >
          + Gửi nhập kho
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
        <div className="grid grid-cols-[1.5fr_1.5fr_80px_120px_100px_130px] border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          <div>Thuốc</div>
          <div>Lô</div>
          <div className="text-center">Số lượng</div>
          <div>Hạn dùng</div>
          <div>Vị trí</div>
          <div>Trạng thái</div>
        </div>

        <div className="flex-1 divide-y divide-slate-100">
          {batches.map((b) => {
            const s = statusConfig[b.status];

            return (
              <div
                key={b.id}
                className="grid grid-cols-[1.5fr_1.5fr_80px_120px_100px_130px] items-center px-5 py-4 hover:bg-slate-50 transition"
              >
                <div className="text-sm font-medium text-slate-800">
                  {b.productName}
                </div>

                <div className="font-mono text-xs text-slate-500">
                  {b.batchName}
                </div>

                <div
                  className={`text-center text-sm font-bold ${
                    b.quantity === 0 ? "text-red-400" : "text-slate-700"
                  }`}
                >
                  {b.quantity}
                </div>

                <div className="text-sm text-slate-500">{b.expiryDate}</div>

                <div className="font-mono text-xs text-slate-600">
                  {b.location}
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${s.cls}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-300">
        * Gửi yêu cầu nhập kho sẽ được thủ kho xử lý
      </p>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-110 rounded-xl bg-white border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between px-6 py-4 border-b">
              <p className="font-semibold">Gửi nhập kho</p>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="p-6 flex flex-col gap-3">
              <input
                placeholder="Tên thuốc"
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
                className="h-10 border rounded px-3"
              />

              <input
                placeholder="Tên lô"
                value={form.batchName}
                onChange={(e) =>
                  setForm({ ...form, batchName: e.target.value })
                }
                className="h-10 border rounded px-3"
              />

              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className="h-10 border rounded px-3"
              />

              <textarea
                placeholder="Ghi chú"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex gap-2 px-6 py-4 border-t">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border rounded py-2"
              >
                Huỷ
              </button>

              <button
                onClick={handleSendImportRequest}
                className="flex-1 bg-blue-600 text-white rounded py-2"
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
