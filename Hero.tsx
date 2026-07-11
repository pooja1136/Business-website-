import React, { useState } from "react";
import Button from "./Button";

const NAV_LINKS = ["About", "Services", "Journal", "Contact"];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video — replace src with your own hero footage */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        // src="/assets/hero-video.mp4"
      >
        {/* <source src="/assets/hero-video.mp4" type="video/mp4" /> */}
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1420] via-[#3a1b28] to-[#0a0608]" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        <span className="font-dancing text-white text-2xl md:text-3xl">Reveal</span>

        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button className="!px-6 !py-2.5 !text-sm">Book a consultation</Button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden relative w-7 h-6 z-50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute left-0 top-0 w-full h-[2px] bg-white transition-all duration-300"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              transform: menuOpen ? "translateY(9px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white transition-all duration-300"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scale(0)" : "scale(1)",
            }}
          />
          <span
            className="absolute left-0 bottom-0 w-full h-[2px] bg-white transition-all duration-300"
            style={{
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              transform: menuOpen ? "translateY(-9px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 z-40 transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="flex flex-col h-full justify-center px-10 gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className="text-white text-lg font-light transition-all"
              style={{
                transitionDelay: menuOpen ? `${150 + i * 75}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
              }}
            >
              {link}
            </a>
          ))}
          <div
            className="mt-4 transition-all"
            style={{
              transitionDelay: menuOpen ? "450ms" : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(20px)",
            }}
          >
            <Button>Book a consultation</Button>
          </div>
        </div>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-[120px] px-4 z-10">
        <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow">
          Gentle touch.
          <br />
          Radiant presence.
        </h1>
        <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl">
          Expert hair, makeup, and holistic beauty care — delivered with warmth and intention.
        </p>
        <Button className="mt-6 md:mt-9">Begin your renewal</Button>
      </div>

      {/* Sound indicator */}
      <div className="hidden md:flex absolute bottom-8 left-8 items-center gap-3 z-10">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-3 h-[2px] bg-white/60 rounded-full" />
        </div>
        <div className="text-white/60 text-xs leading-tight">
          <p>Experience</p>
          <p>with sound</p>
        </div>
      </div>
    </section>
  );
}
