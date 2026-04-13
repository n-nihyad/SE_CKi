import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products, stockRequests } from "../fakeDB";
import type { RequestItem, StockRequest } from "../fakeDB";
import ProductSelector from "../../components/ProductSelector";
import QuantityStepper from "../../components/QuantityStepper";

export default function TakeMedicinePage() {
  const [productId, setProductId] = useState(products[0]?.id || 1);
  const [quantity, setQuantity] = useState(1);
  const [requestItems, setRequestItems] = useState<RequestItem[]>([]);

  const navigate = useNavigate();

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === productId),
    [productId],
  );

  const totalQuantity = requestItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // ✅ ADD ITEM TO CART
  const handleAddItem = () => {
    if (!selectedProduct || quantity <= 0) return;

    setRequestItems((prev) => {
      const existed = prev.find((i) => i.productId === productId);

      if (existed) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }

      return [
        ...prev,
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity,
        },
      ];
    });

    setQuantity(1);
  };

  // increase quantity in cart
  const handleIncrease = (id: number) =>
    setRequestItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  // decrease quantity in cart
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

  // remove item
  const handleRemove = (id: number) =>
    setRequestItems((prev) => prev.filter((item) => item.productId !== id));

  // submit request
  const handleSubmit = () => {
    if (requestItems.length === 0) return;

    const newRequest: StockRequest = {
      id: stockRequests.length + 1,
      type: "take",
      items: requestItems.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
      })),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    stockRequests.push(newRequest);

    alert("Đã gửi yêu cầu xuất kho!");

    navigate("/medicine-request");
  };

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Yêu cầu lấy thuốc
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Chọn thuốc và số lượng, gửi yêu cầu
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2">
          <span className="text-xs text-blue-400 font-medium">Mặt hàng</span>
          <span className="text-2xl font-bold text-blue-600 leading-none">
            {requestItems.length}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-[380px_1fr]">
        {/* LEFT */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-sm font-semibold text-slate-700">Thêm thuốc</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Mỗi yêu cầu có thể chứa nhiều loại.
            </p>
          </div>

          {/* PRODUCT */}
          <ProductSelector
            products={products}
            value={productId}
            onChange={setProductId}
          />

          {/* QUANTITY */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase">
              Số lượng
            </label>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={handleAddItem}
            className="mt-auto h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] transition"
          >
            + Thêm vào yêu cầu
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden">
          {/* HEADER */}
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
                className="text-xs text-red-400 hover:text-red-600"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto">
            {requestItems.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-slate-300">
                Chưa có thuốc nào
              </div>
            ) : (
              requestItems.map((item, i) => (
                <div
                  key={`${item.productId}-${i}`}
                  className="grid grid-cols-[1fr_80px_88px_56px] items-center px-5 py-3 border-b border-slate-100"
                >
                  <p className="text-sm font-medium text-slate-800">
                    {item.productName}
                  </p>

                  <p className="text-center text-sm font-bold text-blue-600">
                    {item.quantity}
                  </p>

                  <div className="flex justify-center gap-1.5">
                    <button
                      onClick={() => handleDecrease(item.productId)}
                      className="h-7 w-7 rounded-md border bg-slate-50"
                    >
                      −
                    </button>
                    <button
                      onClick={() => handleIncrease(item.productId)}
                      className="h-7 w-7 rounded-md border bg-slate-50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-slate-400">Tổng số lượng</span>
              <span className="text-lg font-bold text-slate-800">
                {totalQuantity}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={requestItems.length === 0}
              className="h-10 w-full rounded-lg bg-blue-600 text-white disabled:bg-slate-200"
            >
              Gửi yêu cầu xuất kho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
