import type { Localized } from "@/i18n/config";

/** Сайтын дээд талын гүйдэг зар — админ: "Гүйдэг зар" (notices хүснэгт) */
export type Notice = {
  id: number;
  text: Localized;
  url?: string;
  /** ISO огноо — энэ хугацаанаас эхэлж харагдана */
  startsAt: string;
  /** ISO огноо — энэ хугацаанаас хойш харагдахгүй */
  endsAt: string;
};

export const isNoticeActive = (n: Notice, now: number) =>
  new Date(n.startsAt).getTime() <= now && now < new Date(n.endsAt).getTime();
