import Navbar from "../Components/Navbar/Navbar";
import Hero from "./../Components/Hero/Hero";
import Features from "../Components/Features/Features";

const Homepage = () => {
  return (
    <div className="bg-[#FFF1D5] min-h-screen  w-full">
      <nav>
        <Navbar />
      </nav>
      <main className="relative z-10">
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default Homepage;
