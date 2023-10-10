import React, { useEffect } from "react";
import { gsap } from "gsap";

const Footer = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(".wave", {
      duration: 2,
      scaleY: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    tl.to(".wave", {
      duration: 2,
      scaleX: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <footer>
      <div className="wave">Contenido del footer</div>
    </footer>
  );
};

export default Footer;