import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InventoryDashBoardCard from "./InventoryDashBoardCard";
import DashboardWCard from "./DashboardWCard";
import SalesDashBoardCard from "./SalesDashBoardCard";
import PurchaseOrder from "./PurchaseOrder";
import ButtonLoading from "./../Animations/ButtonLoading";
import Activity from "./Activity";
import { useRef } from "react";

const DashBoardOverview = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [inventoryData, setInventoryData] = useState(null);
  const [storeSalesData, setStoreSalesData] = useState(null);
  const [employeeSalesData, setEmployeeSalesData] = useState(null);
  const [activityLogs, setActivityLogs] = useState(null);
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [error, setError] = useState(null);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { userID } = useParams();
  const storeID = dashboardData?.store?.id;
  const token = localStorage.getItem("token");
  const dashboardRef = useRef(null);

  // Format date function
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options).replace(",", " •");
  };

  // Live Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetching UserData from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/dashboard/${userID}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      }
    };

    if (userID) {
      fetchDashboardData();
    }
  }, [userID, token]);

  // Fetching Inventory Data from backend
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        if (!dashboardData?.store?.id) return;

        setInventoryLoading(true);
        const response = await fetch(
          `http://localhost:5000/inventory/${dashboardData.store.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        setError(error.message);
      } finally {
        setInventoryLoading(false);
      }
    };

    fetchInventoryData();
  }, [dashboardData, token]);

  // Fetching Store Sales Data from backend
  useEffect(() => {
    const fetchStoreSalesData = async () => {
      try {
        if (!dashboardData?.store?.id) return;

        setInventoryLoading(true);
        const response = await fetch(
          `http://localhost:5000/storesales/${dashboardData.store.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStoreSalesData(data);
      } catch (error) {
        console.error("Error fetching store sales data:", error);
        setError(error.message);
      } finally {
        setInventoryLoading(false);
      }
    };

    fetchStoreSalesData();
  }, [dashboardData, token]);

  // Fetching Employee Sales Data from backend
  useEffect(() => {
    const fetchEmployeeStoreSalesData = async () => {
      try {
        if (!userID) return;

        setInventoryLoading(true);
        const response = await fetch(
          `http://localhost:5000/employeesales/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEmployeeSalesData(data);
      } catch (error) {
        console.error("Error fetching store sales data:", error);
        setError(error.message);
      } finally {
        setInventoryLoading(false);
      }
    };

    fetchEmployeeStoreSalesData();
  }, [userID, token]);

  // Fetching Activity Logs Data from backend
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        if (!userID) return;
        setInventoryLoading(true);

        const response = await fetch(
          `http://localhost:5000/activity/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActivityLogs(data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setError(error.message);
      } finally {
        setInventoryLoading(false);
      }
    };
    fetchActivityData();
  }, [userID, token]);

  // Fetching Purchase Orders Data from backend
  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        if (!userID || !storeID) return;
        setInventoryLoading(true);

        const response = await fetch(
          `http://localhost:5000/purchaseorder/${storeID}/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPurchaseOrder(data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
        setError(error.message);
      } finally {
        setInventoryLoading(false);
      }
    };
    fetchPurchaseOrder();
  }, [userID, storeID, token]);

  // dashboardRef GSAP
  useEffect(() => {
    if (dashboardRef.current) {
      gsap.set(dashboardRef.current, {
        y: -50,
        opacity: 0,
      });

      gsap.to(dashboardRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
      });
    }
  }, []);

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center absolute left-[50%] top-[50%]">
        <ButtonLoading />
      </div>
    );
  }

  const { store, stats } = dashboardData;

  return (
    <div className="w-full h-auto flex flex-col">
      {/* Welcome Section */}
      <div className="w-full p-5 mb-8 flex flex-row justify-between bg-orange-300 items-center">
        {/* Hello */}
        <div className="">
          <h1 className="text-3xl tracking-tight font-bold text-left text-gray-700 mb-1">
            Welcome back, {user?.first_name || "User"}! 👋
          </h1>
          <div className="flex flex-row space-x-7">
            <p className="text-gray-600">
              {store?.name || "No Store Assigned"}
            </p>
            <span className="text-gray-600">{`Store ID : ${store.id}`}</span>
          </div>
          <p className="text-gray-600 text-left">{formatDate(currentDate)}</p>
        </div>

        {/* Store Analytics */}
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-5">
          <DashboardWCard
            title="Today's Sales"
            number={stats?.today_sales || 0}
          />
          <DashboardWCard title="Items Sold" number="143" />
          <DashboardWCard title="Active Alerts" number="7" />
        </div>
      </div>

      <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2  gap-6 px-5 pb-4">
        {inventoryLoading ? (
          <div className="flex justify-center items-center absolute left-[50%] top-[50%]">
            <ButtonLoading />
          </div>
        ) : (
          <>
            <InventoryDashBoardCard inventory={inventoryData || []} />
            <SalesDashBoardCard
              salesData={storeSalesData || []}
              employeeSalesData={employeeSalesData}
            />
            <Activity activityLogs={activityLogs} />
            <PurchaseOrder purchaseOrder={purchaseOrder} />
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoardOverview;
