import React from "react";
import Capsule from "../Buttons/Capsule";

const DashBoardCardHeader = ({ total, name, title, p }) => {
  const getBgColor = (title) => {
    switch (title) {
      case "Sales Performance":
        return "bg-green-100";
      case "Current Inventory Status":
        return "bg-blue-100";
      case "My Recent Activities":
        return "bg-yellow-100";
      case "My Purchase Orders":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };
  const bgColor = getBgColor(title);

  return (
    <div className={`flex flex-col ${bgColor} p-5`}>
      <div className="flex flex-col xl:flex-row items-center md:items-start justify-between">
        <h3 className="font-medium text-2xl">{title}</h3>
        <Capsule title={title} total={total} name={name} />
      </div>
      <div className="mt-1 text-sm xl:text-left text-center md:text-left text-gray-600">
        <p>{p}</p>
      </div>
    </div>
  );
};

export default DashBoardCardHeader;
