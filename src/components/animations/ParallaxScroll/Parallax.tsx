"use client";
import { useLayoutEffect, useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
const word = "with gsap";

export default function ParallaxScroll() {
  const Picture1 =
    "https://res.cloudinary.com/dkysrpdi6/raw/upload/v1718358458/igre8xvgvuxnfkse2j1q.jpg";
  const Picture2 =
    "https://res.cloudinary.com/dkysrpdi6/raw/upload/v1718358457/fjt2hg3ohmzk3nuoxg2q.jpg";
  const Picture3 =
    "https://res.cloudinary.com/dkysrpdi6/raw/upload/v1718358457/qg1hmamuxv9d3jdojt6a.jpg";

  const container = useRef(null);
  const images = [Picture1, Picture2, Picture3];
  const lettersRef = useRef([]);
  const imagesRef = useRef([]);
  const title1 = useRef(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(imagesRef.current[1], { y: -150 }, 0)
        .to(imagesRef.current[2], { y: -255 }, 0);
      lettersRef.current.forEach((letter, i) => {
        tl.to(
          letter,
          {
            top: Math.floor(Math.random() * -75) - 25,
          },
          0,
        );
      });
    });
    return () => context.revert();
  }, []);

  return (
    <div className="">
      <div ref={container} className={styles.container}>
        <div className={styles.body}>
          <h1 ref={title1}>Parallax</h1>
          <h1>Scroll</h1>
        </div>
        <div className={styles.images}>
          {images.map((image, i) => {
            return (
              <div
                key={`i_${i}`}
                //@ts-expect-error bruh
                ref={(el) => (imagesRef.current[i] = el)}
                className={styles.imageContainer}
              >
                <Image src={image} alt="image" fill />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
