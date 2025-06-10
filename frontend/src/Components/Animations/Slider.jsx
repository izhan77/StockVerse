import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import ButtonLoading from "./ButtonLoading";

const Slider = () => {
  const slideRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();
  const name = state?.user?.first_name;
  const id = state?.user?.user_id;
  const token = localStorage.getItem("token");
  // console.log("Slider - ", token)

  // Slider Slide
  useEffect(() => {
    if (token && state?.user?.user_id) {
      const redirectTimer = setTimeout(() => {
        navigate(`/dashboard/${id}`, { state: { user: state.user } });
      }, 4000);

      return () => clearTimeout(redirectTimer);
    }
  }, [navigate, state?.user, id, token]);

  return (
    <div
      ref={slideRef}
      className="w-full tracking-tight min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-orange-400 via-[#FFF1D5] to-[#FFF1D5] p-5"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
        Welcome aboard, {name || "User"}!
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-lg sm:text-xl text-gray-700">
        <p>Redirecting to your Dashboard</p>
        <div>
          <ButtonLoading />
        </div>
      </div>
    </div>
  );
};

export default Slider;
