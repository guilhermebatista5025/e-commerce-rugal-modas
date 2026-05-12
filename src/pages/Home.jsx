import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RotateCcw, CreditCard, ChevronRight } from 'lucide-react';
import Carousel from '../components/Carousel';
import BrandsMarquee from '../components/BrandsMarquee';


import LocationSection from '../components/LocationSection';
import IntroSplash from '../components/IntroSplash';
import Reveal from '../components/Reveal';
import styles from './Home.module.css';

const ProductCard = lazy(() => import('../components/ProductCard'));
const ProductCarousel = lazy(() => import('../components/ProductCarousel'));

import { useProducts } from '../context/ProductContext';

const CATEGORIES_SHOWCASE = [
  { label: 'Relógios',  img: '/categorias/relogio1.png',  to: '/loja?category=Relógio' },
  { label: 'Masculino', img: '/categorias/conjunto1.png', to: '/loja?category=Masculino' },
];

const SECONDARY_CATEGORIES = [
  { label: 'Conjuntos',  img: '/categorias/categorias3.png',  to: '/loja?category=Conjunto' },
  { label: 'Tênis', img: '/categorias/categoria4.png', to: '/loja?category=Tênis' },
];

const TERTIARY_CATEGORIES = [
  { label: 'Óculos',  img: '/categorias/oculos1.png',  to: '/loja?category=Óculos' },
  { label: 'Bolsas', img: '/produtos/produtos5.jpg', to: '/loja?category=Bolsas' },
];

const SERVICES = [
  { icon: <Truck size={24} />, title: 'Entrega Rápida', desc: 'Envio para todo o Brasil' },
  { icon: <ShieldCheck size={24} />, title: 'Compra Segura', desc: 'Seus dados 100% protegidos' },
  { icon: <RotateCcw size={24} />, title: 'Devolução Fácil', desc: 'Até 7 dias para trocar' },
  { icon: <CreditCard size={24} />, title: 'Pagamento Flexível', desc: 'Até 12x no cartão' },
];

