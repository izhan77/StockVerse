import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

const useDashboardData = (userID, token) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/dashboard/${userID}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      }
    };

    if (userID) fetchDashboardData();
  }, [userID, token]);

  return { dashboardData, error };
};

export default useDashboardData;
