import { PDFViewer, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useReportBySessionId } from "@/application/hooks/useReports";
import { formatDateTime } from "@/utils/format-date-time";
import ReporteSesionPDF from "../pdf/ReporteSesionPdf";
import LoadingState from "@/presentation/components/LoadingState";
import ErrorState from "@/presentation/components/ErrorState";
import { Button } from "@/presentation/components/ui/button";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  sesionId: string;
}

const ReporteSesionViewer = ({ sesionId }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useReportBySessionId(sesionId);

  if (isLoading) {
    return <LoadingState message="Generando reporte detallado..." />;
  }

  if (isError || !data) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center p-6">
        <ErrorState
          message="No se pudo cargar el reporte de la sesión"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const fileName = `reporte-sesion-${data.cajero.usuario}-${new Date(
    data.sesion.fecha_apertura,
  )
    .toISOString()
    .slice(0, 10)}.pdf`;

  const handleOpenInNewTab = async () => {
    const blob = await pdf(<ReporteSesionPDF data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-md active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <FileText className="w-4 h-4 text-emerald-400" />
              </div>
              <h1 className="text-lg font-black text-white tracking-tight">
                Reporte de Sesión
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium px-1">
              {formatDateTime(data.sesion.fecha_apertura)} -{" "}
              {data.cajero.nombre}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PDFDownloadLink
            document={<ReporteSesionPDF data={data} />}
            fileName={fileName}
            className="w-full md:w-auto"
          >
            {({ loading: pdfLoading }) => (
              <Button
                disabled={pdfLoading}
                className="w-full md:w-auto h-11 px-6 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 gap-2 cursor-pointer"
              >
                {pdfLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Descargar Reporte PDF
                  </>
                )}
              </Button>
            )}
          </PDFDownloadLink>

          <Button
            variant="outline"
            className="hidden lg:flex h-11 px-4 rounded-xl border-slate-700 bg-slate-800/50 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all shadow-lg active:scale-95 gap-2"
            onClick={handleOpenInNewTab}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 min-h-0 bg-slate-900/60 overflow-hidden relative group">
        <PDFViewer
          showToolbar={false}
          className="w-full h-full border-none rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <ReporteSesionPDF data={data} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ReporteSesionViewer;
