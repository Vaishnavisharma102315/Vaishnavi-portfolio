"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidEther from "../LiquidEther/LiquidEther";

const HERO_LIQUID_COLORS = [
  "#38bdf8",
  "#818cf8",
  "#c084fc",
  "#f472b6",
  "#3b82f6",
  "#2dd4bf",
];

const SplitChars = ({ text, className, id }) => {
  return (
    <span className={className} id={id}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderCounterRef = useRef(null);
  const footerUiRef = useRef(null);
  const parallaxInstanceRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.body.style.overflow = "hidden";

    const headingChars = headingRef.current?.querySelectorAll(".hero-char") ?? [];

    // Hide hero elements initially
    gsap.set(headingChars, { autoAlpha: 0, y: 100 });
    if (footerUiRef.current) {
      gsap.set(footerUiRef.current, { autoAlpha: 0, y: 30 });
    }

    // iOS 13+ gyro permission
    const requestGyroPermission = () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        DeviceOrientationEvent.requestPermission().catch(() => {});
      }
    };
    const handleFirstGesture = () => {
      requestGyroPermission();
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
    };
    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("click", handleFirstGesture, { once: true });

    // Initialize parallax-js after GSAP reveal
    const initParallax = async () => {
      if (typeof window === "undefined" || !sectionRef.current) return;
      const isTouch =
        window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        window.innerWidth < 1024;
      try {
        const mod = await import("parallax-js");
        const Parallax = mod.default || mod;
        if (!sectionRef.current) return;
        parallaxInstanceRef.current = new Parallax(sectionRef.current, {
          relativeInput: true,
          hoverOnly: !isTouch,
          selector: ".hero-layer",
          scalarX: isTouch ? 3 : 1.5,
          scalarY: isTouch ? 3 : 1.5,
          frictionX: 0.15,
          frictionY: 0.15,
        });
      } catch (err) {
        console.error("Failed to init parallax-js:", err);
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
        initParallax();
      },
    });

    const counter = { value: 0 };

    // Loader counter animation
    tl.to(counter, {
      value: 100,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        if (loaderCounterRef.current) {
          loaderCounterRef.current.innerText = `${Math.floor(counter.value)}`;
        }
      },
    }, "anim");

    // Counter fade out
    tl.to(loaderCounterRef.current, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.out",
    }, "anim+=0.6");

    // Loader curtain slide up & hide
    tl.to(loaderRef.current, {
      y: "-100%",
      autoAlpha: 0,
      duration: 0.85,
      ease: "power3.inOut",
    }, "anim+=0.75");

    // Heading chars animation
    tl.to(headingChars, {
      autoAlpha: 1,
      y: 0,
      stagger: {
        amount: 0.3,
        from: "start",
      },
      duration: 0.85,
      ease: "power3.out",
    }, "anim+=0.9");

    // Footer UI animation
    if (footerUiRef.current) {
      tl.to(footerUiRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "anim+=1.05");
    }

    const DYNAMIC_COLORS = [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#f472b6",
      "#3b82f6",
      "#2dd4bf",
    ];

    // Dynamic cursor reaction on VAISHNAVI text: illuminates letters with
    // dynamic fluid colors and subtle vertical lift as cursor sweeps past
    const handleMouseMove = (e) => {
      if (!headingRef.current) return;
      const heading = headingRef.current;
      const chars = heading.querySelectorAll(".hero-char");
      if (!chars.length) return;

      chars.forEach((char, index) => {
        const charRect = char.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;
        const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);

        if (dist < 220) {
          const intensity = Math.max(0, 1 - dist / 220);
          const color = DYNAMIC_COLORS[index % DYNAMIC_COLORS.length];

          char.style.color = color;
          char.style.textShadow = `0 0 ${Math.round(24 * intensity)}px ${color}`;

          gsap.to(char, {
            y: -intensity * 16,
            scale: 1 + intensity * 0.08,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          char.style.color = "";
          char.style.textShadow = "";

          gsap.to(char, {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      tl.kill();
      if (parallaxInstanceRef.current) {
        try {
          parallaxInstanceRef.current.destroy();
        } catch (e) {}
        parallaxInstanceRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="loader" ref={loaderRef}>
        <div id="loader-counter" ref={loaderCounterRef}>0</div>
      </div>

      {/* Hero Section */}
      <div id="hero-section" ref={sectionRef}>
        {/* Animated fluid background */}
        <div id="hero-bg-fluid">
          <LiquidEther
            colors={HERO_LIQUID_COLORS}
            mouseForce={22}
            cursorSize={110}
            isViscous={false}
            viscous={25}
            iterationsViscous={8}
            iterationsPoisson={12}
            resolution={0.35}
            BFECC={false}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={1.8}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/* Heading text in parallax layer */}
        <div className="hero-layer" data-depth="0.10" style={{ zIndex: 5 }}>
          <div id="hero-heading" ref={headingRef}>
            <SplitChars text="VAISHNAVI" />
          </div>
        </div>

        {/* Hero floating badges & scroll cue */}
        <div className="hero-footer-ui" ref={footerUiRef} style={{ zIndex: 15 }}>
          <div className="hero-role-pill">
            <span className="hero-pulse-dot" aria-hidden="true" />
            <span>AI/ML ENGINEER &bull; B.TECH CSE</span>
          </div>
          <div className="hero-scroll-cue">
            <span>EXPLORE</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Soft bottom edge transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none z-10" />
      </div>
    </>
  );
};

export default HeroSection;
