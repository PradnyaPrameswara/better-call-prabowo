import { photos } from "./media";

export const ecardDesigns = [
  {
    id: "nusantara",
    title: "SALAM NUSANTARA!",
    message: "SALAM HANGAT DARI NEGERI SERIBU CERITA!",
    image: photos.portrait.url,
    imageAlt: "Potret resmi Prabowo Subianto, 2024",
    theme: "card-red",
  },
  {
    id: "pagi",
    title: "SELAMAT PAGI!",
    message: "BANGUN! KOPI DAN CERITA SUDAH MENANTI!",
    image: photos.inaugurationCloseup.url,
    imageAlt: "Arsip Prabowo berbicara dalam upacara pelantikan",
    theme: "card-gold",
  },
  {
    id: "semangat",
    title: "TETAP SEMANGAT!",
    message: "HARI INI, BANYAK CERITA BISA DIMULAI!",
    image: photos.g20.url,
    imageAlt: "Arsip Prabowo di pertemuan G20",
    theme: "card-blue",
  },
  {
    id: "akhir-pekan",
    title: "AKHIR PEKAN!",
    message: "REHAT SEBENTAR, KITA LANJUT LAGI BESOK!",
    image: photos.meeting.url,
    imageAlt: "Arsip Prabowo berbincang dengan Joko Widodo",
    theme: "card-green",
  },
] as const;

export type ECardId = (typeof ecardDesigns)[number]["id"];
