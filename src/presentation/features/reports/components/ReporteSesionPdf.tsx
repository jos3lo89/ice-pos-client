import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatPricePEN } from "@/utils/format-price";
import type { ReportResponse } from "@/core/entities/reports.entity";

const COLORS = {
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

const styles = StyleSheet.create({
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

const formatDate = (date: string | Date | null): string => {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateShort = (date: string | Date | null): string => {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const METODO_LABEL: Record<string, string> = {
  efectivo: "Efectivo",
  yape: "Yape",
  plin: "Plin",
  tarjeta: "Tarjeta",
};

const TIPO_LABEL: Record<string, string> = {
  ticket: "Ticket",
  boleta: "Boleta",
  factura: "Factura",
};

const MOVIMIENTO_LABEL: Record<string, string> = {
  ingreso_manual: "Ingreso Manual",
  egreso_manual: "Retiro",
  egreso_gasto: "Gasto",
};

interface Props {
  data: ReportResponse;
}

const ReporteSesionPDF = ({ data }: Props) => {
  const negocioNombre = "Ice Mankora";
  const esCerrada = data.sesion.estado === "cerrada";

  return (
    <Document
      title={`Reporte Sesión - ${data.cajero.nombre}`}
      author={negocioNombre}
      subject="Reporte de Cierre de Sesión de Caja"
    >
      <Page size="A4" style={styles.page}>
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.businessName}>{negocioNombre}</Text>
              <Text style={styles.reportTitle}>
                {esCerrada
                  ? "Reporte de Cierre de Caja"
                  : "Reporte de Sesión de Caja (Abierta)"}
              </Text>
              {/* <Text style={{ fontSize: 7, color: COLORS.muted, marginTop: 2 }}>
                RUC: {negocioRuc}
              </Text> */}
            </View>
            <View style={styles.headerMeta}>
              <Text style={styles.headerMetaText}>
                Sesión: {data.sesion.id.slice(0, 8).toUpperCase()}
              </Text>
              <Text style={styles.headerMetaText}>
                Generado: {formatDate(new Date())}
              </Text>
              <Text style={esCerrada ? styles.badgeClosed : styles.badgeOpen}>
                {esCerrada ? "● CERRADA" : "● ABIERTA"}
              </Text>
            </View>
          </View>
        </View>

        {/* ── INFO CAJERO / FECHAS ── */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Cajero</Text>
            <Text style={styles.infoCardValue}>{data.cajero.nombre}</Text>
            <Text style={styles.infoCardSub}>@{data.cajero.usuario}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Apertura</Text>
            <Text style={styles.infoCardValue}>
              {formatDate(data.sesion.fecha_apertura)}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Cierre</Text>
            <Text style={styles.infoCardValue}>
              {data.sesion.fecha_cierre
                ? formatDate(data.sesion.fecha_cierre)
                : "Sesión activa"}
            </Text>
          </View>
          {data.sesion.notas && (
            <View style={[styles.infoCard, { flex: 1.5 }]}>
              <Text style={styles.infoCardLabel}>Notas</Text>
              <Text style={styles.infoCardValue}>{data.sesion.notas}</Text>
            </View>
          )}
        </View>

        {/* ── RESUMEN DE VENTAS POR MÉTODO ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Ventas por Método de Pago</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryCardLabel}>Efectivo</Text>
              <Text style={styles.summaryCardValue}>
                {formatPricePEN(data.ventas.efectivo)}
              </Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryCardLabel}>Yape</Text>
              <Text style={styles.summaryCardValue}>
                {formatPricePEN(data.ventas.yape)}
              </Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryCardLabel}>Plin</Text>
              <Text style={styles.summaryCardValue}>
                {formatPricePEN(data.ventas.plin)}
              </Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryCardLabel}>Tarjeta</Text>
              <Text style={styles.summaryCardValue}>
                {formatPricePEN(data.ventas.tarjeta)}
              </Text>
            </View>
            <View
              style={[
                styles.summaryCard,
                { borderColor: COLORS.highlight, borderWidth: 2 },
              ]}
            >
              <Text
                style={[styles.summaryCardLabel, { color: COLORS.highlight }]}
              >
                TOTAL VENTAS
              </Text>
              <Text style={styles.summaryCardTotal}>
                {formatPricePEN(data.ventas.total)}
              </Text>
              <Text style={styles.infoCardSub}>
                {data.totales.cantidad_pagos} pagos
              </Text>
            </View>
          </View>
        </View>

        {/* ── CONTEO DE ÓRDENES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Resumen de Órdenes</Text>
          <View style={styles.ordenesRow}>
            <View style={[styles.ordenCard, { borderColor: COLORS.muted }]}>
              <Text style={styles.ordenCardLabel}>Total</Text>
              <Text style={[styles.ordenCardValue, { color: COLORS.primary }]}>
                {data.ordenes.total}
              </Text>
            </View>
            <View style={[styles.ordenCard, { borderColor: COLORS.success }]}>
              <Text style={[styles.ordenCardLabel, { color: COLORS.success }]}>
                Completadas
              </Text>
              <Text style={[styles.ordenCardValue, { color: COLORS.success }]}>
                {data.ordenes.completadas}
              </Text>
            </View>
            <View style={[styles.ordenCard, { borderColor: COLORS.warning }]}>
              <Text style={[styles.ordenCardLabel, { color: COLORS.warning }]}>
                Pendientes
              </Text>
              <Text style={[styles.ordenCardValue, { color: COLORS.warning }]}>
                {data.ordenes.pendientes}
              </Text>
            </View>
            <View style={[styles.ordenCard, { borderColor: COLORS.danger }]}>
              <Text style={[styles.ordenCardLabel, { color: COLORS.danger }]}>
                Canceladas
              </Text>
              <Text style={[styles.ordenCardValue, { color: COLORS.danger }]}>
                {data.ordenes.canceladas}
              </Text>
            </View>
          </View>
        </View>

        {/* ── ARQUEO DE CAJA FÍSICA ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏧 Arqueo de Caja Física</Text>
          <View style={styles.arqueoContainer}>
            <View style={[styles.arqueoRow, styles.arqueoRowEven]}>
              <Text style={styles.arqueoLabel}>Saldo de apertura</Text>
              <Text style={styles.arqueoValue}>
                {formatPricePEN(data.arqueo.saldo_apertura)}
              </Text>
            </View>
            <View style={styles.arqueoRow}>
              <Text style={styles.arqueoLabel}>+ Ventas en efectivo</Text>
              <Text style={styles.arqueoValue}>
                {formatPricePEN(data.arqueo.ventas_efectivo)}
              </Text>
            </View>
            <View style={[styles.arqueoRow, styles.arqueoRowEven]}>
              <Text style={styles.arqueoLabel}>+ Ingresos manuales</Text>
              <Text style={styles.arqueoValue}>
                {formatPricePEN(data.arqueo.ingresos_manuales)}
              </Text>
            </View>
            <View style={styles.arqueoRow}>
              <Text style={styles.arqueoLabel}>− Retiros manuales</Text>
              <Text style={[styles.arqueoValue, { color: COLORS.danger }]}>
                ({formatPricePEN(data.arqueo.egresos_manuales)})
              </Text>
            </View>
            <View style={[styles.arqueoRow, styles.arqueoRowEven]}>
              <Text style={styles.arqueoLabel}>− Gastos / insumos</Text>
              <Text style={[styles.arqueoValue, { color: COLORS.danger }]}>
                ({formatPricePEN(data.arqueo.egresos_gastos)})
              </Text>
            </View>
            <View style={[styles.arqueoRow, styles.arqueoSeparator]}>
              <Text style={styles.arqueoTotalLabel}>
                Saldo esperado en gaveta
              </Text>
              <Text style={styles.arqueoTotalValue}>
                {formatPricePEN(data.arqueo.saldo_esperado)}
              </Text>
            </View>
            {data.arqueo.saldo_real !== null && (
              <>
                <View style={[styles.arqueoRow, styles.arqueoRowEven]}>
                  <Text style={styles.arqueoLabel}>
                    Saldo contado físicamente
                  </Text>
                  <Text style={styles.arqueoValue}>
                    {formatPricePEN(data.arqueo.saldo_real)}
                  </Text>
                </View>
                <View style={styles.arqueoRow}>
                  <Text style={styles.arqueoLabel}>
                    Diferencia (real − esperado)
                  </Text>
                  <Text
                    style={
                      data.arqueo.diferencia! >= 0
                        ? styles.diferenciaPositiva
                        : styles.diferenciaNegativa
                    }
                  >
                    {data.arqueo.diferencia! >= 0 ? "+" : ""}
                    {formatPricePEN(data.arqueo.diferencia!)}
                    {data.arqueo.esta_cuadrada
                      ? "  ✓ Cuadrada"
                      : "  ✗ Descuadre"}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* ── MOVIMIENTOS MANUALES ── */}
        {data.movimientos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              ↕ Movimientos Manuales (Retiros, Ingresos, Gastos)
            </Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, styles.colMovTipo]}>
                  Tipo
                </Text>
                <Text style={[styles.tableHeaderCell, styles.colMovDesc]}>
                  Descripción
                </Text>
                <Text style={[styles.tableHeaderCell, styles.colMovFecha]}>
                  Fecha
                </Text>
                <Text style={[styles.tableHeaderCell, styles.colMovMonto]}>
                  Monto
                </Text>
              </View>
              {data.movimientos.map((mov, idx) => {
                const esIngreso = mov.tipo === "ingreso_manual";
                return (
                  <View
                    key={idx}
                    style={[
                      styles.tableRow,
                      idx % 2 === 0 ? styles.tableRowEven : {},
                    ]}
                  >
                    <Text style={[styles.tableCell, styles.colMovTipo]}>
                      {MOVIMIENTO_LABEL[mov.tipo] ?? mov.tipo}
                    </Text>
                    <Text style={[styles.tableCellMuted, styles.colMovDesc]}>
                      {mov.descripcion ?? "—"}
                    </Text>
                    <Text style={[styles.tableCellMuted, styles.colMovFecha]}>
                      {formatDateShort(mov.fecha)}
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        styles.colMovMonto,
                        {
                          color: esIngreso ? COLORS.success : COLORS.danger,
                          fontFamily: "Helvetica-Bold",
                        },
                      ]}
                    >
                      {esIngreso ? "+" : "−"}
                      {formatPricePEN(mov.monto)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* ── LISTADO DE PAGOS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📄 Listado de Pagos ({data.pagos.length})
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colNum]}>
                N° Pago
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colOrden]}>
                Orden
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colMesa]}>Mesa</Text>
              <Text style={[styles.tableHeaderCell, styles.colMesero]}>
                Mesero
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colMetodo]}>
                Método
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colDocumento]}>
                Doc.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colFecha]}>
                Fecha
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colMonto]}>
                Monto
              </Text>
            </View>
            {data.pagos.map((pago, idx) => (
              <View
                key={idx}
                style={[
                  styles.tableRow,
                  idx % 2 === 0 ? styles.tableRowEven : {},
                ]}
              >
                <Text style={[styles.tableCell, styles.colNum]}>
                  {pago.numero_pago}
                </Text>
                <Text style={[styles.tableCell, styles.colOrden]}>
                  {pago.orden}
                </Text>
                <Text style={[styles.tableCellMuted, styles.colMesa]}>
                  {pago.mesa ?? "—"}
                </Text>
                <Text style={[styles.tableCellMuted, styles.colMesero]}>
                  {pago.mesero ?? "—"}
                </Text>
                <Text style={[styles.tableCell, styles.colMetodo]}>
                  {METODO_LABEL[pago.metodo] ?? pago.metodo}
                </Text>
                <Text style={[styles.tableCellMuted, styles.colDocumento]}>
                  {TIPO_LABEL[pago.tipo_documento] ?? pago.tipo_documento}
                </Text>
                <Text style={[styles.tableCellMuted, styles.colFecha]}>
                  {formatDateShort(pago.fecha)}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colMonto,
                    { fontFamily: "Helvetica-Bold" },
                  ]}
                >
                  {formatPricePEN(pago.monto)}
                </Text>
              </View>
            ))}

            {/* Fila de total al final de la tabla */}
            <View
              style={[
                styles.tableRow,
                {
                  backgroundColor: COLORS.light,
                  borderTopWidth: 2,
                  borderTopColor: COLORS.accent,
                },
              ]}
            >
              <Text style={[styles.tableCell, { flex: 1 }]}> </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colMonto,
                  {
                    fontFamily: "Helvetica-Bold",
                    color: COLORS.accent,
                    fontSize: 9,
                  },
                ]}
              >
                {formatPricePEN(data.ventas.total)}
              </Text>
            </View>
          </View>
        </View>

        {/* ── TOTALES FINALES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>∑ Totales de la Sesión</Text>
          <View style={styles.totalesBox}>
            <View style={styles.totalesRow}>
              <Text style={styles.totalesLabel}>Total ventas</Text>
              <Text style={[styles.totalesValue, { color: COLORS.success }]}>
                {formatPricePEN(data.ventas.total)}
              </Text>
            </View>
            <View
              style={[
                styles.totalesRow,
                { backgroundColor: COLORS.tableRowEven },
              ]}
            >
              <Text style={styles.totalesLabel}>+ Ingresos manuales</Text>
              <Text style={[styles.totalesValue, { color: COLORS.success }]}>
                {formatPricePEN(data.arqueo.ingresos_manuales)}
              </Text>
            </View>
            <View style={styles.totalesRow}>
              <Text style={styles.totalesLabel}>
                − Egresos (retiros + gastos)
              </Text>
              <Text style={[styles.totalesValue, { color: COLORS.danger }]}>
                ({formatPricePEN(data.totales.total_egresos)})
              </Text>
            </View>
            <View style={styles.totalesRowFinal}>
              <Text style={styles.totalesFinalLabel}>NETO DE LA SESIÓN</Text>
              <Text style={styles.totalesFinalValue}>
                {formatPricePEN(data.totales.total_neto)}
              </Text>
            </View>
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{negocioNombre}</Text>
          <Text style={styles.footerText}>
            Reporte generado el {formatDate(new Date())}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Pág. ${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </View>
      </Page>
    </Document>
  );
};

export default ReporteSesionPDF;
