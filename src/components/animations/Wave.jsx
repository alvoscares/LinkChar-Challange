import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const Wave = () => {
  const app = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline({delay:1,repeat:5, yoyo:true, repeatDelay:0})
      .to(".path01", {morphSVG:".path02", duration: 3, ease:'none' })

    }, app);
    return () => ctx.revert();
  }, []);


  return (
    <div ref={app}>
      <svg id="svg" viewBox="0 0 800 600">
        <path
          className="path01 fill-none stroke-red-700 stroke-[20px]"
          d="M 0 150 L 150 150 L 310 150 L 450 150 L 600 150 L 750 150"
        />
        <path
          className="path02  fill-none stroke-red-700 stroke-[20px]"
          d="M 0 150 C 40 80 100 80 150 150 Q 230 230 310 150 Q 380 60 450 150 Q 530 250 600 150 Q 680 70 750 150"
        />
      </svg>
    </div>
  );
};
