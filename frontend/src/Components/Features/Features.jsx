import React, { useRef, useEffect } from "react";
import video from "../../assets/Video.webm";
import FeatureCard from "./FeatureCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Features = () => {
  const leftRef = useRef();
  const rightRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Left Column GSAP
  useEffect(() => {
    if (!leftRef.current) return;

    const items = Array.from(leftRef.current.children);

    gsap.set(items, { x: -30, opacity: 0, force3D: true });

    gsap.to(items, {
      x: 0,
      opacity: 1,
      duration: 1,
      force3D: true,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 50%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  // Right Column GSAP
  useEffect(() => {
    if (!rightRef.current) return;

    const items = Array.from(rightRef.current.children);

    gsap.set(items, { x: 30, opacity: 0, force3D: true });

    gsap.to(items, {
      x: 0,
      opacity: 1,
      duration: 1,
      force3D: true,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rightRef.current,
        start: "top 50%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div
      id="features-section"
      className="bg-black relative w-full min-h-screen overflow-hidden "
    >
      {/* Video Background */}
      <video
        src={video}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>

      {/* Shadow Overlay */}
      <div className="absolute inset-0 bg-[rgba(15,21,37,0.8)] z-0"></div>

      {/* Content */}
      <div className="relative text-white min-h-screen flex items-center justify-center p-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
          {/* Left Column */}
          <div ref={leftRef} className="space-y-8" id="left-features">
            <FeatureCard
              title="Live Stock Monitoring"
              description="Track inventory levels across products in real-time from one centralized dashboard."
            />
            <FeatureCard
              title="Auto Reorder Suggestions"
              description="Automatically detect low stock and generate smart reorder prompts instantly."
            />
            <FeatureCard
              title="Visual Sales Insights"
              description="View sales trends through interactive charts to help forecast inventory needs."
            />
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="space-y-8" id="right-features">
            <FeatureCard
              title="User Roles & Permissions"
              description="Assign roles like Admin, Manager, or Staff to control feature access."
            />
            <FeatureCard
              title="Simple Order Management"
              description="Quickly create, edit, and complete orders in a streamlined workflow."
            />
            <FeatureCard
              title="Instant Alerts"
              description="Get instant notifications for low stock, updates, or assigned tasks."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
