import { useState, useEffect } from 'react';
import styles from './IntroSplash.module.css';

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Inicia a animação de impacto após um pequeno delay
    const startTimer = setTimeout(() => setIsAnimating(true), 100);
    
    // Finaliza o splash
    const endTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.splashContainer} ${isAnimating ? styles.animateOut : ''}`}>
      <div className={styles.layers}>
        <div className={styles.layer1}></div>
        <div className={styles.layer2}></div>
        <div className={styles.layer3}></div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <span className={styles.letter} data-letter="R">R</span>
          <span className={styles.letter} data-letter="U">U</span>
          <span className={styles.letter} data-letter="G">G</span>
          <span className={styles.letter} data-letter="A">A</span>
          <span className={styles.letter} data-letter="L">L</span>
        </div>
        <div className={styles.shimmerLine} />
        <div className={styles.tagline}>ESTABLISHED IN EXCELLENCE</div>
      </div>

      {/* Partículas de Brilho */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--delay': `${Math.random() * 2}s`,
            '--size': `${Math.random() * 3 + 1}px`
          }} />
        ))}
      </div>
    </div>
  );
}
