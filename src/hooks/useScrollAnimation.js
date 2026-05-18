import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up all elements with class "scroll-reveal"
      gsap.utils.toArray('.scroll-reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          }
        );
      });

      // Horizontal line expand
      gsap.utils.toArray('.line-reveal').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1, duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%' }
          }
        );
      });

      // Fade from left
      gsap.utils.toArray('.slide-left').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -80 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true }
          }
        );
      });

      // Fade from right
      gsap.utils.toArray('.slide-right').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 80 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
};
