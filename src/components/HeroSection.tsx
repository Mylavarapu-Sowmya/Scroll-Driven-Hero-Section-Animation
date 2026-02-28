import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "@/assets/car.png";
import roadImage from "@/assets/road.png";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_TEXT = "WELCOME  ITZFIZZ";

const metrics = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "150+", label: "Projects Delivered" },
  { value: "4x", label: "Revenue Growth" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.fromTo(
        roadRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );
      gsap.fromTo(
        carRef.current,
        { opacity: 0, x: "-5%" },
        { opacity: 1, x: "0%", duration: 1.2, delay: 0.5, ease: "power3.out" }
      );

      // Scroll-driven car movement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Car moves from left to right (shorter distance)
      tl.to(
        carRef.current,
        {
          x: "55vw",
          scale: 1.05,
          ease: "none",
          duration: 1,
        },
        0
      );

      // Road parallax
      tl.to(
        roadRef.current,
        {
          x: "-5%",
          ease: "none",
          duration: 1,
        },
        0
      );

      // Text reveal via clip-path width expansion
      tl.fromTo(
        textRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          duration: 0.8,
        },
        0.1
      );

      // Metrics fade in
      tl.fromTo(
        ".metric-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power3.out",
          duration: 0.3,
        },
        0.6
      );

      // Background transitions from dark to light
      tl.to(
        bgRef.current,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.5,
        },
        0.4
      );

      // Text color shift to dark for readability
      tl.to(
        textRef.current,
        {
          color: "hsl(0 0% 10%)",
          ease: "none",
          duration: 0.4,
        },
        0.5
      );

      // Metrics text also shifts dark
      tl.to(
        ".metric-item",
        {
          color: "hsl(0 0% 10%)",
          ease: "none",
          duration: 0.4,
        },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[150vh]"
    >
      <div className="relative w-full h-screen overflow-hidden bg-background">
        {/* Light mode background overlay — below road */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
          style={{ background: "hsl(0 0% 95%)" }}
        />

        {/* Road — above bg overlay so it stays dark */}
        <div className="absolute inset-0 flex items-center justify-center z-[1]">
          <img
            ref={roadRef}
            src={roadImage}
            alt="Dark road"
            className="w-[120%] max-w-none h-auto object-cover opacity-0"
            style={{ willChange: "transform, opacity" }}
          />
        </div>

        {/* Car */}
        <img
          ref={carRef}
          src={carImage}
          alt="Sports car"
          className="absolute z-[2] w-[280px] md:w-[380px] lg:w-[440px] opacity-0"
          style={{
            bottom: "38%",
            left: "5%",
            willChange: "transform, opacity",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))",
          }}
        />

        {/* Text reveal */}
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center pointer-events-none">
          <div
            ref={textRef}
            className="text-center"
            style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
          >
            <h1 className="text-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-[0.3em] text-foreground leading-tight">
              {HEADLINE_TEXT.split("").map((char, i) => (
                <span
                  key={i}
                  className={char === " " ? "inline-block w-3 md:w-5" : "inline-block"}
                >
                  {char}
                </span>
              ))}
            </h1>
            <div className="mt-4 h-1 w-32 md:w-48 mx-auto bg-primary rounded-full" />
          </div>

          {/* Metrics */}
          <div
            ref={metricsRef}
            className="mt-16 md:mt-24 flex flex-col md:flex-row gap-8 md:gap-16"
          >
            {metrics.map((m, i) => (
              <div key={i} className="metric-item text-center opacity-0">
                <div className="text-display text-3xl md:text-5xl font-bold text-primary">
                  {m.value}
                </div>
                <div className="text-body text-sm md:text-base text-muted-foreground mt-2 tracking-wider uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 animate-pulse">
          <span className="text-body text-xs text-muted-foreground tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
