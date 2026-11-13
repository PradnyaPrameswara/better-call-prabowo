import { useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import type { MediaItem } from "../data/media";

interface Props {
  items: MediaItem[];
  heading: string;
  intro: string;
}

export default function MediaGallery({ items, heading, intro }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  function open(item: MediaItem) {
    setSelected(item);
    dialog.current?.showModal();
  }

  return (
    <section className="media-gallery" aria-label={heading}>
      <h1 className="panel-heading">{heading}</h1>
      <div className="media-gallery-body">
        <div className="media-thumbnails">
          {items.map((item) => (
            <Button
              type="button"
              key={item.id}
              className="media-thumbnail"
              onClick={() => open(item)}
              aria-label={`Buka ${item.kind === "video" ? "video" : "foto"}: ${item.title}`}
            >
              <span className="media-frame">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width="192"
                  height="118"
                  style={{ objectPosition: item.objectPosition }}
                  loading="lazy"
                />
                <span className="media-play" aria-hidden="true">{item.kind === "video" ? "▶" : "+"}</span>
              </span>
              <strong className="media-title">{item.title}</strong>
            </Button>
          ))}
        </div>
        <aside className="media-gallery-promo">
          <strong>{intro}</strong>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/500px-Prabowo_Subianto_2024_official_portrait.jpg"
            alt="Potret resmi Prabowo Subianto, 2024"
            width="124"
            height="144"
            loading="lazy"
          />
          <span>PRABOWO SUBIANTO</span>
          <small>PARODI INDEPENDEN!</small>
        </aside>
      </div>
      <p className="gallery-disclaimer">
        PARODI WEBSITE RETRO — FOTO & VIDEO MERUPAKAN ARSIP NYATA, BUKAN IKLAN ATAU DUKUNGAN RESMI.
      </p>

      <dialog
        ref={dialog}
        className="media-dialog"
        aria-label={selected ? `Arsip: ${selected.title}` : "Arsip dokumentasi"}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {selected && (
          <div className="media-dialog-inner">
            <div className="media-dialog-header">
              <strong>{selected.title}</strong>
              <Button type="button" className="media-close" onClick={() => dialog.current?.close()} aria-label="Tutup pemutar">TUTUP ×</Button>
            </div>
            {selected.kind === "video" && selected.videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1&rel=0`}
                title={`Video asli: ${selected.title}`}
                className="media-dialog-video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <img className="media-dialog-image" src={selected.image} alt={selected.imageAlt} />
            )}
            <p>{selected.caption}</p>
            <p className="media-source">
              Arsip: {selected.credit}.{" "}
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer">Lihat sumber asli</a>
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
