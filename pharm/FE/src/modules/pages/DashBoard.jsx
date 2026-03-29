export default function Dashboard() {
  return (
    <div className="flex gap-4 border h-full">
      <div className="bg-gray-100 rounded p-4 flex-1 flex-col">
        <h3 className="text-lg font-semibold">Kiểm kê</h3>
        <p>Nội dung kiểm kê...</p>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 flex items-center justify-center bg-red-500 text-white rounded p-4">
          Hàng cận date
        </div>
        <div className="flex-1 flex items-center justify-center bg-green-500 text-white rounded p-4">
          Tồn kho
        </div>
      </div>
    </div>
  );
}

// import { Outlet } from "react-router";

// export default function DashBoard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* will either be <Home/> or <Settings/> */}
//       <Outlet />
//     </div>
//   );
// }
