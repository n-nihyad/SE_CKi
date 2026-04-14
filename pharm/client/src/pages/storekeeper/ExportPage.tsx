import { useMemo, useState } from "react";

/* ================= TYPES ================= */

type RequestItem = {
  productId: number;
  productName: string;
  quantity: number;
};

type StockRequest = {
  id: number;
  status: "pending" | "approved" | "rejected";
  items: RequestItem[];
};

type Batch = {
  id: number;
  productId: number;
  batchCode: string;
  quantity: number;
  expiryDate: string;
};

type ExportItem = {
  batchId: number;
  batchCode: string;
  quantity: number;
  productId: number;
};

/* ================= MOCK DATA ================= */

const stockRequests: StockRequest[] = [
  {
    id: 1,
    status: "pending",
    items: [
      { productId: 1, productName: "Paracetamol 500mg", quantity: 120 },
      { productId: 2, productName: "Amoxicillin 250mg", quantity: 60 },
    ],
  },
  {
    id: 2,
    status: "pending",
    items: [{ productId: 3, productName: "Ibuprofen 400mg", quantity: 30 }],
  },
];

const batches: Batch[] = [
  {
    id: 1,
    productId: 1,
    batchCode: "PARA-A1",
    quantity: 40,
    expiryDate: "2026-04-20",
  },
  {
    id: 2,
    productId: 1,
    batchCode: "PARA-A2",
    quantity: 50,
    expiryDate: "2026-06-10",
  },
  {
    id: 3,
    productId: 2,
    batchCode: "AMOX-B1",
    quantity: 20,
    expiryDate: "2026-05-01",
  },
  {
    id: 4,
    productId: 3,
    batchCode: "IBU-C1",
    quantity: 10,
    expiryDate: "2026-03-01",
  },
];

/* ================= COMPONENT ================= */

export default function ExportPage() {
  const [selectedId, setSelectedId] = useState<number>(
    stockRequests[0]?.id ?? 0,
  );

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    stockRequests[0]?.items[0]?.productId ?? null,
  );

  const [exportItems, setExportItems] = useState<ExportItem[]>([]);

  const request = useMemo(
    () => stockRequests.find((r) => r.id === selectedId),
    [selectedId],
  );

  /* ================= FEFO ================= */

  const relatedBatches = useMemo(() => {
    if (!selectedProductId) return [];

    return batches
      .filter((b) => b.productId === selectedProductId)
      .filter((b) => b.quantity > 0)
      .sort(
        (a, b) =>
          new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
      );
  }, [selectedProductId]);

  const totalExport = exportItems.reduce((s, i) => s + i.quantity, 0);

  /* ================= ACTIONS ================= */

  const handleAdd = (b: Batch) => {
    setExportItems((prev) => {
      const existed = prev.find((i) => i.batchId === b.id);

      if (existed) {
        return prev.map((i) =>
          i.batchId === b.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [
        ...prev,
        {
          batchId: b.id,
          batchCode: b.batchCode,
          quantity: 1,
          productId: b.productId,
        },
      ];
    });
  };

  const handleIncrease = (id: number) =>
    setExportItems((prev) =>
      prev.map((i) =>
        i.batchId === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );

  const handleDecrease = (id: number) =>
    setExportItems((prev) =>
      prev
        .map((i) => (i.batchId === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );

  const handleRemove = (id: number) =>
    setExportItems((prev) => prev.filter((i) => i.batchId !== id));

  const handleSubmit = () => {
    if (!exportItems.length) return;
    alert("Xuất kho thành công!");
    setExportItems([]);
  };

  /* ================= UI ================= */

  return (
    <div className="flex h-full gap-5 p-4">
      {/* LEFT */}
      <div className="w-72 shrink-0 flex flex-col gap-2">
        <p className="text-2xl font-bold text-slate-700">Yêu cầu xuất</p>

        {stockRequests.map((r) => (
          <div
            key={r.id}
            onClick={() => {
              setSelectedId(r.id);
              setSelectedProductId(r.items[0]?.productId ?? null);
              setExportItems([]);
            }}
            className={`rounded-lg border p-3 cursor-pointer transition ${
              selectedId === r.id
                ? "bg-blue-50 border-blue-300"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-sm font-medium">Request #{r.id}</p>
            <p className="text-xs text-slate-400">
              {r.items.length} loại thuốc
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="flex-1 grid grid-cols-[1fr_380px] gap-5 min-w-0">
        {/* BATCH PANEL */}
        <div className="flex flex-col rounded-xl border bg-white overflow-hidden">
          {/* PRODUCTS */}
          <div className="flex gap-2 px-5 py-3 border-b overflow-x-auto whitespace-nowrap">
            {request?.items.map((item) => (
              <button
                key={item.productId}
                onClick={() => setSelectedProductId(item.productId)}
                className={`px-3 py-1 rounded-lg text-sm shrink-0 ${
                  selectedProductId === item.productId
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.productName}
              </button>
            ))}
          </div>

          {/* BATCHES */}
          <div className="flex-1 overflow-y-auto divide-y">
            {relatedBatches.length === 0 ? (
              <p className="text-center text-slate-300 py-10">
                Không có lô khả dụng
              </p>
            ) : (
              relatedBatches.map((b) => (
                <div
                  key={b.id}
                  className="px-5 py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{b.batchCode}</p>
                    <p className="text-xs text-slate-400">
                      HSD: {b.expiryDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-600">
                      {b.quantity}
                    </span>

                    <button
                      onClick={() => handleAdd(b)}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CART */}
        <div className="rounded-xl border bg-white flex flex-col">
          <div className="px-5 py-4 border-b flex justify-between">
            <p className="text-sm font-semibold">Danh sách xuất</p>

            {exportItems.length > 0 && (
              <button
                onClick={() => setExportItems([])}
                className="text-xs text-red-400"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto divide-y">
            {exportItems.length === 0 ? (
              <p className="text-center text-slate-300 py-10">Chưa chọn lô</p>
            ) : (
              exportItems.map((i) => (
                <div
                  key={i.batchId}
                  className="px-5 py-3 flex justify-between items-center"
                >
                  <p className="text-sm">{i.batchCode}</p>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDecrease(i.batchId)}>−</button>
                    <span>{i.quantity}</span>
                    <button onClick={() => handleIncrease(i.batchId)}>+</button>
                  </div>

                  <button
                    onClick={() => handleRemove(i.batchId)}
                    className="text-red-400"
                  >
                    x
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t px-5 py-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Tổng SL</span>
              <span className="font-bold">{totalExport}</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!exportItems.length}
              className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-slate-200"
            >
              Xác nhận xuất kho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
