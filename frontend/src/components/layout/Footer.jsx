// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const WHATSAPP = '5527998803770';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>RUGAL</span>
            <small>MODAS</small>
          </div>
          <p>Moda com estilo, qualidade e preço justo. Encontre as melhores peças para todas as ocasiões.</p>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className={styles.whatsapp}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.996l6.304-1.447A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.018-1.378l-.36-.213-3.737.857.893-3.635-.234-.374A9.818 9.818 0 1112 21.818z"/>
            </svg>
            (27) 9 9999-9999
          </a>
        </div>

        <div className={styles.col}>
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/loja">Loja</Link></li>
            <li><Link to="/carrinho">Carrinho</Link></li>
            <li><Link to="/login">Entrar</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Categorias</h4>
          <ul>
            <li><Link to="/loja?category=Feminino">Feminino</Link></li>
            <li><Link to="/loja?category=Masculino">Masculino</Link></li>
            <li><Link to="/loja?category=Calçados">Calçados</Link></li>
            <li><Link to="/loja?category=Acessórios">Acessórios</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Atendimento</h4>
          <ul>
            <li><span>Seg–Sex: 8h–18h</span></li>
            <li><span>Sábado: 8h–13h</span></li>
            <li>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Rugal Modas. Todos os direitos reservados.</p>
        <p>Desenvolvido por Guilherme Batista & Thiago Martins</p>
      </div>
    </footer>
  );
}
