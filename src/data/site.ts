export const siteIdentity = {
  name: "Better Call Prabowo!",
  subtitle: "PARODI INDONESIA",
  tagline: "BUTUH BANTUAN? BETTER CALL PRABOWO!",
  unofficialNotice: "SITUS PARODI INDEPENDEN — BUKAN SITUS RESMI PEMERINTAH",
} as const;

export const navigation = [
  { id: "consultations", label: "KONSULTASI", path: "/" },
  { id: "testimonials", label: "TESTIMONI", path: "/testimonials/" },
  { id: "asseenontv", label: "DI TELEVISI", path: "/asseenontv/" },
  { id: "ecards", label: "E-CARDS", path: "/ecards/" },
  { id: "livewebcam", label: "WEBCAM KANTOR", path: "/livewebcam/" },
] as const;

export type PageId = (typeof navigation)[number]["id"];

export const portrait = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/500px-Prabowo_Subianto_2024_official_portrait.jpg",
  alt: "Potret resmi Prabowo Subianto tahun 2024",
  source: "https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_2024_official_portrait.jpg",
  credit: "Darwis Triadi / Kementerian Sekretariat Negara, via Wikimedia Commons",
} as const;

export const sidebarPromotions = [
  { title: "INFO NUSANTARA", detail: "CERITA FIKTIF SERBA INDONESIA", variation: "red" },
  { title: "LAYANAN WARGA", detail: "KLIK UNTUK JELAJAHI", variation: "blue" },
] as const;
