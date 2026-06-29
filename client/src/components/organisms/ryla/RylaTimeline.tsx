"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RylaTimeline() {
  const steps = [
    {
      number: "01",
      title: "Apply & Discover",
      description: "Submit your application. We look for passionate young leaders (ages 18-30) in Nairobi who are eager to develop their skills and serve the community."
    },
    {
      number: "02",
      title: "Orientation & Prep",
      description: "Meet your cohort and facilitators. Participate in pre-event icebreakers and establish personal growth goals for the program."
    },
    {
      number: "03",
      title: "The RYLA Camp",
      description: "An intensive multi-day experience packed with leadership seminars, outdoor challenges, expert guest speakers, and collaborative workshops."
    },
    {
      number: "04",
      title: "Action & Mentorship",
      description: "Apply your newly acquired skills. Graduates receive continued mentorship and opportunities to lead signature projects within the Rotaract Club."
    }
  ];

  return (
    <section className="py-24 relative bg-muted/20">
      <div className="absolute inset-0 bg-radial from-secondary-yellow/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-[880px]">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-semibold text-cranberry uppercase tracking-widest mb-3 font-montserrat">
            The Experience
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-raleway text-neutral-800 dark:text-neutral-100">
            Your RYLA Journey
          </h3>
          <p className="mt-4 text-muted-foreground font-montserrat">
            Here is how we guide you through the RYLA journey from candidate to empowered leader.
          </p>
        </div>

        <div className="relative border-l border-border dark:border-neutral-800 ml-4 md:ml-32 space-y-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-88px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline node */}
              <div className="absolute -left-[13px] top-1.5 h-6 w-6 rounded-full border-4 border-background bg-border group-hover:bg-cranberry group-hover:border-cranberry/30 transition-all duration-300" />
              
              {/* Timeline Step Number (shows on left of timeline for desktop) */}
              <div className="hidden md:block absolute -left-32 top-0 w-24 text-right pr-4">
                <span className="font-raleway text-4xl font-extrabold text-muted-foreground/30 group-hover:text-cranberry/40 transition-colors duration-300">
                  {step.number}
                </span>
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2.5 md:hidden">
                  <span className="font-raleway text-xl font-bold text-cranberry">
                    {step.number}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                </div>
                <h4 className="font-raleway text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  {step.title}
                </h4>
                <p className="font-montserrat text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
