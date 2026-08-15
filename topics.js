// Curated Spontaneous Speaking Prompts (Ultra-Light & Instantly Speakable)
// Designed for instant verbal flow, zero analysis paralysis, and driving-friendly reflex speech.

const DEFAULT_TOPICS = [
  // --- SPONTAN SANTAI & PILIHAN CEPAT (Instant Choices & Reflex Reactions) ---
  {
    id: "spontan_1",
    category: "Spontan Santai",
    mode: "santai",
    text: "Pilih mana: Selamanya ga boleh makan nasi seumur hidup, atau selamanya ga boleh minum es manis? Jelaskan alasan spontanmu!"
  },
  {
    id: "spontan_2",
    category: "Spontan Santai",
    mode: "santai",
    text: "Apa satu hal paling sepele di jalanan yang paling gampang bikin kamu geregetan atau ngedumel sendiri?"
  },
  {
    id: "spontan_3",
    category: "Spontan Santai",
    mode: "santai",
    text: "Kalau kamu disuruh menghapus 1 aplikasi di HP-mu selamanya detik ini juga, aplikasi apa yang bakal kamu hapus dan kenapa?"
  },
  {
    id: "spontan_4",
    category: "Spontan Santai",
    mode: "santai",
    text: "Pilih mana: Setiap hari bangun jam 4 pagi dengan energi penuh, atau boleh bangun jam berapa aja tapi selalu ngantuk?"
  },
  {
    id: "spontan_5",
    category: "Spontan Santai",
    mode: "santai",
    text: "Apa makanan yang orang-orang bilang enak banget, tapi menurut lidahmu biasa aja atau malah ga enak?"
  },
  {
    id: "spontan_6",
    category: "Spontan Santai",
    mode: "santai",
    text: "Kalau kamu dikasih uang 100 ribu sekarang dan wajib dihabiskan dalam 15 menit, kamu mau beli apa?"
  },
  {
    id: "spontan_7",
    category: "Spontan Santai",
    mode: "santai",
    text: "Kenapa bangun jam 6 pagi pas hari libur rasanya seger, tapi pas hari kerja rasanya berat banget?"
  },
  {
    id: "spontan_8",
    category: "Spontan Santai",
    mode: "santai",
    text: "Lebih suka belanja online atau belanja langsung ke toko fisik? Ceritakan pengalamanmu yang bikin milih itu!"
  },
  {
    id: "spontan_9",
    category: "Spontan Santai",
    mode: "santai",
    text: "Pilih mana: Punya tetangga yang berisik banget tiap malam, atau punya tetangga yang terlalu kepo sama urusanmu?"
  },
  {
    id: "spontan_10",
    category: "Spontan Santai",
    mode: "santai",
    text: "Apa satu barang murah di bawah 50 ribu yang baru-baru ini kamu beli dan ternyata sangat berguna?"
  },

  // --- CERITA & PENGALAMAN LUCU (Storytelling & Nostalgia) ---
  {
    id: "cerita_1",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan momen paling bikin kamu malu di depan umum yang kalau diingat sekarang malah bikin ketawa."
  },
  {
    id: "cerita_2",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan makanan terenak atau paling berkesan yang pernah kamu makan saat perut lagi lapar-lapernya."
  },
  {
    id: "cerita_3",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan barang paling ga penting atau ga guna yang pernah kamu beli cuma karena laper mata atau diskon."
  },
  {
    id: "cerita_4",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan satu kebiasaan aneh atau unik waktu kamu masih kecil yang baru kamu sadari pas udah gede."
  },
  {
    id: "cerita_5",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan kejadian nyasar paling berkesan atau kocak yang pernah kamu alami waktu bepergian."
  },
  {
    id: "cerita_6",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Siapa guru atau dosen di masa sekolah yang paling kamu ingat sampai sekarang, dan kenapa sosoknya berkesan?"
  },
  {
    id: "cerita_7",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan pengalaman pertama kali kamu belajar naik motor, sepeda, atau mobil dan hal menegangkan apa yang terjadi."
  },
  {
    id: "cerita_8",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan momen di mana kamu salah menyapa orang di tempat umum karena mukanya mirip temanmu."
  },
  {
    id: "cerita_9",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan tentang tontonan (film, kartun, atau sinetron) masa kecil yang dulu wajib kamu tonton tiap minggu."
  },
  {
    id: "cerita_10",
    category: "Cerita & Pengalaman",
    mode: "cerita",
    text: "Ceritakan satu momen di mana kamu merasa sangat beruntung secara tidak terduga dalam situasi sehari-hari."
  },

  // --- WHAT IF & IMAJINASI (Playful & Fun Hypotheticals) ---
  {
    id: "whatif_1",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Kalau kamu tiba-tiba bisa mengerti dan bicara bahasa hewan selama 1 jam, hewan apa yang mau kamu ajak ngobrol pertama kali?"
  },
  {
    id: "whatif_2",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Kalau kamu punya pintu kemana saja milik Doraemon, tempat pertama mana yang mau langsung kamu kunjungi saat ini?"
  },
  {
    id: "whatif_3",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Jika kamu bisa membuat 1 makanan instan baru yang belum pernah ada di dunia, rasa apa yang mau kamu ciptakan?"
  },
  {
    id: "whatif_4",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Kalau kamu bisa menghapus satu jenis hari dalam seminggu, hari apa yang mau kamu hilangkan dan kenapa?"
  },
  {
    id: "whatif_5",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Kalau kamu bisa menukar hidupmu dengan tokoh utama di film favoritmu selama 24 jam, film apa yang kamu pilih?"
  },
  {
    id: "whatif_6",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Jika kamu terbangun besok pagi dan menjadi orang paling terkenal di Indonesia selama sehari, apa hal pertama yang bakal kamu lakukan?"
  },
  {
    id: "whatif_7",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Kalau kamu bisa punya robot pribadi yang cuma bisa disuruh 1 tugas rumah tangga selamanya, tugas apa yang kamu serahkan?"
  },
  {
    id: "whatif_8",
    category: "What If & Imajinasi",
    mode: "whatif",
    text: "Kalau kamu terdampar di pulau tropis dan hanya boleh makan satu menu makanan yang sama tiap hari, menu apa yang kamu pilih?"
  },

  // --- OPINI RINGAN & SEHARI-HARI (Daily Takes & Hot Takes) ---
  {
    id: "opini_1",
    category: "Opini Ringan",
    mode: "opini",
    text: "Menurutmu, apakah bubur ayam lebih enak diaduk atau tidak diaduk? Berikan argumen terbaikmu!"
  },
  {
    id: "opini_2",
    category: "Opini Ringan",
    mode: "opini",
    text: "Apa satu tren sosial media saat ini yang menurutmu paling aneh atau bikin geleng-geleng kepala?"
  },
  {
    id: "opini_3",
    category: "Opini Ringan",
    mode: "opini",
    text: "Menurutmu, lebih mending kejebak macet 2 jam di jalan atau nunggu orang ngaret 1 jam di tempat janji temu?"
  },
  {
    id: "opini_4",
    category: "Opini Ringan",
    mode: "opini",
    text: "Apa barang jadul dari zaman dulu yang menurutmu jauh lebih awet dan bagus dibanding barang zaman sekarang?"
  },
  {
    id: "opini_5",
    category: "Opini Ringan",
    mode: "opini",
    text: "Kenapa menurutmu ngobrol langsung tatap muka rasanya jauh lebih enak dibanding chattingan panjang di WhatsApp?"
  },
  {
    id: "opini_6",
    category: "Opini Ringan",
    mode: "opini",
    text: "Menurutmu, apa etika paling penting saat kita lagi nongkrong bareng teman di kafe atau tempat makan?"
  },
  {
    id: "opini_7",
    category: "Opini Ringan",
    mode: "opini",
    text: "Kenapa orang sering bilang 'lagi otw' padahal aslinya baru mau beranjak mandi? Ceritakan pandanganmu!"
  },
  {
    id: "opini_8",
    category: "Opini Ringan",
    mode: "opini",
    text: "Lebih suka liburan yang santai rebahan di villa/hotel atau liburan yang jadwalnya padat jalan-jalan keliling kota?"
  },

  // --- ENGLISH QUICK-FLOW (Casual, Zero-Stress English Prompts) ---
  {
    id: "eng_1",
    category: "English Quick-Flow",
    mode: "english",
    text: "Would you rather have unlimited free coffee for life or unlimited free flight tickets? Why?"
  },
  {
    id: "eng_2",
    category: "English Quick-Flow",
    mode: "english",
    text: "Talk about your favorite comfort food when you have a bad day. What makes it so special?"
  },
  {
    id: "eng_3",
    category: "English Quick-Flow",
    mode: "english",
    text: "Are you a morning person or a night owl? Describe what your typical favorite hour of the day looks like."
  },
  {
    id: "eng_4",
    category: "English Quick-Flow",
    mode: "english",
    text: "If you could instantly delete one social media platform from the planet, which one would you choose and why?"
  },
  {
    id: "eng_5",
    category: "English Quick-Flow",
    mode: "english",
    text: "Describe the best trip or vacation you've ever had in just 3 sentences."
  },
  {
    id: "eng_6",
    category: "English Quick-Flow",
    mode: "english",
    text: "What is one simple skill you wish you had learned when you were 10 years old?"
  },
  {
    id: "eng_7",
    category: "English Quick-Flow",
    mode: "english",
    text: "Would you rather live in a crowded bustling city center or a quiet peaceful countryside? Explain why!"
  },
  {
    id: "eng_8",
    category: "English Quick-Flow",
    mode: "english",
    text: "What is a song or music genre that instantly puts you in a good mood whenever you hear it?"
  },

  // --- DEEP TALK SANTAI (Reflective but not Overwhelming) ---
  {
    id: "deep_1",
    category: "Deep Talk Santai",
    mode: "deep",
    text: "Apa satu hal sederhana minggu ini yang bikin kamu merasa tenang atau bersyukur?"
  },
  {
    id: "deep_2",
    category: "Deep Talk Santai",
    mode: "deep",
    text: "Kalau kamu ketemu diri kamu sendiri waktu umur 17 tahun, apa satu kalimat pendek yang mau kamu bisikin ke dia?"
  },
  {
    id: "deep_3",
    category: "Deep Talk Santai",
    mode: "deep",
    text: "Menurutmu apa tanda bahwa seseorang itu aslinya teman yang tulus dan bisa dipercaya?"
  },
  {
    id: "deep_4",
    category: "Deep Talk Santai",
    mode: "deep",
    text: "Apa satu kebiasaan kecil yang akhir-akhir ini bikin hari-harimu terasa lebih produktif atau lebih rapi?"
  },
  {
    id: "deep_5",
    category: "Deep Talk Santai",
    mode: "deep",
    text: "Bagaimana caramu biasanya mengembalikan mood atau semangat kalau lagi merasa suntuk atau jenuh?"
  }
];
