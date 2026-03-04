import { useState, useEffect } from "react";

export const usePeruTime = () => {
  const [time, setTime] = useState(() => getPeruTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getPeruTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};

const getPeruTime = () => {
  return new Date().toLocaleTimeString("es-PE", {
    timeZone: "America/Lima",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
