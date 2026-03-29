import { Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import tobi from "./images/tobi.jpg";
import milkky from "./images/milkky.jpg";
import nezuko from "./images/nezuko.jpg";

const images = [tobi, milkky, nezuko];

export default function AuthLayout() {
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-3/5 relative">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-2/5 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
