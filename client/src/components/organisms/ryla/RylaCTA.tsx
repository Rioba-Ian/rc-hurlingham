"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const RYLA_URL = "https://www.rylakenya.org?utm_source=rc_hurlingham&utm_medium=referral&utm_campaign=ryla_page";
const RYLA_REG_URL = "https://www.rylakenya.org?utm_source=rc_hurlingham&utm_medium=referral&utm_campaign=ryla_page#stay";

export default function RylaCTA() {
  return (
    <section className="py-20 border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-neutral-900 text-neutral-50 px-8 py-16 md:p-16 text-center shadow-xl border border-white/10"
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-cranberry/30 via-transparent to-secondary-yellow/15 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cranberry/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold font-raleway mb-6 leading-tight">
              Ready to join us in Diani?
            </h3>
            <p className="text-sm md:text-base font-montserrat text-neutral-300 mb-10 leading-relaxed">
              Late Bird registration is now open on the official RYLA Kenya portal. Choose your accommodation suite (Rafiki sharing, Pamoja group, or Safari single) with payment plan options.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={RYLA_REG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-cranberry text-white font-montserrat font-semibold transition-all hover:bg-cranberry/90 hover:shadow-lg hover:shadow-cranberry/20 flex items-center justify-center gap-2"
              >
                Register Now — Late Bird <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href={RYLA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] border border-white/20 bg-white/5 hover:bg-white/10 text-white font-montserrat font-semibold transition-colors"
              >
                Learn More about Packages
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
