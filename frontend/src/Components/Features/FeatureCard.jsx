import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div
      style={{ willChange: "transform, opacity" }}
      className="bg-white/10 min-h-[200px] flex-col w-full max-w-[500px] mx-auto backdrop-blur-md rounded-xl text-center p-6 flex mb-6 border justify-center items-center transition-all duration-100 border-white/20 hover:bg-white/20 t"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

export default FeatureCard;
