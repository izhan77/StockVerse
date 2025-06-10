import { useEffect, useState } from "react";

const useLiveClock = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return currentDate;
};

export default useLiveClock;
