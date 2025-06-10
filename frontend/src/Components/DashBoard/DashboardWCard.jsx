import React from "react";

const DashboardWCard = ({ title, number }) => {
  return (
    <div className="py-4 flex text-left items-center text-gray-700 flex-col space-y-4 px-4 text-sm bg-gradient-to-br from-[#ffd39dc8] shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out via-orange-300 to-[#ff8b108b] rounded-2xl">
      <p>{title}</p>
      <p className="font-extrabold text-[32px]">{number || 0}</p>
    </div>
  );
};

export default DashboardWCard;
