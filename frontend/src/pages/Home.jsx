// src/pages/Home.jsx
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import styles from './Home.module.css';

const ProductCard = lazy(() => import('../components/ProductCard'));

import { products } from '../data/products';

const FEATURED = products.filter(p => p.promo).slice(0, 4);

const CATEGORIES_SHOWCASE = [
  { label: 'Feminino',   img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop', to: '/loja?category=Feminino' },
  { label: 'Masculino',  img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=500&fit=crop', to: '/loja?category=Masculino' },
  { label: 'Infantil',   img: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=400&h=500&fit=crop', to: '/loja?category=Infantil' },
  { label: 'Calçados',   img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', to: '/loja?category=Calçados' },
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
            🛍️ Acessar Loja Completa
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
              <div className={styles.videoPlaceholder}>
                <div className={styles.playIcon}>▶</div>
                <p>Vídeo da Loja</p>
                <small>Adicione seu vídeo em /public/videos/store.mp4</small>
              </div>
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
              href="https://wa.me/5527999999999"
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              💬 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
