import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RotateCcw, CreditCard, ChevronRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import BrandsMarquee from '../components/BrandsMarquee';
import styles from './Home.module.css';

const ProductCard = lazy(() => import('../components/ProductCard'));

import { products } from '../data/products';

const FEATURED = products.filter(p => p.promo).slice(0, 4);

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
  return (
    <main className={styles.home}>
      {/* Hero Carousel */}
      <Carousel />

      {/* Marquee de Marcas */}
      <BrandsMarquee />

      {/* Novidades (Destaques) */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Novidades</h2>
            <Link to="/loja" className={styles.seeAll}>Ver todos</Link>
          </div>
          <div className="products-grid">
            <Suspense fallback={<div className="spinner" />}>
              {FEATURED.map(p => <ProductCard key={p._id} product={p} />)}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Serviços / Benefícios (Agora como Marquee embaixo das Novidades) */}
      <section className={styles.servicesMarquee}>
        <div className={styles.marqueeTrack}>
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

      {/* Dual Category Banners */}
      <section className={styles.dualBanners}>
        <div className="container">
          <div className={styles.bannersGrid}>
            {CATEGORIES_SHOWCASE.map(cat => (
              <Link key={cat.label} to={cat.to} className={styles.bannerCard}>
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className={styles.bannerContent}>
                  <h3>{cat.label}</h3>
                  <span className={styles.bannerCta}>Descobrir <ChevronRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre / Loja */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.label}>Rugal Modas</span>
              <h2>Estilo e Qualidade em cada detalhe</h2>
              <p>
                A Rugal Modas nasceu da paixão por moda acessível e de qualidade.
                Oferecemos as melhores peças com curadoria exclusiva para quem busca estilo e conforto.
              </p>
              <Link to="/loja" className={styles.ctaAbout}>Conhecer Loja</Link>
            </div>
            <div className={styles.videoWrap}>
               <div className={styles.placeholderImg}>
                  {/* Substituindo vídeo sem src por uma imagem premium ou placeholder estilizado */}
                  <img src="/images/loja-placeholder.png" alt="Nossa Loja" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}