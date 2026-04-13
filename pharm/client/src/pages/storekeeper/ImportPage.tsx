import { useMemo, useState } from "react";

type RequestSource = "manager" | "requestor";
type RequestType = "import" | "return";

type RequestItem = {
  productName: string;
  quantity: number;
};

type WarehouseRequest = {
  id: number;
  createdAt: string;
  status: "pending" | "processed";
  source: RequestSource;
  type: RequestType;
  items: RequestItem[];
};

const fakeRequests: WarehouseRequest[] = [
  {
    id: 101,
    createdAt: "2026-04-12",
    status: "pending",
    source: "manager",
    type: "import",
    items: [
      { productName: "Paracetamol 500mg", quantity: 120 },
      { productName: "Amoxicillin 250mg", quantity: 80 },
      { productName: "Vitamin C", quantity: 200 },
    ],
  },
  {
    id: 102,
    createdAt: "2026-04-11",
    status: "processed",
    source: "requestor",
    type: "return",
    items: [
      { productName: "Ibuprofen 400mg", quantity: 30 },
      { productName: "Omeprazole 20mg", quantity: 15 },
    ],
  },
  {
    id: 103,
    createdAt: "2026-04-11",
    status: "pending",
    source: "requestor",
    type: "return",
    items: [{ productName: "Cetirizine 10mg", quantity: 50 }],
  },
];

export default function ImportRequestPage() {
  const [requests, setRequests] = useState(fakeRequests);
  const [selected, setSelected] = useState<WarehouseRequest | null>(null);

  const [status, setStatus] = useState<"full" | "partial">("full");
  const [note, setNote] = useState("");

  const getTotal = (items: RequestItem[]) =>
    items.reduce((sum, i) => sum + i.quantity, 0);

  const stats = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      processed: requests.filter((r) => r.status === "processed").length,
    };
  }, [requests]);

  const handleSubmit = () => {
    if (!selected) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selected.id ? { ...r, status: "processed" } : r,
      ),
    );

    setSelected(null);
    setStatus("full");
    setNote("");
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 h-full">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Yêu cầu kho nhập / hoàn trả
        </h1>
        <p className="text-sm text-slate-500">
          Quản lý request từ quản lý & người dùng
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng", value: stats.total },
          { label: "Chờ xử lý", value: stats.pending },
          { label: "Đã xử lý", value: stats.processed },
        ].map((s) => (
          <div key={s.label} className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-6 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
          <div>Mã</div>
          <div>Ngày</div>
          <div>Nguồn</div>
          <div>Loại</div>
          <div className="text-center">SL</div>
          <div className="text-right">Trạng thái</div>
        </div>

        {/* ROWS */}
        {requests.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-6 px-4 py-3 border-t text-sm items-center hover:bg-slate-50"
          >
            <div className="font-medium">#{r.id}</div>

            <div className="text-slate-600">{r.createdAt}</div>

            <div>
              <span
                className={`px-2 py-1 text-xs rounded-md ${
                  r.source === "manager"
                    ? "bg-violet-100 text-violet-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {r.source === "manager" ? "QL kho" : "Người dùng"}
              </span>
            </div>

            <div className="text-slate-700">
              {r.type === "import" ? "Nhập" : "Trả"}
            </div>

            <div className="text-center font-semibold">{getTotal(r.items)}</div>

            <div className="flex justify-end gap-2 items-center">
              <span
                className={`px-2 py-1 text-xs rounded-md ${
                  r.status === "pending"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {r.status}
              </span>

              <button
                onClick={() => setSelected(r)}
                className="px-3 py-1 text-xs bg-slate-900 text-white rounded-lg hover:bg-slate-700"
              >
                Xử lý
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-150 rounded-xl p-6 shadow-xl flex flex-col gap-4">
            <h2 className="text-lg font-bold">Chi tiết #{selected.id}</h2>

            {/* INFO BLOCK */}
            <div className="grid grid-cols-3 text-sm gap-2">
              <div>
                <p className="text-slate-400">Nguồn</p>
                <p className="font-medium">
                  {selected.source === "manager" ? "QL kho" : "User"}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Loại</p>
                <p className="font-medium">
                  {selected.type === "import" ? "Nhập" : "Trả"}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Tổng</p>
                <p className="font-medium">{getTotal(selected.items)}</p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="border rounded-lg divide-y max-h-40 overflow-y-auto">
              {selected.items.map((i, idx) => (
                <div key={idx} className="flex justify-between p-2 text-sm">
                  <span>{i.productName}</span>
                  <span className="font-medium">x{i.quantity}</span>
                </div>
              ))}
            </div>

            {/* ACTION */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={status === "full"}
                  onChange={() => setStatus("full")}
                />
                Đủ
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={status === "partial"}
                  onChange={() => setStatus("partial")}
                />
                Thiếu
              </label>
            </div>

            {status === "partial" && (
              <textarea
                className="border rounded-lg p-2 text-sm"
                placeholder="Ghi chú..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 text-sm"
              >
                Huỷ
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
