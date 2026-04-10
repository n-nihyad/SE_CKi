import { useMemo, useState } from "react";
import { products } from "../fakeDB";

type ReturnItem = {
  productId: number;
  productName: string;
  quantity: number;
  reason: string;
};

export default function ReturnMedicinePage() {
  const [productId, setProductId] = useState(products[0]?.id || 1);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  const totalQuantity = returnItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // ✅ FIX LOGIC ADD (KHÔNG PHÁ UI)
  const handleAddItem = () => {
    if (!selectedProduct) return;

    setReturnItems((prev) => {
      const existed = prev.find((i) => i.productId === productId);

      if (existed) {
        return prev.map((i) =>
          i.productId === productId
            ? {
                ...i,
                quantity: i.quantity + quantity,
                reason: reason || i.reason,
              }
            : i,
        );
      }

      return [
        ...prev,
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity,
          reason: reason || "Không có lý do",
        },
      ];
    });

    setQuantity(1);
    setReason("");
  };

  const handleRemove = (id: number) => {
    setReturnItems((prev) => prev.filter((item) => item.productId !== id));
  };

  const handleSubmit = () => {
    if (returnItems.length === 0) return;

    console.log("RETURN REQUEST:", returnItems);

    alert("Đã gửi yêu cầu trả thuốc!");

    setReturnItems([]);
    setQuantity(1);
    setReason("");
    setProductId(products[0]?.id || 1);
  };

  return (
    <div className="flex h-full flex-col gap-5 p-1">
      {/* HEADER (GIỮ NGUYÊN UI) */}
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Trả thuốc</h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Chọn thuốc, số lượng và lý do trả trước khi gửi yêu cầu.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-4 py-2">
          <span className="text-xs text-amber-400 font-medium">Loại thuốc</span>
          <span className="text-2xl font-bold text-amber-600 leading-none">
            {returnItems.length}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-[380px_1fr]">
        {/* LEFT FORM */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-sm font-semibold text-slate-700">
              Thêm thuốc cần trả
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              Mỗi yêu cầu có thể chứa nhiều loại.
            </p>
          </div>

          {/* PRODUCT */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Loại thuốc
            </label>

            <select
              value={productId}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* QUANTITY */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Số lượng
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50"
              >
                −
              </button>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-10 flex-1 rounded-lg border border-slate-200 bg-slate-50 text-center"
              />

              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50"
              >
                +
              </button>
            </div>
          </div>

          {/* REASON */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Lý do trả thuốc
            </label>

            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
              placeholder="Ví dụ: Dùng không hết..."
            />
          </div>

          <button
            onClick={handleAddItem}
            className="mt-auto h-10 w-full rounded-lg bg-amber-500 text-sm font-semibold text-white hover:bg-amber-600"
          >
            + Thêm vào danh sách trả
          </button>
        </div>

        {/* RIGHT LIST */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Danh sách thuốc trả
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Kiểm tra lại trước khi gửi.
              </p>
            </div>

            {returnItems.length > 0 && (
              <button
                onClick={() => setReturnItems([])}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {returnItems.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-slate-300">
                Chưa có thuốc nào cần trả
              </div>
            ) : (
              returnItems.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-[1fr_64px_1.4fr_48px] items-center px-5 py-3"
                >
                  <p className="text-sm font-medium text-slate-800">
                    {item.productName}
                  </p>

                  <p className="text-center text-sm font-bold text-amber-600">
                    {item.quantity}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.reason}
                  </p>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">Tổng số lượng trả</span>
              <span className="text-lg font-bold text-slate-800">
                {totalQuantity}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={returnItems.length === 0}
              className="h-10 w-full rounded-lg bg-amber-500 text-sm font-semibold text-white disabled:bg-slate-200"
            >
              Gửi yêu cầu trả thuốc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
