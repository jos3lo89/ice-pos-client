import type { GetTicketRes } from "@/features/payments/interfaces/payment.interface";
import { urlToBase64 } from "../url-to-base64";
import createPdf from "./CreatePdf";
import type { PdfResponse, TicketOutput } from "./ticket.interface";

export interface DataEmpresa extends GetTicketRes {
  logo: string;
}

const TicketVenta = async (
  data: DataEmpresa,
  output: TicketOutput,
): Promise<PdfResponse> => {
  const content: any[] = [];

  const logoBase64 = await urlToBase64(data.logo);

  if (logoBase64) {
    content.push({
      image: logoBase64,
      fit: [141.73, 56.692],
      alignment: "center",
      margin: [0, 0, 0, 4],
    });
  }
  // ── Datos del negocio ─────────────────────────────
  content.push(
    { text: data.negocio.nombre, bold: true, alignment: "center", fontSize: 9 },
    { text: `RUC: ${data.negocio.ruc}`, alignment: "center" },
    { text: data.negocio.direccion, alignment: "center", margin: [0, 0, 0, 4] },
  );

  // ── Separador ─────────────────────────────────────
  const separador = {
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 215,
        y2: 0,
        lineWidth: 0.5,
        dash: { length: 3 },
      },
    ],
    margin: [0, 2, 0, 2],
  };
  content.push(separador);

  // ── Comprobante ───────────────────────────────────
  content.push(
    {
      text: data.comprobante.tipo_documento,
      bold: true,
      alignment: "center",
      fontSize: 8,
    },
    { text: `N°: ${data.comprobante.numero_pago}`, alignment: "center" },
    { text: `Fecha: ${data.comprobante.fecha}`, alignment: "center" },
    {
      text: `Método de pago: ${data.comprobante.metodo}`,
      alignment: "center",
      margin: [0, 0, 0, 2],
    },
  );

  content.push(separador);

  // ── Orden ─────────────────────────────────────────
  content.push({
    text: `Orden: ${data.orden.numero_orden}  |  ${data.orden.tipo_orden}`,
    alignment: "center",
  });
  if (data.orden.mesa)
    content.push({ text: `Mesa: ${data.orden.mesa}`, alignment: "center" });
  if (data.orden.mesero)
    content.push({ text: `Mesero: ${data.orden.mesero}`, alignment: "center" });
  if (data.orden.notas)
    content.push({
      text: `Notas: ${data.orden.notas}`,
      alignment: "center",
      margin: [0, 0, 0, 2],
    });

  content.push(separador);

  // ── Cliente ───────────────────────────────────────
  if (data.cliente.razon_social) {
    content.push(
      { text: `Cliente: ${data.cliente.razon_social}` },
      {
        text: `${data.cliente.tipo_documento}: ${data.cliente.numero_documento}`,
      },
    );
    if (data.cliente.direccion)
      content.push({ text: `Dir: ${data.cliente.direccion}` });
    content.push({ text: "", margin: [0, 0, 0, 2] });
  }

  content.push(separador);

  // ── Items ─────────────────────────────────────────
  content.push({
    text: "DETALLE",
    bold: true,
    alignment: "center",
    margin: [0, 2, 0, 2],
  });

  const itemsBody: any[][] = [
    [
      { text: "Producto", bold: true },
      { text: "Cant.", bold: true, alignment: "right" },
      { text: "P.Unit", bold: true, alignment: "right" },
      { text: "Total", bold: true, alignment: "right" },
    ],
  ];

  for (const item of data.items) {
    const nombreCompleto = item.nombre_variante
      ? `${item.nombre_producto}\n(${item.nombre_variante})`
      : item.nombre_producto;

    itemsBody.push([
      { text: nombreCompleto },
      { text: item.cantidad.toString(), alignment: "right" },
      { text: `S/ ${item.precio_unitario.toFixed(2)}`, alignment: "right" },
      { text: `S/ ${item.total_linea.toFixed(2)}`, alignment: "right" },
    ]);

    // Modificadores si los hay
    if (item.modificadores && item.modificadores.length > 0) {
      for (const mod of item.modificadores) {
        itemsBody.push([
          {
            text: `  + ${mod.nombre || mod}`,
            italics: true,
            colSpan: 4,
            color: "#555555",
          },
          {},
          {},
          {},
        ]);
      }
    }
  }

  content.push({
    table: {
      widths: ["*", "auto", "auto", "auto"],
      body: itemsBody,
    },
    layout: "noBorders",
    margin: [0, 0, 0, 4],
  });

  content.push(separador);

  // ── Totales ───────────────────────────────────────
  content.push({
    table: {
      widths: ["*", "auto"],
      body: [
        [
          { text: "Subtotal:", bold: true },
          {
            text: `S/ ${data.totales.subtotal.toFixed(2)}`,
            alignment: "right",
          },
        ],
        [
          { text: "Monto recibido:", bold: true },
          {
            text: `S/ ${data.totales.monto_recibido.toFixed(2)}`,
            alignment: "right",
          },
        ],
        [
          { text: "Vuelto:", bold: true },
          { text: `S/ ${data.totales.vuelto.toFixed(2)}`, alignment: "right" },
        ],
      ],
    },
    layout: "noBorders",
    margin: [0, 2, 0, 4],
  });

  content.push(separador);

  // ── Cajero / Pie ──────────────────────────────────
  content.push(
    {
      text: `Atendido por: ${data.cajero}`,
      alignment: "center",
      margin: [0, 2, 0, 0],
    },
    {
      text: "¡Gracias por su preferencia!",
      alignment: "center",
      italics: true,
      margin: [0, 2, 0, 4],
    },
  );

  // ── Generar PDF ───────────────────────────────────
  const response = await createPdf(content, output);
  return response;
};

export default TicketVenta;
