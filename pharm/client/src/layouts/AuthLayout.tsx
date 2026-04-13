import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import bg1 from "../assets/images/slide1.jpg";
import bg2 from "../assets/images/slide2.jpg";
import bg3 from "../assets/images/slide3.jpg";
import bg4 from "../assets/images/slide4.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4];

export default function AuthLayout() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left */}
      <div className="relative hidden md:block md:w-3/5 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="background"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {backgroundImages.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">HỆ THỐNG QUẢN LÍ KHO THUỐC</h1>
          <p className="mt-2 text-lg">
            Quản lý thuốc, kho và xuất nhập hiệu quả
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-white md:w-2/5">
        <Outlet />
      </div>
    </div>
  );
}
