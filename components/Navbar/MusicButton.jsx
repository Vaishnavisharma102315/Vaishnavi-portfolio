"use client";

import React, { useEffect, useState } from 'react'

// Sun / moon glyphs match the rest of the navbar's stroked SVG style.
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Site-wide theme switcher: reads/writes the active theme on
// `document.documentElement` (matching the layout script), persists to
// localStorage, and supports compact mode for mobile navbar/drawers.
const ThemeButton = ({ compact = false, className = "" }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const current = document.documentElement.dataset.theme || 'dark';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = next;
    }
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // localStorage may be unavailable (private mode, etc.)
    }
  };

  const isDark = theme === 'dark';
  const label = isDark ? 'LIGHT' : 'DARK';

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={isDark}
        className={className || "nav_btn_sm flex items-center justify-center cursor-pointer transition-transform hover:scale-105"}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      className={className || 'nav_btn_lg nav_btn_light flex items-center justify-center hover:bg-brblue py-6 cursor-pointer'}
    >
      <span className="mr-1.5">{isDark ? <SunIcon /> : <MoonIcon />}</span>
      {label}
    </button>
  );
};

export default ThemeButton;
