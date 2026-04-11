import { useMemo, useState } from "react";
import { products, stockRequests, type StockRequest } from "../fakeDB";

type RequestItem = {
  productId: number;
  productName: string;
  quantity: number;
};

export default function TakeMedicinePage() {
  const [productId, setProductId] = useState(products[0]?.id || 1);
  const [quantity, setQuantity] = useState(1);
  const [requestItems, setRequestItems] = useState<RequestItem[]>([]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  const totalQuantity = requestItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleAddItem = () => {
    if (!selectedProduct || quantity <= 0) return;
    const existed = requestItems.find(
      (item) => item.productId === selectedProduct.id,
    );
    if (existed) {
      setRequestItems((prev) =>
        prev.map((item) =>
          item.productId === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setRequestItems((prev) => [
        ...prev,
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity,
        },
      ]);
    }
    setQuantity(1);
  };

  const handleIncrease = (id: number) =>
    setRequestItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const handleDecrease = (id: number) =>
    setRequestItems((prev) =>
      prev
        .map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );

  const handleRemove = (id: number) =>
    setRequestItems((prev) => prev.filter((item) => item.productId !== id));

  const handleSubmit = () => {
    if (requestItems.length === 0) return;

    const newRequest: StockRequest = {
      id: stockRequests.length + 1,
      items: requestItems.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
      })),
      status: "pending",
    };

    stockRequests.push(newRequest);

    alert("Đã gửi yêu cầu xuất kho!");

    setRequestItems([]);
    setQuantity(1);
    setProductId(products[0]?.id || 1);
  };

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Yêu cầu xuất kho
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Chọn thuốc và số lượng — hệ thống tự ưu tiên lô theo FEFO.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2">
          <span className="text-xs text-blue-400 font-medium">Mặt hàng</span>
          <span className="text-2xl font-bold text-blue-600 leading-none">
            {requestItems.length}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-[380px_1fr]">
        {/* ── Left: Add form ── */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-sm font-semibold text-slate-700">Thêm thuốc</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Mỗi yêu cầu có thể chứa nhiều loại.
            </p>
          </div>

          {/* Product select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Loại thuốc
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Số lượng
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 active:scale-95 transition"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-10 flex-1 rounded-lg border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 active:scale-95 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddItem}
            className="mt-auto h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] transition"
          >
            + Thêm vào yêu cầu
          </button>
        </div>

        {/* ── Right: Cart ── */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden">
          {/* Cart header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Danh sách thuốc yêu cầu
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Kiểm tra lại trước khi gửi.
              </p>
            </div>
            {requestItems.length > 0 && (
              <button
                onClick={() => setRequestItems([])}
                className="text-xs text-red-400 hover:text-red-600 transition"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {/* Column labels */}
          <div className="grid grid-cols-[1fr_80px_88px_56px] border-b border-slate-100 bg-slate-50 px-5 py-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
            <div>Thuốc</div>
            <div className="text-center">SL</div>
            <div className="text-center">Điều chỉnh</div>
            <div className="text-center">Xóa</div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {requestItems.length === 0 ? (
              <div className="flex h-48 flex-col items-center justify-center gap-2 text-slate-300">
                <svg
                  width="36"
                  height="36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2"
                  />
                </svg>
                <p className="text-sm">Chưa có thuốc nào</p>
              </div>
            ) : (
              requestItems.map((item, i) => (
                <div
                  key={item.productId}
                  className={`grid grid-cols-[1fr_80px_88px_56px] items-center px-5 py-3 ${
                    i !== requestItems.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {item.productName}
                    </p>
                  </div>

                  <div className="text-center text-sm font-bold text-blue-600">
                    {item.quantity}
                  </div>

                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => handleDecrease(item.productId)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 active:scale-95 transition text-sm"
                    >
                      −
                    </button>
                    <button
                      onClick={() => handleIncrease(item.productId)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 active:scale-95 transition text-sm"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 hover:bg-red-50 hover:text-red-400 transition"
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
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">Tổng số lượng</span>
              <span className="text-lg font-bold text-slate-800">
                {totalQuantity}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={requestItems.length === 0}
              className="h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              Gửi yêu cầu xuất kho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
