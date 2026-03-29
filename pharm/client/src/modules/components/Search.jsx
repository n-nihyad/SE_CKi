import { useState } from "react";

export default function Search({ onSearch, placeholder = "Search..." }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val); // gọi ra ngoài
  };

  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
