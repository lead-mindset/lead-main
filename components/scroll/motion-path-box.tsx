
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function MotionPathBox() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const box = boxRef.current;
    if (!box) return;

    const getPath = () => {
      const markerEls = gsap.utils.toArray<HTMLElement>(".marker");
      if (!markerEls.length) return [];

      const start = markerEls[0].getBoundingClientRect();
      return markerEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - start.left,
          y: r.top - start.top,
        };
      });
    };

    gsap.to(box, {
      motionPath: { path: getPath(), curviness: 1.2 },
      ease: "none",
      scrollTrigger: {
        trigger: ".markers-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: () => gsap.set(box, { motionPath: { path: getPath() } }),
      },
    });
  }, []);

  return (
    <div
      ref={boxRef}
      className="absolute w-24 h-24 bg-blue-500 rounded-lg"
    />
  );
}
