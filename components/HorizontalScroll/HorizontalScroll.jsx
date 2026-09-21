"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Helper component to split a word into individual animated letter spans
const SplitWord = ({ text, className = "" }) => {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hs-char inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!wrapper || !sticky || !track) return;

    const ctx = gsap.context(() => {
      // Calculate dynamic padding so the first phrase starts exactly in the center of the viewport
      const firstPhrase = track.querySelector(".hs-phrase");
      const applyCenterStart = () => {
        if (!firstPhrase) return;
        const phraseWidth = firstPhrase.offsetWidth;
        const centerPadding = Math.max(24, Math.floor((window.innerWidth - phraseWidth) / 2));
        track.style.paddingLeft = `${centerPadding}px`;
      };
      applyCenterStart();

      // Calculate how far the track needs to travel sideways from its centered start
      const getDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewport = window.innerWidth;
        const currentPadding = parseFloat(track.style.paddingLeft) || Math.floor(viewport / 2);
        return Math.max(trackWidth - viewport + currentPadding * 0.4, viewport * 0.9);
      };

      // Main horizontal scrubbing timeline (pins and scrolls sideways)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sticky,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Smooth sideways travel to the left
      tl.to(
        track,
        {
          x: () => -getDistance(),
          ease: "none",
          duration: 1,
        },
        0
      );

      // Kinetic letter entrance for ALL words: letters fly in alternating from up and down
      // starting immediately with the first words at timeline position 0!
      const chars = track.querySelectorAll(".hs-char");
      const totalChars = chars.length;

      chars.forEach((char, index) => {
        const fromY = index % 2 === 0 ? -110 : 110;
        const fromRotate = index % 2 === 0 ? -10 : 10;
        const startPos = (index / totalChars) * 0.85;

        tl.fromTo(
          char,
          {
            y: fromY,
            opacity: 0.15,
            rotateZ: fromRotate,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.22,
          },
          startPos
        );
      });

      // Smooth progress bar indicator
      if (progress) {
        tl.to(
          progress,
          {
            scaleX: 1,
            ease: "none",
            duration: 1,
          },
          0
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="hs-sticky" ref={stickyRef}>
        {/* Subtle top indicator bar */}
        <div className="hs-header-bar">
          <span className="hs-header-tag">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            CORE FOCUS &amp; VISION
          </span>
          <span className="text-[0.7rem] tracking-widest text-fg-muted font-mono uppercase">
            SCROLL TO EXPLORE &rarr;
          </span>
        </div>

        {/* Large kinetic typography track — starts in center and glides sideways */}
        <div className="Horizontal__text heading-xl" ref={trackRef}>
          <span className="hs-phrase">
            <SplitWord text="Engineering" className="text-fg-muted font-light" />{" "}
            <SplitWord text="Intelligent" className="text-accent font-bold" />{" "}
            <SplitWord text="Systems" className="text-accent font-bold" />
          </span>
          <span className="hs-separator hs-char" aria-hidden="true">&bull;</span>
          <span className="hs-phrase">
            <SplitWord text="Predictive" className="text-fg font-medium" />{" "}
            <SplitWord text="ML" className="text-accent font-bold" />{" "}
            <SplitWord text="Pipelines" className="text-accent font-bold" />
          </span>
          <span className="hs-separator hs-char" aria-hidden="true">&bull;</span>
          <span className="hs-phrase">
            <SplitWord text="Data-Driven" className="text-fg-muted font-light" />{" "}
            <SplitWord text="Impact" className="text-fg font-bold" />
          </span>
          <span className="hs-separator hs-char" aria-hidden="true">&bull;</span>
          <span className="hs-phrase text-fg-muted font-light text-[0.65em]">
            <SplitWord text="B.Tech" />{" "}
            <SplitWord text="CSE" />{" "}
            <span className="hs-char">&bull;</span>{" "}
            <SplitWord text="2024–2028" />
          </span>
        </div>

        {/* Minimalist progress bar at the bottom */}
        <div className="hs-progress-container" aria-hidden="true">
          <div className="hs-progress-bar" ref={progressRef} />
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
