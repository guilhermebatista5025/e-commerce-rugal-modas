import styles from './BrandsMarquee.module.css';

const BRANDS = [
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Jordan', domain: 'jordan.com' },
  { name: 'High', domain: 'highcompanybr.com' },
  { name: 'Fire', domain: 'fire.com' },
  { name: 'Vans', domain: 'vans.com.br' },
  { name: 'Supreme', domain: 'supremenewyork.com' },
  { name: 'Off-White', domain: 'off---white.com' },
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
