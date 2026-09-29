/*
  Spontan Ngomong - Topics & Teaching Deck Data Module
  Contains general spontaneous speaking topics AND the structured presenter Mode Ngajar deck.
*/

export const TEACHING_DECK = [
  {
    id: 'ngajar_1',
    mode: 'ngajar',
    category: '🎓 Mode Ngajar (Vibe Coding)',
    stepNumber: 1,
    totalSteps: 6,
    title: 'Opening & Ice Breaking',
    glanceClues: [
      '🎤 **Opening** — Fundamental Programming x Vibe Coding',
      '🤖 **Interaksi Audien** — "AI apa yang paling sering dipake buat ngoding?"',
      '💡 **Bridging** — Bukan buat adu model AI, tapi sharing fondasi vibe coding.'
    ],
    deepScript: `
<strong>Judul Materi:</strong> Fundamental Programming untuk Vibe Coding.<br><br>
<strong>Survey Audien (Ice Breaking):</strong><br>
"Sebelum masuk materi, aku mau tau dulu nih: Temen-temen di sini AI yang paling sering dipake buat ngoding/nugas apa aja?"<br>
<em>(Dengarkan respon audien: ChatGPT, Claude, Cursor, Copilot, dll.)</em><br><br>
<strong>Bridging Phrasing:</strong><br>
"Wah variatif banget ya! Tapi di sini kita bukan mau adu mana model AI yang paling jago. Kita mau sharing fondasi utama apa sih yang wajib kita punya biar Vibe Coding kita efektif & ga gampang jackpot bug."
    `
  },
  {
    id: 'ngajar_2',
    mode: 'ngajar',
    category: '🎓 Mode Ngajar (Vibe Coding)',
    stepNumber: 2,
    totalSteps: 6,
    title: 'Perkenalan & Problem (Illusion of Speed)',
    glanceClues: [
      '👨‍💻 **Kenalan** — Tio, S2 Informatika Telkom University.',
      '⚡ **Trap: Illusion of Speed** — 5 menit beres, pas nambah fitur / dipake user jackpot bug.',
      '🚨 **Akar Masalah** — AI cuma dipake *shortcut ketik kode*, bukan *partner berpikir*.'
    ],
    deepScript: `
<strong>Kenalan Singkat:</strong><br>
"Kenalin aku Tio, mahasiswa S2 Informatika Telkom University."<br><br>
<strong>Problem Statement:</strong><br>
"Pernah ga kalian ngalamin: ngoding pake AI rasanya ajaib banget, 5 menit aplikasi kelihatannya udah jadi. Tapi pas mau ditambahin fitur dikit atau dipake sama user... kok malah jackpot bug di mana-mana?"<br><br>
<strong>Key Takeaway:</strong><br>
"Ini yang dinamakan <strong>Illusion of Speed</strong>. Kita sering kejebak ngerasa ngoding makin cepet, padahal kita cuma pake AI buat shortcut ngetik kode, bukan sebagai partner berpikir."
    `
  },
  {
    id: 'ngajar_3',
    mode: 'ngajar',
    category: '🎓 Mode Ngajar (Vibe Coding)',
    stepNumber: 3,
    totalSteps: 6,
    title: 'Origin Vibe Coding & Perubahan Peran',
    glanceClues: [
      '🐤 **Karpathy (2025)** — Ex-Tesla & OpenAI: *"I just prompt LLM & vibe with it"*.',
      '❌ **Mitos Salah** — Vibe coding ≠ Ngoding pasrah tanpa tahu programming.',
      '🎬 **Perubahan Peran** — Dulu: *Kuli Ketik (Builder)* → Sekarang: *Sutradara (Director)*.'
    ],
    deepScript: `
<strong>Asal Usul Istilah:</strong><br>
"Istilah Vibe Coding dipopulerkan awal tahun 2025 sama Andrej Karpathy (ex-Director of AI Tesla & Co-founder OpenAI). Beliau ngetweet: <em>'Sekarang kalau ngoding aku tinggal ngomong bahasa sehari-hari ke LLM, accept suggestion, ga ngebaca tiap baris kodenya, I just vibe with it.'</em>"<br><br>
<strong>Meluruskan Mitos:</strong><br>
"Tapi banyak yang salah tangkap! Dikira Vibe Coding itu artinya 'ngoding pasrah tanpa perlu tahu dasar programming'."<br><br>
<strong>Pergeseran Peran:</strong><br>
• <strong>Dulu (Tradisional):</strong> Peran kita kayak <em>Kuli Ketik</em>. Fokus nulis syntax & benerin titik koma.<br>
• <strong>Sekarang (Vibe Coding):</strong> Peran kita berubah jadi <em>Sutradara (Director)</em>. AI yang ngetik, kita yang ngarahin alur, bikin arsitektur, dan nge-review hasilnya.
    `
  },
  {
    id: 'ngajar_4',
    mode: 'ngajar',
    category: '🎓 Mode Ngajar (Vibe Coding)',
    stepNumber: 4,
    totalSteps: 6,
    title: 'Fondasi Utama: Computational Thinking',
    glanceClues: [
      '💡 **Fondasi Baru** — Bukan ngafalin syntax, tapi **Computational Thinking**.',
      '🔍 **1. Abstraksi** — Fokus ke kebutuhan utama, abaikan detail sekunder.',
      '🧩 **2. Dekomposisi** — Pecah sistem besar jadi komponen kecil.',
      '📋 **3. Algoritma** — Susun langkah solusi dalam bahasa sehari-hari.',
      '🔁 **4. Pattern Recognition** — Kenali pola masalah berulang (reusable logic).'
    ],
    deepScript: `
<strong>Definisi Fondasi:</strong><br>
"Syntax mah serahin aja ke AI. Fondasi sesungguhnya di era Vibe Coding adalah <strong>Computational Thinking</strong>—proses berpikir memformulasikan masalah dan solusinya agar bisa diselesaikan oleh komputer."<br><br>
<strong>4 Pilar Computational Thinking:</strong><br>
1. <strong>Abstraksi:</strong> Memprioritaskan mana yang paling penting. Bedain kebutuhan core vs pendukung.<br>
2. <strong>Dekomposisi:</strong> Memecah masalah besar jadi bagian kecil (misal: frontend, backend, database).<br>
3. <strong>Algoritma:</strong> Menentukan urutan langkah secara sistematis pake bahasa manusia yang jelas.<br>
4. <strong>Pattern Recognition:</strong> Memahami pola berulang biar ga bikin solusi dari 0 tiap nemu masalah.<br><br>
<em>(Referensi referensi belajar: Bebras Indonesia di bebras.or.id & TOKI)</em>.
    `
  },
  {
    id: 'ngajar_5',
    mode: 'ngajar',
    category: '🎓 Mode Ngajar (Vibe Coding)',
    stepNumber: 5,
    totalSteps: 6,
    title: 'Tips Praktis Vibe Coding',
    glanceClues: [
      '🎯 **1. Know Your App** — Paham barang yang mau dibuat & bisa jawab pertanyaan dasar.',
      '🗺️ **2. Planning > Eksekusi** — Bedakan fase *Eksplorasi* vs *Eksploitasi*.',
      '🎨 **3. Wireframe First** — Minta wireframe ASCII / SVG di prompt dulu.',
      '❓ **4. Prompt Kritis** — *"Apakah UI ini intuitif atau user harus baca manual?"*',
      '💻 **5. UI First** — Beresin Frontend sampai fix, baru isi Backend.'
    ],
    deepScript: `
<strong>5 Tips Praktis dari Pengalaman Bikin Produk:</strong><br>
1. <strong>Paham apa yang mau dibikin:</strong> Bare minimum paham jenis aplikasi & bisa jawab pertanyaan dasar.<br>
2. <strong>Planning > Eksekusi:</strong> Bedakan mana fase eksplorasi ide vs eksploitasi eksekusi koding.<br>
3. <strong>Wireframe ASCII / SVG:</strong> Sebelum minta HTML/CSS lengkap, minta AI gambarin alur visualnya pake ASCII/SVG.<br>
4. <strong>Prompt Kritis:</strong> Uji AI dengan pertanyaan: <em>'Apakah tampilan ini sudah intuitif untuk orang awam?'</em><br>
5. <strong>Frontend First:</strong> Pas tampilan UI udah disepakati, baru diisi logika backend & API-nya.
    `
  },
  {
    id: 'ngajar_6',
    mode: 'ngajar',
    category: '🎓 Mode Ngajar (Vibe Coding)',
    stepNumber: 6,
    totalSteps: 6,
    title: 'Live Demo & Alur Praktek',
    glanceClues: [
      '📝 **1. Spesifikkan Produk** — Buat requirement se-jelas & se-spesifik mungkin.',
      '🗣️ **2. Diskusi Tech Stack** — Tanya AI rekomendasi stack ringan (HTML/CSS/JS).',
      '📄 **3. Minta PRD Dulu** — Minta dokumen PRD dari AI sebelum generate kode!',
      '🧪 **4. Stress Test & Fact Check** — Pertanyaan kritis (*"Kuat 1000 user?"*) + verifikasi info.'
    ],
    deepScript: `
<strong>Alur Live Demo & Exercise:</strong><br>
1. <strong>Spesifikkan Aplikasi:</strong> Tentukan produk yang mau dibuat.<br>
2. <strong>Diskusi Stack:</strong> Ajak AI ngobrol: 'Aku mau bikin app A pake HTML sederhana, menurutmu struktur paling oke gimana?'<br>
3. <strong>Generate PRD First:</strong> Minta AI bikin Product Requirement Document (PRD) dulu! Jangan langsung minta kodenya.<br>
4. <strong>Generate Code Step-by-Step:</strong> Minta kode per komponen berdasarkan PRD.<br>
5. <strong>Tanya Pertanyaan Kritis:</strong> <em>'Kalau 1000 user akses berbarengan, ini aman ga?'</em><br>
6. <strong>Fact Check:</strong> Selalu verifikasi jawaban AI dengan dokumentasi resmi!
    `
  }
];

