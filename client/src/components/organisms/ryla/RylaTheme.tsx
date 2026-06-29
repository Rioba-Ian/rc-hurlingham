"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface RylaThemeProps {
  onImageClick: (image: { src: string; alt: string }) => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function RylaTheme({ onImageClick }: RylaThemeProps) {
  const pamojaPillars = [
    {
      letter: "P",
      title: "Purpose & People",
      description: "Know yourself. Know your community. Fostering self-discovery and alignment with community needs.",
      color: "#e6007e"
    },
    {
      letter: "A",
      title: "Action & Accountability",
      description: "Stop planning. Start doing. Transitioning from ideas to execution with measurable responsibility.",
      color: "#00a7b5"
    },
    {
      letter: "M",
      title: "Management & Mobilization",
      description: "Ideas need a plan. Plans need resources. Coordinating logistics, finances, and human capital.",
      color: "#e08c12"
    },
    {
      letter: "O",
      title: "Opportunity & Ownership",
      description: "Every problem is a leadership opportunity. Taking charge of challenges and driving sustainable change.",
      color: "#8e2d8e"
    },
    {
      letter: "J",
      title: "Journey",
      description: "Cross-cultural collaboration and networking. Bridging regional districts to build lasting connections.",
      color: "#016b78"
    },
    {
      letter: "A",
      title: "Advancement",
      description: "Sustainability, scale, and leadership legacy. Leaving a lasting impact on the next generation.",
      color: "#0a2540"
    }
  ];

  return (
    <section id="theme" className="py-24 bg-muted/30 border-b border-border">
      <div className="container mx-auto px-6 max-w-[1080px]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-cranberry uppercase tracking-widest mb-3 font-montserrat">
            The Pamoja Philosophy
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-raleway text-neutral-800 dark:text-neutral-100">
            Leadership, Spelled Out
          </h3>
          <p className="mt-4 text-muted-foreground font-montserrat">
            <span className="font-semibold text-foreground">Pamoja</span> means <span className="font-semibold text-foreground">together</span>. This year&apos;s theme is a six-part leadership journey that carries delegates from self-discovery all the way to lasting regional impact.
          </p>
        </div>

        {/* Pillar Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pamojaPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              whileHover={{ borderColor: pillar.color, translateY: -4 }}
              className="group relative overflow-hidden p-7 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span 
                  className="font-raleway font-black text-6xl leading-none transition-transform duration-300 group-hover:scale-110 select-none"
                  style={{ color: pillar.color }}
                >
                  {pillar.letter}
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                  Pillar 0{idx + 1}
                </span>
              </div>
              <h4 className="font-raleway text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                {pillar.title}
              </h4>
              <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pamoja Theme Blueprint Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 space-y-4"
        >
          <div 
            onClick={() => onImageClick({
              src: "https://res.cloudinary.com/drxurk7lu/image/upload/v1782730686/rc-hurlingham/pamoja-theme_glkzuj.avif",
              alt: "The Pamoja blueprint — how each PAMOJA pillar maps to a regional Mini RYLA on the road to Diani"
            })}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-card shadow-md cursor-zoom-in group"
          >
            <Image 
              src="https://res.cloudinary.com/drxurk7lu/image/upload/v1782730686/rc-hurlingham/pamoja-theme_glkzuj.avif" 
              alt="The Pamoja blueprint — how each PAMOJA pillar maps to a regional Mini RYLA on the road to Diani"
              fill
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="object-cover md:object-contain transition-opacity duration-300 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
              <span className="text-white bg-black/70 px-4 py-2 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
              </span>
            </div>
          </div>
          <p className="text-center text-xs md:text-sm text-muted-foreground font-montserrat italic">
            The Pamoja blueprint — each pillar comes alive at a regional Mini RYLA, building toward the Main RYLA in Diani.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
