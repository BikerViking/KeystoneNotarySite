import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = [logoRef.current, titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);

    if (!section || elements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.fromTo(
      elements,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      }
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" aria-labelledby="hero-title">
      <div className="hero-content">
        <img 
          ref={logoRef} 
          src="./logo-black-embossed.jpeg" 
          alt="Keystone Notary Group Logo" 
          className="hero-logo"
        />
        <h1 ref={titleRef} id="hero-title">
          Official Notary Services,
          <br />
          Modernized and Secured.
        </h1>
        <p ref={subtitleRef}>
          Reliable, professional, and certified mobile notary services for all your important documents.
        </p>
        <button ref={ctaRef} className="hero-cta">
          Schedule an Appointment
        </button>
      </div>
    </section>
  );
};

export default Hero;