import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";

export default function PinnedSlogan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      logoRef.current,
      { scale: 0, transformOrigin: "center center" },
      {
        scale: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom+=100% top",
          scrub: true,
          pin: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen"
    >
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="mx-auto relative w-fit text-left"
        >
          <h1 className="font-bold text-7xl tracking-wide text-white">
            <span className="word block">
              LEARN
            </span>
            <span className="word block">
              EXPLORE
            </span>
            <span className="word block">
              ASPIRE
            </span>
            <span className="word block">
              DISCOVER.
            </span>
          </h1>
        </div>
        
        </div>
    </section>
  );
}
