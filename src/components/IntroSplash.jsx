import { useState, useEffect } from 'react';
import styles from './IntroSplash.module.css';

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // A animação dura cerca de 3.5 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.splashContainer}>
      <div className={styles.content}>
        {/* Camada de brilho/varredura de ouro */}
        <div className={styles.logoWrapper}>
          <h1 className={styles.logoText}>RUGAL</h1>
          <div className={styles.goldSweep} />
        </div>
        <div className={styles.subtext}>MODA • ESTILO • QUALIDADE</div>
      </div>
      <div className={styles.bgVignette} />
    </div>
  );
}
