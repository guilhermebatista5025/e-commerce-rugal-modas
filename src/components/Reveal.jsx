import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

export default function Reveal({ children, width = "100%", delay = 0 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${styles.reveal} ${isInView ? styles.visible : ''}`}
      style={{ width, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
