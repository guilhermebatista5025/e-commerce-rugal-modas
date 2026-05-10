import styles from './BrandsMarquee.module.css';

const BRANDS = [
  'Nike', 'Colcci', 'Prison', 'Malwee', 'Streat', 'Forum', 'Renner', 'C&A'
];

export default function BrandsMarquee() {
  // Duplicamos a lista para criar o efeito infinito sem gaps
  const doubledBrands = [...BRANDS, ...BRANDS];

  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {doubledBrands.map((brand, i) => (
            <div key={i} className={styles.brandItem}>
              <span className={styles.brandName}>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
