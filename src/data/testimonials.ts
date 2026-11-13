import { photos } from "./media";

export interface ParodyTestimonial {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  quotation: string;
  label: string;
}

export const parodyTestimonials: ParodyTestimonial[] = [
  {
    id: "visitor-01",
    name: "WARGA A",
    image: photos.inaugurationCloseup.url,
    imageAlt: "Foto arsip Prabowo berbicara di mimbar, digunakan sebagai ilustrasi tata letak",
    quotation: "Warnanya bikin saya ingat warnet dekat rumah tahun 2005!",
    label: "TOKOH & KUTIPAN FIKTIF",
  },
  {
    id: "visitor-02",
    name: "WARGA B",
    image: photos.meeting.url,
    imageAlt: "Foto arsip pertemuan Prabowo dan Joko Widodo, hanya ilustrasi",
    quotation: "Saya cari tombol biasa, ternyata semuanya teriak pakai huruf kapital!",
    label: "TOKOH & KUTIPAN FIKTIF",
  },
  {
    id: "visitor-03",
    name: "WARGA C",
    image: photos.whiteHouse.url,
    imageAlt: "Foto arsip pertemuan Prabowo di Gedung Putih, hanya ilustrasi",
    quotation: "Belum pernah lihat halaman web yang semeriah pasar malam ini.",
    label: "TOKOH & KUTIPAN FIKTIF",
  },
];
