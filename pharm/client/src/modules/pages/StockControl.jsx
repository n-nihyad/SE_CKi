import { useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Search from "../components/Search";

export default function StockControl() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState(""); // 🔥 thêm state search

  // 🧩 Columns
  const columns = [
    { header: "Tên thuốc", accessor: "name" },
    { header: "Số lượng", accessor: "quantity" },
    { header: "HSD", accessor: "expiry" },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value === "Cận date"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // 🧩 Data
  const data = [
    {
      name: "Paracetamol",
      quantity: 100,
      expiry: "2026-05-01",
      status: "Còn hạn",
    },
    {
      name: "Vitamin C",
      quantity: 50,
      expiry: "2024-04-01",
      status: "Cận date",
    },
  ];

  // 🔥 Filter data
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Min / Max</h2>

      {/* 🔍 Search */}
      <div className="mb-4 flex justify-between items-center">
        <Search placeholder="Tìm tên thuốc..." onSearch={setKeyword} />

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Thêm
        </button>
      </div>

      {/* Table */}
      <Table columns={columns} data={filteredData} />

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Thêm thuốc">
        <input className="border p-2 w-full mb-3" placeholder="Tên thuốc" />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </Modal>
    </div>
  );
}
