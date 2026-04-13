import { useMemo, useState } from "react";
import { products as initialProducts } from "../../fakeDB";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export default function MedicinePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(initialProducts);

  // modal
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return products;

    return products.filter((p) =>
      `${p.id} ${p.name} ${p.description ?? ""}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [search, products]);

  const handleAdd = () => {
    if (!name.trim()) return;

    const newProduct = {
      id: Date.now(), // fake id
      name,
      description,
    };

    setProducts((prev) => [newProduct, ...prev]);

    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Danh sách thuốc
          </h1>
          <p className="text-sm text-gray-500 mt-1">Tìm kiếm, tra cứu thuốc</p>
        </div>

        {/* ✅ BUTTON CHỈ MANAGER */}
        {user?.role === "manager" && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
          >
            + Thêm thuốc
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-xl p-4 flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo ID, tên, mô tả..."
          className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />

        <div className="shrink-0 text-sm text-slate-500">
          Tổng: <b>{filteredProducts.length}</b> thuốc
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 bg-white border rounded-xl overflow-hidden">
        <div className="grid grid-cols-[120px_1.2fr_2.3fr] bg-slate-100 p-3 text-sm font-semibold text-slate-600">
          <div>ID</div>
          <div>Tên thuốc</div>
          <div>Mô tả</div>
        </div>

        <div className="overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              Không tìm thấy thuốc
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[120px_1.2fr_2.3fr] p-3 text-sm border-b hover:bg-slate-50"
              >
                <div className="font-medium text-slate-700">#{p.id}</div>
                <div className="text-slate-800 font-medium">{p.name}</div>
                <div className="text-slate-500">
                  {p.description ?? "Không có mô tả"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Thêm thuốc</h2>

            <div className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên thuốc"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm bg-slate-100 rounded-lg"
              >
                Hủy
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
