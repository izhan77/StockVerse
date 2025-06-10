import DashBoardCardHeader from "./DashBoardCardHeader";
import {
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Capsule from "../Buttons/Capsule";

const InventoryDashBoardCard = ({ inventory = [], loading }) => {
  // Calculate inventory stats
  const inStockItems = inventory.filter(
    (item) => item.stock_status === "In Stock"
  ).length;
  const reorderItems = inventory.filter(
    (item) => item.stock_status === "Reorder"
  ).length;
  const lowStockItems = inventory.filter(
    (item) => item.stock_quantity < item.reorder_point
  );
  const wellStockedItems = inventory.filter(
    (item) => item.stock_quantity > item.reorder_point
  ).length;
  const totalProducts = inventory.length;

  return (
    <div className="flex flex-col relative max-h-[800px] border border-gray-400 rounded-3xl overflow-hidden">
      <DashBoardCardHeader
        total={totalProducts}
        name="Total Products"
        title="Current Inventory Status"
        p="Overview of your store's inventory levels"
      />

      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Top Stats Grid */}
          <div className="h-full grid grid-cols-2 gap-4 p-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg flex justify-between flex-col sm:flex-row items-center shadow p-4 h-32">
                <div className="flex flex-col items-center sm:items-start">
                  <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                  <p className="text-sm text-green-600">In Stock</p>
                </div>
                <span className="text-2xl font-bold text-green-700">
                  {inStockItems}
                </span>
              </div>

              <div className="bg-red-50 rounded-lg flex justify-between flex-col sm:flex-row items-center shadow p-4 h-32">
                <div className="flex flex-col items-center sm:items-start">
                  <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
                  <p className="text-red-700 text-sm">Need Reorder</p>
                </div>
                <span className="text-2xl font-bold text-red-700">
                  {reorderItems}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-lg flex justify-between flex-col sm:flex-row items-center shadow p-4 h-32">
                <div className="flex flex-col items-center sm:items-start">
                  <TrendingDown className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="text-orange-600 text-sm">Low Stock</p>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {lowStockItems.length}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg flex justify-between flex-col sm:flex-row items-center shadow p-4 h-32">
                <div className="flex flex-col items-center sm:items-start">
                  <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-blue-600 text-sm">Well Stocked</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {wellStockedItems}
                </span>
              </div>
            </div>
          </div>

          {/* Low Stock Items Section */}
          <div className="px-4 py-2 ">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-sm space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-black">Low Stock Items</span>
              </div>
              <Capsule total={lowStockItems.length} name="items" />
            </div>

            <div className="text-sm mb-2">
              {lowStockItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-lg py-2 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800 truncate">
                      {item.product_name}
                    </span>
                    <span className="text-sm font-semibold text-yellow-600">
                      {item.stock_quantity}/{item.reorder_point}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (item.stock_quantity / item.reorder_point) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Current Stock Quantiy: {item.stock_quantity}</span>
                    <span>Minimum Stock Level: {item.minimum_stock_level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDashBoardCard;
