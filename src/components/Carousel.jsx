// src/components/Carousel.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Carousel.module.css';

const SLIDES = [
  {
    id: 1,
    image: '/images/imagem1.png',
    title: 'URBAN ELEGANCE',
    subtitle: 'Descubra a nova coleção Outono/Inverno com peças exclusivas que definem o seu estilo.',
    cta: 'Ver Coleção',
    link: '/loja?category=Feminino',
    badge: 'NOVO',
  },
  {
    id: 2,
    image: '/images/imagem2.png',
    title: 'ESSENTIALS FOR HIM',
    subtitle: 'O equilíbrio perfeito entre o casual e o sofisticado para o homem moderno.',
    cta: 'Explorar',
    link: '/loja?category=Masculino',
    badge: null,
  },
  {
    id: 3,
    image: '/images/imagem3.png',
    title: 'GOLD SELECTION',
    subtitle: 'Peças selecionadas com qualidade ouro e descontos de até 40% OFF.',
    cta: 'Ver Ofertas',
    link: '/loja',
    badge: 'PROMO',
  },
];

export default function Carousel({ autoPlay = true, interval = 3000 }) {
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
            <div className={styles.actions}>
               <button className={styles.cta}>{slide.cta}</button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button className={[styles.navBtn, styles.prev].join(' ')} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior">
        <ChevronLeft size={32} />
      </button>
      <button className={[styles.navBtn, styles.next].join(' ')} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Próximo">
        <ChevronRight size={32} />
      </button>

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
