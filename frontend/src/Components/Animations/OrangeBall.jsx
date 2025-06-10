import React from "react";

const OrangeBall = () => {
  return (
    <svg
      className="
        w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]
        absolute top-[33rem] sm:top-1/2 -right-[35vw] sm:-right-[15vw] -translate-y-1/2
        opacity-30 
        rounded-full 
        blur-2xl
        animate-hero-pulse
      "
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient id="wavyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.5" /> 
          <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.5" /> 
          <stop offset="50%" stopColor="#F97316" stopOpacity="0.5" /> 
          <stop offset="75%" stopColor="#EA580C" stopOpacity="0.4" /> 
          <stop offset="100%" stopColor="#9A3412" stopOpacity="0.5" /> 
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="url(#wavyGradient)"
      />
    </svg>
  );
};

export default OrangeBall;