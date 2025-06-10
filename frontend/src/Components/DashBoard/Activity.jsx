import { useEffect } from "react";
import DashBoardCardHeader from "./DashBoardCardHeader";
import { Loader2 } from "lucide-react";

const Activity = ({ activityLogs, loading }) => {
  return (
    <div className="flex flex-col border border-gray-400 rounded-3xl overflow-hidden shadow-sm">
      <DashBoardCardHeader
        title="My Recent Activities"
        p="Your latest actions in the system"
      />

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {activityLogs?.length > 0 ? (
              activityLogs.map((log, index) => (
                <div
                  key={index}
                  className={`text-sm text-gray-700 font-medium flex flex-col pb-4 ${
                    index !== activityLogs.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <span className="text-lg font-bold">{log.log_action}</span>
                  <span className="text-md font-semibold">
                    {log.log_details}
                  </span>
                  <span className="text-sm">
                    {log.log_time
                      ? new Date(log.log_time).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No activity logs available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
