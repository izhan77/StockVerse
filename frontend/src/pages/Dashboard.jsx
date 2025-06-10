import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation, useParams } from "react-router-dom";
import DashboardNavBar from "../Components/Navbar/DashboardNavBar";
import DashBoardOverview from "../Components/DashBoard/DashBoardOverview";

const Dashboard = () => {
  const dashboardRef = useRef();
  const { state } = useLocation();
  const user = state?.user;
  const { userID } = useParams();
  const token = localStorage.getItem("token");
  // console.log("Dashboard", token);

  // Dashboard Slide
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
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className="w-full tracking-tight min-h-screen relative flex overflow-hidden bg-gradient-to-br from-orange-400 via-[#FFF1D5] to-[#FFF1D5] p-5">
      <div
        ref={dashboardRef}
        className="relative z-10 flex flex-col w-full max-w-[1500px] min-h-[1300px] rounded-3xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15),0_10px_10px_-5px_rgba(0,0,0,0.08)] bg-white"
      >
        {/* NavBar */}
        <div className="w-full">
          <DashboardNavBar user={user} />
        </div>

        {/* Main */}
        <div className="w-full flex-1 flex flex-col overflow-hidden">
          <DashBoardOverview user={user} id={userID} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
