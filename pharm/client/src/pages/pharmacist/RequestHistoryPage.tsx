import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stockRequests } from "../fakeDB";
import type { StockRequest } from "../fakeDB";

type FilterStatus = "ALL" | StockRequest["status"];
type FilterType = "ALL" | "take" | "return";

export default function MedicineHistoryPage() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<StockRequest | null>(null);

  const [filterType, setFilterType] = useState<FilterType>("ALL");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [filterDate, setFilterDate] = useState("");

  const [requests] = useState<StockRequest[]>(stockRequests);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchType = filterType === "ALL" || r.type === filterType;
      const matchStatus = filterStatus === "ALL" || r.status === filterStatus;
      const matchDate = !filterDate || r.createdAt === filterDate;

      return matchType && matchStatus && matchDate;
    });
  }, [requests, filterType, filterStatus, filterDate]);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Yêu cầu lấy thuốc
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Lịch sử yêu cầu và tạo yêu cầu
          </p>
        </div>

        {/* ✅ NAVIGATE TO CREATE PAGE */}
        <button
          onClick={() => navigate("/medicine-request/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Tạo yêu cầu
        </button>
      </div>

      {/* FILTER */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4">
        <div className="flex gap-3 items-center">
          {/* STATUS */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="approved">Hoàn tất</option>
            <option value="rejected">Từ chối</option>
          </select>

          {/* DATE */}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          {/* RESET */}
          <button
            onClick={() => {
              setFilterType("ALL");
              setFilterStatus("ALL");
              setFilterDate("");
            }}
            className="text-sm text-slate-500 hover:text-black"
          >
            Reset
          </button>
        </div>

        {/* TOTAL */}
        <div className="text-right">
          <p className="text-xs text-slate-400">Tổng yêu cầu</p>
          <p className="text-xl font-bold text-slate-800">{filtered.length}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 bg-white border rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 bg-slate-100 p-3 text-sm font-semibold text-slate-600">
          <div>Mã yêu cầu</div>
          <div>Loại</div>
          <div>Số loại thuốc</div>
          <div>Trạng thái</div>
          <div>Ngày tạo</div>
          <div className="text-right">Hành động</div>
        </div>

        <div className="overflow-y-auto h-full">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              Không có dữ liệu
            </div>
          ) : (
            filtered.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-6 p-3 text-sm border-b items-center hover:bg-slate-50"
              >
                {/* ID */}
                <div className="font-semibold text-slate-700">#{r.id}</div>

                {/* TYPE */}
                <div>{r.type === "take" ? "Lấy thuốc" : "Trả thuốc"}</div>

                {/* COUNT */}
                <div>{r.items.length}</div>

                {/* STATUS */}
                <div>
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      r.status === "approved"
                        ? "bg-green-50 text-green-600"
                        : r.status === "pending"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                {/* DATE */}
                <div className="text-slate-500">{r.createdAt}</div>

                {/* ACTION */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelected(r)}
                    className="px-3 py-1 text-xs rounded-lg bg-slate-900 text-white"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">
              Chi tiết yêu cầu #{selected.id}
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <b>Loại:</b>{" "}
                {selected.type === "take" ? "Lấy thuốc" : "Trả thuốc"}
              </p>

              <p>
                <b>Trạng thái:</b> {selected.status}
              </p>

              <div>
                <b>Danh sách thuốc:</b>
                <ul className="mt-2 space-y-1">
                  {selected.items.length === 0 ? (
                    <li className="text-slate-400">Không có dữ liệu</li>
                  ) : (
                    selected.items.map((i) => (
                      <li key={i.productId}>
                        • {i.productName} - {i.quantity}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
