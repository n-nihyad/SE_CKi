import { useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  role: "requestor" | "storekeeper" | "warehouse_manager";
  phone: string;
  department: string;
};

const fakeUser: UserProfile = {
  name: "Nguyễn Văn A",
  email: "a@example.com",
  role: "storekeeper",
  phone: "0901234567",
  department: "Kho thuốc",
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(fakeUser);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<UserProfile>(user);

  const handleSave = () => {
    setUser(form);
    setEditMode(false);
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Thông tin cá nhân
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Xem và cập nhật thông tin tài khoản
          </p>
        </div>

        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="flex-1 bg-white border rounded-xl p-6 flex flex-col gap-4">
        {/* NAME */}
        <div>
          <label className="text-xs text-slate-400">Họ tên</label>
          {editMode ? (
            <input
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          ) : (
            <p className="text-sm font-medium text-slate-800">{user.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-xs text-slate-400">Email</label>
          <p className="text-sm text-slate-700">{user.email}</p>
        </div>

        {/* PHONE */}
        <div>
          <label className="text-xs text-slate-400">Số điện thoại</label>
          {editMode ? (
            <input
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          ) : (
            <p className="text-sm text-slate-700">{user.phone}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="text-xs text-slate-400">Vai trò</label>
          <p className="text-sm font-medium text-blue-600">{user.role}</p>
        </div>

        {/* DEPARTMENT */}
        <div>
          <label className="text-xs text-slate-400">Phòng ban</label>
          {editMode ? (
            <input
              className="w-full border p-2 rounded"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          ) : (
            <p className="text-sm text-slate-700">{user.department}</p>
          )}
        </div>

        {/* ACTION */}
        {editMode && (
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setEditMode(false)}
              className="px-3 py-1 text-sm border rounded"
            >
              Hủy
            </button>

            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
            >
              Lưu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
