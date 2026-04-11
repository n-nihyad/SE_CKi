import { useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  role: "requestor" | "storekeeper" | "warehouse_manager";
  phone: string;
  address: string;
};

const fakeUser: UserProfile = {
  name: "Nguyễn Văn A",
  email: "a@example.com",
  role: "storekeeper",
  phone: "0901234567",
  address: "Phường X, Quận Y",
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(fakeUser);
  const [form, setForm] = useState<UserProfile>(user);

  const handleSave = () => {
    setUser(form);
    alert("Cập nhật thành công!");
  };

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.newPassword) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirm) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    alert("Đổi mật khẩu thành công!");

    setPasswordForm({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  return (
    <div className="flex flex-col gap-4 h-screen p-4">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Thông tin cá nhân
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Xem và cập nhật thông tin tài khoản
        </p>
      </div>

      <div className="flex flex-col flex-1 gap-2">
        {/* PROFILE CARD */}
        <div className="flex-1 bg-white border rounded-xl p-6 flex flex-col gap-3">
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-2xl text-slate-400">Họ tên</label>
            <input
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* EMAIL (thường không cho sửa) */}
          <div className="flex flex-col gap-2">
            <label className="text-2xl text-slate-400">Email</label>
            <input
              disabled
              className="w-full border p-2 rounded bg-gray-100"
              value={form.email}
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-2">
            <label className="text-2xl text-slate-400">Số điện thoại</label>
            <input
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-2">
            <label className="text-2xl text-slate-400">Vai trò</label>
            <input
              disabled
              className="w-full p-2 rounded bg-gray-100 text-blue-600"
              value={form.role}
            />
          </div>

          {/* address */}
          <div className="flex flex-col gap-2">
            <label className="text-2xl text-slate-400">Địa chỉ</label>
            <input
              className="w-full border p-2 rounded"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white border rounded-xl p-6 flex flex-col gap-10">
          <div className="pt-4 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Đổi mật khẩu
            </h2>

            {/* Current */}
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              className="border p-2 rounded"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current: e.target.value })
              }
            />

            {/* New */}
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="border p-2 rounded"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
            />

            {/* Confirm */}
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="border p-2 rounded"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirm: e.target.value })
              }
            />

            <div className="flex justify-end">
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
