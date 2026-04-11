import { useState } from "react";

/* ================= FAKE DATA ================= */

type StockItem = {
  productName: string;
  batchName: string;
  quantity: number;
  expiryDate: string;
  status: "safe" | "near_date" | "expired";
};

const fakeStock: StockItem[] = [
  {
    productName: "Paracetamol",
    batchName: "PARA-2026-A1",
    quantity: 120,
    expiryDate: "2026-06-10",
    status: "safe",
  },
  {
    productName: "Amoxicillin",
    batchName: "AMOX-2025-B2",
    quantity: 40,
    expiryDate: "2026-04-20",
    status: "near_date",
  },
  {
    productName: "Ibuprofen",
    batchName: "IBU-2025-C3",
    quantity: 0,
    expiryDate: "2025-12-01",
    status: "expired",
  },
];

/* ================= PAGE ================= */

export default function ReportPage() {
  const [stock] = useState<StockItem[]>(fakeStock);

  /* ===== STATS ===== */
  const totalItems = stock.reduce((sum, i) => sum + i.quantity, 0);

  const safeCount = stock.filter((i) => i.status === "safe").length;
  const nearCount = stock.filter((i) => i.status === "near_date").length;
  const expiredCount = stock.filter((i) => i.status === "expired").length;

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Báo cáo & Kiểm kê kho
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Thống kê tình trạng thuốc trong kho
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-400">Tổng số lượng</p>
          <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-400">An toàn</p>
          <p className="text-2xl font-bold text-green-600">{safeCount}</p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-400">Gần hết hạn</p>
          <p className="text-2xl font-bold text-amber-600">{nearCount}</p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-400">Hết hạn</p>
          <p className="text-2xl font-bold text-red-500">{expiredCount}</p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-5 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-400 uppercase">
          <div>Thuốc</div>
          <div>Lô</div>
          <div className="text-center">Số lượng</div>
          <div>Hạn dùng</div>
          <div>Trạng thái</div>
        </div>

        {/* BODY */}
        <div className="divide-y divide-slate-100">
          {stock.map((item, i) => (
            <div key={i} className="grid grid-cols-5 items-center px-5 py-4">
              <div className="text-sm font-medium text-slate-800">
                {item.productName}
              </div>

              <div className="text-sm text-slate-500">{item.batchName}</div>

              <div className="text-center font-semibold text-slate-700">
                {item.quantity}
              </div>

              <div className="text-sm text-slate-500">{item.expiryDate}</div>

              <div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    item.status === "safe"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : item.status === "near_date"
                        ? "bg-amber-50 text-amber-600 border-amber-200"
                        : "bg-red-50 text-red-500 border-red-200"
                  }`}
                >
                  {item.status === "safe"
                    ? "An toàn"
                    : item.status === "near_date"
                      ? "Gần hết hạn"
                      : "Hết hạn"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= NOTE ================= */}
      <div className="text-xs text-slate-400">
        * Dùng cho: kiểm kê định kỳ / báo cáo tồn kho / cảnh báo thuốc hết hạn
      </div>
    </div>
  );
}
