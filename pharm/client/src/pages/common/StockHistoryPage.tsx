const fakeHistory = [
  {
    id: 1,
    type: "IMPORT",
    product: "Paracetamol",
    quantity: 100,
    date: "2026-04-10",
  },
  {
    id: 2,
    type: "EXPORT",
    product: "Amoxicillin",
    quantity: 20,
    date: "2026-04-09",
  },
];

export default function StockHistoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Lịch sử xuất / nhập kho</h1>

      <div className="mt-4 border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-slate-100 p-2 font-semibold">
          <div>Loại</div>
          <div>Thuốc</div>
          <div>Số lượng</div>
          <div>Ngày</div>
        </div>

        {fakeHistory.map((item) => (
          <div key={item.id} className="grid grid-cols-4 p-2 border-t">
            <div
              className={
                item.type === "IMPORT" ? "text-green-600" : "text-red-500"
              }
            >
              {item.type}
            </div>
            <div>{item.product}</div>
            <div>{item.quantity}</div>
            <div>{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
