// src/pages/admin/Relatorios.jsx
import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../../components/ui/Button';
import styles from './Admin.module.css';

// Dados mock de vendas
const MOCK_SALES = [
  { id: 1, date: '2025-01-15', product: 'Vestido Floral Midi',     code: 'RG-001', qty: 3, total: 389.70, payment: 'PIX' },
  { id: 2, date: '2025-01-15', product: 'Camiseta Básica Masculina',code: 'RG-005', qty: 5, total: 199.50, payment: 'Cartão' },
  { id: 3, date: '2025-01-16', product: 'Bolsa Tiracolo Couro',    code: 'RG-007', qty: 2, total: 399.80, payment: 'PIX' },
  { id: 4, date: '2025-01-16', product: 'Calça Jeans Skinny',      code: 'RG-004', qty: 4, total: 719.60, payment: 'Cartão' },
  { id: 5, date: '2025-01-17', product: 'Tênis Casual Feminino',   code: 'RG-003', qty: 2, total: 319.80, payment: 'Dinheiro' },
  { id: 6, date: '2025-01-17', product: 'Vestido Floral Midi',     code: 'RG-001', qty: 1, total: 129.90, payment: 'PIX' },
  { id: 7, date: '2025-01-18', product: 'Shorts Esportivo',        code: 'RG-008', qty: 6, total: 479.40, payment: 'Cartão' },
];

export default function Relatorios() {
  const { products } = useProducts();
  const [exportLoading, setExportLoading] = useState(false);

  const totalRevenue = MOCK_SALES.reduce((s, v) => s + v.total, 0);
  const totalQty     = MOCK_SALES.reduce((s, v) => s + v.qty, 0);

  // Destaque do dia (mais vendido hoje/recente)
  const highlight = [...MOCK_SALES]
    .sort((a, b) => b.total - a.total)[0];

  // Por produto
  const byProduct = MOCK_SALES.reduce((acc, s) => {
    acc[s.code] = acc[s.code] || { ...s, qty: 0, total: 0 };
    acc[s.code].qty   += s.qty;
    acc[s.code].total += s.total;
    return acc;
  }, {});

  const handleExportPDF = async () => {
    setExportLoading(true);
    try {
      // Importa jsPDF dinamicamente (lazy)
      const { default: jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.setTextColor(224, 168, 72);
      doc.text('RUGAL MODAS', 14, 20);

      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text('Relatório de Vendas', 14, 30);
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 38);

      // Resumo
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Resumo', 14, 52);
      autoTable(doc, {
        startY: 56,
        head: [['Receita Total', 'Itens Vendidos', 'Transações']],
        body: [[formatPrice(totalRevenue), totalQty, MOCK_SALES.length]],
        styles: { fontSize: 11 },
        headStyles: { fillColor: [224, 168, 72], textColor: [0, 0, 0] },
      });

      // Detalhes
      doc.text('Detalhes de Vendas', 14, doc.lastAutoTable.finalY + 14);
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 18,
        head: [['Data', 'Produto', 'Código', 'Qtd', 'Total', 'Pagamento']],
        body: MOCK_SALES.map(s => [
          s.date, s.product, s.code, s.qty, formatPrice(s.total), s.payment
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [30, 30, 30], textColor: [224, 168, 72] },
        alternateRowStyles: { fillColor: [245, 245, 240] },
      });

      doc.save('rugal-relatorio-vendas.pdf');
    } catch (err) {
      alert('Erro ao gerar PDF. Instale: npm install jspdf jspdf-autotable');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className={styles.pageTitle}>Relatórios</h1>
          <p className={styles.pageSubtitle}>Análise de vendas e desempenho</p>
        </div>
        <Button variant="primary" onClick={handleExportPDF} loading={exportLoading}>
          📄 Exportar PDF
        </Button>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>💰</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-gold)', fontSize: 'var(--fs-xl)' }}>{formatPrice(totalRevenue)}</p>
            <p className={styles.statLabel}>Receita Total</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🛒</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-promo)' }}>{MOCK_SALES.length}</p>
            <p className={styles.statLabel}>Transações</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📦</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-info)' }}>{totalQty}</p>
            <p className={styles.statLabel}>Itens Vendidos</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🏆</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-gold)', fontSize: 'var(--fs-sm)' }}>{highlight?.product}</p>
            <p className={styles.statLabel}>Destaque do Dia</p>
          </div>
        </div>
      </div>

      {/* Por produto */}
      <h2 className={styles.sectionTitle}>Vendas por Produto</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr><th>Produto</th><th>Código</th><th>Qtd Vendida</th><th>Total</th></tr>
          </thead>
          <tbody>
            {Object.values(byProduct).sort((a, b) => b.total - a.total).map(s => (
              <tr key={s.code}>
                <td>{s.product}</td>
                <td><code>{s.code}</code></td>
                <td>{s.qty} itens</td>
                <td><strong style={{ color: 'var(--color-gold)' }}>{formatPrice(s.total)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transações */}
      <h2 className={styles.sectionTitle}>Histórico de Transações</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr><th>Data</th><th>Produto</th><th>Código</th><th>Qtd</th><th>Total</th><th>Pagamento</th></tr>
          </thead>
          <tbody>
            {MOCK_SALES.map(s => (
              <tr key={s.id}>
                <td>{new Date(s.date).toLocaleDateString('pt-BR')}</td>
                <td>{s.product}</td>
                <td><code>{s.code}</code></td>
                <td>{s.qty}</td>
                <td style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{formatPrice(s.total)}</td>
                <td><span className={styles.badgePromo}>{s.payment}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
