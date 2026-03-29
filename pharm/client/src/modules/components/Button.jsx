import React from "react";

export default function Button({
  children,
  onClick,
  color = "blue",
  size = "md",
  disabled = false,
  className = "",
}) {
  // Tailwind class dựa trên color
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    gray: "bg-gray-400 hover:bg-gray-500 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
  };

  // Tailwind class dựa trên size
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colors[color]}
        ${sizes[size]}
        rounded
        font-semibold
        transition
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
