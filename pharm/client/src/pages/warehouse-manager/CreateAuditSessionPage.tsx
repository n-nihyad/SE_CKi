import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

type AuditItem = {
  id: number;
  productName: string;
  batchName: string;
  systemQty: number;
  actualQty: number;
};

/* ================= MOCK ================= */

const mockItems: AuditItem[] = [
  {
    id: 1,
    productName: "Paracetamol",
    batchName: "PARA-2026-A1",
    systemQty: 120,
    actualQty: 120,
  },
  {
    id: 2,
    productName: "Amoxicillin",
    batchName: "AMOX-2025-B2",
    systemQty: 40,
    actualQty: 40,
  },
];

/* ================= PAGE ================= */

export default function CreateAuditSessionPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState<AuditItem[]>(mockItems);

  const handleChangeActual = (id: number, value: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, actualQty: value } : i)),
    );
  };

  const handleConfirm = () => {
    const newSession = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      items,
    };

    // 👉 lưu tạm vào localStorage (giống fake backend)
    const old = JSON.parse(localStorage.getItem("audit_sessions") || "[]");

    localStorage.setItem(
      "audit_sessions",
      JSON.stringify([newSession, ...old]),
    );

    // 👉 quay về list
    navigate("/audit");
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full bg-slate-50">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tạo đợt kiểm kê</h1>
          <p className="text-sm text-slate-500 mt-1">Nhập số lượng thực tế</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/audit")}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg"
          >
            ← Quay lại
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-5 bg-slate-100 p-3 text-sm font-semibold text-slate-600">
          <div>Thuốc</div>
          <div>Lô</div>
          <div>Hệ thống</div>
          <div>Thực tế</div>
          <div>Lệch</div>
        </div>

        {items.map((i) => {
          const diff = i.actualQty - i.systemQty;

          return (
            <div
              key={i.id}
              className="grid grid-cols-5 p-3 border-t items-center"
            >
              <div className="font-medium">{i.productName}</div>
              <div className="text-slate-500">{i.batchName}</div>
              <div className="font-semibold">{i.systemQty}</div>

              <input
                type="number"
                value={i.actualQty}
                onChange={(e) =>
                  handleChangeActual(i.id, Number(e.target.value))
                }
                className="border rounded px-2 py-1 w-24"
              />

              <div
                className={`font-bold ${
                  diff === 0
                    ? "text-green-600"
                    : diff > 0
                      ? "text-amber-600"
                      : "text-red-600"
                }`}
              >
                {diff > 0 ? `+${diff}` : diff}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
