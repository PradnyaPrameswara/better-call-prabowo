export interface MediaItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  kind: "video" | "photo";
  videoId?: string;
  credit: string;
  objectPosition?: string;
}

export const photos = {
  portrait: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prabowo_Subianto_2024_official_portrait.jpg/500px-Prabowo_Subianto_2024_official_portrait.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_2024_official_portrait.jpg",
    credit: "Darwis Triadi / Kementerian Sekretariat Negara",
  },
  inauguration: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/64/Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_01.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_01.jpg",
    credit: "Rahmat / Sekretariat Kabinet RI",
  },
  inaugurationCloseup: {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_04.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_Subianto_delivers_first_speech_as_President_of_Indonesia_04.jpg",
    credit: "Sekretariat Kabinet RI",
  },
  g20: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Prabowo_in_G20.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_in_G20.jpg",
    credit: "BPMI Setpres / Laily Rachev",
  },
  unitedNations: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Prabowo_give_speech_in_UN_General_Assembly_2025.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_give_speech_in_UN_General_Assembly_2025.jpg",
    credit: "BPMI Setpres",
  },
  meeting: {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/40/Prabowo_and_Jokowi_in_2024.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_and_Jokowi_in_2024.jpg",
    credit: "BPMI Setpres / Muchlis Jr",
  },
  whiteHouse: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Prabowo_Subianto%2C_President_of_Indonesia_meets_United_States_President_Joe_Biden_on_November_12%2C_2024_in_the_White_House_Oval_Office_%28cropped%29.jpg/960px-Prabowo_Subianto%2C_President_of_Indonesia_meets_United_States_President_Joe_Biden_on_November_12%2C_2024_in_the_White_House_Oval_Office_%28cropped%29.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Prabowo_Subianto,_President_of_Indonesia_meets_United_States_President_Joe_Biden_on_November_12,_2024_in_the_White_House_Oval_Office_(cropped).jpg",
    credit: "Oliver Contreras / The White House",
  },
} as const;

export const consultations: MediaItem[] = [
  {
    id: "inauguration",
    title: "PIDATO PERDANA!",
    caption: "Pidato pelantikan 20 Oktober 2024 — dokumentasi asli, bukan adegan parodi.",
    image: photos.inauguration.url,
    imageAlt: "Prabowo berpidato pada pelantikan presiden tahun 2024",
    sourceUrl: "https://www.youtube.com/watch?v=0-WC6xcLghI",
    videoId: "0-WC6xcLghI",
    kind: "video",
    credit: "Sekretariat Kabinet RI",
    objectPosition: "60% 45%",
  },
  {
    id: "g20",
    title: "KTT G20!",
    caption: "Dokumentasi resmi KTT G20 Brasil, November 2024.",
    image: photos.g20.url,
    imageAlt: "Prabowo saat menghadiri KTT G20 Brasil",
    sourceUrl: "https://www.youtube.com/watch?v=hpCYK6BrenE",
    videoId: "hpCYK6BrenE",
    kind: "video",
    credit: "Sekretariat Presiden",
    objectPosition: "50% 40%",
  },
  {
    id: "un",
    title: "PIDATO PBB!",
    caption: "Rekaman resmi Sidang Umum PBB pada 23 September 2025.",
    image: photos.unitedNations.url,
    imageAlt: "Prabowo berbicara di mimbar Perserikatan Bangsa-Bangsa",
    sourceUrl: "https://www.youtube.com/watch?v=EaL_dZfRt64",
    videoId: "EaL_dZfRt64",
    kind: "video",
    credit: "Sekretariat Presiden",
    objectPosition: "50% 56%",
  },
  {
    id: "jokowi",
    title: "OBROLAN ISTANA!",
    caption: "Foto dokumentasi Prabowo dan Joko Widodo, September 2024.",
    image: photos.meeting.url,
    imageAlt: "Prabowo berbicara dengan Joko Widodo di ruang istana",
    sourceUrl: photos.meeting.source,
    kind: "photo",
    credit: photos.meeting.credit,
    objectPosition: "72% 58%",
  },
];

export const television: MediaItem[] = [
  {
    id: "tv-inauguration",
    title: "DI GEDUNG MPR!",
    caption: "Arsip pidato pelantikan, tayangan resmi Sekretariat Kabinet.",
    image: photos.inaugurationCloseup.url,
    imageAlt: "Prabowo mengepalkan tangan saat pidato pelantikan",
    sourceUrl: "https://www.youtube.com/watch?v=0-WC6xcLghI",
    videoId: "0-WC6xcLghI",
    kind: "video",
    credit: "Sekretariat Kabinet RI",
  },
  {
    id: "tv-g20",
    title: "DARI BRASIL!",
    caption: "Liputan G20 dari Sekretariat Presiden.",
    image: photos.g20.url,
    imageAlt: "Prabowo dalam suasana pertemuan G20",
    sourceUrl: "https://www.youtube.com/watch?v=hpCYK6BrenE",
    videoId: "hpCYK6BrenE",
    kind: "video",
    credit: "Sekretariat Presiden",
  },
  {
    id: "tv-un",
    title: "DARI NEW YORK!",
    caption: "Pidato di Sidang Umum PBB, dokumentasi Sekretariat Presiden.",
    image: photos.unitedNations.url,
    imageAlt: "Prabowo berpidato di Sidang Umum PBB",
    sourceUrl: "https://www.youtube.com/watch?v=EaL_dZfRt64",
    videoId: "EaL_dZfRt64",
    kind: "video",
    credit: "Sekretariat Presiden",
  },
];
