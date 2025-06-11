import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { EyeClosed, Eye } from "lucide-react";
import LoginButton from "./../Components/Buttons/LoginButton";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginref = useRef();
  const navigate = useNavigate();

  // Tracking login state
  const [isLogging, setIsLogging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Tracks login data -> my user state object
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handling User State
  const handleUser = (e) => {
    const { name, value } = e.target;

    // Clear any previous login error when user starts typing
    if (loginError) {
      setLoginError("");
    }

    // Updating user state with prev values
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation check for required fields
  const hasRequiredFields = () => {
    return user.email.trim() !== "" && user.password.trim() !== "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login started!!!");

    setLoginError("");

    if (!hasRequiredFields()) {
      setLoginError("Please fill in all required fields.");
      return;
    }

    setIsLogging(true);

    try {
      // This data is prepared to be sent as req to backend
      const loginData = {
        email: user.email.trim().toLowerCase(),
        password: user.password,
      };

      console.log("Prepared Login Data for Backend", {
        ...loginData,
        password: "[HIDDEN]",
      });

      console.log("Sending request to http://localhost:5000/login");

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      console.log("Received response status:", response.status);

      // Now parse the JSON response
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        console.log(`Login successful! Welcome ${result.user.first_name}!`);

        setIsSuccess(true);

        // Storing token in user's browser
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        // navigate to slider page with user data
        setTimeout(() => {
          navigate(`/welcome/${result.user.user_id}`, {
            state: { user: result.user },
          }); // passing user obejct -> state = user
        }, 3000);

        setUser({
          email: "",
          password: "",
        });
      } else {
        console.log("Login Failed:", result.error);
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Network error:", error);
      setLoginError(
        "Unable to connect to server. Please check your connection and try again."
      );
    } finally {
      setIsLogging(false);
    }
  };

  // Login Slide
  useEffect(() => {
    if (loginref.current) {
      gsap.set(loginref.current, {
        y: -50,
        opacity: 0,
      });

      gsap.to(loginref.current, {
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
      {/* Login Form */}
      <div
        ref={loginref}
        className="relative z-10 flex flex-col items-center justify-center text-center bg-white w-full max-w-[400px] min-h-[600px] rounded-xl shadow-2xl p-6 space-y-10 overflow-hidden"
      >
        {/* Logo + Main Heading */}
        <div className="flex flex-col items-center w-full px-4">
          <img
            src={logo}
            alt="StockVerse logo"
            className="h-16 w-auto mb-4 object-contain"
          />
          <h2 className="text-2xl flex-col sm:text-3xl font-bold text-gray-800">
            Welcome to{" "}
            <span className="font-extrabold text-4xl sm:text-5xl tracking-tight">
              StockVerse
            </span>
          </h2>
        </div>

        <h3 className="text-md sm:text-sm sm:text-left text-center font-bold text-gray-600 mb-2">
          Please enter your details
        </h3>

        {/* Show error message */}
        {loginError && (
          <div className="w-full px-4">
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {loginError}
            </p>
          </div>
        )}

        {/* Show success message */}
        {isSuccess && (
          <div className="w-full px-4">
            <p className="text-green-500 text-sm text-center bg-green-50 p-2 rounded">
              Login successful! Redirecting...
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Input container */}
          <div className="w-full space-y-4 px-4">
            {/* Email */}
            <div className="w-full">
              <input
                onChange={handleUser}
                name="email"
                type="email"
                value={user.email}
                placeholder="Email"
                className="border-2 border-gray-300 rounded-full p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            {/* Password */}
            <div className="relative w-full">
              <input
                onChange={handleUser}
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                placeholder="Password"
                className="border-2 border-gray-300 rounded-full p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 pr-10"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <div className="relative h-5 w-5">
                  <Eye
                    className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${
                      showPassword
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50"
                    }`}
                  />
                  <EyeClosed
                    className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${
                      showPassword
                        ? "opacity-0 scale-50"
                        : "opacity-100 scale-100"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Login Button */}
          <div className="w-full px-4">
            <button
              type="submit"
              disabled={isLogging}
              className="mt-4 w-full max-w-[250px] mx-auto"
            >
              <LoginButton isLoggingIn={isLogging} isSuccess={isSuccess} />
            </button>
          </div>
        </form>

        {/* Form Footer */}
        <div className="w-full px-4">
          <p className="text-sm sm:text-xs text-center font-medium text-gray-400 flex flex-col">
            By continuing, you agree to StockVerse's{" "}
            <span className="text-gray-500 hover:underline font-semibold">
              Terms of Service, Privacy Policy
            </span>
          </p>

          <p className="text-sm font-semibold sm:text-xs text-center text-gray-500 mt-2">
            Not on StockVerse yet?
            <a
              className="hover:underline font-extrabold ml-1"
              href="/signup-page1"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