export const DEFAULT_TOPICS = [
  // --- SPONTAN SANTAI & PILIHAN CEPAT ---
  {
    id: 'spontan_1',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Pilih mana: Selamanya ga boleh makan nasi seumur hidup, atau selamanya ga boleh minum es manis? Jelaskan alasan spontanmu!'
  },
  {
    id: 'spontan_2',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Apa satu hal paling sepele di jalanan yang paling gampang bikin kamu geregetan atau ngedumel sendiri?'
  },
  {
    id: 'spontan_3',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Kalau kamu disuruh menghapus 1 aplikasi di HP-mu selamanya detik ini juga, aplikasi apa yang bakal kamu hapus dan kenapa?'
  },
  {
    id: 'spontan_4',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Pilih mana: Setiap hari bangun jam 4 pagi dengan energi penuh, atau boleh bangun jam berapa aja tapi selalu ngantuk?'
  },
  {
    id: 'spontan_5',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Apa makanan yang orang-orang bilang enak banget, tapi menurut lidahmu biasa aja atau malah ga enak?'
  },
  {
    id: 'spontan_6',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Kalau kamu dikasih uang 100 ribu sekarang dan wajib dihabiskan dalam 15 menit, kamu mau beli apa?'
  },
  {
    id: 'spontan_7',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Kenapa bangun jam 6 pagi pas hari libur rasanya seger, tapi pas hari kerja rasanya berat banget?'
  },
  {
    id: 'spontan_8',
    category: 'Spontan Santai',
    mode: 'santai',
    text: 'Lebih suka belanja online atau belanja langsung ke toko fisik? Ceritakan pengalamanmu yang bikin milih itu!'
  },

  // --- KULIAH & ORGANISASI ---
  {
    id: 'org_1',
    category: 'Kuliah & Organisasi',
    mode: 'organisasi',
    text: 'Bagaimana caramu menyampaikan ide yang berani di rapat organisasi tanpa menyinggung anggota senior?'
  },
  {
    id: 'org_2',
    category: 'Kuliah & Organisasi',
    mode: 'organisasi',
    text: 'Kalau ada anggota tim proyek kuliahmu yang pasif dan ga ngerjain tugas, tindakan konkret apa yang bakal kamu lakukan?'
  },
  {
    id: 'org_3',
    category: 'Kuliah & Organisasi',
    mode: 'organisasi',
    text: 'Ceritakan momen ketika kamu harus memilih antara fokus ujian kuliah atau tanggung jawab kepanitiaan acara.'
  },

  // --- CERITA & NOSTALGIA ---
  {
    id: 'cerita_1',
    category: 'Cerita & Nostalgia',
    mode: 'cerita',
    text: 'Ceritakan momen paling bikin kamu malu di depan umum yang kalau diingat sekarang malah bikin ketawa.'
  },
  {
    id: 'cerita_2',
    category: 'Cerita & Nostalgia',
    mode: 'cerita',
    text: 'Ceritakan makanan terenak atau paling berkesan yang pernah kamu makan saat perut lagi lapar-lapernya.'
  },
  {
    id: 'cerita_3',
    category: 'Cerita & Nostalgia',
    mode: 'cerita',
    text: 'Ceritakan barang paling ga penting atau ga guna yang pernah kamu beli cuma karena laper mata atau diskon.'
  },

  // --- OPINI RINGAN ---
  {
    id: 'opini_1',
    category: 'Opini Ringan',
    mode: 'opini',
    text: 'Menurutmu, apakah kerja dari rumah (WFH) benar-benar lebih produktif daripada kerja dari kantor (WFO)?'
  },
  {
    id: 'opini_2',
    category: 'Opini Ringan',
    mode: 'opini',
    text: 'Apakah IPK tinggi masih menjamin kesuksesan karir di era sekarang? Berikan pandangan objektifmu!'
  },

  // --- ENGLISH FLOW ---
  {
    id: 'eng_1',
    category: 'English Flow',
    mode: 'english',
    text: 'Describe your perfect weekend morning in 3 simple sentences. What makes it special for you?'
  },
  {
    id: 'eng_2',
    category: 'English Flow',
    mode: 'english',
    text: 'If you could instantly become fluent in any foreign language overnight, which one would you choose and why?'
  },

  // --- DEEP TALK ---
  {
    id: 'deep_1',
    category: 'Deep Talk',
    mode: 'deep',
    text: 'Apa satu nasehat kehidupan terbaik yang pernah kamu terima dan benar-benar merubah caramu berpikir?'
  },
  {
    id: 'deep_2',
    category: 'Deep Talk',
    mode: 'deep',
    text: 'Kalau kamu bisa kembali ke masa lalu dan bicara dengan dirimu versi 5 tahun lalu, pesan apa yang mau kamu sampaikan?'
  },

  // --- DALE CARNEGIE ---
  {
    id: 'carnegie_1',
    category: 'Dale Carnegie',
    mode: 'carnegie',
    quote: 'Names are the sweetest and most important sound in any language.',
    prompt: 'Ceritakan pengalaman ketika seseorang mengingat namamu dan itu membuatmu merasa dihargai.'
  },
  {
    id: 'carnegie_2',
    category: 'Dale Carnegie',
    mode: 'carnegie',
    quote: 'You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.',
    prompt: 'Bagaimana cara kamu menunjukkan ketertarikan yang tulus saat berkenalan dengan orang baru?'
  }
];
