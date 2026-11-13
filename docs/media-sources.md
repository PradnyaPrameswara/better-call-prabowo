# Foto dan video Tahap 2

Foto yang dipilih berasal dari dokumentasi pemerintahan dan disajikan sebagai **arsip nyata** dalam desain parodi, bukan bukti dukungan, testimonial, atau iklan Presiden Prabowo. Ketujuh foto di bawah sudah disalin sebagai JPEG lokal ke `public/images/prabowo/` dan digunakan melalui path lokal pada situs. File aslinya tersedia melalui tautan kredit. Sebelum publikasi luas, pastikan kesesuaian ketentuan tiap yurisdiksi dan kebutuhan privasi serta martabat subjek.

| Peran visual | Foto sumber | Kredit | Status |
| --- | --- | --- | --- |
| Portrait/header/sidebar/cards | [Prabowo 2024 official portrait](https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_2024_official_portrait.jpg) | Darwis Triadi / Kementerian Sekretariat Negara | Disalin lokal dari Wikimedia thumbnail |
| Homepage hero-1 | [First speech 01](https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_01.jpg) | Rahmat / Sekretariat Kabinet RI | Disalin lokal |
| Homepage/TV hero-2 | [Prabowo at G20](https://commons.wikimedia.org/wiki/File:Prabowo_in_G20.jpg) | BPMI Setpres / Laily Rachev | Disalin lokal |
| Homepage/TV hero-3 | [UN General Assembly 2025](https://commons.wikimedia.org/wiki/File:Prabowo_give_speech_in_UN_General_Assembly_2025.jpg) | BPMI Setpres | Disalin lokal |
| Homepage/illustration | [Prabowo and Jokowi 2024](https://commons.wikimedia.org/wiki/File:Prabowo_and_Jokowi_in_2024.jpg) | BPMI Setpres / Muchlis Jr | Disalin lokal |
| TV closeup | [First speech 04](https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_04.jpg) | Sekretariat Kabinet RI | Disalin lokal |
| International meeting | [White House bilateral photo](https://commons.wikimedia.org/wiki/File:Prabowo_Subianto,_President_of_Indonesia_meets_United_States_President_Joe_Biden_on_November_12,_2024_in_the_White_House_Oval_Office_(cropped).jpg) | Oliver Contreras / White House | Foto arsip AS |

Sumber pemerintah Indonesia di Commons menandai foto dokumentasi tersebut sebagai domain publik **di Indonesia** merujuk Pasal 43 UU Hak Cipta. Foto White House merupakan karya pemerintah federal AS yang ditandai public domain di AS. Harap tinjau ketentuan penggunaan untuk publikasi lintas negara, martabat subjek, dan materi parodi.

Video berasal dari kanal resmi dan ditautkan tanpa diubah atau ditambahi ucapan:
- [Pidato pelantikan — Sekretariat Kabinet RI](https://www.youtube.com/watch?v=0-WC6xcLghI)
- [KTT G20 Brasil — Sekretariat Presiden](https://www.youtube.com/watch?v=hpCYK6BrenE)
- [Pidato PBB 2025 — Sekretariat Presiden](https://www.youtube.com/watch?v=EaL_dZfRt64)
- [Kunjungan Singapura — Sekretariat Presiden](https://www.youtube.com/watch?v=WcaWJGFdjzk)

`src/data/media.ts` adalah sumber tunggal daftar URL foto, kredit, dan media. Jangan membuat ucapan/testimonial palsu yang diatribusi kepada tokoh nyata. Link video resmi dan foto arsip tetap terpisah dari teks komedi situs. Bila provider menghalangi embed video, tampilkan tautan sumber.

Semua JPEG dikumpulkan melalui `scripts/import-photos.mjs`; untuk mengisi ulang hanya file yang belum ada, jalankan `pnpm media:sync`. Tidak diperlukan API key. Perubahan gambar selanjutnya harus disertai pemeriksaan atribusi, ukuran, dan asal.

## Foto tambahan dan pembagian per halaman

Penyesuaian visual ini menambahkan tiga gambar dokumentasi dari Wikimedia Commons:

- `decorated-portrait.jpg`: [potret resmi dengan tanda kehormatan](https://commons.wikimedia.org/wiki/File:President_Prabowo_Subianto_in_2024_with_decorations.jpg), Kementerian Sekretariat Negara (dipakai pada sidebar, berbeda dari foto header)
- `cabinet-announcement.jpg`: [pengumuman Kabinet Merah Putih](https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_announces_new_cabinet.jpg), Sekretariat Presiden (iklan pertama)
- `turkey-speech.jpg`: [pidato di Parlemen Turki](https://commons.wikimedia.org/wiki/File:Prabowo_delivers_Speech_before_Turkish_Parliament.jpg), BPMI Sekretariat Presiden (iklan kedua)

Foto ketiga pada deretan iklan diganti grafis tipografi orisinal agar tidak mengulang foto salah satu thumbnail. Kartu e-card memakai ikon berbeda untuk pilihan kartu, sehingga foto besar dalam pratinjau tidak muncul dua kali pada layar yang sama. Pemutar TV menampilkan label `ON AIR` pada thumbnail yang sedang diputar untuk menghindari pengulangan gambar secara bersamaan.

Semua foto menggunakan `object-fit: contain` di elemen presentasinya untuk mempertahankan keseluruhan foto, termasuk peci, wajah, latar, dan lencana. Browser QA sekarang memeriksa ketidakberulangan URL gambar dan properti crop untuk setiap halaman di lima viewport. Foto arsip tetap menjadi dokumentasi peristiwa asli; slogan adalah tulisan kreatif situs, bukan kutipan dari Presiden.

Sumber foto tambahan dari Wikimedia Commons menandai publikasi pemerintahan sebagai domain publik di Indonesia sesuai Pasal 43 UU Hak Cipta. Tinjau kembali persyaratan terkait martabat subjek untuk penggunaan lain.
