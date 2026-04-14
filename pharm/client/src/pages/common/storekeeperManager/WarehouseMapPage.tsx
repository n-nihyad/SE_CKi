import { useState } from "react";

/* ===== TYPES ===== */
type Status = "safe" | "near" | "expired" | "empty";

interface ShelfCell {
  id: string;
  label: string;
  status: Status;
  special?: "miss";
}

interface Drug {
  name: string;
  batch: string;
  exp: string;
  status: Status;
  qty: string;
}

interface CellDetail {
  title: string;
  zone: string;
  lots: number;
  drugs: Drug[];
  alert?: boolean;
}

interface FloorData {
  cold: ShelfCell[];
  cool: ShelfCell[];
  special: ShelfCell[];
}

type Floor = "floor1" | "floor2" | "special";

/* ===== DATA ===== */
const FLOORS: Record<Floor, FloorData> = {
  floor1: {
    cold: [
      { id: "F1-C1", label: "C1", status: "safe" },
      { id: "F1-C2", label: "C2", status: "safe" },
      { id: "F1-C3", label: "C3", status: "near" },
      { id: "F1-C4", label: "C4", status: "safe" },
      { id: "F1-C5", label: "C5", status: "expired" },
      { id: "F1-C6", label: "C6", status: "safe" },
    ],
    cool: [
      { id: "F1-M1", label: "M1", status: "safe" },
      { id: "F1-M2", label: "M2", status: "safe" },
      { id: "F1-M3", label: "M3", status: "near" },
      { id: "F1-M5", label: "M5", status: "empty" },
      { id: "F1-M6", label: "M6", status: "safe" },
    ],
    special: [
      { id: "F1-S1", label: "Q1", status: "near" },
      { id: "F1-S2", label: "R1", status: "expired" },
      { id: "F1-S3", label: "H1", status: "safe" },
    ],
  },

  floor2: {
    cold: [
      { id: "F2-C1", label: "C1", status: "safe" },
      { id: "F2-C2", label: "C2", status: "safe" },
      { id: "F2-C3", label: "C3", status: "safe" },
      { id: "F2-C4", label: "C4", status: "near" },
    ],
    cool: [
      { id: "F2-M1", label: "M1", status: "safe" },
      { id: "F2-M2", label: "M2", status: "near" },
      { id: "F2-M3", label: "M3", status: "safe" },
      { id: "F2-M4", label: "M4", status: "safe" },
      { id: "F2-M5", label: "M5", status: "expired" },
      { id: "F2-M6", label: "M6", status: "safe" },
    ],
    special: [
      { id: "F2-S1", label: "Q1", status: "safe" },
      { id: "F2-S2", label: "R1", status: "near" },
      { id: "F2-S3", label: "H1", status: "expired" },
    ],
  },

  special: {
    cold: [
      { id: "F2-C1", label: "C1", status: "safe" },
      { id: "F2-C4", label: "C4", status: "near" },
    ],
    cool: [
      { id: "F2-M1", label: "M1", status: "safe" },
      { id: "F2-M2", label: "M2", status: "near" },
      { id: "F2-M3", label: "M3", status: "safe" },
    ],
    special: [{ id: "SP1", label: "QUAR", status: "near" }],
  },
};

const CELL_DETAILS: Record<string, CellDetail> = {
  "A1-1": {
    title: "A1-L1",
    zone: "KHO LẠNH",
    lots: 2,
    drugs: [
      {
        name: "Insulin Aspart",
        batch: "#AST2300",
        exp: "12/2025",
        status: "safe",
        qty: "Đủ",
      },
    ],
  },
};

/* ===== STYLE MAP ===== */
const statusStyle: Record<Status, string> = {
  safe: "bg-green-500",
  near: "bg-amber-500",
  expired: "bg-red-500",
  empty: "bg-gray-200 text-gray-500 border border-dashed",
};

