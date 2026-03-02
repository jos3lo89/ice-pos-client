import type { GetTicketRes } from "@/features/payments/interfaces/payment.interface";
import { urlToBase64 } from "../url-to-base64";
import createPdf from "./CreatePdf";
import type { PdfResponse, TicketOutput } from "./ticket.interface";
import { formatDateTime } from "../format-date-time";
import { formatPricePEN } from "@/helpers/format-price";

export interface DataEmpresa extends GetTicketRes {
  logo: string;
}

const TicketVenta = async (
  data: DataEmpresa,
  output: TicketOutput,
): Promise<PdfResponse> => {
  const content: any[] = [];

  // ── Logo ─────────────────────────────────────────
  const logoBase64 = await urlToBase64(data.logo);
  if (logoBase64) {
    content.push({
      image: logoBase64,
      fit: [141.73, 56.692],
      alignment: "center",
      margin: [0, 0, 0, 4],
    });
  }

  // ── Cabecera del negocio ──────────────────────────
  content.push(
    {
      text: data.negocio.nombre,
      fontSize: 9,
      bold: true,
      alignment: "center",
      margin: [0, 2, 0, 0],
    },
    {
      text: data.negocio.direccion,
      fontSize: 7,
      alignment: "center",
      margin: [0, 0, 0, 0],
    },
    {
      text: `RUC: ${data.negocio.ruc}`,
      fontSize: 7,
      alignment: "center",
      margin: [0, 0, 0, 2],
    },
  );

  // ── Tipo de comprobante ───────────────────────────
  content.push(
    {
      text: data.comprobante.tipo_documento.toUpperCase(),
      fontSize: 9,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 0],
    },
    {
      text: `N°: ${data.comprobante.numero_pago}`,
      fontSize: 8,
      alignment: "center",
      margin: [0, 0, 0, 2],
    },
  );

  // ── Tabla unificada de metadata ───────────────────
  // Se consolida todo en una sola tabla para eliminar
  // los gaps entre tablas separadas.
  const metaBody: any[][] = [
    [
      { text: "Fecha/Hora:", fontSize: 7, bold: true },
      {
        text: `${formatDateTime(data.comprobante.fecha, "date")} - ${formatDateTime(data.comprobante.fecha, "time")}`,
        fontSize: 7,
        colSpan: 3,
      },
      {},
      {},
    ],
    [
      { text: "Cajero:", fontSize: 7, bold: true },
      { text: data.cajero, fontSize: 7, colSpan: 3 },
      {},
      {},
    ],
    [
      { text: "Método:", fontSize: 7, bold: true },
      { text: data.comprobante.metodo, fontSize: 7, colSpan: 3 },
      {},
      {},
    ],
  ];

  if (data.orden.numero_orden && data.orden.mesa) {
    metaBody.push([
      { text: "Mesa:", fontSize: 7, bold: true },
      { text: data.orden.mesa, fontSize: 7, colSpan: 3 },
      {},
      {},
    ]);
  }

  metaBody.push([
    { text: "Cliente:", fontSize: 7, bold: true },
    { text: data.cliente.razon_social, fontSize: 7, colSpan: 3 },
    {},
    {},
  ]);

  content.push({
    margin: [0, 0, 0, 0],
    table: {
      widths: ["25%", "75%", 0, 0],
      body: metaBody,
    },
    layout: {
      // Elimina todo padding interno vertical de las celdas
      paddingTop: () => 1,
      paddingBottom: () => 1,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
    },
  });

  // ── Encabezado de items ───────────────────────────
  content.push({
    margin: [0, 5, 0, 0],
    table: {
      widths: ["40%", "15%", "20%", "25%"],
      body: [
        [
          { text: "Producto", fontSize: 7, bold: true },
          { text: "Cant.", fontSize: 7, bold: true, alignment: "center" },
          { text: "P.Unit", fontSize: 7, bold: true, alignment: "right" },
          { text: "Total", fontSize: 7, bold: true, alignment: "right" },
        ],
      ],
    },
    layout: {
      paddingTop: () => 0,
      paddingBottom: () => 0,
      hLineWidth: (i: number) => {
        return i === 1 ? 0.5 : 0;
      },
      hLineStyle: () => ({ dash: { length: 2, space: 2 } }),
      hLineColor: () => "#000000",
      vLineWidth: () => 0,
    },
  });

  // ── Items ─────────────────────────────────────────
  const itemsBody: any[][] = [];

  for (const item of data.items) {
    const nombreCompleto = item.nombre_variante
      ? `${item.nombre_producto} - ${item.nombre_variante}`
      : item.nombre_producto;

    itemsBody.push([
      { text: nombreCompleto, fontSize: 7 },
      { text: item.cantidad.toString(), fontSize: 7, alignment: "center" },
      {
        text: formatPricePEN(item.precio_unitario),
        fontSize: 7,
        alignment: "right",
      },
      {
        text: formatPricePEN(item.total_linea),
        fontSize: 7,
        alignment: "right",
      },
    ]);

    for (const mod of item.modificadores) {
      itemsBody.push([
        {
          text: `  + ${mod.nombre}`,
          fontSize: 6,
          color: "#555555",
          italics: true,
        },
        {},
        {},
        {
          text: `S/ ${mod.precio?.toFixed(2) ?? "0.00"}`,
          fontSize: 6,
          alignment: "right",
          color: "#555555",
        },
      ]);
    }
  }

  content.push({
    margin: [0, 4, 0, 4],
    table: {
      widths: ["40%", "15%", "20%", "25%"],
      body: itemsBody,
    },
    layout: {
      paddingTop: () => 1,
      paddingBottom: () => 1,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
    },
  });

  // ── Totales ───────────────────────────────────────
  content.push({
    margin: [0, 0, 0, 0],
    table: {
      widths: ["60%", "40%"],
      body: [
        [
          {
            text: "Subtotal:",
            fontSize: 8,
            bold: true,
            alignment: "right",
          },
          {
            text: formatPricePEN(data.totales.subtotal),
            fontSize: 8,
            alignment: "right",
          },
        ],
        [
          {
            text: "Monto recibido:",
            fontSize: 8,
            bold: true,
            alignment: "right",
          },
          {
            text: formatPricePEN(data.totales.monto_recibido),
            fontSize: 8,
            alignment: "right",
          },
        ],
        [
          {
            text: "Vuelto:",
            fontSize: 8,
            bold: true,
            alignment: "right",
          },
          {
            text: formatPricePEN(data.totales.vuelto),
            fontSize: 8,
            alignment: "right",
          },
        ],
      ],
    },
    layout: {
      paddingTop: () => 1,
      paddingBottom: () => 1,
      hLineWidth: (i: number) => (i === 0 ? 0.5 : 0),
      hLineStyle: () => ({ dash: { length: 2, space: 2 } }),
      hLineColor: () => "#000000",
      vLineWidth: () => 0,
    },
  });

  // ── Pie de página ─────────────────────────────────
  // content.push({
  //   text: "¡Gracias por su compra!",
  //   fontSize: 8,
  //   bold: true,
  //   alignment: "center",
  //   margin: [0, 4, 0, 0],
  // });

  // ── Generar PDF ───────────────────────────────────
  const response = await createPdf(content, output);
  return response;
};

export default TicketVenta;
