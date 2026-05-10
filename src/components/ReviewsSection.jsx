import { Star } from 'lucide-react';
import styles from './ReviewsSection.module.css';

const REVIEWS = [
  { id: 1, name: 'Maria Silva', text: 'Qualidade impecável, as peças chegaram super rápido! Com certeza comprarei mais.', initial: 'M', color: '#E0A848' },
  { id: 2, name: 'João Paulo', text: 'Melhor loja de Limeira, atendimento nota 10. Os conjuntos são diferenciados.', initial: 'J', color: '#1DB954' },
  { id: 3, name: 'Ana Lúcia', text: 'Conjuntos lindos e confortáveis, recomendo demais para quem busca estilo.', initial: 'A', color: '#1E88E5' },
  { id: 4, name: 'Carlos Eduardo', text: 'O atendimento via WhatsApp foi excelente. A entrega foi antes do prazo.', initial: 'C', color: '#E53935' },
  { id: 5, name: 'Fernanda M.', text: 'As jaquetas da nova coleção são maravilhosas. Rugal Modas nunca decepciona!', initial: 'F', color: '#FB8C00' },
];

export default function ReviewsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.authorityBoard}>
          {/* Background Card */}
          <div className={styles.mainCard}>
            <img src="/images/authority-bg.png" alt="Autoridade Rugal Modas" className={styles.bgImage} />
            <div className={styles.overlay} />
            
            <div className={styles.cardContent}>
              <span className={styles.label}>Autoridade & Confiança</span>
              <h2 className={styles.title}>
                PADRÃO OURO <br /> <span>5 ESTRELAS</span>
              </h2>
              <p className={styles.description}>
                Nossa prioridade é a sua satisfação absoluta. Com milhares de clientes atendidos, 
                mantemos a excelência em cada detalhe.
              </p>
              
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>+5.000</span>
                  <span className={styles.statLabel}>Clientes</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>4.9/5</span>
                  <span className={styles.statLabel}>Google</span>
                </div>
              </div>
              
              <button className={styles.cta}>
                Ver Avaliações
              </button>
            </div>
          </div>

          {/* Floating Reviews (Now integrated over/beside the card) */}
          <div className={styles.reviewsOverlay}>
            {REVIEWS.map((review, i) => (
              <div key={review.id} className={[styles.reviewCard, styles[`card${i + 1}`]].join(' ')}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatar} style={{ backgroundColor: review.color }}>
                    {review.initial}
                  </div>
                  <div className={styles.reviewerInfo}>
                    <span className={styles.name}>{review.name}</span>
                    <span className={styles.verified}>Verificada</span>
                  </div>
                  <div className={styles.googleIcon}>G</div>
                </div>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <p className={styles.reviewText}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
