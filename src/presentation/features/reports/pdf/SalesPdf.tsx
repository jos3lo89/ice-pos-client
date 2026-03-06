import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { VentasPorDiaResponse } from "@/core/entities/reports.entity";
import {
  DAILY_SALES_COLORS as COLORS,
  dailySalesPdfStyles as styles,
} from "../styles/sales-pdf";
import { formatPricePEN } from "@/utils/format-price";
import { formatDateTime } from "@/utils/format-date-time";

interface Props {
  data: VentasPorDiaResponse;
}

const SalesPdf = ({ data }: Props) => {
  const {
    resumen,
    ventas_por_metodo,
    ventas_por_tipo_orden,
    movimientos_manuales,
  } = data;
  const generadoEn = formatDateTime(new Date());

  const balanceManual =
    movimientos_manuales.ingresos -
    movimientos_manuales.egresos -
    movimientos_manuales.gastos;

  const balanceCaja =
    resumen.total_ventas +
    movimientos_manuales.ingresos -
    movimientos_manuales.egresos -
    movimientos_manuales.gastos;

  return (
    <Document
      title={`Reporte Operativo ${data.fecha.inicio} - ${data.fecha.fin}`}
      author="Ice Mankora"
      subject="Reporte de Ventas"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reporte Operativo de Ventas</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>
              Período: {formatDateTime(data.fecha.inicio, "date")} al{" "}
              {formatDateTime(data.fecha.fin, "date")}
            </Text>
            <Text style={styles.metaText}>Generado el: {generadoEn}</Text>
          </View>
        </View>

        {/* Summary Grid */}
        <View style={styles.grid}>
          <View
            style={[
              styles.card,
              { borderLeftColor: COLORS.emerald, borderLeftWidth: 3 },
            ]}
          >
            <Text style={styles.cardLabel}>Ventas Totales</Text>
            <Text style={styles.cardValue}>
              {formatPricePEN(resumen.total_ventas)}
            </Text>
            <Text style={styles.cardFooter}>
              {resumen.ordenes_completadas} Órdenes OK
            </Text>
          </View>

          <View
            style={[
              styles.card,
              { borderLeftColor: COLORS.accent, borderLeftWidth: 3 },
            ]}
          >
            <Text style={styles.cardLabel}>Balance en Caja</Text>
            <Text style={styles.cardValue}>{formatPricePEN(balanceCaja)}</Text>
            <Text style={styles.cardFooter}>Ventas + Movimientos</Text>
          </View>

          <View
            style={[
              styles.card,
              { borderLeftColor: COLORS.amber, borderLeftWidth: 3 },
            ]}
          >
            <Text style={styles.cardLabel}>Balance Manual</Text>
            <Text style={styles.cardValue}>
              {formatPricePEN(balanceManual)}
            </Text>
            <Text style={styles.cardFooter}>Ingresos - Egresos</Text>
          </View>

          <View
            style={[
              styles.card,
              { borderLeftColor: COLORS.slate, borderLeftWidth: 3 },
            ]}
          >
            <Text style={styles.cardLabel}>Total Órdenes</Text>
            <Text style={styles.cardValue}>{resumen.total_ordenes}</Text>
            <Text style={styles.cardFooter}>
              {resumen.ordenes_pendientes} en curso
            </Text>
          </View>
        </View>

        {/* Detailed Breakdown */}
        <View style={styles.row}>
          {/* Payment Methods */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INGRESOS POR MÉTODO</Text>
              <View style={styles.table}>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>Efectivo</Text>
                  <Text style={styles.listValue}>
                    {formatPricePEN(ventas_por_metodo.efectivo)}
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>Yape</Text>
                  <Text style={styles.listValue}>
                    {formatPricePEN(ventas_por_metodo.yape)}
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>Plin</Text>
                  <Text style={styles.listValue}>
                    {formatPricePEN(ventas_por_metodo.plin)}
                  </Text>
                </View>
                <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.listLabel}>Tarjeta</Text>
                  <Text style={styles.listValue}>
                    {formatPricePEN(ventas_por_metodo.tarjeta)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>MOVIMIENTOS MANUALES</Text>
              <View style={styles.table}>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>(+) Ingresos</Text>
                  <Text style={[styles.listValue, { color: COLORS.emerald }]}>
                    {formatPricePEN(movimientos_manuales.ingresos)}
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>(-) Egresos (Caja)</Text>
                  <Text style={[styles.listValue, { color: COLORS.rose }]}>
                    {formatPricePEN(movimientos_manuales.egresos)}
                  </Text>
                </View>
                <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.listLabel}>(-) Gastos (Insumos)</Text>
                  <Text style={[styles.listValue, { color: COLORS.amber }]}>
                    {formatPricePEN(movimientos_manuales.gastos)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Order Types */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                INGRESOS POR TIPO DE ORDEN
              </Text>
              <View style={styles.table}>
                {ventas_por_tipo_orden.map((item, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.listItem,
                      idx === ventas_por_tipo_orden.length - 1
                        ? { borderBottomWidth: 0 }
                        : {},
                    ]}
                  >
                    <View>
                      <Text
                        style={[
                          styles.listLabel,
                          { textTransform: "capitalize" },
                        ]}
                      >
                        {item.tipo.replace("_", " ")}
                      </Text>
                      <Text style={{ fontSize: 6, color: COLORS.slate }}>
                        {item.cantidad} órdenes
                      </Text>
                    </View>
                    <Text style={styles.listValue}>
                      {formatPricePEN(item.total)}
                    </Text>
                  </View>
                ))}
                {ventas_por_tipo_orden.length === 0 && (
                  <Text
                    style={{
                      padding: 10,
                      textAlign: "center",
                      color: COLORS.slate,
                      fontSize: 8,
                    }}
                  >
                    Sin registros
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>RESUMEN DE ÓRDENES</Text>
              <View style={styles.table}>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>Completadas</Text>
                  <Text style={[styles.listValue, { color: COLORS.emerald }]}>
                    {resumen.ordenes_completadas}
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.listLabel}>Pendientes</Text>
                  <Text style={[styles.listValue, { color: COLORS.amber }]}>
                    {resumen.ordenes_pendientes}
                  </Text>
                </View>
                <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
                  <Text style={styles.listLabel}>Canceladas</Text>
                  <Text style={[styles.listValue, { color: COLORS.rose }]}>
                    {resumen.ordenes_canceladas}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SalesPdf;
