"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Contact info kept in sync with SiteFooter & Navbar
const EMAIL = "vaishusharma44444@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/vaishnavisharma10/";
const GITHUB_URL = "https://github.com/Vaishnavisharma102315";

const ArrowUpRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const statusRef = useRef(null);
  const headlineRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const eyebrowChars = eyebrowRef.current?.querySelectorAll(".ct-char") ?? [];
      const headlineChars = headlineRef.current?.querySelectorAll(".ct-char") ?? [];

      gsap.from(eyebrowChars, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        stagger: { amount: 0.4, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      if (statusRef.current) {
        gsap.from(statusRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statusRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.from(headlineChars, {
        opacity: 0,
        y: 200,
        duration: 1.4,
        stagger: { amount: 0.6, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from([emailRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: emailRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const splitChars = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="ct-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section id="contact-section" ref={sectionRef}>
      <div id="ct-eyebrow" ref={eyebrowRef}>
        {splitChars("have a project in mind?")}
      </div>

      <div
        ref={statusRef}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-border bg-bg-alt text-xs font-semibold text-fg tracking-wide my-1 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span>Open for AI/ML Roles &amp; Collaborations</span>
      </div>

      <h2 id="ct-headline" ref={headlineRef}>
        {splitChars("let's talk.")}
      </h2>

      <div
        className="flex items-center gap-2.5 flex-wrap justify-center mt-2"
        ref={emailRef}
      >
        <a
          id="ct-email"
          href={`mailto:${EMAIL}`}
          aria-label={`Email ${EMAIL}`}
          style={{ marginTop: 0 }}
        >
          {EMAIL}
        </a>
        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label="Copy email address"
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider rounded-full border border-theme-border bg-bg-alt text-fg hover:border-fg hover:text-accent transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <span className="text-emerald-500 font-bold">✓</span>
              <span>COPIED</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      <div id="ct-actions" ref={ctaRef}>
        <a id="ct-btn" href={`mailto:${EMAIL}`}>
          <span>SAY HELLO</span>
          <ArrowUpRight />
        </a>
        <a
          id="ct-btn-secondary"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>LINKEDIN</span>
          <ArrowUpRight />
        </a>
        <a
          id="ct-btn-secondary"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>GITHUB</span>
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
};

export default Contact;
