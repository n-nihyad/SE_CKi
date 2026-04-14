export default function MedicineCard() {
  return (
    <div className="w-79 h-66 flex flex-col items-center justify-center bg-gray-50 border border-blue-100 rounded-2xl">
      {/* IMAGE */}
      <img
        src="https://cobhpharmacy.ie/cdn/shop/files/panadol-original-500mg-film-coated-tablets-632292.jpg?v=1734049227"
        alt="Panadol"
        className="flex-1 max-h-38 max-w-full object-contain mt-3"
      />

      {/* CONTENT */}
      <div className="p-3">
        {/* NAME */}
        <h2 className="text-lg font-semibold text-gray-800">
          Paracetamol 500mg
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          Giảm đau, hạ sốt
        </p>
      </div>
    </div>
  );
}
