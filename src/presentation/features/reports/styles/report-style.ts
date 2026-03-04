import { StyleSheet } from "@react-pdf/renderer";

export const COLORS = {
  primary: "#1a1a2e",
  secondary: "#16213e",
  accent: "#0f3460",
  highlight: "#e94560",
  success: "#2ecc71",
  warning: "#f39c12",
  danger: "#e74c3c",
  light: "#f8f9fa",
  muted: "#6c757d",
  border: "#dee2e6",
  white: "#ffffff",
  tableHeader: "#2c3e50",
  tableRowEven: "#f8f9fa",
  tableRowOdd: "#ffffff",
};
export const METODO_LABEL: Record<string, string> = {
  efectivo: "Efectivo",
  yape: "Yape",
  plin: "Plin",
  tarjeta: "Tarjeta",
};

export const TIPO_LABEL: Record<string, string> = {
  ticket: "Ticket",
  boleta: "Boleta",
  factura: "Factura",
};

export const MOVIMIENTO_LABEL: Record<string, string> = {
  ingreso_manual: "Ingreso Manual",
  egreso_manual: "Retiro",
  egreso_gasto: "Gasto",
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
    color: COLORS.primary,
  },

  // ── Header ──
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  businessName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.accent,
  },
  reportTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    marginTop: 2,
  },
  headerMeta: {
    alignItems: "flex-end",
  },
  headerMetaText: {
    fontSize: 8,
    color: COLORS.muted,
    marginBottom: 2,
  },
  badgeOpen: {
    backgroundColor: COLORS.success,
    color: COLORS.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  badgeClosed: {
    backgroundColor: COLORS.muted,
    color: COLORS.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  // ── Info Row ──
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 4,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  infoCardLabel: {
    fontSize: 7,
    color: COLORS.muted,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  infoCardValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
  infoCardSub: {
    fontSize: 7,
    color: COLORS.muted,
    marginTop: 1,
  },

  // ── Section ──
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
    backgroundColor: COLORS.tableHeader,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 0,
    borderRadius: 2,
  },

  // ── Resumen Grid ──
  summaryGrid: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  summaryCardLabel: {
    fontSize: 7,
    color: COLORS.muted,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
    textAlign: "center",
  },
  summaryCardValue: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLORS.accent,
  },
  summaryCardTotal: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLORS.highlight,
  },

  // ── Arqueo ──
  arqueoContainer: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  arqueoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  arqueoRowEven: {
    backgroundColor: COLORS.tableRowEven,
  },
  arqueoLabel: {
    fontSize: 8,
    color: COLORS.primary,
  },
  arqueoValue: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
  arqueoSeparator: {
    borderTopWidth: 2,
    borderTopColor: COLORS.accent,
  },
  arqueoTotalLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.accent,
  },
  arqueoTotalValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.accent,
  },
  diferenciaPositiva: {
    color: COLORS.success,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  diferenciaNegativa: {
    color: COLORS.danger,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },

  // ── Tabla de pagos ──
  table: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.tableHeader,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    color: COLORS.white,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableRowEven: {
    backgroundColor: COLORS.tableRowEven,
  },
  tableCell: {
    fontSize: 7.5,
    color: COLORS.primary,
  },
  tableCellMuted: {
    fontSize: 7,
    color: COLORS.muted,
  },

  // Anchos de columnas para tabla de pagos
  colNum: { width: "12%" },
  colOrden: { width: "10%" },
  colMesa: { width: "8%" },
  colMesero: { width: "18%" },
  colMetodo: { width: "10%" },
  colDocumento: { width: "10%" },
  colFecha: { width: "18%" },
  colMonto: { width: "14%", textAlign: "right" as const },

  // Anchos para tabla de movimientos
  colMovTipo: { width: "18%" },
  colMovDesc: { width: "52%" },
  colMovFecha: { width: "16%" },
  colMovMonto: { width: "14%", textAlign: "right" as const },

  // ── Totales finales ──
  totalesBox: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 4,
    overflow: "hidden",
  },
  totalesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  totalesRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.accent,
  },
  totalesLabel: { fontSize: 9, color: COLORS.primary },
  totalesValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
  totalesFinalLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
  },
  totalesFinalValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: COLORS.muted,
  },

  // ── Ordenes resumen ──
  ordenesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  ordenCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 6,
    alignItems: "center",
  },
  ordenCardLabel: {
    fontSize: 7,
    color: COLORS.muted,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  ordenCardValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
  },
});
