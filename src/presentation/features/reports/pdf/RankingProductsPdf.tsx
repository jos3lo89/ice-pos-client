import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { RankingProductsResponse } from "@/core/entities/reports.entity";
import {
  rankingProductsStyles as styles,
  RANKING_PRODUCTS_COLORS as COLORS,
} from "../styles/ranking-products";
import { formatDateTime } from "@/utils/format-date-time";

// const formatDateLabel = (iso: string) => {
//   const [y, m, d] = iso.split("-");
//   return `${d}/${m}/${y}`;
// };

const getMedalStyle = (pos: number) => {
  if (pos === 1)
    return {
      badge: styles.badgeGold,
      text: styles.badgeTextGold,
      label: "🥇 1°",
    };
  if (pos === 2)
    return {
      badge: styles.badgeSilver,
      text: styles.badgeTextSilver,
      label: "🥈 2°",
    };
  if (pos === 3)
    return {
      badge: styles.badgeBronze,
      text: styles.badgeTextBronze,
      label: "🥉 3°",
    };
  return {
    badge: styles.badgeDefault,
    text: styles.badgeTextDefault,
    label: `${pos}°`,
  };
};

// ── Componente principal ──────────────────────────────────────────────────────
interface Props {
  data: RankingProductsResponse;
}

const RankingProductsPdf = ({ data }: Props) => {
  const maxCantidad =
    data.ranking.length > 0
      ? Math.max(...data.ranking.map((r) => r.cantidad_vendida))
      : 1;

  const totalVendido = data.ranking.reduce(
    (acc, r) => acc + r.cantidad_vendida,
    0,
  );

  const now = new Date();
  const generadoEn = formatDateTime(now);
  return (
    <Document
      title={`Ranking de Productos ${data.fecha_inicio} - ${data.fecha_fin}`}
      author="Ice Mankora"
      subject="Reporte de Ranking de Productos"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.reportTitle}>Ranking de Productos</Text>
            </View>
            <View style={styles.headerMeta}>
              <Text style={styles.headerMetaText}>Generado: {generadoEn}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Período Inicio</Text>
            <Text style={styles.infoCardValue}>
              {formatDateTime(data.fecha_inicio, "date")}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Período Fin</Text>
            <Text style={styles.infoCardValue}>
              {formatDateTime(data.fecha_fin, "date")}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Productos Analizados</Text>
            <Text style={styles.infoCardValue}>{data.meta.total}</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { borderLeftWidth: 3, borderLeftColor: COLORS.accent },
            ]}
          >
            <Text style={styles.statLabel}>Total Unidades Vendidas</Text>
            <Text style={styles.statValue}>{totalVendido}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={styles.sectionTitle}>
            Ranking Detallado ({data.ranking.length} productos)
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colPos]}>#</Text>
              <Text style={[styles.tableHeaderCell, styles.colNombre]}>
                Producto
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colCategoria]}>
                Categoría
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colCantidad]}>
                Cant.
              </Text>
            </View>

            {/* Filas */}
            {data.ranking.map((item, idx) => {
              const medal = getMedalStyle(item.posicion);
              const barWidth =
                maxCantidad > 0
                  ? `${Math.round((item.cantidad_vendida / maxCantidad) * 100)}%`
                  : "0%";

              return (
                <View
                  key={item.producto_id}
                  style={[
                    styles.tableRow,
                    idx % 2 === 0 ? styles.tableRowEven : {},
                  ]}
                >
                  {/* Posición */}
                  <View style={[styles.colPos]}>
                    <View style={medal.badge}>
                      <Text style={medal.text}>{item.posicion}°</Text>
                    </View>
                  </View>

                  {/* Nombre + barra */}
                  <View style={[styles.colNombre]}>
                    <Text style={styles.tableCellBold}>{item.nombre}</Text>
                    <View style={styles.barContainer}>
                      <View
                        style={[styles.barFill, { width: barWidth as any }]}
                      />
                    </View>
                  </View>

                  {/* Categoría */}
                  <Text style={[styles.tableCellMuted, styles.colCategoria]}>
                    {item.categoria}
                  </Text>

                  {/* Cantidad */}
                  <Text
                    style={[
                      styles.tableCellBold,
                      styles.colCantidad,
                      { color: COLORS.accent },
                    ]}
                  >
                    {item.cantidad_vendida}
                  </Text>
                </View>
              );
            })}

            {/* Fila de totales */}
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
              <View style={styles.colPos} />
              <Text style={[styles.tableCellBold, styles.colNombre]}>
                TOTAL
              </Text>
              <Text style={[styles.tableCellMuted, styles.colCategoria]}>
                {data.meta.total} productos
              </Text>
              <Text
                style={[
                  styles.tableCellBold,
                  styles.colCantidad,
                  { color: COLORS.accent, fontSize: 9 },
                ]}
              >
                {totalVendido}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RankingProductsPdf;
