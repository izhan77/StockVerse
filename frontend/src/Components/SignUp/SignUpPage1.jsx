import { useEffect, useRef, useState } from "react";
import RegButton from "../Buttons/RegButton";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const SignUpPage1 = () => {
  const signupref = useRef();
  const [role, setRole] = useState("");
  const [roleNumber, setRoleNumber] = useState(3);
  const navigate = useNavigate();

  const role_mapping = {
    employee: { number: 3 },
    manager: { number: 2 },
    auditor: { number: 4 },
    "tax-inspector": { number: 5 },
  };

  const handleRole = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setRoleNumber(role_mapping[selectedRole]?.number || 0);
  };

  const handleContinue = () => {
    if (role && role != "tax-inspector") {
      navigate("/signup-page2", { state: { role, roleNumber } });
    } else if (role === "tax-inspector") {
      alert("Tax-Inspection Form in Progress!");
      navigate("/signup-page1");
    } else {
      alert("Please Select a Role to Continue....");
    }
  };

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
    <div className="w-full tracking-tight min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#FFF1D5] via-orange-400 to-[#FFF1D5] p-4">
      {/* Signup Form */}
      <div
        ref={signupref}
        className="relative z-10 flex flex-col items-center justify-center text-center bg-white w-full max-w-[400px] min-h-[500px] rounded-xl shadow-2xl p-8 space-y-6"
      >
        {/* Logo + Main Heading */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={logo}
            alt="StockVerse logo"
            className="h-16 w-auto mb-4 object-contain"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome to{" "}
            <span className="font-extrabold text-4xl sm:text-5xl tracking-tight">
              StockVerse
            </span>
          </h2>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Begin your journey!
        </h3>

        <div className="w-full max-w-[250px]">
          <select
            onChange={handleRole}
            value={role}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          >
            <option value="">Select your Role</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="auditor">Auditor</option>
            <option value="tax-inspector">Tax Inspector</option>
          </select>
        </div>

        <button onClick={handleContinue} className="mt-4 w-full max-w-[250px]">
          <RegButton name="Continue" />
        </button>
      </div>
    </div>
  );
};

export default SignUpPage1;
