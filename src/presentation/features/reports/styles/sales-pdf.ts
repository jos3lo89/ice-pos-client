import { StyleSheet } from "@react-pdf/renderer";

export const DAILY_SALES_COLORS = {
  primary: "#1e293b",
  accent: "#4f46e5", // Indigo
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  slate: "#64748b",
  light: "#f8fafc",
  white: "#ffffff",
  border: "#e2e8f0",
  tableHeader: "#1e293b",
};

export const dailySalesPdfStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    padding: 30,
    backgroundColor: DAILY_SALES_COLORS.white,
    color: DAILY_SALES_COLORS.primary,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: DAILY_SALES_COLORS.accent,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: DAILY_SALES_COLORS.accent,
  },
  subtitle: {
    fontSize: 10,
    color: DAILY_SALES_COLORS.slate,
    marginTop: 2,
  },
  meta: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 8,
    color: DAILY_SALES_COLORS.slate,
  },

  // Summary Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    minWidth: "22%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: DAILY_SALES_COLORS.border,
    backgroundColor: DAILY_SALES_COLORS.light,
  },
  cardLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: DAILY_SALES_COLORS.slate,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: DAILY_SALES_COLORS.primary,
  },
  cardFooter: {
    fontSize: 7,
    color: DAILY_SALES_COLORS.slate,
    marginTop: 4,
  },

  // Sections
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    backgroundColor: DAILY_SALES_COLORS.tableHeader,
    color: DAILY_SALES_COLORS.white,
    padding: 5,
    borderRadius: 3,
    marginBottom: 8,
  },

  // Two columns row
  row: {
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flex: 1,
  },

  // Table
  table: {
    borderWidth: 1,
    borderColor: DAILY_SALES_COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: DAILY_SALES_COLORS.border,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: DAILY_SALES_COLORS.border,
  },
  tableCell: {
    fontSize: 8,
  },
  tableCellBold: {
    fontFamily: "Helvetica-Bold",
  },

  // List items
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: DAILY_SALES_COLORS.border,
  },
  listLabel: {
    fontSize: 8,
    color: DAILY_SALES_COLORS.primary,
  },
  listValue: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: DAILY_SALES_COLORS.border,
    paddingTop: 5,
    textAlign: "center",
    fontSize: 7,
    color: DAILY_SALES_COLORS.slate,
  },
});
