import { useState, useEffect, useRef } from "react";
import NavButton from "./NavButton";
import logo from "../../assets/logo.png";
import MenuButton from "../Buttons/MenuButton";
import MobNavLine from "../Animations/MobNavLine";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  // Smooth scroll function
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  // Logo GSAP
  useEffect(() => {
    if (logoRef.current) {
      gsap.set(logoRef.current, {
        y: -50,
        opacity: 0,
      });

      gsap.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  // Nav GSAP
  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, {
        y: -50,
        opacity: 0,
      });

      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
      });
    }
  }, []);

  // Menu Button Toggle
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Scroll Behavior -> Menu Button
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* sm:Menu Button */}
      <div
        ref={navRef}
        aria-label="Open Menu"
        className="flex custom-700:hidden absolute right-4 top-10 z-[999]"
      >
        <MenuButton isOpen={isOpen} onToggle={handleToggle} />
      </div>

      {/* Mobile NavBar */}
      {/* Black Blur Overlay */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 h-[100%] w-full bg-black/20 backdrop-blur-sm z-50 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto scroll-"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex absolute top-[-100%] z-19 left-0 black-screen bg-black/50 backdrop-blur-sm w-full h-full transition-all duration-500 ease-in-out ${
            isOpen ? "top-[0]" : "top-[-100%]"
          } `}
        >
          {/* Mobile NavBar White */}
          <div
            className={`nav-screen w-full bg-[#FFF1D5] flex absolute top-[-100%] h-[65%] rounded-bl-[4em] rounded-br-[4em] transition-all duration-700 ease-in-out z-19 left-0 ${
              isOpen ? "top-[0]" : "top-[-100%]"
            } `}
          >
            {/* Mobile Nav Links Container */}
            <div className="flex absolute right-7 bottom-10 items-end flex-col text-5xl sm:text-7xl font-bold leading-[1.15] tracking-tight">
              {[
                { name: "Features", path: "/" },
                { name: "About Us", path: "/" },
                { name: "Login", path: "/login" },
                { name: "Register", path: "/signup-page1" },
              ].map((item) => (
                // NavLink + MobNavline -> Box
                <Link to={item.path} key={item.name} className="relative group">
                  {item.name === "Features" ? (
                    <div
                      onClick={scrollToFeatures}
                      className="inline-block transition-transform duration-200 hover:text-gray-700"
                    >
                      {item.name}
                    </div>
                  ) : (
                    <div className="inline-block transition-transform duration-200 hover:text-gray-700">
                      {item.name}
                    </div>
                  )}
                  <MobNavLine />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop NavBar */}
      <nav
        ref={navRef}
        className="flex justify-between items-center p-5 md:p-6"
      >
        {/* StockVerse Logo */}
        <div className="overflow-hidden">
          <img
            ref={logoRef}
            src={logo}
            alt="StockVerse logo"
            className="h-20 w-auto hover:scale-110"
          />
        </div>

        {/* Nav md:Buttons */}
        <div className="desktop-nav-button hidden custom-700:flex gap-x-1 md:gap-x-6 items-center">
          <button onClick={scrollToFeatures}>
            <NavButton name="Features" />
          </button>
          <NavButton name="About Us" />
          <Link to="/login">
            <NavButton name="Login" />
          </Link>
          <Link to="/signup-page1">
            <NavButton name="Register" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
