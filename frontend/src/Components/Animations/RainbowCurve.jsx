import React from "react";

const RainbowCurve = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-[1]" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full blur-lg h-full animate-soft-wave"
      >
        <defs>
          <linearGradient id="wavyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.3" /> 
            <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.2" /> 
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.2" /> 
            <stop offset="75%" stopColor="#EA580C" stopOpacity="0.2" /> 
            <stop offset="100%" stopColor="#9A3412" stopOpacity="0.1" /> 
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <path
          d="M0,100 
             C20,80 30,30 50,50 
             S80,20 100,100"
          fill="url(#wavyGradient)"
          filter="url(#glow)"
          className="transition-all duration-3000 ease-in-out"
        >
          <animate 
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,100 C20,80 30,30 50,50 S80,20 100,100;
              M0,100 C20,70 40,40 50,60 S70,30 100,100;
              M0,100 C30,90 20,50 50,40 S90,60 100,100;
              M0,100 C20,80 30,30 50,50 S80,20 100,100
            "
          />
        </path>
      </svg>
    </div>
  );
};

export default RainbowCurve;