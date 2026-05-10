import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import styles from './LocationSection.module.css';

export default function LocationSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.infoGrid}>
          {/* Coluna 1: Textos */}
          <div className={styles.infoContent}>
            <span className={styles.label}>Nossa Loja</span>
            <h2 className={styles.title}>VENHA NOS <br /> <span>VISITAR</span></h2>
            <p className={styles.description}>
              Localizada no coração de Limeira, nossa loja física oferece uma experiência 
              exclusiva para você conferir de perto a qualidade de cada peça.
            </p>
            
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <MapPin className={styles.icon} size={20} />
                <div>
                  <h4>Endereço</h4>
                  <p>R. Cap. José Maria, 1378 - Centro, Linhares - ES, 29900-010</p>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <Clock className={styles.icon} size={20} />
                <div>
                  <h4>Horário</h4>
                  <p>Seg a Sex: 09h às 18h | Sáb: 09h às 13h</p>
                </div>
              </div>

              <div className={styles.detailItem}>
                <Phone className={styles.icon} size={20} />
                <div>
                  <h4>Contato</h4>
                  <p>(27) 99891-9877</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <a href="https://wa.me/5527998919877" target="_blank" rel="noreferrer" className={styles.btnWhatsapp}>
                <MessageCircle size={18} /> Chamar no WhatsApp
              </a>
            </div>
          </div>

          {/* Coluna 2: Placeholder de Foto da Loja ou Call-out */}
          <div className={styles.imageCard}>
            <img src="/images/loja-placeholder.png" alt="Interior da Loja" className={styles.storeImg} />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </div>

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
