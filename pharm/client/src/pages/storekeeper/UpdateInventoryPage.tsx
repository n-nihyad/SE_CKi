export default function UpdateInventoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Cập nhật thông tin kho</h1>

      <div className="mt-4 grid gap-4">
        <input className="border p-2" placeholder="Mã lô" />
        <input className="border p-2" placeholder="Tên thuốc" />
        <input className="border p-2" placeholder="Số lượng" />
        <input className="border p-2" placeholder="Hạn sử dụng" />
        <input className="border p-2" placeholder="Vị trí kho" />

        <button className="bg-blue-600 text-white p-2">Cập nhật</button>
      </div>
    </div>
  );
}
