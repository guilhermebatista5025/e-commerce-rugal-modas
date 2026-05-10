import styles from './BrandsMarquee.module.css';

const BRANDS = [
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Colcci', domain: 'colcci.com.br' },
  { name: 'Prison', domain: 'useprison.com.br' },
  { name: 'Malwee', domain: 'malwee.com.br' },
  { name: 'Forum', domain: 'forum.com.br' },
  { name: 'Renner', domain: 'lojasrenner.com.br' },
  { name: 'C&A', domain: 'cea.com.br' },
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
              <img 
                src={`https://logo.clearbit.com/${brand.domain}`} 
                alt={brand.name} 
                className={styles.brandLogo} 
                onError={(e) => e.target.style.display = 'none'}
              />
              <span className={styles.brandName}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
