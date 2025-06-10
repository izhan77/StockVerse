import Homepage from "./pages/Homepage";
import Footer from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpPage1 from "./Components/SignUp/SignUpPage1";
import SignUpPage2 from "./Components/SignUp/SignUpPage2";
import Slider from "./Components/Animations/Slider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import StockVerseLoader from "./Components/Animations/StockVerseLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <StockVerseLoader isVisible={isLoading} />
      <ScrollToTop />
      <main className="relative z-10 pb-[90vh]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup-page1" element={<SignUpPage1 />} />
          <Route path="/signup-page2" element={<SignUpPage2 />} />
          <Route path="/welcome/:userID" element={<Slider />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:userID" element={<Dashboard />} />
        </Routes>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-black z-0">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
