// Хуучин файл — хэрэггүй (proxy.ts нь "/" хаягийг /mn, /en, /ko руу шилжүүлдэг). Устгаж болно.
import { redirect } from "next/navigation";
export default function Index() {
  redirect("/mn");
}
