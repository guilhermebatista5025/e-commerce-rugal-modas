import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import styles from './LocationSection.module.css';

export default function LocationSection() {
  return (
    <section className={styles.section}>


      {/* Mapa Full Width com Sombras/Gradientes de Integração */}
      <div className={styles.mapContainer}>
        <div className={styles.mapShadowTop} />
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.215243308472!2d-40.06976942318799!3d-19.40310382212098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb6259a99afd189%3A0xa4523d4f470c07fb!2sRugal%20Modas!5e0!3m2!1spt-BR!2sbr!4v1778437937537!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.iframe}
        ></iframe>
        <div className={styles.mapShadowBottom} />
      </div>
    </section>
  );
}
