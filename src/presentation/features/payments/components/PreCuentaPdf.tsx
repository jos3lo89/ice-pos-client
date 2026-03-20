import { Document, Page, Text, View } from "@react-pdf/renderer";
import { formatDateTime } from "@/utils/format-date-time";
import { formatPricePEN } from "@/utils/format-price";
import { ticketStyles as styles } from "../styles/ticket-style";
import LogoTicket from "./LogoTicket";
import type { OrderDetailToPayRes } from "@/core/entities/order-detail-to-pay.entity";

interface Props {
  data: OrderDetailToPayRes;
}

const PreCuentaPdf = ({ data }: Props) => {
  const { orden, items, resumen } = data;

  const validItems = items.filter((item) => item.estado !== "cancelado");

  return (
    <Document>
      <Page size={[226.77, 841.88]} style={styles.page}>
        {/* 1. Logo */}
        <LogoTicket />

        {/* 2. Cabecera (Pre Cuenta) */}
        <Text style={styles.businessName}>PRE CUENTA</Text>
        <Text style={styles.businessInfo}>Documento no válido</Text>
        <Text style={styles.businessInfo}>como comprobante de pago</Text>

        {/* 3. Separador */}
        <View style={styles.separator} />

        {/* 4. Número y Metadata */}
        <Text style={styles.documentNumber}>
          Orden N°: {orden.numero_order}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Fecha/Hora:</Text>
          <Text style={styles.metaValue}>
            {formatDateTime(new Date().toISOString(), "date")} -{" "}
            {formatDateTime(new Date().toISOString(), "time")}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Mesero:</Text>
          <Text style={styles.metaValue}>{orden.mesero}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Mesa:</Text>
          <Text style={styles.metaValue}>{orden.mesa}</Text>
        </View>

        {/* 5. Separador + encabezado de tabla */}
        <View style={styles.separator} />
        <View style={styles.tableHeader}>
          <Text style={styles.colProduct}>Producto</Text>
          <Text style={styles.colQty}>Cant.</Text>
          <Text style={styles.colUnit}>P.Unit</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {/* 6. Items */}
        {validItems.map((item, idx) => {
          const nombreCompleto = item.nombre_variante
            ? `${item.nombre_producto} - ${item.nombre_variante}`
            : item.nombre_producto;

          return (
            <View key={idx}>
              <View style={styles.itemRow}>
                <Text style={styles.itemProduct}>{nombreCompleto}</Text>
                <Text style={styles.itemQty}>{item.cantidad}</Text>
                <Text style={styles.itemUnit}>
                  {formatPricePEN(item.precio_unitario)}
                </Text>
                <Text style={styles.itemTotal}>
                  {formatPricePEN(item.total_linea)}
                </Text>
              </View>
              {item.modificadores &&
                item.modificadores.map((mod: any, modIdx: number) => (
                  <View key={modIdx} style={styles.modifierRow}>
                    <Text style={styles.modifierName}>+ {mod.nombre}</Text>
                    <Text style={styles.modifierPrice}>
                      S/ {(mod.precio ?? 0).toFixed(2)}
                    </Text>
                  </View>
                ))}
            </View>
          );
        })}

        {/* 7. Totales */}
        {/* <View style={styles.separator} /> */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Orden:</Text>
            <Text style={styles.totalValue}>
              {formatPricePEN(resumen.total_orden)}
            </Text>
          </View>
          {resumen.total_pagado > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Pagado:</Text>
              <Text style={styles.totalValue}>
                {formatPricePEN(resumen.total_pagado)}
              </Text>
            </View>
          )}
          {resumen.total_pendiente > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Por Pagar:</Text>
              <Text style={styles.totalValue}>
                {formatPricePEN(resumen.total_pendiente)}
              </Text>
            </View>
          )}
        </View>

        {/* 8. Pie de página */}
        <Text style={styles.thankYou}>¡Por favor, acerquese a caja!</Text>
      </Page>
    </Document>
  );
};

export default PreCuentaPdf;
