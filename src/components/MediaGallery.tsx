import { useRef, useState } from "react";
import { Button } from "@ui-sdk/react/button";
import { photos, type MediaItem } from "../data/media";

interface Props {
  items: MediaItem[];
  heading: string;
  intro: string;
  variant?: "grid" | "player";
}

export default function MediaGallery({ items, heading, intro, variant = "player" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState<MediaItem | null>(null);
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [playing, setPlaying] = useState(false);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  function openMedia(item: MediaItem) {
    setOpened(item);
    dialogRef.current?.showModal();
  }

  function select(item: MediaItem) {
    setSelectedId(item.id);
    setPlaying(false);
  }

  if (!selected) return null;

  if (variant === "grid") {
    return (
      <section className="media-gallery media-tiles" aria-label={heading}>
        <h1 className="panel-heading">{heading}</h1>
        <div className="media-gallery-body">
          <div className="media-thumbnails">
            {items.map((item) => (
              <Button
                key={item.id}
                type="button"
                className="media-thumbnail"
                aria-label={`Buka ${item.kind === "video" ? "video" : "foto"} ${item.title}`}
                onClick={() => openMedia(item)}
              >
                <span className="media-frame">
                  <img src={item.image} alt={item.imageAlt} width="192" height="118" loading="lazy" style={{ objectPosition: item.objectPosition }} />
                  <span className="media-play" aria-hidden="true">{item.kind === "video" ? "▶" : "+"}</span>
                </span>
                <strong className="media-title">{item.title}</strong>
              </Button>
            ))}
          </div>
          <aside className="media-gallery-promo">
            <strong>{intro}</strong>
            <img src={photos.portrait.url} alt="Potret arsip Presiden Prabowo Subianto" width="132" height="146" loading="lazy" />
            <span>PRABOWO SUBIANTO</span>
            <small>PARODI INDEPENDEN</small>
          </aside>
        </div>
        <p className="gallery-disclaimer">REKAMAN ASLI · LAYOUT PARODI · BUKAN IKLAN ATAU DUKUNGAN RESMI</p>
        <dialog
          ref={dialogRef}
          className="media-dialog"
          aria-label={opened ? `Arsip ${opened.title}` : "Arsip dokumentasi"}
          onClose={() => setOpened(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          {opened && (
            <div className="media-dialog-inner">
              <div className="media-dialog-header">
                <strong>{opened.title}</strong>
                <Button type="button" className="media-close" aria-label="Tutup pemutar" onClick={() => dialogRef.current?.close()}>TUTUP ×</Button>
              </div>
              {opened.kind === "video" && opened.videoId ? (
                <iframe
                  className="media-dialog-video"
                  src={`https://www.youtube-nocookie.com/embed/${opened.videoId}?autoplay=1&rel=0`}
                  title={`Rekaman arsip: ${opened.title}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <img className="media-dialog-image" src={opened.image} alt={opened.imageAlt} />
              )}
              <p>{opened.caption}</p>
              <p className="media-source">Kredit: {opened.credit}. <a href={opened.sourceUrl} target="_blank" rel="noreferrer">Lihat sumber asli</a></p>
            </div>
          )}
        </dialog>
      </section>
    );
  }

  return (
    <section className="media-gallery media-showcase" aria-label={heading}>
      <div className="showcase-stage">
        <div className="showcase-viewport">
          {selected.kind === "video" && selected.videoId && playing ? (
            <iframe
              className="showcase-video-embed"
              src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1&rel=0`}
              title={`Video arsip: ${selected.title}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <img
                className="showcase-poster"
                src={selected.image}
                alt={selected.imageAlt}
                style={{ objectPosition: selected.objectPosition }}
                width="640"
                height="360"
                fetchPriority="high"
              />
              <span className="showcase-screen-caption">BETTER CALL PRABOWO!</span>
              {selected.kind === "video" && selected.videoId && (
                <Button
                  className="showcase-play-button"
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Putar video arsip ${selected.title}`}
                >
                  <span aria-hidden="true">▶</span>
                  PUTAR VIDEO
                </Button>
              )}
              {selected.kind === "photo" && (
                <span className="showcase-photo-stamp">FOTO ARSIP · BUKAN VIDEO</span>
              )}
            </>
          )}
        </div>
        <div className="showcase-info">
          <strong>{selected.title}</strong>
          <p>{selected.caption}</p>
          <a href={selected.sourceUrl} target="_blank" rel="noreferrer">
            BUKA SUMBER ASLI
          </a>
          <span className="showcase-credit">Kredit: {selected.credit}</span>
        </div>
        <p className="showcase-parody-note">
          MEDIA ARSIP ASLI DALAM LAYOUT PARODI. BUKAN IKLAN ATAU DUKUNGAN RESMI.
        </p>
      </div>
      <aside className="showcase-selector" aria-label={`Pilihan media: ${heading}`}>
        <h1>{heading}</h1>
        <p className="showcase-selector-subtitle">{intro}</p>
        <div className="showcase-selector-list">
          {items.map((item) => (
            <Button
              key={item.id}
              type="button"
              aria-pressed={selected.id === item.id}
              aria-label={`Pilih ${item.kind === "video" ? "video" : "foto"} ${item.title}`}
              className="showcase-selector-item"
              onClick={() => select(item)}
            >
              <span className="showcase-selector-image">
                <img
                  src={item.image}
                  alt=""
                  width="122"
                  height="62"
                  style={{ objectPosition: item.objectPosition }}
                  loading="lazy"
                />
                <span aria-hidden="true">{item.kind === "video" ? "▶" : "+"}</span>
              </span>
              <strong>{item.title}</strong>
            </Button>
          ))}
        </div>
      </aside>
    </section>
  );
}
