import { useState } from "react";

export default function ExportFIFO() {
  const [keyword, setKeyword] = useState("");

  const mockData = [
    { lot: "L001", exp: "2026-04-01", qty: 100, location: "A1" },
    { lot: "L002", exp: "2026-06-01", qty: 200, location: "B1" },
  ];

  return (
    <div>
      <h2>Xuất kho (FIFO / FEFO)</h2>

      <input
        placeholder="Nhập mã thuốc..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Lô</th>
            <th>Hạn</th>
            <th>Số lượng</th>
            <th>Vị trí</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {mockData.map((item, index) => (
            <tr key={index}>
              <td>{item.lot}</td>
              <td>{item.exp}</td>
              <td>{item.qty}</td>
              <td>{item.location}</td>
              <td>
                <button>Xuất</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
