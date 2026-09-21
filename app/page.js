"use client";

import { Suspense, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import SmoothScroll from "@/components/SmoothScroll";
import GradualBlur from "@/components/GradualBlur/GradualBlur";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubHeader from "@/components/Featured/SubHeader";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const ref = useRef(null);
  const snakeTrackRef = useRef(null);
  const blurRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.clear();
    console.log(
      "%cVAISHNAVI SHARMA — AI/ML ENGINEER",
      "background: #D9E6FF; color: #0f172a; font-size: 16px; font-weight: 800; padding: 10px 16px; border-radius: 10px; letter-spacing: 2px;"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const blur = blurRef.current;
    const footer = document.getElementById("main-footer");
    if (!blur || !footer) return;

    const setVisible = (visible) =>
      gsap.to(blur, { autoAlpha: visible ? 1 : 0, duration: 0.3 });

    const footerInView = footer.getBoundingClientRect().top < window.innerHeight;
    gsap.set(blur, { autoAlpha: footerInView ? 0 : 1 });

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => setVisible(false),
      onEnterBack: () => setVisible(false),
      onLeave: () => setVisible(false),
      onLeaveBack: () => setVisible(true),
    });

    return () => trigger.kill();
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-bg text-fg h-auto w-screen overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Continuous Snake Journey: runs from About all the way to the last section */}
        <div id="snake-track" ref={snakeTrackRef} className="relative w-full">
          <Skiggle />

          {/* About Section */}
          <div
            id="about"
            className="h-auto md:h-[140vh] relative mt-12 md:mt-20 flex flex-col md:block pb-16 md:pb-0 gap-8 md:gap-0"
            ref={ref}
          >
            <Header />
            <FeaturedVideo refForward={ref} />
            <SubHeader />
          </div>

          {/* Projects / Education / Certifications */}
          <Projects />

          {/* Contact & Footer */}
          <Contact />
          <SiteFooter />
        </div>

        {/* GradualBlur bottom edge */}
        <div
          ref={blurRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 99999,
          }}
        >
          <GradualBlur
            target="parent"
            position="bottom"
            height="4.5rem"
            strength={1.2}
            divCount={2}
            curve="ease-out"
            exponential={false}
            opacity={0.8}
            zIndex={1}
          />
        </div>
      </div>
    </SmoothScroll>
  );
}
