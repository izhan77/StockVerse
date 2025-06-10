import DashBoardCardHeader from "./DashBoardCardHeader";
import { Loader2 } from "lucide-react";

const SalesDashBoardCard = ({ purchaseOrder, loading }) => {
  console.log(purchaseOrder);

  return (
    <div className="flex flex-col border border-gray-400 rounded-3xl overflow-hidden shadow-sm">
      <DashBoardCardHeader
        name="Today"
        title="My Purchase Orders"
        p="Your purchase order insights"
      />

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {/* Purchase Orders Container */}
          {purchaseOrder && purchaseOrder.length > 0 ? (
            purchaseOrder.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col p-4 min-h-24 border-b border-gray-200 mb-2"
              >
                <div className="flex flex-col text-sm md:flex-row justify-between gap-x-4">
                  {/* Left Column */}
                  <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Order ID:</p>
                      <p className="text-gray-800">{item.order_id || "N/A"}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Order Date:</p>
                      <p className="text-gray-800">
                        {item?.order_date
                          ? new Date(item.order_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Supplier:</p>
                      <p className="text-gray-800">
                        {item.supplier_first_name && item.supplier_last_name
                          ? `${item.supplier_first_name} ${item.supplier_last_name}`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Product:</p>
                      <p className="text-gray-800">{item.product_name}</p>
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="flex flex-col gap-2 w-full md:w-1/2">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Quantity:</p>
                      <p className="text-gray-800">{item.quantity || "0"}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Cost Price:</p>
                      <p className="text-gray-800">${item.cost_price}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Store:</p>
                      <p className="text-gray-800">{item.store_name}</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="font-medium text-gray-600">Grand Total:</p>
                      <p className="text-gray-800 font-bold">
                        ${(item.cost_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No purchase orders available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesDashBoardCard;
