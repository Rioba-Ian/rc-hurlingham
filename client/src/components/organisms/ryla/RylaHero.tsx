"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight, Calendar, MapPin } from "lucide-react";

const RYLA_URL = "https://www.rylakenya.org?utm_source=rc_hurlingham&utm_medium=referral&utm_campaign=ryla_page";
const RYLA_REG_URL = "https://www.rylakenya.org?utm_source=rc_hurlingham&utm_medium=referral&utm_campaign=ryla_page#stay";

export default function RylaHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center border-b border-border bg-radial from-cranberry/10 via-transparent to-transparent">
      {/* Decorative Grid and Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cranberry/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cranberry/10 border border-cranberry/20 text-cranberry text-xs md:text-sm font-semibold mb-6 uppercase tracking-wider"
        >
          <Sparkles className="h-3.5 w-3.5" /> Districts 9215 & 9216 Flagship Event
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-raleway tracking-tight leading-none mb-6"
        >
          RYLA PAMOJA &apos;26 <br />
          <span className="bg-gradient-to-r from-cranberry via-orange-500 to-secondary-yellow bg-clip-text text-transparent">
            Njoo Diani
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-montserrat text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Join young professionals and leaders from across East Africa for 3 days and 3 nights of leadership development, cross-cultural connection, and coastal adventure.
        </motion.p>

        {/* Quick Event Details Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 text-xs md:text-sm font-montserrat text-muted-foreground bg-card border border-border rounded-2xl py-3.5 px-6 w-fit mx-auto shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cranberry" />
            <span>5th – 8th November 2026</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cranberry" />
            <span>Diani, Kenya</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={RYLA_REG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-cranberry text-white font-montserrat font-semibold transition-all hover:bg-cranberry/90 hover:shadow-lg hover:shadow-cranberry/20 flex items-center justify-center gap-2"
          >
            Register — Late Bird <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={RYLA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] border border-border bg-card hover:bg-muted font-montserrat font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Learn More at RYLA Kenya <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
