import DashBoardCardHeader from "./DashBoardCardHeader";
import { Loader2 } from "lucide-react";

const SalesDashBoardCard = ({ salesData = [], loading, employeeSalesData }) => {
  return (
    <div className="flex flex-col border border-gray-400 rounded-3xl overflow-hidden shadow-sm">
      <DashBoardCardHeader
        total=""
        name="Today"
        title="Sales Performance"
        p="Your sales performance metrics"
      />

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <h1 className="text-center py-4 text-2xl md:text-3xl font-bold border-b border-gray-200">
            Your Store
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Box1 */}
            <div className="bg-orange-50 rounded-lg flex flex-col sm:flex-row justify-between items-center p-4 min-h-24 shadow-sm">
              <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
                <p className="text-sm text-green-600">Total Sales</p>
              </div>
              <span className="text-xl md:text-2xl font-bold text-green-700">
                {`$${salesData?.total_sales || "0"}`}
              </span>
            </div>

            {/* Empty Card */}
            {/* Box2 */}
            <div className="bg-orange-50 rounded-lg flex flex-col sm:flex-row justify-between items-center p-4 min-h-24 shadow-sm">
              <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
                <span className="text-sm text-green-600">
                  Total Transactions
                </span>
              </div>

              <p className="text-xl md:text-2xl font-bold text-green-700">
                {salesData?.total_transactions}
              </p>
            </div>
          </div>

          {/* Average Sale per transaction store */}
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-700 font-medium mb-2 sm:mb-0">
              Average Sale Per Transaction:
            </p>
            <span className="text-xl md:text-2xl font-bold">
              {`$${(Number(salesData?.avg_sale_per_transaction) || 0).toFixed(
                2
              )}`}
            </span>
          </div>

          <h1 className="text-center py-4 text-2xl md:text-3xl font-bold border-b border-gray-200">
            Your Performance
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Box1 */}
            <div className="bg-orange-50 rounded-lg flex flex-col sm:flex-row justify-between items-center p-4 min-h-24 shadow-sm">
              <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
                <p className="text-sm text-green-600">Total Sales</p>
              </div>
              <span className="text-xl md:text-2xl font-bold text-green-700">
                {`$${employeeSalesData?.total_sales_amount || "0"}`}
              </span>
            </div>
            {/* Box1 */}
            <div className="bg-orange-50 rounded-lg flex flex-col sm:flex-row justify-between items-center p-4 min-h-24 shadow-sm">
              <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
                <p className="text-sm text-green-600">Total Transactions</p>
              </div>
              <span className="text-xl md:text-2xl font-bold text-green-700">
                {`${salesData?.total_transactions || "0"}`}
              </span>
            </div>

            {/* Box2 */}
            <div className="bg-orange-50 rounded-lg flex flex-col sm:flex-row justify-between items-center p-4 min-h-24 shadow-sm">
              <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
                <span className="text-sm text-green-600">Best Sales Day</span>
              </div>

              <p className="text-lg md:text-xl font-bold text-green-700 text-right">
                {employeeSalesData?.best_sales_day
                  ? new Date(
                      employeeSalesData.best_sales_day
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Zero to hero loading..."}
              </p>
            </div>
            {/* Box2 */}
            <div className="bg-orange-50 rounded-lg flex flex-col sm:flex-row justify-between items-center p-4 min-h-24 shadow-sm">
              <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
                <span className="text-sm text-green-600">Last Sales Date</span>
              </div>

              <p className="text-lg md:text-xl font-bold text-green-700 text-right">
                {employeeSalesData?.last_sale_date
                  ? new Date(
                      employeeSalesData.last_sale_date
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Start selling today!"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDashBoardCard;