export default function Home() {
  const { products } = useProducts();
  
  // Produtos falsos apenas para dar volume visual na apresentação do cliente
  const DUMMY_SECONDARY_PRODUCTS = [
    {
      _id: 'dummy1',
      name: 'Conjunto Streetwear Dark',
      brand: 'FIRE',
      code: 'CJ-001',
      price: 299.90,
      promo: true,
      promoPrice: 249.90,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800',
      sizes: ['P', 'M', 'G', 'GG'],
      stock: { P: 5, M: 5, G: 5, GG: 5 },
      category: 'Conjunto'
    },
    {
      _id: 'dummy2',
      name: 'Conjunto Cargo High',
      brand: 'HIGH',
      code: 'CJ-002',
      price: 399.90,
      promo: false,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800',
      sizes: ['M', 'G'],
      stock: { M: 5, G: 5 },
      category: 'Conjunto'
    },
    {
      _id: 'dummy3',
      name: 'Conjunto Urban',
      brand: 'PRISON',
      code: 'CJ-003',
      price: 349.90,
      promo: true,
      promoPrice: 299.90,
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800',
      sizes: ['M', 'G', 'GG'],
      stock: { M: 5, G: 5, GG: 5 },
      category: 'Conjunto'
    },
    {
      _id: 'dummy4',
      name: 'Tênis Urban Runner',
      brand: 'NIKE',
      code: 'TN-001',
      price: 499.90,
      promo: false,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800',
      sizes: ['38', '39', '40', '41', '42'],
      stock: { '38': 2, '39': 5, '40': 5, '41': 5, '42': 5 },
      category: 'Tênis'
    },
    {
      _id: 'dummy5',
      name: 'Tênis Skater Pro',
      brand: 'VANS',
      code: 'TN-002',
      price: 349.90,
      promo: true,
      promoPrice: 299.90,
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800',
      sizes: ['39', '40', '41'],
      stock: { '39': 5, '40': 5, '41': 5 },
      category: 'Tênis'
    },
    {
      _id: 'dummy6',
      name: 'Tênis Jordan Retro',
      brand: 'JORDAN',
      code: 'TN-003',
      price: 1299.90,
      promo: false,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800',
      sizes: ['40', '41', '42', '43'],
      stock: { '40': 1, '41': 2, '42': 2, '43': 1 },
      category: 'Tênis'
    }
  ];

  const filteredSecondary = products.filter(p => p.category === 'Conjunto' || p.category === 'Tênis' || p.category?.toLowerCase() === 'conjuntos' || p.category?.toLowerCase() === 'tenis');
  const SECONDARY_PRODUCTS = [...filteredSecondary, ...DUMMY_SECONDARY_PRODUCTS];

  const DUMMY_TERTIARY_PRODUCTS = [
    {
      _id: 'dummy7',
      name: 'Óculos de Sol Vintage',
      brand: 'RAY-BAN',
      code: 'OC-001',
      price: 599.90,
      promo: true,
      promoPrice: 499.90,
      image: '/produtos/produto2.webp',
      sizes: ['Único'],
      stock: { 'Único': 5 },
      category: 'Óculos'
    },
    {
      _id: 'dummy8',
      name: 'Bolsa Tiracolo Couro',
      brand: 'GUCCI',
      code: 'BS-001',
      price: 2499.90,
      promo: false,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800',
      sizes: ['Único'],
      stock: { 'Único': 2 },
      category: 'Bolsas'
    },
    {
      _id: 'dummy9',
      name: 'Óculos Retro Premium',
      brand: 'OAKLEY',
      code: 'OC-002',
      price: 459.90,
      promo: false,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800',
      sizes: ['Único'],
      stock: { 'Único': 5 },
      category: 'Óculos'
    },
    {
      _id: 'dummy10',
      name: 'Bolsa Shopper Elegance',
      brand: 'PRADA',
      code: 'BS-002',
      price: 3199.90,
      promo: true,
      promoPrice: 2899.90,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800',
      sizes: ['Único'],
      stock: { 'Único': 1 },
      category: 'Bolsas'
    },
    {
      _id: 'dummy11',
      name: 'Óculos Classic Gold',
      brand: 'PRADA',
      code: 'OC-003',
      price: 899.90,
      promo: false,
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800',
      sizes: ['Único'],
      stock: { 'Único': 3 },
      category: 'Óculos'
    },
    {
      _id: 'dummy12',
      name: 'Bolsa Minimalist Black',
      brand: 'CHANEL',
      code: 'BS-003',
      price: 4500.00,
      promo: false,
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800',
      sizes: ['Único'],
      stock: { 'Único': 2 },
      category: 'Bolsas'
    }
  ];

  const filteredTertiary = products.filter(p => p.category === 'Óculos' || p.category === 'Bolsas' || p.category?.toLowerCase() === 'oculos' || p.category?.toLowerCase() === 'bolsas');
  const TERTIARY_PRODUCTS = [...filteredTertiary, ...DUMMY_TERTIARY_PRODUCTS];

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

      {/* Dual Category Banners */}
      <section className={styles.dualBanners} style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-8)' }}>
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

      {/* Novidades (Destaques) */}
      <section className={styles.section} style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Novidades</h2>
              <Link to="/loja" className={styles.seeAll}>Ver todos</Link>
            </div>
          </Reveal>
          <Suspense fallback={<div className="spinner" />}>
            <ProductCarousel products={products} />
          </Suspense>
        </div>
      </section>

      {/* Secondary Category Banners (Conjuntos e Tênis) */}
      <section className={styles.dualBanners} style={{ paddingTop: 0, paddingBottom: 'var(--space-8)' }}>
        <div className="container">
          <div className={styles.bannersGrid}>
            {SECONDARY_CATEGORIES.map((cat, i) => (
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

      {/* Coleções em Destaque (Conjuntos e Tênis) */}
      <section className={styles.section} style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Coleções em Destaque</h2>
              <Link to="/loja" className={styles.seeAll}>Ver todos</Link>
            </div>
          </Reveal>
          <Suspense fallback={<div className="spinner" />}>
            <ProductCarousel products={SECONDARY_PRODUCTS.length > 0 ? SECONDARY_PRODUCTS : products} />
          </Suspense>
        </div>
      </section>

      {/* Tertiary Category Banners (Óculos e Bolsas) */}
      <section className={styles.dualBanners} style={{ paddingTop: 0, paddingBottom: 'var(--space-8)' }}>
        <div className="container">
          <div className={styles.bannersGrid}>
            {TERTIARY_CATEGORIES.map((cat, i) => (
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

      {/* Acessórios em Destaque (Óculos e Bolsas) */}
      <section className={styles.section} style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Acessórios em Destaque</h2>
              <Link to="/loja" className={styles.seeAll}>Ver todos</Link>
            </div>
          </Reveal>
          <Suspense fallback={<div className="spinner" />}>
            <ProductCarousel products={TERTIARY_PRODUCTS.length > 0 ? TERTIARY_PRODUCTS : products} />
          </Suspense>
        </div>
      </section>

      {/* Sobre / Loja */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <Reveal width="100%">
              <div className={styles.aboutText}>
                <span className={styles.label}>Rugal Modas</span>
                <h2>Estilo e Qualidade em cada detalhe.</h2>
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
                    <img src="/categorias/Capturar2.PNG" alt="Nossa Loja" />
                 </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* Mapa de Localização */}
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
