import { useLayoutEffect, useRef } from "react";
import useAuth from "../utils/hooks/useAuth";
import gsap from "gsap";

export const LinksLogin = () => {
  const { fetchCreateRequestToken, fetchCreateGuestSession } = useAuth();

  const container = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const labels = self.selector(".label");
      tl.current = gsap
        .timeline()
        .from(labels[0], { x: 200, opacity: 0, duration: 2 })
        .from(labels[1], { x: 200, opacity: 0, duration: 2 }, "<");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={container}
      className="text-white md:text-xl flex flex-col gap-y-4 md:gap-y-7 w-60"
    >
      <h2
        className="label md:hover:text-2xl duration-300 cursor-pointer md:hover:underline"
        onClick={fetchCreateRequestToken}
      >
        Log In
      </h2>
      <h2
        className="label md:hover:text-2xl duration-300 cursor-pointer md:hover:underline"
        onClick={fetchCreateGuestSession}
      >
        Enter as a Guest
      </h2>
    </div>
  );
};
