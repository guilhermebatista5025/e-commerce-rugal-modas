// src/components/Carousel.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Carousel.module.css';

const SLIDES = [
  {
    id: 1,
    image: '/images/imagem1.png',
    title: 'Nova Coleção Jaquetas',
    subtitle: 'Peças leves, modernas e cheias de estilo para os dias frios.',
    cta: 'Ver Coleção',
    link: '/loja?category=Feminino',
    badge: 'NOVO',
  },
  {
    id: 2,
    image: '/images/imagem2.png',
    title: 'Moda Masculina',
    subtitle: 'Do casual ao social, encontre o look perfeito para cada momento.',
    cta: 'Explorar',
    link: '/loja?category=Masculino',
    badge: null,
  },
  {
    id: 3,
    image: '/images/imagem3.png',
    title: 'Promoções Especiais',
    subtitle: 'Até 40% OFF em centenas de produtos selecionados.',
    cta: 'Ver Ofertas',
    link: '/loja',
    badge: 'PROMO',
  },
];

export default function Carousel({ autoPlay = true, interval = 5000 }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const touchX = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);
  const goTo = useCallback((i) => setCurrent(i), []);

  useEffect(() => {
    if (!autoPlay || paused) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, paused, interval, next]);

  /* === Touch / Swipe === */
  const handleTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchX.current = null;
    setPaused(false);
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={[styles.slide, i === current ? styles.active : ''].join(' ')}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={i !== current}
          onClick={() => navigate(slide.link)}
        >
          <div className={styles.overlay} />
          <div className={styles.content}>
            {slide.badge && (
              <span className={[
                styles.badge,
                slide.badge === 'PROMO' ? styles.badgePromo : styles.badgeNew
              ].join(' ')}>
                {slide.badge}
              </span>
            )}
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={[styles.dot, i === current ? styles.dotActive : ''].join(' ')}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
