import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isRequestor = user?.role === "requestor";

  const statsTop = [
    {
      title: "Tổng mặt hàng",
      value: "120",
      sub: "SKU đang quản lý",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
          />
        </svg>
      ),
      iconBg: "bg-slate-100 text-slate-500",
      valueColor: "text-slate-800",
    },
    {
      title: "Giá trị tồn kho",
      value: "56,000,000",
      sub: "VND",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 14v-1m0-9v1m3 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      iconBg: "bg-blue-50 text-blue-500",
      valueColor: "text-blue-600",
    },
    {
      title: "Lô cận date",
      value: "8",
      sub: "lô hàng cần chú ý",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
          />
        </svg>
      ),
      iconBg: "bg-amber-50 text-amber-500",
      valueColor: "text-amber-600",
    },
  ];

  const statsBottom = !isRequestor
    ? [
        {
          title: "Lô hết hạn",
          value: "3",
          sub: "cần xử lý ngay",
          icon: (
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                d="M12 9v4m0 4h.01M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z"
              />
            </svg>
          ),
          iconBg: "bg-red-50 text-red-400",
          valueColor: "text-red-600",
          urgent: true,
        },
        {
          title: "Sức chứa kho",
          value: "80%",
          sub: "đang sử dụng",
          icon: (
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          ),
          iconBg: "bg-green-50 text-green-500",
          valueColor: "text-green-600",
          progress: 80,
        },
      ]
    : [];

  const hasBottom = statsBottom.length > 0;

  return (
    <div className="flex h-full w-full flex-col gap-4 p-6">
      {/* greeting */}
      <div className="shrink-0">
        <h1 className="text-lg font-semibold text-slate-800">Tổng quan kho</h1>
        <p className="text-sm text-slate-400">Cập nhật theo thời gian thực</p>
      </div>

      {/* top stats — flex-1 nếu không có bottom, không thì cố định */}
      <div
        className={`grid grid-cols-3 gap-4 ${hasBottom ? "flex-1" : "flex-1"}`}
      >
        {statsTop.map((s) => (
          <div
            key={s.title}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {s.title}
              </span>
              <div className={`rounded-lg p-2 ${s.iconBg}`}>{s.icon}</div>
            </div>
            <div>
              <p className={`text-4xl font-bold leading-none ${s.valueColor}`}>
                {s.value}
              </p>
              <p className="mt-2 text-xs text-slate-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* bottom stats */}
      {hasBottom && (
        <div className="grid grid-cols-2 gap-4 flex-1">
          {statsBottom.map((s) => (
            <div
              key={s.title}
              className={`flex flex-col justify-between rounded-xl border bg-white p-6 ${
                s.urgent ? "border-red-100" : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {s.title}
                </span>
                <div className={`rounded-lg p-2 ${s.iconBg}`}>{s.icon}</div>
              </div>
              <div>
                <p
                  className={`text-4xl font-bold leading-none ${s.valueColor}`}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-xs text-slate-400">{s.sub}</p>
              </div>
              {"progress" in s && typeof s.progress === "number" && (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-green-400 transition-all duration-500"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              )}
              {s.urgent && (
                <div className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  <span className="text-xs font-medium text-red-500">
                    Cần xử lý ngay
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
