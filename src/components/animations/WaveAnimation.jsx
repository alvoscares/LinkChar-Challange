// import React, { useEffect, useLayoutEffect, useRef } from "react";
// import gsap from "gsap";

// const WaveAnimation = () => {
//   const waves = useRef();

//   //   let wave1 = createWave(context, {
//   //     amplitude: 50,
//   //     duration: 4,
//   //     fillStyle: "rgba(103,58,183,0.8)",
//   //     frequency: 2.5,
//   //     width: vw,
//   //     height: vh,
//   //     segments: 100,
//   //     waveHeight: vh * 0.25,
//   //   });

//   const createWave = (ctx, options = {}) => {
//     // API
//     let wave = {
//       // Properties
//       amplitude: options.amplitude || 200,
//       ctx,
//       curviness: options.curviness || 0.75,
//       duration: options.duration || 2,
//       fillStyle: options.fillStyle || "rgba(33,150,243,1)",
//       frequency: options.frequency || 4,
//       height: options.height || 600,
//       points: [],
//       segments: options.segments || 100,
//       tweens: [],
//       waveHeight: options.waveHeight || 300,
//       width: options.width || 800,
//       x: options.x || 0,
//       y: options.y || 0,

//       // Methods
//       init: init,
//       draw: draw,
//       kill: kill,
//     };

//     init();

//     function kill() {
//       let tweens = wave.tweens;
//       let len = tweens.length;

//       for (let i = 0; i < len; i++) {
//         tweens[i].kill();
//       }

//       tweens.length = 0;
//       wave.points.length = 0;
//     }

//     function init() {
//       kill();

//       let segments = wave.segments;
//       let interval = wave.width / segments;

//       for (let i = 0; i <= segments; i++) {
//         let norm = i / segments;
//         let point = {
//           x: wave.x + i * interval,
//           y: 1,
//         };

//         let tween = gsap
//           .to(point, {
//             duration: wave.duration,
//             y: -1,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//           })
//           .progress(norm * wave.frequency);

//         wave.tweens.push(tween);
//         wave.points.push(point);
//       }
//     }

//     function draw() {
//       const points = wave.points;
//       const len = points.length;

//       const startY = wave.waveHeight;
//       const height = wave.amplitude / 2;

//       // Usamos el contexto de GSAP en lugar del contexto 2D del canvas
//       ctx.begin();

//       // Movemos al primer punto
//       ctx.moveTo(points[0].x, startY + points[0].y * height);

//       // Dibujamos las líneas entre los puntos
//       for (let i = 1; i < len; i++) {
//         const point = points[i];
//         ctx.lineTo(point.x, startY + point.y * height);
//       }

//       // Cerramos la figura
//       ctx.lineTo(wave.x + wave.width, wave.y + wave.height);
//       ctx.lineTo(wave.x, wave.y + wave.height);

//       // Establecemos el relleno
//       ctx.style.fill(wave.fillStyle);
//     }

//     return wave;
//   };

//   function update() {
//     let len = waves.length;

//     context.clearRect(0, 0, vw, vh);
//     context.globalCompositeOperation = "soft-light";

//     for (let i = 0; i < len; i++) {
//       waves[i].draw();
//     }
//   }

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {

//       gsap.ticker.add(update);
//     }, waves);
//     let wave1 = createWave(ctx, {
//       amplitude: 50,
//       duration: 4,
//       fillStyle: "rgba(103,58,183,0.8)",
//       frequency: 2.5,
//     });
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={waves}>
//       {/* <div className="wave1 h-20 w-64 bg-blue-700"></div> */}
//     </div>
//   );
// };

// export default WaveAnimation;
