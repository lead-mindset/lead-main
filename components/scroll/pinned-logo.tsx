import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PinnedLogo() {
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
        <img src="/leadgrouplogo.svg" className="w-96 h-96" />
      </div>
    </section>
  );
}
