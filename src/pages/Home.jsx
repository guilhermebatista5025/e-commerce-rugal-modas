// src/pages/Home.jsx
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import styles from './Home.module.css';

const ProductCard = lazy(() => import('../components/ProductCard'));

import { products } from '../data/products';

const FEATURED = products.filter(p => p.promo).slice(0, 4);

const CATEGORIES_SHOWCASE = [
  { label: 'Relógios',   img: '../public/images/categorias/relogio1.png', to: '/loja?category=Relógio' },
  { label: 'Masculino',  img: '../public/images/categorias/conjunto1.png', to: '/loja?category=Masculino' },
  { label: 'Óculos',   img: '../public/images/categorias/oculos1.png', to: '/loja?category=Óculos' },
  { label: 'Calçados',   img: '../public/images/categorias/tenis1.png', to: '/loja?category=Calçados' },
];

export default function Home() {
  return (
    <main className={styles.home}>
      {/* Hero Carousel */}
      <Carousel />

      {/* Acesso rápido */}
      <section className={styles.quickAccess}>
        <div className="container">
          <Link to="/loja" className={styles.shopBtn}>
             Acessar Loja Completa
          </Link>
        </div>
      </section>

      {/* Categorias */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <span>Explore por</span> Categoria
          </h2>
          <div className={styles.categoryGrid}>
            {CATEGORIES_SHOWCASE.map(cat => (
              <Link key={cat.label} to={cat.to} className={styles.catCard}>
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className={styles.catOverlay}>
                  <span>{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promoções */}
      <section className={[styles.section, styles.promoSection].join(' ')}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.promoTag}>PROMOÇÃO</span> Destaques
            </h2>
            <Link to="/loja" className={styles.seeAll}>Ver todos →</Link>
          </div>
          <div className="products-grid">
            <Suspense fallback={<div className="spinner" />}>
              {FEATURED.map(p => <ProductCard key={p._id} product={p} />)}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Vídeo / Sobre */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2>Nossa Loja</h2>
              <p>
                A Rugal Modas nasceu da paixão por moda acessível e de qualidade.
                Com anos no mercado, oferecemos as melhores peças para toda a família,
                com atendimento personalizado e preços que cabem no bolso.
              </p>
              <ul className={styles.benefits}>
                <li>✓ Entrega rápida para todo o Brasil</li>
                <li>✓ Atendimento via WhatsApp</li>
                <li>✓ Promoções semanais</li>
                <li>✓ Qualidade garantida</li>
              </ul>
              <Link to="/loja" className={styles.ctaAbout}>Conhecer Produtos</Link>
            </div>
            <div className={styles.videoWrap}>
              <video
                src="#"
                autoPlay
                loop
                muted
                playsInline
                className={styles.storeVideo}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className={styles.whatsappSection}>
        <div className="container">
          <div className={styles.whatsappBox}>
            <div>
              <h3>Precisa de ajuda?</h3>
              <p>Fale diretamente com nossa equipe pelo WhatsApp!</p>
            </div>
            <a
              href="https://wa.me/5527998803770"
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}