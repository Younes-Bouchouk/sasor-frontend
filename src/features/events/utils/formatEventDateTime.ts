export function formatEventDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "short" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month} · ${hours}h${minutes}`;
}

export function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("fr-FR", { month: "long" });
  const year = String(date.getFullYear());
  return `${day} ${month} ${year}`;
}

export function formatEventTime(isoDate: string): string {
  const date = new Date(isoDate);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}h${minutes}`;
}
