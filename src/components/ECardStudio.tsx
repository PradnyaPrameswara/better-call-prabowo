import { useState, type FormEvent } from "react";
import { Button } from "@ui-sdk/react/button";
import { ecardDesigns, type ECardId } from "../data/cards";

export default function ECardStudio() {
  const [selectedId, setSelectedId] = useState<ECardId>("nusantara");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [copyState, setCopyState] = useState("");
  const card = ecardDesigns.find((design) => design.id === selectedId) ?? ecardDesigns[0];
  const salutation = from.trim() ? `— ${from.trim()}` : "— PENGIRIM RAHASIA";
  const cardText = [card.title, card.message, message.trim(), salutation, "Kartu buatan penggemar. Bukan situs atau ucapan resmi Presiden Prabowo."].filter(Boolean).join("\n");

  function sendEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`E-CARD SPESIAL: ${card.title}`);
    const body = encodeURIComponent(cardText);
    const recipient = encodeURIComponent(to.trim()).replace(/%40/gi, "@");
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  async function copyCard() {
    try {
      await navigator.clipboard.writeText(cardText);
      setCopyState("TEKS KARTU DISALIN!");
    } catch {
      setCopyState("SALIN TEKS SECARA MANUAL DARI PRATINJAU.");
    }
  }

  return (
    <section className="ecards-studio">
      <h1 className="panel-heading">KIRIM E-CARD!</h1>
      <p className="ecard-intro">PILIH KARTU SPESIALMU! KIRIM SAPAAN SEKARANG!</p>
      <div className="ecard-picker" aria-label="Pilih desain kartu">
        {ecardDesigns.map((design) => (
          <Button
            type="button"
            key={design.id}
            onClick={() => { setSelectedId(design.id); setCopyState(""); }}
            className={`ecard-option ${design.id === selectedId ? "is-selected" : ""}`}
            aria-pressed={design.id === selectedId}
          >
            <span className="ecard-option-mark" aria-hidden="true">★</span>
            <span>{design.title}</span>
          </Button>
        ))}
      </div>
      <div className="ecard-workspace">
        <div className={`ecard-preview ${card.theme}`} aria-label="Pratinjau e-card">
          <strong>{card.title}</strong>
          <div className="ecard-photo">
            <img src={card.image} alt={card.imageAlt} width="230" height="154" />
            <span>BUATAN PENGGEMAR!</span>
          </div>
          <p>{card.message}</p>
          {message.trim() && <p className="ecard-custom-message">{message.trim()}</p>}
          <small>{salutation}</small>
          <span className="ecard-unofficial">KARTU KREASI PENGGEMAR</span>
        </div>
        <form className="ecard-form" onSubmit={sendEmail}>
          <h2>ISI KARTUMU!</h2>
          <label htmlFor="ecard-to">EMAIL PENERIMA</label>
          <input id="ecard-to" type="email" autoComplete="email" required maxLength={254} placeholder="teman@example.com" value={to} onChange={e => setTo(e.target.value)} />
          <label htmlFor="ecard-from">NAMA PENGIRIM</label>
          <input id="ecard-from" type="text" maxLength={60} placeholder="Nama kamu" value={from} onChange={e => setFrom(e.target.value)} />
          <label htmlFor="ecard-message">PESAN TAMBAHAN</label>
          <textarea id="ecard-message" rows={3} maxLength={180} placeholder="Tulis pesan singkat..." value={message} onChange={e => setMessage(e.target.value)} />
          <Button type="submit" className="ecard-action">BUKA APLIKASI EMAIL!</Button>
          <Button type="button" className="ecard-action secondary" onClick={copyCard}>SALIN TEKS KARTU!</Button>
          <Button type="button" className="ecard-action secondary" onClick={() => window.print()}>CETAK KARTU!</Button>
          <p role="status" className="ecard-copy-status">{copyState}</p>
          <p className="ecard-form-note">Tombol email hanya membuka aplikasi email di perangkat Anda, bukan mengirim email otomatis.</p>
        </form>
      </div>
    </section>
  );
}
