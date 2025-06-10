import { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import { gsap } from "gsap";
import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardNavBar = ({ user }) => {
  const logoRef = useRef(null);
  const navRef = useRef(null);

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

  return (
    <>
      {/* Desktop NavBar */}
      <nav
        ref={navRef}
        className="flex  justify-between items-center p-3 md:p-3"
      >
        {/* StockVerse Logo */}
        <div className="overflow-hidden">
          <img
            ref={logoRef}
            src={logo}
            alt="StockVerse logo"
            className="h-14 ml-2 w-auto "
          />
        </div>

        {/* Nav md:Buttons */}
        <div className="desktop-nav-button flex items-center">
          <div className="hidden sm:flex flex-row items-center justify-center space-x-2  px-5 rounded-full ">
            <User size={28} />
            <p className="text-lg tracking-tighter font-semibold ">
              {user.first_name} {user.last_name}
            </p>
          </div>
          {/* Sign Out Button */}
          <Link to="/">
            <div className="rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-gray-300 hover:scale-110 ">
              <LogOut size={23} />
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavBar;
