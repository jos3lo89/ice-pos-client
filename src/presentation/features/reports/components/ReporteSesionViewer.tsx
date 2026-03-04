import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useReportBySessionId } from "@/application/hooks/useReports";
import { formatDateTime } from "@/utils/format-date-time";
import ReporteSesionPDF from "./ReporteSesionPdf";

interface Props {
  sesionId: string;
}

const ReporteSesionViewer = ({ sesionId }: Props) => {
  const useReportBySession = useReportBySessionId(sesionId);

  const data = useReportBySession.data;

  if (useReportBySession.isLoading) {
    return (
      <div>
        <div>
          <p>Cargando reporte...</p>
        </div>
      </div>
    );
  }

  if (useReportBySession.isError || !data) {
    return (
      <div>
        <div>
          <p>{useReportBySession.error?.message ?? "Error desconocido"}</p>
        </div>
      </div>
    );
  }

  const fileName = `reporte-sesion-${data.cajero.usuario}-${new Date(
    data.sesion.fecha_apertura,
  )
    .toISOString()
    .slice(0, 10)}.pdf`;

  return (
    <div>
      <div>
        <div>
          <span>Reporte de Sesión</span>
          <span>{formatDateTime(data.sesion.fecha_apertura)}</span>
        </div>
        <div>
          <PDFDownloadLink
            document={<ReporteSesionPDF data={data} />}
            fileName={fileName}
          >
            {({ loading: pdfLoading }) =>
              pdfLoading ? "Preparando..." : "Descargar PDF"
            }
          </PDFDownloadLink>
        </div>
      </div>

      <PDFViewer showToolbar={false}>
        <ReporteSesionPDF data={data} />
      </PDFViewer>
    </div>
  );
};

export default ReporteSesionViewer;
