import { useMemo, useState } from "react";

type HistoryItem = {
  id: number;
  requestCode: string;
  type: "IMPORT" | "EXPORT";
  date: string;
  status: "pending" | "approved" | "rejected";
  items: {
    product: string;
    quantity: number;
  }[];
};

const fakeHistory: HistoryItem[] = [
  {
    id: 1,
    requestCode: "REQ-001",
    type: "IMPORT",
    date: "2026-04-10",
    status: "approved",
    items: [
      { product: "Paracetamol", quantity: 100 },
      { product: "Amoxicillin", quantity: 50 },
    ],
  },
  {
    id: 2,
    requestCode: "REQ-002",
    type: "EXPORT",
    date: "2026-04-09",
    status: "pending",
    items: [{ product: "Ibuprofen", quantity: 20 }],
  },
  {
    id: 3,
    requestCode: "REQ-003",
    type: "IMPORT",
    date: "2026-04-08",
    status: "rejected",
    items: [{ product: "Vitamin C", quantity: 200 }],
  },
];

export default function StockHistoryPage() {
  const [tab, setTab] = useState<"IMPORT" | "EXPORT">("IMPORT");
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  const data = useMemo(() => fakeHistory.filter((i) => i.type === tab), [tab]);

  const statusColor = (status: HistoryItem["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-amber-600 bg-amber-50";
      case "rejected":
        return "text-red-600 bg-red-50";
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Lịch sử kho</h1>
        <p className="text-sm text-gray-500 mt-1">
          Theo dõi lịch sử xuất / nhập kho
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("IMPORT")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            tab === "IMPORT"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          Lịch sử nhập kho
        </button>

        <button
          onClick={() => setTab("EXPORT")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            tab === "EXPORT"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          Lịch sử xuất kho
        </button>
      </div>

      {/* TABLE */}
      <div className="flex-1 border rounded-lg overflow-hidden bg-white">
        {/* HEADER */}
        <div className="grid grid-cols-4 bg-slate-100 p-3 text-sm font-semibold">
          <div>Mã yêu cầu</div>
          <div>Ngày</div>
          <div>Trạng thái</div>
          <div>Hành động</div>
        </div>

        {/* ROWS */}
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 p-3 border-t items-center text-sm hover:bg-slate-50"
          >
            <div className="font-medium">{item.requestCode}</div>

            <div>{item.date}</div>

            <div>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${statusColor(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>

            <div>
              <button
                onClick={() => setSelected(item)}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-105 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              Chi tiết {selected.requestCode}
            </h2>

            {/* ITEMS */}
            <div className="border rounded p-3 max-h-52 overflow-y-auto">
              {selected.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span>{i.product}</span>
                  <span>x{i.quantity}</span>
                </div>
              ))}
            </div>

            {/* INFO */}
            <div className="text-sm text-slate-600">
              Loại:{" "}
              <span className="font-medium">
                {selected.type === "IMPORT" ? "Nhập kho" : "Xuất kho"}
              </span>
            </div>

            {/* CLOSE */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 text-sm bg-slate-100 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
