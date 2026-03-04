import ErrorState from "@/presentation/components/ErrorState";
import { useParams } from "react-router-dom";
import ReporteSesionViewer from "../components/ReporteSesionViewer";

const CashSessionReportPage = () => {
  const { sessionId } = useParams();

  if (!sessionId) {
    return <ErrorState message="No se encontro el id de la sesion" />;
  }

  return <ReporteSesionViewer sesionId={sessionId} />;
};
export default CashSessionReportPage;
