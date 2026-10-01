// Хуучин файл — хэрэггүй. Үндсэн layout нь src/app/[lang]/layout.tsx.
// Энэ файлыг устгаж болно.
export default function PassThrough({ children }: { children: React.ReactNode }) {
  return children;
}
