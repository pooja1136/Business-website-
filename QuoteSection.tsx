import React, { useEffect, useRef } from "react";

function clamp(min: number, max: number, v: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const leftCloudRef = useRef<HTMLDivElement>(null);
  const rightCloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;

    // current (smoothed) values
    let skyY = 120;
    let leftX = -200;
    let leftY = 0;
    let leftOpacity = 0;
    let rightX = 200;
    let rightY = 0;
    let rightOpacity = 0;

    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = clamp(
          0,
          1,
          (windowHeight - rect.top) / (windowHeight + rect.height)
        );

        // Sky/rainbow-layer parallax: +120px -> -160px
        const skyTarget = 120 + (-160 - 120) * progress;
        skyY = lerp(skyY, skyTarget, 0.06);

        // Clouds slide in between progress 0.12 - 0.92
        const inView = progress > 0.12 && progress < 0.92;
        const leftXTarget = inView ? 0 : -200;
        const rightXTarget = inView ? 0 : 200;
        const cloudYTarget = progress * -50;

        leftX = lerp(leftX, leftXTarget, 0.04);
        rightX = lerp(rightX, rightXTarget, 0.04);
        leftY = lerp(leftY, cloudYTarget, 0.04);
        rightY = lerp(rightY, cloudYTarget, 0.04);

        const leftOpacityTarget = clamp(0, 1, 1 - Math.abs(leftX) / 200);
        const rightOpacityTarget = clamp(0, 1, 1 - Math.abs(rightX) / 200);
        leftOpacity = lerp(leftOpacity, leftOpacityTarget, 0.06);
        rightOpacity = lerp(rightOpacity, rightOpacityTarget, 0.06);

        if (skyRef.current) {
          skyRef.current.style.transform = `translate3d(0, ${skyY}px, 0)`;
        }
        if (leftCloudRef.current) {
          leftCloudRef.current.style.transform = `translate3d(${leftX}px, ${leftY}px, 0)`;
          leftCloudRef.current.style.opacity = `${leftOpacity}`;
        }
        if (rightCloudRef.current) {
          rightCloudRef.current.style.transform = `translate3d(${rightX}px, ${rightY}px, 0)`;
          rightCloudRef.current.style.opacity = `${rightOpacity}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)",
      }}
    >
      {/* Sky glow layer — stands in for the "rainbow" image asset */}
      <div
        ref={skyRef}
        className="absolute inset-x-0 top-0 z-30 h-[60%] will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,214,214,0.35), rgba(214,235,255,0.15) 45%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* Left cloud shape — CSS blob standing in for the cloud image */}
      <div
        ref={leftCloudRef}
        className="hidden sm:block absolute left-0 bottom-[10%] z-10 w-[500px] md:w-[650px] h-[220px] will-change-transform"
        style={{
          marginLeft: "-50%",
          opacity: 0,
          background:
            "radial-gradient(ellipse 60% 100% at 30% 60%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(ellipse 50% 80% at 60% 50%, rgba(255,255,255,0.4), transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Right cloud shape (mirrored) */}
      <div
        ref={rightCloudRef}
        className="hidden sm:block absolute right-0 bottom-[15%] z-10 w-[500px] md:w-[650px] h-[220px] will-change-transform"
        style={{
          marginRight: "-75%",
          opacity: 0,
          background:
            "radial-gradient(ellipse 60% 100% at 70% 60%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(ellipse 50% 80% at 40% 50%, rgba(255,255,255,0.4), transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Quote content */}
      <div className="relative z-20 max-w-4xl px-6 text-center">
        <p className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]">
          &ldquo;Reveal was founded on a belief in beauty that honors your own
          nature. We take the time to understand what matters to you before
          deciding what serves you best — no rushing, no excess, just care
          that lets you feel radiant.&rdquo;
        </p>
        <p className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide">
          Founder, Reveal Studio
        </p>
      </div>
    </section>
  );
}
