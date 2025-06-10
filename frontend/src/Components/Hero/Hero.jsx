import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TypeAnimation } from "react-type-animation";
import Button from "../Buttons/Button";
import RainbowCurve from "../Animations/RainbowCurve";
import OrangeBall from "../Animations/OrangeBall";
import OrangeBall1 from "./../Animations/OrangeBall1";

const Hero = () => {
  const heroRef = useRef();

  // Section GSAP
  useEffect(() => {
    if (heroRef.current) {
      gsap.set(heroRef.current, {
        y: -50,
        opacity: 0,
      });

      gsap.to(heroRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section ref={heroRef}
      className="relative overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Bg Animations */}
      <OrangeBall />
      <OrangeBall1 />
      <RainbowCurve />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Typewriter Block */}
        <div className="relative w-full text-center min-h-[18rem] sm:min-h-[8rem] md:min-h-[9rem] lg:min-h-[10rem] mb-8">
          <TypeAnimation
            sequence={[
              "Welcome to StockVerse :)",
              1500,
              "Your Supply Chain's Sixth Sense",
              1500,
              "From Data to Dollars in Seconds!",
              1500,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={50}
            className="block font-bold tracking-tighter leading-tight
                      text-6xl sm:text-5xl md:text-6xl lg:text-7xl
                      text-gray-900"
            repeat={Infinity}
          />
        </div>

        {/* Subheading */}
        <p className="font-semibold text-lg md:text-xl italic text-gray-700 text-center max-w-3xl mx-auto mb-12">
          "Unlock real-time insights and watch your inventory come alive."
        </p>

        {/* Get Started Button */}
        <div className="text-center">
          <Button name="Get Started" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
