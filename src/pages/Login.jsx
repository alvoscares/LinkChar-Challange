import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";

import useAuth from "../utils/hooks/useAuth";
import { Spinner } from "../components/Spinner";

export const Login = () => {
  const { fetchCreateRequestToken, fetchCreateGuestSession, isLoading } =
    useAuth();

  const app = useRef();
  const tl = useRef();

  useEffect(() => {
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
      className="flex flex-col md:flex-row items-center text-center md:text-left md:gap-48"
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="text-white md:text-xl flex flex-col gap-y-4 md:gap-y-7 w-60">
          <h2
            className="label1 md:hover:text-2xl duration-300 cursor-pointer md:hover:underline"
            onClick={fetchCreateRequestToken}
          >
            Log In
          </h2>
          <h2
            className="label2 md:hover:text-2xl duration-300 cursor-pointer md:hover:underline"
            onClick={fetchCreateGuestSession}
          >
            Enter as a Guest
          </h2>
        </div>
      )}
    </div>
  );
};
