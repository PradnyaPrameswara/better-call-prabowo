import { useState } from "react";
import { Button } from "@ui-sdk/react/button";
import type { MediaItem } from "../data/media";

interface Props {
  items: MediaItem[];
  heading: string;
  intro: string;
}

export default function MediaGallery({ items, heading, intro }: Props) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [playing, setPlaying] = useState(false);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  if (!selected) return null;

  function select(item: MediaItem) {
    setSelectedId(item.id);
    setPlaying(false);
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
