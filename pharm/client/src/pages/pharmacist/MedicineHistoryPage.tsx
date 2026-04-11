import { useState } from "react";
import { products } from "../fakeDB";

type RequestType = "TAKE" | "RETURN";

type RequestItem = {
  id: string;
  type: RequestType;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  items: {
    productId: number;
    quantity: number;
    reason?: string;
  }[];
};

const fakeRequests: RequestItem[] = [
  {
    id: "REQ-001",
    type: "TAKE",
    status: "APPROVED",
    createdAt: "2026-04-10",
    items: [
      { productId: 1, quantity: 10 },
      { productId: 2, quantity: 5 },
    ],
  },
  {
    id: "REQ-002",
    type: "RETURN",
    status: "PENDING",
    createdAt: "2026-04-09",
    items: [{ productId: 3, quantity: 2, reason: "Dùng không hết" }],
  },
];

const statusConfig = {
  APPROVED: { label: "Đã duyệt", cls: "bg-green-50 text-green-700" },
  PENDING: { label: "Chờ duyệt", cls: "bg-amber-50 text-amber-700" },
  REJECTED: { label: "Từ chối", cls: "bg-red-50 text-red-700" },
};

const typeConfig = {
  TAKE: { label: "Lấy thuốc", cls: "bg-blue-50 text-blue-700" },
  RETURN: { label: "Trả thuốc", cls: "bg-amber-50 text-amber-700" },
};

export default function MedicineHistoryPage() {
  const [selected, setSelected] = useState<RequestItem | null>(null);

  const getProductName = (id: number) =>
    products.find((p) => p.id === id)?.name || "Unknown";

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Lịch sử yêu cầu thuốc
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Danh sách các yêu cầu lấy / trả thuốc
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          <div>Loại</div>
          <div>Mã yêu cầu</div>
          <div>Trạng thái</div>
          <div>Ngày tạo</div>
          <div className="text-center">Chi tiết</div>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {fakeRequests.map((req) => {
            const type = typeConfig[req.type];
            const status = statusConfig[req.status];
            return (
              <div
                key={req.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] items-center px-5 py-4 hover:bg-slate-50 transition"
              >
                {/* Type badge */}
                <div>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${type.cls}`}
                  >
                    {type.label}
                  </span>
                </div>

                {/* ID */}
                <div className="text-sm font-semibold text-slate-700">
                  {req.id}
                </div>

                {/* Status badge */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${status.cls}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                    {status.label}
                  </span>
                </div>

                {/* Date */}
                <div className="text-sm text-slate-400">{req.createdAt}</div>

                {/* Action */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setSelected(req)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition"
                  >
                    Xem
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-130 rounded-xl border border-slate-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-800">
                  {selected.id}
                </span>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${typeConfig[selected.type].cls}`}
                >
                  {typeConfig[selected.type].label}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${statusConfig[selected.status].cls}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {statusConfig[selected.status].label}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 hover:bg-slate-100 hover:text-slate-500 transition"
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="flex flex-col gap-2 p-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                Danh sách thuốc
              </p>
              {selected.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {getProductName(item.productId)}
                  </span>
                  <span className="rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    SL: {item.quantity}
                  </span>
                </div>
              ))}

              {selected.type === "RETURN" && selected.items[0]?.reason && (
                <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
                  <svg
                    width="14"
                    height="14"
                    className="mt-0.5 shrink-0 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                    />
                  </svg>
                  <p className="text-xs text-amber-700">
                    <span className="font-medium">Lý do: </span>
                    {selected.items[0].reason}
                  </p>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="border-t border-slate-100 px-6 py-4">
              <button
                onClick={() => setSelected(null)}
                className="w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
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
