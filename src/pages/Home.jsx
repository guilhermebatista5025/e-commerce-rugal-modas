import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RotateCcw, CreditCard, ChevronRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import BrandsMarquee from '../components/BrandsMarquee';
import ReviewsSection from '../components/ReviewsSection';
import LocationSection from '../components/LocationSection';
import IntroSplash from '../components/IntroSplash';
import Reveal from '../components/Reveal';
import styles from './Home.module.css';

const ProductCard = lazy(() => import('../components/ProductCard'));

import { useProducts } from '../context/ProductContext';

const CATEGORIES_SHOWCASE = [
  { label: 'Relógios',  img: '/categorias/relogio1.png',  to: '/loja?category=Relógio' },
  { label: 'Masculino', img: '/categorias/conjunto1.png', to: '/loja?category=Masculino' },
];

const SERVICES = [
  { icon: <Truck size={24} />, title: 'Entrega Rápida', desc: 'Envio para todo o Brasil' },
  { icon: <ShieldCheck size={24} />, title: 'Compra Segura', desc: 'Seus dados 100% protegidos' },
  { icon: <RotateCcw size={24} />, title: 'Devolução Fácil', desc: 'Até 7 dias para trocar' },
  { icon: <CreditCard size={24} />, title: 'Pagamento Flexível', desc: 'Até 12x no cartão' },
];

export default function Home() {
  const { products } = useProducts();
  const FEATURED = products.filter(p => p.promo).slice(0, 4);

  return (
    <main className={styles.home}>
      {/* Intro Animada */}
      <IntroSplash />

      {/* Hero Carousel */}
      <Carousel />

      {/* Marquee de Marcas */}
      <Reveal delay={0.2}>
        <BrandsMarquee />
      </Reveal>

      {/* Novidades (Destaques) */}
      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Novidades</h2>
              <Link to="/loja" className={styles.seeAll}>Ver todos</Link>
            </div>
          </Reveal>
          <div className="products-grid">
            <Suspense fallback={<div className="spinner" />}>
              {FEATURED.map((p, i) => (
                <Reveal key={p._id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Dual Category Banners */}
      <section className={styles.dualBanners}>
        <div className="container">
          <div className={styles.bannersGrid}>
            {CATEGORIES_SHOWCASE.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.2}>
                <Link to={cat.to} className={styles.bannerCard}>
                  <img src={cat.img} alt={cat.label} loading="lazy" />
                  <div className={styles.bannerContent}>
                    <h3>{cat.label}</h3>
                    <span className={styles.bannerCta}>Descobrir <ChevronRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Avaliações Padrão Ouro */}
      <Reveal>
        <ReviewsSection />
      </Reveal>

      {/* Sobre / Loja */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <Reveal width="100%">
              <div className={styles.aboutText}>
                <span className={styles.label}>Rugal Modas</span>
                <h2>Estilo e Qualidade em cada detalhe</h2>
                <p>
                  A Rugal Modas nasceu da paixão por moda acessível e de qualidade.
                  Oferecemos as melhores peças com curadoria exclusiva para quem busca estilo e conforto.
                </p>
                <Link to="/loja" className={styles.ctaAbout}>Conhecer Loja</Link>
              </div>
            </Reveal>
            <Reveal width="100%">
              <div className={styles.videoWrap}>
                 <div className={styles.placeholderImg}>
                    <img src="/images/loja-placeholder.png" alt="Nossa Loja" />
                 </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Localização */}
      <Reveal>
        <LocationSection />
      </Reveal>

      {/* Serviços / Benefícios (Invertido e no final) */}
      <section className={styles.servicesMarquee}>
        <div className={styles.marqueeTrackInverted}>
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <div key={i} className={styles.serviceItem}>
              <div className={styles.serviceIcon}>{s.icon}</div>
              <div className={styles.serviceText}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}