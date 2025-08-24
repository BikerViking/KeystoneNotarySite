import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || cards.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // Animation starts when the top of the section is 80% down the viewport
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.fromTo(cards, 
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    // Cleanup ScrollTrigger instance on component unmount
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  const servicesData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3 1l-3 1m12-1.091V8.25m-6 2.25V5.625m0 3.75L6.75 11m-1.5-1.5l-3-1m3 1l3 1" />
        </svg>
      ),
      title: 'Real Estate Closings',
      description: 'Ensuring smooth, secure, and legally sound transactions for all your property closing needs with meticulous attention to detail.',
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      title: 'Legal Affidavits',
      description: 'Professional handling of sworn statements and legal affirmations. We certify your documents with the highest degree of integrity and confidentiality.',
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a1.125 1.125 0 001.125-1.125V6.75a1.125 1.125 0 00-1.125-1.125H4.5A1.125 1.125 0 003.375 6.75v10.5a1.125 1.125 0 001.125 1.125z" />
        </svg>
      ),
      title: 'Mobile Notary Services',
      description: 'Convenience brought to your doorstep. We provide on-demand notary services at your preferred location, saving you time and effort.',
    },
  ];

  return (
    <section ref={sectionRef} className="services-section" aria-labelledby="services-title">
      <h2 id="services-title">Our Core Services</h2>
      <p className="section-subtitle">
        Providing comprehensive notary solutions with professionalism and trust.
      </p>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            className="service-card"
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
          >
            <div className="service-card__icon" aria-hidden="true">
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;