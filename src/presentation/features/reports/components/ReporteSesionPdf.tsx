import { Document, Page, Text, View } from "@react-pdf/renderer";
import { formatPricePEN } from "@/utils/format-price";
import type { ReportResponse } from "@/core/entities/reports.entity";
import { formatDateTime } from "@/utils/format-date-time";
import {
  COLORS,
  METODO_LABEL,
  MOVIMIENTO_LABEL,
  styles,
  TIPO_LABEL,
} from "../styles/report-style";

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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.reportTitle}>
                {esCerrada
                  ? "Reporte de Cierre de Caja"
                  : "Reporte de Sesión de Caja (Abierta)"}
              </Text>
            </View>
            <View style={styles.headerMeta}>
              <Text style={styles.headerMetaText}>
                Generado: {formatDateTime(new Date())}
              </Text>
              <Text style={esCerrada ? styles.badgeClosed : styles.badgeOpen}>
                {esCerrada ? "CERRADA" : "ABIERTA"}
              </Text>
            </View>
          </View>
        </View>

        {/* Info cajero / fechas */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Cajero</Text>
            <Text style={styles.infoCardValue}>{data.cajero.nombre}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Apertura</Text>
            <Text style={styles.infoCardValue}>
              {formatDateTime(data.sesion.fecha_apertura)}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Cierre</Text>
            <Text style={styles.infoCardValue}>
              {data.sesion.fecha_cierre
                ? formatDateTime(data.sesion.fecha_cierre)
                : "Sesión activa"}
            </Text>
          </View>
        </View>

        {/* Ventas por metodoo de Pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ventas por Método de Pago</Text>
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
            </View>
          </View>
        </View>

        {/* resumen de ordenes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Órdenes</Text>
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

        {/* detalles de caja fisica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de Caja Física</Text>
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
              Movimientos Manuales (Retiros, Ingresos, Gastos)
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
                      {formatDateTime(mov.fecha)}
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

        {/* listado de pagos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Listado de Pagos ({data.pagos.length})
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
                  {formatDateTime(pago.fecha)}
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

            {/* fila de total al final de la tabla */}
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

        {/* totales finales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Totales de la Sesión</Text>
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
      </Page>
    </Document>
  );
};

export default ReporteSesionPDF;
