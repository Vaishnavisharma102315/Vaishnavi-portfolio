"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const FeaturedVideo = ({ refForward, ...props }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: refForward,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.94, 1, 1.03]);
  const y = useTransform(scrollYProgress, [0.1, 0.9], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, y }}
      className="relative md:absolute mx-auto md:mx-0 mt-4 md:mt-0 md:top-[50vh] md:left-12 lg:left-20 md:translate-x-0 md:translate-y-0 z-30 w-[86vw] md:w-[38vw] max-w-[24rem] md:max-w-[480px] aspect-[3/4] overflow-hidden rounded-3xl border border-theme-border shadow-2xl"
      {...props}
    >
      <Image
        src="/myself.png"
        alt="Vaishnavi Sharma"
        fill
        priority
        sizes="(max-width: 768px) 85vw, 40vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-bg-alt/90 backdrop-blur-md border border-theme-border text-xs font-semibold tracking-wider text-fg flex items-center justify-between pointer-events-none shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wide">VAISHNAVI SHARMA</span>
        </div>
        <span className="text-[0.68rem] tracking-widest text-fg-muted font-medium uppercase">AI/ML ENGINEER</span>
      </div>
    </motion.div>
  );
};

export default FeaturedVideo;
