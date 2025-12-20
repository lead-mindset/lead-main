
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export default function MotionPathBox() {
  const container = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const markers = gsap.utils.toArray<HTMLElement>(".marker");

    const points = markers.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2,
        y: r.top + window.scrollY + r.height / 2,
      };
    });

    gsap.to(boxRef.current, {
      motionPath: { path: points, curviness: 1.5 },
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <div
        ref={boxRef}
        className="fixed w-24 h-24 bg-blue-500 rounded-lg -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
