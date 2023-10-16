import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const Wave = () => {
  const app = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap
        .timeline()
        .to("#wave1", 4, {
          morphSVG: { shape: "#wave2" },
          ease: "linear",
        })
        .to("#wave1", 4, {
          morphSVG: { shape: "#wave3" },
          ease: "linear",
        });
    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed bottom-0 w-full ">
      <div ref={app} className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            id="wave1"
            fill="#ffd700"
            fill-opacity="1"
            d="M0,32L48,80C96,128,192,224,288,256C384,288,480,256,576,218.7C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg>
          <path
            className="wave opacity-0"
            id="wave2"
            fill="#ffd700"
            fill-opacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,90.7C672,75,768,85,864,90.7C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="wave opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            id="wave3"
            fill="#ffd700"
            fill-opacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,101.3C384,117,480,139,576,138.7C672,139,768,117,864,144C960,171,1056,245,1152,277.3C1248,309,1344,299,1392,293.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
