/**
 * Formatea un valor a precio en Soles Peruanos (PEN)
 * @param value - Número, string numérico, null o undefined
 * @param options - Opciones de formateo
 * @returns String formateado como "S/ 1,234.56" o valor por defecto
 */
export function formatPricePEN(
  value: number | string | null | undefined,
  options?: {
    decimals?: number;
    defaultValue?: string;
    locale?: string;
  },
): string {
  const {
    decimals = 2,
    defaultValue = "S/ 0.00",
    locale = "es-PE",
  } = options || {};

  // Manejar null y undefined
  if (value === null || value === undefined) {
    return defaultValue;
  }

  // Convertir string a número
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Validar si es un número válido
  if (isNaN(numValue)) {
    return defaultValue;
  }

  // Formatear usando Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(numValue);
}
