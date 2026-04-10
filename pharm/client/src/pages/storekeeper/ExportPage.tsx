import { useState } from "react";
import { stockRequests, batches } from "../fakeDB";

function daysUntil(dateStr: string) {
  return Math.round((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

function expBorderClass(days: number) {
  if (days < 90) return "border-l-4 border-l-red-400";
  if (days < 365) return "border-l-4 border-l-amber-400";
  return "border-l-4 border-l-green-400";
}

function expChip(days: number) {
  if (days < 90)
    return (
      <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-700">
        Còn {days} ngày
      </span>
    );
  if (days < 365)
    return (
      <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-700">
        Còn {Math.round(days / 30)} tháng
      </span>
    );
  return (
    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
      Còn {(days / 365).toFixed(1)} năm
    </span>
  );
}

export default function ExportPage() {
  const [selectedId, setSelectedId] = useState(stockRequests[0]?.id);

  const request = stockRequests.find((r) => r.id === selectedId);

  const relatedBatches = request
    ? batches
        .filter((b) => b.productId === request.productId)
        .filter((b) => b.quantity > 0)
        .filter((b) => new Date(b.expiryDate) > new Date())
        .sort(
          (a, b) =>
            new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
        )
    : [];

  const totalAvail = relatedBatches.reduce((s, b) => s + b.quantity, 0);
  const fulfillPct = request
    ? Math.min(100, Math.round((totalAvail / request.quantity) * 100))
    : 0;

  return (
    <div className="flex gap-4 h-full p-1">
      {/* SIDEBAR */}
      <div className="w-64 shrink-0 flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-400 px-1 pb-2 border-b border-slate-100">
          Danh sách yêu cầu
        </p>

        {stockRequests.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelectedId(r.id)}
            className={`rounded-lg border p-3 cursor-pointer transition-all ${
              selectedId === r.id
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                selectedId === r.id ? "text-blue-700" : "text-slate-800"
              }`}
            >
              {r.productName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">SL: {r.quantity}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                Chờ xuất
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">
              {request?.productName ?? "—"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Gợi ý xuất kho theo FEFO
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-wide px-2 py-1 rounded bg-blue-50 text-blue-600">
              ● FEFO
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
              Cần xuất
              <span className="text-base font-semibold text-slate-800">
                {request?.quantity ?? "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Progress summary */}
        {request && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-400">Tổng tồn kho khả dụng</p>
              <p className="text-sm font-medium text-slate-700">
                {totalAvail} đơn vị
              </p>
            </div>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${fulfillPct}%` }}
              />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Đáp ứng</p>
              <p className="text-sm font-medium text-slate-700">
                {fulfillPct}%
              </p>
            </div>
          </div>
        )}

        {/* Batch list */}
        <div className="flex flex-col gap-2">
          {relatedBatches.length === 0 && (
            <div className="text-center text-sm text-slate-400 py-10">
              Không có lô hàng khả dụng
            </div>
          )}

          {relatedBatches.map((b, i) => {
            const days = daysUntil(b.expiryDate);
            return (
              <div
                key={b.id}
                className={`bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center gap-3 ${expBorderClass(days)}`}
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400 shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    {b.batchCode}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    HSD: {new Date(b.expiryDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                {expChip(days)}
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">
                    {b.quantity}
                  </p>
                  <p className="text-xs text-slate-400">đơn vị</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
