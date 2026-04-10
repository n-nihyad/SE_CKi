import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import bg1 from "../assets/images/slide1.jpg";
import bg2 from "../assets/images/slide2.jpg";
import bg3 from "../assets/images/slide3.jpg";
import bg4 from "../assets/images/slide4.jpg";

const images = [bg1, bg2, bg3, bg4];

export default function AuthLayout() {
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left */}
      <div className="relative hidden md:block md:w-3/5 overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="background"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Medicine Inventory System</h1>
          <p className="mt-2 text-lg">
            Quản lý thuốc, kho và xuất nhập hiệu quả
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-white md:w-2/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md px-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
