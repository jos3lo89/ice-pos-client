import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import printJS from "print-js";
import type { PdfResponse, TicketOutput } from "./ticket.interface";

pdfMake.addVirtualFileSystem(pdfFonts);

const createPdf = async (
  props: Content[],
  output: TicketOutput,
): Promise<PdfResponse> => {
  try {
    const doc: TDocumentDefinitions = {
      pageSize: {
        width: 226.77,
        height: 841.88,
        // height: "auto",
      },
      pageMargins: [5.66, 5.66, 5.66, 5.66],
      content: props,
    };

    const pdfDoc = pdfMake.createPdf(doc);

    const data = await pdfDoc.getBase64();

    if (output === "b64") {
      return {
        content: data,
        message: "Documento generado correctamente",
        success: true,
      };
    }

    if (output === "print") {
      printJS({ printable: data, type: "pdf", base64: true });
      return {
        content: null,
        message: "Documento enviado a imprimir",
        success: true,
      };
    }

    return {
      content: null,
      message: "Tipo de salida no válido",
      success: false,
    };
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    return {
      success: false,
      content: null,
      message: "No se pudo completar el proceso",
    };
  }
};

export default createPdf;
