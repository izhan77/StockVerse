import React from "react";

const Arc = () => {
  return (
    <>
      {/* Left Cubic */}
      <div
        className="absolute -left-[25em] rotate-90 w-full h-full overflow-hidden z-49"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          className="w-full blur-lg h-full animate-soft-wave"
        >
          <defs>
            <linearGradient
              id="wavyGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#EA580C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9A3412" stopOpacity="0.3" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M0,100 
             C40,80 60,30 100,50 
             S160,20 200,100"
            fill="url(#wavyGradient)"
            filter="url(#glow)"
            className="transition-all duration-3000 ease-in-out"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
              M0,100 C40,80 60,30 100,50 S160,20 200,100;
              M0,100 C40,70 80,40 100,60 S140,30 200,100;
              M0,100 C60,90 40,50 100,40 S180,60 200,100;
              M0,100 C40,80 60,30 100,50 S160,20 200,100
            "
            />
          </path>
        </svg>
      </div>
      {/* Right Cubic */}
      <div
        className="absolute -right-[25em] -rotate-90 w-full h-full overflow-hidden z-49"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          className="w-full blur-lg h-full animate-soft-wave"
        >
          <defs>
            <linearGradient
              id="wavyGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#EA580C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9A3412" stopOpacity="0.3" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M0,100 
             C40,80 60,30 100,50 
             S160,20 200,100"
            fill="url(#wavyGradient)"
            filter="url(#glow)"
            className="transition-all duration-3000 ease-in-out"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
              M0,100 C40,80 60,30 100,50 S160,20 200,100;
              M0,100 C40,70 80,40 100,60 S140,30 200,100;
              M0,100 C60,90 40,50 100,40 S180,60 200,100;
              M0,100 C40,80 60,30 100,50 S160,20 200,100
            "
            />
          </path>
        </svg>
      </div>
    </>
  );
};

export default Arc;
