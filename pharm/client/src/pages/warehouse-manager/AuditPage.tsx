import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

type AuditItem = {
  id: number;
  productName: string;
  batchName: string;
  systemQty: number;
  actualQty: number;
};

type AuditSession = {
  id: number;
  createdAt: string;
  items: AuditItem[];
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
    actualQty: 35,
  },
];

const initialSessions: AuditSession[] = [
  {
    id: 1,
    createdAt: "2026-04-10 10:00",
    items: mockItems,
  },
];

/* ================= PAGE ================= */

export default function StockAuditPage() {
  const [sessions, setSessions] = useState<AuditSession[]>(initialSessions);
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<AuditSession | null>(
    null,
  );
  const [mode, setMode] = useState<"list" | "audit" | "report">("list");

  /* ===== FILTER ===== */
  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const date = new Date(s.createdAt);

      const matchFrom = !filters.from || date >= new Date(filters.from);
      const matchTo = !filters.to || date <= new Date(filters.to);

      return matchFrom && matchTo;
    });
  }, [sessions, filters]);

  /* ================= AUDIT ================= */

  const handleChangeActual = (id: number, value: number) => {
    if (!selectedSession) return;

    setSelectedSession({
      ...selectedSession,
      items: selectedSession.items.map((i) =>
        i.id === id ? { ...i, actualQty: value } : i,
      ),
    });
  };

  const handleConfirm = () => {
    if (!selectedSession) return;

    setSessions((prev) =>
      prev.map((s) => (s.id === selectedSession.id ? selectedSession : s)),
    );

    setSelectedSession(null); // reset luôn cho sạch state
    setMode("list"); // 🔥 quay về danh sách
  };

  /* ================= CALC ================= */

  const totalDiff =
    selectedSession?.items.reduce(
      (sum, i) => sum + (i.actualQty - i.systemQty),
      0,
    ) || 0;

  const totalItemsDiff =
    selectedSession?.items.filter((i) => i.actualQty !== i.systemQty).length ||
    0;

  /* ================= LIST VIEW ================= */

  if (mode === "list") {
    return (
      <div className="flex flex-col gap-6 p-6 h-full bg-slate-50">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Kiểm kê kho</h1>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý các đợt kiểm kê
            </p>
          </div>

          <button
            onClick={() => navigate("/audit/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Tạo đợt kiểm kê
          </button>
        </div>

        {/* FILTER */}
        <div className="flex gap-3 bg-white p-4 rounded-xl border items-center shadow-sm">
          <input
            type="date"
            className="border p-2 rounded"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />

          <span className="text-slate-400">→</span>

          <input
            type="date"
            className="border p-2 rounded"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />

          <button
            onClick={() => setFilters({ from: "", to: "" })}
            className="text-sm text-slate-500 hover:underline"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 bg-slate-100 p-3 text-sm font-semibold text-slate-600">
            <div>ID</div>
            <div>Thời gian</div>
            <div></div>
          </div>

          {filteredSessions.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                setSelectedSession(s);
                setMode("report");
              }}
              className="grid grid-cols-3 p-3 border-t items-center cursor-pointer hover:bg-slate-50"
            >
              <div className="font-medium">{s.id}</div>
              <div>{s.createdAt}</div>
              <div className="text-blue-600 text-sm text-right">Xem →</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= DETAIL ================= */

  return (
    <div className="flex flex-col gap-6 p-6 h-full bg-slate-50">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {mode === "audit" ? "Kiểm kê kho" : "Báo cáo kiểm kê"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {selectedSession?.createdAt}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("list")}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg"
          >
            ← Quay lại
          </button>

          {mode === "audit" && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      {mode === "report" && (
        <div className="bg-white border rounded-xl p-4 flex gap-10 shadow-sm">
          <div>
            <p className="text-xs text-slate-400">Số lô lệch</p>
            <p className="text-lg font-bold text-red-500">{totalItemsDiff}</p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Tổng lệch</p>
            <p className="text-lg font-bold text-amber-600">{totalDiff}</p>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden flex-1 shadow-sm">
        <div className="grid grid-cols-5 bg-slate-100 p-3 text-sm font-semibold text-slate-600">
          <div>Thuốc</div>
          <div>Lô</div>
          <div>Hệ thống</div>
          <div>Thực tế</div>
          <div>Lệch</div>
        </div>

        <div className="overflow-y-auto">
          {selectedSession?.items.map((i) => {
            const diff = i.actualQty - i.systemQty;

            return (
              <div
                key={i.id}
                className="grid grid-cols-5 p-3 border-t items-center hover:bg-slate-50"
              >
                <div className="font-medium">{i.productName}</div>
                <div className="text-slate-500">{i.batchName}</div>
                <div className="font-semibold">{i.systemQty}</div>

                <div>
                  {mode === "audit" ? (
                    <input
                      type="number"
                      value={i.actualQty}
                      onChange={(e) =>
                        handleChangeActual(i.id, Number(e.target.value))
                      }
                      className="border rounded px-2 py-1 w-24"
                    />
                  ) : (
                    <span className="font-semibold">{i.actualQty}</span>
                  )}
                </div>

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
    </div>
  );
}
