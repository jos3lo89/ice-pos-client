import { StyleSheet } from "@react-pdf/renderer";
export const RANKING_PRODUCTS_COLORS = {
  primary: "#1a1a2e",
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
  gold: "#f59e0b",
  silver: "#94a3b8",
  bronze: "#b45309",
};

export const rankingProductsStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: RANKING_PRODUCTS_COLORS.white,
    color: RANKING_PRODUCTS_COLORS.primary,
  },

  // Header
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: RANKING_PRODUCTS_COLORS.accent,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  reportTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: RANKING_PRODUCTS_COLORS.accent,
    marginBottom: 2,
  },
  reportSubtitle: {
    fontSize: 9,
    color: RANKING_PRODUCTS_COLORS.muted,
  },
  headerMeta: {
    alignItems: "flex-end",
  },
  headerMetaText: {
    fontSize: 8,
    color: RANKING_PRODUCTS_COLORS.muted,
    marginBottom: 2,
  },

  // Info cards de fechas
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  infoCard: {
    flex: 1,
    backgroundColor: RANKING_PRODUCTS_COLORS.light,
    borderRadius: 4,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: RANKING_PRODUCTS_COLORS.accent,
  },
  infoCardLabel: {
    fontSize: 7,
    color: RANKING_PRODUCTS_COLORS.muted,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  infoCardValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: RANKING_PRODUCTS_COLORS.primary,
  },

  // Stats summary
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: RANKING_PRODUCTS_COLORS.border,
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 7,
    color: RANKING_PRODUCTS_COLORS.muted,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: RANKING_PRODUCTS_COLORS.accent,
  },

  // Section title
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: RANKING_PRODUCTS_COLORS.white,
    backgroundColor: RANKING_PRODUCTS_COLORS.tableHeader,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 0,
    borderRadius: 2,
  },

  // Tabla
  table: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: RANKING_PRODUCTS_COLORS.border,
    borderRadius: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: RANKING_PRODUCTS_COLORS.tableHeader,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    color: RANKING_PRODUCTS_COLORS.white,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: RANKING_PRODUCTS_COLORS.border,
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: RANKING_PRODUCTS_COLORS.tableRowEven,
  },
  tableCell: {
    fontSize: 8,
    color: RANKING_PRODUCTS_COLORS.primary,
  },
  tableCellMuted: {
    fontSize: 7.5,
    color: RANKING_PRODUCTS_COLORS.muted,
  },
  tableCellBold: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: RANKING_PRODUCTS_COLORS.primary,
  },

  // Anchos de columnas
  colPos: { width: "8%" },
  colNombre: { width: "34%" },
  colCategoria: { width: "24%" },
  colCantidad: { width: "14%", textAlign: "right" as const },
  colRecaudado: { width: "20%", textAlign: "right" as const },

  // Badge de posición
  badgeGold: {
    backgroundColor: "#fef3c7",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  badgeSilver: {
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  badgeBronze: {
    backgroundColor: "#fef2e8",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  badgeDefault: {
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  badgeTextGold: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#92400e",
  },
  badgeTextSilver: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#475569",
  },
  badgeTextBronze: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#92400e",
  },
  badgeTextDefault: {
    fontSize: 8,
    color: RANKING_PRODUCTS_COLORS.muted,
  },

  // Barra de progreso
  barContainer: {
    height: 4,
    backgroundColor: RANKING_PRODUCTS_COLORS.border,
    borderRadius: 2,
    marginTop: 2,
    width: "100%",
  },
  barFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: RANKING_PRODUCTS_COLORS.accent,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: RANKING_PRODUCTS_COLORS.border,
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: RANKING_PRODUCTS_COLORS.muted,
  },
});
