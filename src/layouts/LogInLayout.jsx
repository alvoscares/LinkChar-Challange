import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";

import useAuth from "../utils/hooks/useAuth";
import { Wave } from "../components/animations/Wave";

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );

  return <div className={`circle -z-10 -translate-x-2/4 -translate-y-2/4 opacity-30 left-0 top-0 fixed  ${size} bg-red-400 rounded-full`} ref={el}></div>;
});

export const LogInLayout = () => {
  const circleRefs = useRef([]);

  // reset on re-renders
  circleRefs.current = [];

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRefs.current.forEach((ref) =>
      ref.moveTo(innerWidth / 2, innerHeight / 2)
    );

    const onMove = ({ clientX, clientY }) => {
      circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };

    window.addEventListener("pointermove", onMove);

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const addCircleRef = (ref) => {
    if (ref) {
      circleRefs.current.push(ref);
    }
  };

  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn && (
        <main className="h-screen w-screen flex items-start md:items-center justify-center pt-10 md:p-0 relative">
          <Outlet />
          {/* <Wave /> */}
          <Circle size="w-[30px] h-[30px] bg-red-500" ref={addCircleRef} delay={0} />
          <Circle size="w-[60px] h-[60px]" ref={addCircleRef} delay={0.1} />
          <Circle size="w-[90px] h-[90px] bg-pink-500" ref={addCircleRef} delay={0.2} />
        </main>
      )}
    </>
  );
};
