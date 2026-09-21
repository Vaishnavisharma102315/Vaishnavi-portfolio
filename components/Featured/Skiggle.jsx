"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Skiggle = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const coreRef = useRef(null);
  const headGlowRef = useRef(null);
  const headCoreRef = useRef(null);
  const groupRef = useRef(null);

  // Continuous creative S-curved journey through About, Projects, Contact, and SiteFooter
  const d =
    "M 1200 120 C 850 350, 180 520, 220 1000 C 260 1450, 1300 1600, 1220 2100 C 1140 2600, 150 2800, 200 3300 C 250 3800, 1280 4000, 1180 4500 C 1080 5000, 180 5200, 280 5600 C 380 5950, 1100 6100, 720 6300";

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const bodyPath = pathRef.current;
    const glowPath = glowRef.current;
    const corePath = coreRef.current;
    const headGlow = headGlowRef.current;
    const headCore = headCoreRef.current;
    const group = groupRef.current;
    const container =
      svgRef.current?.parentElement || document.getElementById("snake-track");

    if (!bodyPath || !glowPath || !corePath || !group || !container) return;

    let totalLen = 7800;
    try {
      const measured = bodyPath.getTotalLength();
      if (measured > 0) totalLen = measured;
    } catch (err) {
      console.warn("Using fallback path length", err);
    }

    const snakeLen = 920;
    const gapLen = 45000;
    const travelDistance = totalLen - snakeLen;

    // Apply dash patterns to each layer
    const dashGlow = `${snakeLen * 1.06} ${gapLen}`;
    const dashBody = `${snakeLen} ${gapLen}`;
    const dashCore = `${snakeLen * 0.85} ${gapLen}`;

    glowPath.setAttribute("stroke-dasharray", dashGlow);
    bodyPath.setAttribute("stroke-dasharray", dashBody);
    corePath.setAttribute("stroke-dasharray", dashCore);

    glowPath.style.strokeDasharray = dashGlow;
    bodyPath.style.strokeDasharray = dashBody;
    corePath.style.strokeDasharray = dashCore;

    // Smoothly synchronizes snake offset, glowing head tip, and visibility
    const updateSnake = (p) => {
      // Offset travels linearly from 0 (top of About) to -travelDistance (Footer)
      const offset = -p * travelDistance;

      glowPath.setAttribute("stroke-dashoffset", offset);
      bodyPath.setAttribute("stroke-dashoffset", offset);
      corePath.setAttribute("stroke-dashoffset", offset);

      glowPath.style.strokeDashoffset = `${offset}`;
      bodyPath.style.strokeDashoffset = `${offset}`;
      corePath.style.strokeDashoffset = `${offset}`;

      // Position glowing snake head at the leading tip
      if (headGlow && headCore) {
        try {
          const headDistance = Math.min(
            totalLen,
            p * travelDistance + snakeLen
          );
          const pt = bodyPath.getPointAtLength(headDistance);
          headGlow.setAttribute("cx", pt.x);
          headGlow.setAttribute("cy", pt.y);
          headCore.setAttribute("cx", pt.x);
          headCore.setAttribute("cy", pt.y);
        } catch (e) {}
      }

      // Visibility: 100% hidden on home page (p <= 0.005),
      // fades in smoothly as the user scrolls into the About section
      if (p <= 0.005) {
        group.style.opacity = "0";
      } else if (p < 0.06) {
        group.style.opacity = String((p - 0.005) / 0.055);
      } else {
        group.style.opacity = "1";
      }
    };

    // Initialize hidden at starting position
    updateSnake(0);

    // ScrollTrigger tied 1:1 to user scroll through the track container
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        updateSnake(self.progress);
      },
    });

    // Refresh after layouts settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      st.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="squigggle-journey absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      viewBox="0 0 1440 6400"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Subtle ambient trail showing the journey path through the sections */}
      <path
        d={d}
        stroke="rgba(56, 189, 248, 0.09)"
        strokeWidth={28}
        strokeLinecap="round"
      />

      <g ref={groupRef} style={{ opacity: 0 }}>
        {/* Snake outer glowing aura */}
        <path
          ref={glowRef}
          d={d}
          strokeLinecap="round"
          strokeWidth={50}
          stroke="url(#snake_glow_grad)"
          style={{
            filter: "blur(12px)",
            opacity: 0.55,
          }}
        />

        {/* Snake main slithering body */}
        <path
          ref={pathRef}
          d={d}
          strokeLinecap="round"
          strokeWidth={36}
          stroke="url(#snake_body_grad)"
          style={{
            filter: "drop-shadow(0 0 18px rgba(0, 240, 255, 0.8))",
          }}
        />

        {/* Snake radiant core highlight */}
        <path
          ref={coreRef}
          d={d}
          strokeLinecap="round"
          strokeWidth={10}
          stroke="url(#snake_core_grad)"
          style={{
            opacity: 0.95,
          }}
        />

        {/* Radiant glowing head tip */}
        <circle
          ref={headGlowRef}
          r={24}
          fill="url(#snake_head_glow)"
          style={{ filter: "blur(5px)" }}
        />
        <circle
          ref={headCoreRef}
          r={11}
          fill="#FFFFFF"
          style={{ filter: "drop-shadow(0 0 8px #00FFFF)" }}
        />
      </g>

      <defs>
        {/* Snake body: electric cyan -> vibrant blue -> indigo -> violet */}
        <linearGradient
          id="snake_body_grad"
          x1="0"
          y1="0"
          x2="0"
          y2="6400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="25%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#4A83FF" />
          <stop offset="75%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        <linearGradient
          id="snake_glow_grad"
          x1="0"
          y1="0"
          x2="0"
          y2="6400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        <linearGradient
          id="snake_core_grad"
          x1="0"
          y1="0"
          x2="0"
          y2="6400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E0F2FE" />
          <stop offset="70%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#DDD6FE" />
        </linearGradient>

        <radialGradient id="snake_head_glow">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="40%" stopColor="#00FFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0080FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Skiggle;
