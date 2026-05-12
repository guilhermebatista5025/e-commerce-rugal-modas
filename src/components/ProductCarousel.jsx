// src/components/ProductCarousel.jsx
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import styles from './ProductCarousel.module.css';

export default function ProductCarousel({ products }) {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setIsDragging(false);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e) => {
    if (!isDown || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    if (Math.abs(x - startX) > 5) {
      setIsDragging(true);
      window.getSelection().removeAllRanges(); // clear text selection when dragging
    }
    e.preventDefault();
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll by 80% of container width
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <button 
        className={`${styles.arrowBtn} ${styles.leftArrow}`} 
        onClick={() => scroll('left')}
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <div 
        className={`${styles.carouselTrack} ${isDown ? styles.active : ''} ${isDragging ? styles.dragging : ''}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((p) => (
          <div key={p._id} className={styles.cardWrapper}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button 
        className={`${styles.arrowBtn} ${styles.rightArrow}`} 
        onClick={() => scroll('right')}
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
