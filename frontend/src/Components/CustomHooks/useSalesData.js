import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

const useSalesData = (storeId, token) => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      if (!storeId) return;
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/storesales/${storeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setSalesData(data);
      } catch (err) {
        console.error("Sales fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [storeId, token]);

  return { salesData, loading, error };
};

export default useSalesData;
