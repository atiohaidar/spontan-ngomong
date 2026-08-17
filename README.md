# Spontan Ngomong

Aplikasi web sederhana untuk melatih kemampuan berbicara spontan (*spontaneous speaking*) menggunakan topik atau pertanyaan acak. Dirancang dengan antarmuka minimalis bertema terang (*light mode*) agar mudah digunakan saat multitasking, berkendara, maupun menggunakan laptop.

---

## Fitur Utama

- **Navigasi 2 Tombol**:
  - **Lanjutkan**: Mengacak topik berikutnya dan tetap mempertahankan topik saat ini di dalam daftar rotasi.
  - **Tandai Selesai**: Mengeluarkan topik saat ini dari rotasi dan menyimpannya ke daftar selesai.
- **Dukungan Kontrol Lengkap**:
  - **Layar Sentuh / Mobile**: Tombol besar di bagian bawah dan gesture usap (geser kanan untuk lanjut, geser kiri untuk selesai).
  - **Keyboard (Desktop/Laptop)**: 
    - `Space` atau `ArrowRight`: Lanjutkan
    - `ArrowLeft` atau `D`: Tandai Selesai
    - `R`: Bacakan ulang topik
    - `Esc`: Menutup modal / dropdown
- **Text-to-Speech (TTS)**: Opsi pembacaan topik secara lisan secara otomatis saat topik berganti atau manual dengan menekan tombol audio.
- **Perintah Suara (Hands-Free)**: Kontrol menggunakan mikrofon dengan perintah kata kunci:
  - *"Lanjut"* / *"Next"* &rarr; Lanjutkan
  - *"Selesai"* / *"Done"* &rarr; Tandai Selesai
  - *"Ulang"* / *"Read"* &rarr; Bacakan Ulang
- **Pilihan Kategori**: Dropdown pada kartu untuk memilih kategori topik (Spontan Santai, Kuliah & Organisasi, Cerita & Nostalgia, Opini Ringan, English Flow, Deep Talk, serta Book Insights **Dale Carnegie: How to Win Friends & Influence People**).
- **Panduan Bicara Terstruktur**: Tombol tanda tanya (`?`) pada header yang memunculkan ringkasan metode bicara terstruktur (Metode PREP, Dulu-Sekarang-Nanti, Tantangan-Aksi-Hasil, dan tips jeda bicara).
- **Pengelolaan Topik**:
  - Menyimpan progres topik yang sudah selesai di `localStorage`.
  - Fitur tambah topik kustom (input tunggal maupun *bulk add* banyak baris).
  - Fitur pengembalian (*restore*) topik yang sudah selesai ke rotasi aktif.
- **PWA & Offline Support**: Dilengkapi Service Worker sehingga dapat dipasang ke layar utama HP (*Add to Home Screen*) dan dapat berjalan tanpa koneksi internet setelah pemuatan pertama.

---

## Struktur File

```
spontan-ngomong/
├── index.html       # Struktur halaman web
├── style.css        # Desain antarmuka (Vanilla CSS)
├── app.js           # Logika aplikasi, speech API, dan state storage
├── topics.js        # Kumpulan topik bawaan
├── sw.js            # Service worker untuk cache offline
├── manifest.json    # Konfigurasi PWA
└── icon.svg         # Ikon aplikasi
```

---

## Cara Menjalankan Secara Lokal

Aplikasi ini menggunakan HTML, CSS, dan JavaScript murni tanpa build step. Anda dapat membukanya langsung di browser atau menggunakan local static server:

Menggunakan Node.js / `serve`:
```bash
npx serve -p 3000
```

Atau menggunakan Python:
```bash
python -m http.server 3000
```

Buka peramban di `http://localhost:3000`.
