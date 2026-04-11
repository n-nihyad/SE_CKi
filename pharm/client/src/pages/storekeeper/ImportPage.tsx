import { useState } from "react";

type RequestItem = {
  productName: string;
  quantity: number;
};

type ImportRequest = {
  id: number;
  createdAt: string;
  items: RequestItem[];
  status: "pending" | "processed";
};

const fakeRequests: ImportRequest[] = [
  {
    id: 1,
    createdAt: "2026-04-10",
    status: "pending",
    items: [
      { productName: "Paracetamol", quantity: 50 },
      { productName: "Amoxicillin", quantity: 30 },
    ],
  },
  {
    id: 2,
    createdAt: "2026-04-09",
    status: "pending",
    items: [{ productName: "Ibuprofen", quantity: 20 }],
  },
];

export default function ImportRequestPage() {
  const [requests, setRequests] = useState(fakeRequests);

  const [selected, setSelected] = useState<ImportRequest | null>(null);

  const [status, setStatus] = useState<"full" | "partial">("full");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!selected) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? {
              ...r,
              status: "processed",
            }
          : r,
      ),
    );

    setSelected(null);
    setStatus("full");
    setNote("");
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* HEADER */}
      <h1 className="text-xl font-bold">Yêu cầu nhập kho</h1>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">
        {/* HEADER ROW */}
        <div className="grid grid-cols-4 bg-slate-100 p-3 text-sm font-semibold">
          <div>Mã YC</div>
          <div>Ngày</div>
          <div>Trạng thái</div>
          <div>Hành động</div>
        </div>

        {/* ROWS */}
        {requests.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-4 p-3 border-t text-sm items-center"
          >
            <div>#{r.id}</div>
            <div>{r.createdAt}</div>

            <div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  r.status === "pending"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {r.status}
              </span>
            </div>

            <div>
              <button
                onClick={() => setSelected(r)}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
              >
                Xem / Xử lý
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-120 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              Chi tiết yêu cầu #{selected.id}
            </h2>

            {/* ITEMS */}
            <div className="border rounded p-3 max-h-48 overflow-y-auto">
              {selected.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span>{i.productName}</span>
                  <span>x{i.quantity}</span>
                </div>
              ))}
            </div>

            {/* RADIO */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phản hồi kho</label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={status === "full"}
                  onChange={() => setStatus("full")}
                />
                Đủ thuốc
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={status === "partial"}
                  onChange={() => setStatus("partial")}
                />
                Không đủ thuốc
              </label>
            </div>

            {/* NOTE */}
            {status === "partial" && (
              <textarea
                className="border p-2 rounded text-sm"
                placeholder="Mô tả thiếu thuốc..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            )}

            {/* ACTION */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 text-sm"
              >
                Đóng
              </button>

              <button
                onClick={handleSubmit}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
              >
                Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
