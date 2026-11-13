import { useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { photos } from "../data/media";

const cameras = [
  {
    id: "camera-one",
    label: "CAM 01 — PERTEMUAN",
    photo: photos.meeting,
    alt: "Foto arsip Prabowo dan Joko Widodo berbincang di istana tahun 2024",
    caption: "Ilustrasi kamera pertama — foto arsip 2024, bukan tangkapan CCTV.",
  },
  {
    id: "camera-two",
    label: "CAM 02 — DIPLOMASI",
    photo: photos.whiteHouse,
    alt: "Foto arsip pertemuan Presiden Prabowo dan Presiden Joe Biden di Gedung Putih tahun 2024",
    caption: "Ilustrasi kamera kedua — foto arsip Gedung Putih, bukan rekaman webcam.",
  },
] as const;

export default function WebcamSimulator() {
  const [current, setCurrent] = useState(0);
  const camera = cameras[current];
  return (
    <section className="webcam-studio" aria-labelledby="webcam-heading">
      <h1 id="webcam-heading" className="panel-heading">OFFICE WEBCAM!</h1>
      <p className="webcam-lead">SIMULASI KAMERA KANTOR — REKAMAN FIKTIF!</p>
      <div className="webcam-camera">
        <img src={camera.photo.url} alt={camera.alt} width="540" height="290" />
        <span className="camera-rec" aria-hidden="true">● SIMULASI</span>
        <span className="camera-overlay" aria-hidden="true">ARSIP FOTO · BUKAN SIARAN LANGSUNG</span>
      </div>
      <div className="camera-selector" aria-label="Pilihan sudut kamera">
        {cameras.map((item, index) => (
          <Button type="button" key={item.id} aria-pressed={current === index} onClick={() => setCurrent(index)} className={`camera-choice ${current === index ? "active" : ""}`}>{item.label}</Button>
        ))}
      </div>
      <p className="webcam-caption">{camera.caption}</p>
      <p className="webcam-caption"><a href={camera.photo.source} target="_blank" rel="noreferrer">Lihat sumber foto arsip</a></p>
      <p className="gallery-disclaimer">TIDAK ADA CCTV, KANTOR PRESIDEN, REKAMAN PRIBADI, ATAU VIDEO LIVE YANG DIAKSES.</p>
    </section>
  );
}
