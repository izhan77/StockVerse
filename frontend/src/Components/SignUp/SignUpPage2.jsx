import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import PictureLoader from "./PictureLoader";
import EmployeeSignUpForm from "../Forms/EmployeeSignUpForm";
import ManagerSignUpForm from "../Forms/ManagerSignUpForm";
import AuditorSignUpForm from "../Forms/AuditorSignUpForm";

const SignUpPage2 = () => {
  const signupref = useRef();
  const { state } = useLocation();
  const role = state?.role;
  const roleNumber = state?.roleNumber;

  // Sign Up Slide
  useEffect(() => {
    if (signupref.current) {
      gsap.set(signupref.current, {
        y: -50,
        opacity: 0,
      });

      gsap.to(signupref.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className="w-full tracking-tight min-h-screen relative flex justify-center items-center overflow-hidden bg-gradient-to-br from-[#FFF1D5] via-orange-400 to-[#FFF1D5] p-4">
      <div className="absolute inset-0 bg-orange-100/20 blur-2xl opacity-40 -z-10"></div>

      {/* Signup Form Box */}
      <div
        ref={signupref}
        className="relative z-10 flex flex-col md:flex-row  md:justify-between items-center bg-white space-x-8 w-full max-w-[1000px] rounded-3xl shadow-2xl pb-3 px-2 sm:px-5 md:px-6 md:py-5 md:pb-3"
      >
        {/* Form Box */}
        {role === "employee" ? (
          <EmployeeSignUpForm roleNumber={roleNumber} />
        ) : role === "manager" ? (
          <ManagerSignUpForm roleNumber={roleNumber} />
        ) : role === "auditor" ? (
          <AuditorSignUpForm roleNumber={roleNumber} />
        ) : null}

        {/* Picture */}
        <PictureLoader />
      </div>
    </div>
  );
};

export default SignUpPage2;
