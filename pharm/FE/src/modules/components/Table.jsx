export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
      <table className="min-w-full text-sm text-left">
        {/* Header */}
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
