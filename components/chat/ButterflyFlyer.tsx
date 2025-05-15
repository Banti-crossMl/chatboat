"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ButterflyFlyer() {
  const [fly, setFly] = useState(false);

  const handleFly = () => {
    setFly(true);
    // Optional: reset after animation completes
    setTimeout(() => setFly(false), 3000);
  };

  return (
    <div className="relative w-full h-[calc(100vh-200px)] overflow-hidden bg-gradient-to-b from-sky-100 to-white flex flex-col items-center justify-end p-4">
      {/* Butterfly */}
      <motion.img
        src="https://miro.medium.com/v2/resize:fit:549/1*u4XVwf1J3ZbYT8J8M2IOTQ.png" // Replace with your butterfly image path
        alt="Butterfly"
        initial={{ y: 0 }}
        animate={fly ? { y: -500, rotate: 20 } : { y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-24 h-24 mb-4 bg-gradient-to-b from-sky-100 to-white"
      />

      {/* Fly button */}
      <button
        onClick={handleFly}
        className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-all"
      >
        Fly Butterfly 🦋
      </button>
    </div>
  );
}
