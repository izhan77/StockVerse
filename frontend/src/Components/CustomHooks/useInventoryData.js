import { useEffect, useState } from "react";

const useInventoryData = (storeId, token) => {
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      if (!storeId) return;
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/inventory/${storeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setInventoryData(data);
      } catch (err) {
        console.error("Inventory fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [storeId, token]);

  return { inventoryData, loading, error };
};

export default useInventoryData;