/* ===== COMPONENT ===== */
export default function WarehouseMap() {
  const [floor, setFloor] = useState<Floor>("floor1");
  const [selected, setSelected] = useState<string | null>(null);

  const data = FLOORS[floor];

  const detail = selected ? CELL_DETAILS[selected] : null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* LEFT */}
      <div className="flex-1 flex flex-col gap-4 p-4 h-screen">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Sơ đồ Kho & Điều kiện Bảo quản
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Quản lý không gian lưu trữ và giám sát môi trường theo chuẩn GSP.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600 mb-4">
            {/* TRỐNG */}
            <div className="flex items-center text-sm gap-2">
              <span className="w-5 h-5 rounded bg-gray-300"></span>
              Kho trống
            </div>

            {/* SỬ DỤNG ĐƯỢC */}
            <div className="flex items-center text-sm gap-2">
              <span className="w-5 h-5 rounded bg-green-500"></span>
              Kho có thể sử dụng
            </div>

            {/* CẬN DATE */}
            <div className="flex items-center text-sm gap-2">
              <span className="w-5 h-5 rounded bg-yellow-400"></span>
              Thuốc cận date
            </div>

            {/* HẾT DATE / ĐẦY */}
            <div className="flex items-center text-sm gap-2">
              <span className="w-5 h-5 rounded bg-red-500"></span>
              Hết date / Kho đầy
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* TABS */}
          <div className="flex gap-3">
            {(["floor1", "floor2", "special"] as Floor[]).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFloor(f);
                  setSelected(null);
                }}
                className={`px-4 py-2 rounded-lg text-xl font-semibold transition
              ${
                floor === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
              >
                {f === "floor1"
                  ? "Tầng 1"
                  : f === "floor2"
                    ? "Tầng 2"
                    : "Đặc biệt"}
              </button>
            ))}
          </div>

          {/* KPI DASHBOARD */}
          <div className="flex-1 flex gap-2">
            {/* NHIỆT ĐỘ */}
            <div className="flex-1 flex flex-col bg-white rounded-xl border border-l-4 border-red-500 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl font-bold text-gray-500">KHO LẠNH</div>
                <span className="text-sm px-2 py-1 rounded-full bg-red-100 text-red-600 font-bold">
                  NGUY CẤP
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-3xl font-black text-gray-900">8.2°C</div>
                <div className="text-sm text-gray-500 mt-1">
                  Vượt ngưỡng cho phép (2–8°C)
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-white rounded-xl border border-l-4 border-blue-500 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl font-bold text-gray-500">
                  ĐỘ ẨM TRUNG BÌNH
                </div>
                <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-600 font-bold">
                  ỔN ĐỊNH
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-3xl font-black text-gray-900">54%</div>
                <div className="text-sm text-gray-500 mt-1">
                  Cập nhật 2 phút trước
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-white rounded-xl border border-l-4 border-green-500 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl font-bold text-gray-500">
                  HIỆU SUẤT SỬ DỤNG
                </div>
                <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-600 font-bold">
                  TỐT
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-3xl font-black text-gray-900">84.2%</div>
                <div className="w-full h-2 bg-gray-200 rounded mt-3">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: "84.2%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="flex-3 flex justify-between h-full bg-white rounded-xl shadow p-5">
            {/* COLD */}
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="text-xl font-bold mt-2 text-blue-600">
                KHO LẠNH
              </div>
              <div className="grid grid-cols-3 gap-10">
                {data.cold.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`
                    w-15 h-15 flex items-center justify-center
                    rounded-lg text-xs font-bold text-white cursor-pointer
                    transition hover:scale-110
                    ${statusStyle[c.status]}
                    ${c.special === "miss" ? "ring-2 ring-red-400" : ""}
                    ${selected === c.id ? "ring-2 ring-blue-500 scale-110" : ""}
                  `}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>

            {/* COOL */}
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="text-xl font-bold mb-2 text-green-600">
                KHO MÁT
              </div>
              <div className="grid grid-cols-3 gap-10">
                {data.cool.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`
                    w-15 h-15 flex items-center justify-center
                    rounded-lg text-xs font-bold cursor-pointer
                    transition hover:scale-110
                    ${statusStyle[c.status]}
                    ${selected === c.id ? "ring-2 ring-blue-500 scale-110" : ""}
                  `}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>

            {/* SPECIAL */}
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="text-xl font-bold mb-2 text-amber-600">
                ĐẶC BIỆT
              </div>
              <div className="grid grid-cols-3 gap-10">
                {data.special.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`
                    w-15 h-15 flex items-center justify-center
                    rounded-lg text-xs font-bold cursor-pointer
                    transition hover:scale-110
                    ${statusStyle[c.status]}
                    ${selected === c.id ? "ring-2 ring-blue-500 scale-110" : ""}
                  `}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80 bg-white border-l p-4">
        <div className="font-bold text-lg mb-2">
          {detail?.title || "Chưa chọn vị trí"}
        </div>

        {detail ? (
          <div className="space-y-2">
            {detail.drugs.map((d, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 border">
                <div className="font-semibold text-sm">{d.name}</div>
                <div className="text-xs text-gray-500">{d.batch}</div>
                <div className="text-xs text-gray-500">{d.exp}</div>
                <div
                  className={`text-xs mt-1 font-bold ${
                    d.status === "safe"
                      ? "text-green-600"
                      : d.status === "near"
                        ? "text-amber-600"
                        : "text-red-600"
                  }`}
                >
                  {d.qty}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            Chọn ô trong kho để xem chi tiết
          </div>
        )}
      </div>
    </div>
  );
}
