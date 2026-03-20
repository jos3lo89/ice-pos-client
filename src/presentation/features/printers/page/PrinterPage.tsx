import { useEffect, useState } from "react";

const PrinterPage = () => {
  const [printers, setPrinters] = useState([]);
  const [loadingPrinter, setLoadingPrinter] = useState(false);

  const getAllPrinters = async () => {
    setLoadingPrinter(true);
    try {
      const res = await fetch("http://localhost:8000/discover");
      const data = await res.json();
      setPrinters(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPrinter(false);
    }
  };

  useEffect(() => {
    getAllPrinters();
  }, []);

  return (
    <div>
      {loadingPrinter ? (
        <p>Cargando impresoras...</p>
      ) : (
        <div>
          <pre>{JSON.stringify(printers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
export default PrinterPage;
