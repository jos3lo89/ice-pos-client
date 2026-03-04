import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { GetTicketRes } from "@/core/entities/payment.entity";
import { formatDateTime } from "@/utils/format-date-time";
import { formatPricePEN } from "@/utils/format-price";
import { ticketStyles as styles } from "../styles/ticket-style";
import LogoTicket from "./LogoTicket";

interface Props {
  data: GetTicketRes;
}

const TicketVentaPdf = ({ data }: Props) => {
  const { negocio, comprobante, orden, cliente, items, totales, cajero } = data;

  return (
    <Document>
      <Page size={[226.77, 841.88]} style={styles.page}>
        {/* 1. Logo */}
        <LogoTicket />

        {/* 2. Cabecera del negocio */}
        <Text style={styles.businessName}>{negocio.nombre}</Text>
        <Text style={styles.businessInfo}>{negocio.direccion}</Text>
        <Text style={styles.businessInfo}>RUC: {negocio.ruc}</Text>

        {/* 3. Separador */}
        <View style={styles.separator} />

        {/* 4. Tipo y número de comprobante */}
        <Text style={styles.documentType}>
          {comprobante.tipo_documento.toUpperCase()}
        </Text>
        <Text style={styles.documentNumber}>N°: {comprobante.numero_pago}</Text>

        {/* 5. Metadata */}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Fecha/Hora:</Text>
          <Text style={styles.metaValue}>
            {formatDateTime(comprobante.fecha, "date")} -{" "}
            {formatDateTime(comprobante.fecha, "time")}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Cajero:</Text>
          <Text style={styles.metaValue}>{cajero}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Método:</Text>
          <Text style={styles.metaValue}>{comprobante.metodo}</Text>
        </View>
        {orden.numero_orden && orden.mesa && (
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Mesa:</Text>
            <Text style={styles.metaValue}>{orden.mesa}</Text>
          </View>
        )}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Cliente:</Text>
          <Text style={styles.metaValue}>{cliente.razon_social}</Text>
        </View>

        {/* 6. Separador + encabezado de tabla */}
        <View style={styles.separator} />
        <View style={styles.tableHeader}>
          <Text style={styles.colProduct}>Producto</Text>
          <Text style={styles.colQty}>Cant.</Text>
          <Text style={styles.colUnit}>P.Unit</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {/* 7. Items */}
        {items.map((item, idx) => {
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
              {item.modificadores.map((mod: any, modIdx: number) => (
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

        {/* 8. Totales  */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>
              {formatPricePEN(totales.subtotal)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Monto recibido:</Text>
            <Text style={styles.totalValue}>
              {formatPricePEN(totales.monto_recibido)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Vuelto:</Text>
            <Text style={styles.totalValue}>
              {formatPricePEN(totales.vuelto)}
            </Text>
          </View>
        </View>

        {/* 9. Pie de página */}
        <Text style={styles.thankYou}>¡Gracias por su compra!</Text>
      </Page>
    </Document>
  );
};

export default TicketVentaPdf;
