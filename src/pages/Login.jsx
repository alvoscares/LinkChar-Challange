import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import useAuth from "../utils/hooks/useAuth";
import { Spinner } from "../components/Spinner";
import { LinksLogin } from "../components/LinksLogin";

export const Login = () => {
  const { isLoading } = useAuth();

  const app = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap.timeline().from(
        ".logo",
        {
          y: -200,
          opacity: 0,
          ease: "bounce.out",
          duration: 2,
        },
        1
      );
    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={app}
      className="flex flex-col md:flex-row items-center text-center md:text-left md:gap-36"
    >
      <div className="logo text-white">
        <h1 className="text-6xl font-axiforma-bold text-center ">
          LinkChar
          <div className="h-2 bg-gradient-to-r from-pink-500 to-red-500 animate-pulse" />
        </h1>
        <p className="text-sm text-left mt-4 mb-7">
          Challenge by:
          <span className="text-base"> Álvaro Oscares Robles</span>
        </p>
      </div>
      {isLoading ? <Spinner /> : <LinksLogin />}
    </div>
  );
};
