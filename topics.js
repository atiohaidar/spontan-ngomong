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
  },

  // --- KULIAH & ORGANISASI (Campus Life, Committees & Team Dynamics) ---
  {
    id: "org_1",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Ceritakan pengalaman paling berkesan saat kamu ikut kepanitiaan acara atau organisasi, apa momen yang paling ga terlupakan?"
  },
  {
    id: "org_2",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Ceritakan momen krisis mendadak pas hari-H acara atau kegiatan yang bikin panik, dan bagaimana cara timmu mengatasinya?"
  },
  {
    id: "org_3",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Ceritakan momen Sistem Kebut Semalam (SKS) ngerjain tugas, laporan, atau proyek yang paling menegangkan sampai pagi."
  },
  {
    id: "org_4",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Bagaimana caramu biasanya mengelola dinamika tugas kelompok saat ada anggota yang kurang aktif tanpa merusak suasana?"
  },
  {
    id: "org_5",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Ceritakan pertama kali kamu dipercaya memegang tanggung jawab atau divisi penting dalam sebuah acara/organisasi."
  },
  {
    id: "org_6",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Momen 'closing acara' atau evaluasi akhir kepanitiaan mana yang paling bikin kamu merasa lega sekaligus terharu?"
  },
  {
    id: "org_7",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Momen 'perang rebutan jadwal kelas atau mata kuliah' mana yang paling bikin deg-degan karena servernya down?"
  },
  {
    id: "org_8",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Ceritakan pengalaman berkesan saat masa orientasi / ospek kampus atau sekolah, hal apa yang paling kamu ingat?"
  },
  {
    id: "org_9",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Apa tempat nongkrong, kantin, atau warkop andalan sekitar kampus yang selalu jadi basecamp bareng teman?"
  },
  {
    id: "org_10",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Ceritakan menu makanan 'survival mode' andalanmu saat sedang berhemat atau pas uang saku menipis."
  },
  {
    id: "org_11",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Menurutmu, tipe rekan kerja tim atau kepanitiaan seperti apa yang paling bikin kamu nyaman untuk berkolaborasi?"
  },
  {
    id: "org_12",
    category: "Kuliah & Organisasi",
    mode: "organisasi",
    text: "Lebih suka tipe mahasiswa yang aktif ikut berbagai kegiatan luar kelas atau fokus santai di akademik? Jelaskan pandanganmu!"
  },
  // --- DALE CARNEGIE: HOW TO WIN FRIENDS & INFLUENCE PEOPLE (FULL 30 PRINCIPLES) ---
  
  // BAGIAN 1: TEKNIK DASAR MENGHADAPI ORANG LAIN
  {
    id: "carnegie_1",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 1: Jangan mengkritik, mencela, atau mengeluh. Mengkritik hanya membuat orang lain defensif dan berusaha membenarkan diri.",
    prompt: "Ceritakan satu momen di mana kamu berhasil menahan diri untuk tidak mengkritik atau menyalahkan orang lain, dan bagaimana respon baik yang kamu dapatkan?",
    text: "Dale Carnegie Prinsip 1: \"Jangan mengkritik, mencela, atau mengeluh.\" — Ceritakan momen di mana kamu berhasil menahan diri untuk tidak menyalahkan orang lain, dan apa hasil positifnya!"
  },
  {
    id: "carnegie_2",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 2: Berikan apresiasi dan penghargaan yang jujur serta tulus. Manusia punya hasrat terdalam untuk merasa dihargai.",
    prompt: "Kapan terakhir kali kamu menerima atau memberi pujian tulus yang sederhana, tapi efeknya bikin kamu atau orang itu merasa senang seharian?",
    text: "Dale Carnegie Prinsip 2: \"Beri penghargaan yang jujur dan tulus.\" — Kapan terakhir kali kamu menerima atau memberi apresiasi tulus sederhana yang efeknya bikin senang seharian?"
  },
  {
    id: "carnegie_3",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 3: Bangkitkan kemauan yang besar dalam diri orang lain. Bicarakan apa yang mereka inginkan, bukan apa yang kamu inginkan.",
    prompt: "Ceritakan caramu mengajak atau mempengaruhi seseorang untuk mau melakukan sesuatu dengan cara menunjukkan keuntungan yang mereka dapatkan!",
    text: "Dale Carnegie Prinsip 3: \"Bangkitkan kemauan dalam diri orang lain.\" — Ceritakan caramu mengajak seseorang melakukan sesuatu dengan fokus pada keuntungan bagi mereka!"
  },

  // BAGIAN 2: 6 CARA MEMBUAT ORANG LAIN MENYUKAIMU
  {
    id: "carnegie_4",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 4: Tunjukkan ketertarikan yang tulus pada orang lain. Kamu bisa mendapat banyak teman jika tulus tertarik pada kehidupan mereka.",
    prompt: "Ceritakan pengalamanmu saat berkenalan dengan orang baru di mana kamu sengaja lebih banyak mendengarkan dan penasaran dengan ceritanya!",
    text: "Dale Carnegie Prinsip 4: \"Tunjukkan ketertarikan yang tulus pada orang lain.\" — Ceritakan pengalaman ngobrol di mana kamu tulus ingin tahu cerita orang lain daripada pamer dirimu!"
  },
  {
    id: "carnegie_5",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 5: Tersenyumlah! Senyuman yang ramah dan tulus mampu mencairkan suasana paling kaku sekalipun.",
    prompt: "Ceritakan momen di mana senyuman ramah darimu atau dari orang asing berhasil mencairkan suasana canggung atau meredakan situasi tegang!",
    text: "Dale Carnegie Prinsip 5: \"Tersenyumlah.\" — Ceritakan satu momen di mana senyuman ramah berhasil mencairkan suasana canggung atau meredakan situasi tegang!"
  },
  {
    id: "carnegie_6",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 6: Ingatlah bahwa nama seseorang adalah suara paling manis dan paling penting dalam bahasa apa pun baginya.",
    prompt: "Ceritakan pengalaman saat seseorang mengingat dan memanggil namamu dengan tepat di saat tak terduga, atau saat kamu berusaha menghafal nama kenalan baru!",
    text: "Dale Carnegie Prinsip 6: \"Nama seseorang adalah suara termanis baginya.\" — Ceritakan momen saat orang lain mengingat namamu atau saat kamu sengaja mengingat nama orang lain!"
  },
  {
    id: "carnegie_7",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 7: Jadilah pendengar yang baik. Dorong orang lain untuk menceritakan tentang diri mereka sendiri.",
    prompt: "Ceritakan satu momen di mana kamu menjadi teman curhat yang murni mendengarkan tanpa memotong atau menggurui, dan apa respon temanmu?",
    text: "Dale Carnegie Prinsip 7: \"Jadilah pendengar yang baik.\" — Ceritakan pengalamanmu mendengarkan curhat seseorang secara penuh tanpa memotong, dan bagaimana dampaknya bagi dia!"
  },
  {
    id: "carnegie_8",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 8: Bicarakan topik yang menjadi minat dan hobi lawan bicaramu jika ingin obrolan terasa hidup.",
    prompt: "Ceritakan obrolan paling seru dan panjang yang pernah kamu alami karena kamu sengaja memancing obrolan seputar hal yang paling disukai lawan bicaramu!",
    text: "Dale Carnegie Prinsip 8: \"Bicarakan hal-hal yang menjadi minat orang lain.\" — Ceritakan obrolan seru yang terbangun karena kamu sengaja membahas hobi atau minat lawan bicaramu!"
  },
  {
    id: "carnegie_9",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 9: Buat orang lain merasa penting dan berharga, dan lakukan itu dengan ketulusan hati.",
    prompt: "Ceritakan tindakan kecil apa yang pernah kamu lakukan untuk membuat seseorang (misal staf layanan, junior, atau teman) merasa sangat dihargai dan diakui perannya!",
    text: "Dale Carnegie Prinsip 9: \"Buat orang lain merasa penting secara tulus.\" — Ceritakan tindakan kecil yang pernah kamu lakukan untuk membuat seseorang merasa sangat dihargai keberadaannya!"
  },

  // BAGIAN 3: 12 CARA MEYAKINKAN ORANG LAIN AGAR SEPENDAPAT DENGANMU
  {
    id: "carnegie_10",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 10: Satu-satunya cara mendapatkan manfaat terbaik dari sebuah perdebatan adalah dengan menghindarinya.",
    prompt: "Ceritakan momen di mana kamu memilih untuk 'ngalah' dan tidak meladeni debat kusir, dan kenapa keputusan itu ternyata adalah langkah yang sangat tepat?",
    text: "Dale Carnegie Prinsip 10: \"Satu-satunya cara menang debat adalah menghindarinya.\" — Ceritakan kejadian di mana kamu memilih mengalah dari debat kusir dan kenapa itu langkah terbaik!"
  },
  {
    id: "carnegie_11",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 11: Tunjukkan rasa hormat pada pendapat orang lain. Jangan pernah berkata langsung 'Kamu salah!'.",
    prompt: "Ceritakan caramu menyampaikan ketidaksetujuan atau perspektif berbeda tanpa membuat lawan bicaramu merasa diserang atau direndahkan!",
    text: "Dale Carnegie Prinsip 11: \"Jangan pernah berkata 'Kamu salah'.\" — Ceritakan caramu menyampaikan beda pendapat tanpa membuat lawan bicaramu merasa direndahkan!"
  },
  {
    id: "carnegie_12",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 12: Jika kamu salah, akuilah dengan cepat dan secara bersungguh-sungguh sebelum orang lain menunjukkannya.",
    prompt: "Ceritakan pengalaman saat kamu membuat kesalahan atau blunder, lalu kamu langsung berani jujur mengakui di awal tanpa mencari-cari alasan!",
    text: "Dale Carnegie Prinsip 12: \"Jika kamu salah, akuilah dengan cepat dan tulus.\" — Ceritakan pengalaman saat kamu blunder lalu langsung jujur mengakuinya di awal tanpa alasan!"
  },
  {
    id: "carnegie_13",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 13: Mulailah pendekatan dengan cara yang ramah dan bersahabat. Sikap ramah meruntuhkan pertahanan lawan.",
    prompt: "Ceritakan momen saat kamu menghadapi orang yang sedang marah atau jutek, lalu kamu menghadapinya dengan ketenangan dan keramahan ekstra hingga dia melunak!",
    text: "Dale Carnegie Prinsip 13: \"Mulailah dengan cara yang ramah.\" — Ceritakan pengalamanmu meredakan orang yang judes/marah menggunakan sikap ramah dan tenang!"
  },
  {
    id: "carnegie_14",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 14: Buat orang lain langsung berkata 'Ya, ya!' sejak awal obrolan (Metode Socrates).",
    prompt: "Pernahkah kamu mengajukan beberapa pertanyaan pembuka yang mudah disetujui, sebelum akhirnya masuk ke poin utama yang ingin kamu sepakati?",
    text: "Dale Carnegie Prinsip 14: \"Buat orang lain berkata 'Ya, ya' di awal.\" — Ceritakan caramu membangun kesepakatan lewat pertanyaan pembuka yang mudah disetujui!"
  },
  {
    id: "carnegie_15",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 15: Biarkan orang lain yang lebih banyak berbicara. Mereka lebih paham tentang urusan dan masalah mereka sendiri.",
    prompt: "Ceritakan pengalaman saat kamu membiarkan seseorang meluapkan seluruh uneg-uneg atau penjelasannya sampai tuntas sebelum kamu merespon!",
    text: "Dale Carnegie Prinsip 15: \"Biarkan orang lain lebih banyak bicara.\" — Ceritakan pengalamanmu memberi ruang orang lain bicara tuntas sebelum kamu menyampaikan respon!"
  },
  {
    id: "carnegie_16",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 16: Biarkan orang lain merasa bahwa ide atau gagasan tersebut adalah milik mereka sendiri.",
    prompt: "Ceritakan caramu memandu teman atau tim dengan melontarkan pertanyaan pancingan, hingga akhirnya mereka sendiri yang mencetuskan solusinya!",
    text: "Dale Carnegie Prinsip 16: \"Biarkan orang lain merasa ide itu miliknya.\" — Ceritakan momen kamu memandu orang lain hingga mereka sendiri yang mencetuskan idenya!"
  },
  {
    id: "carnegie_17",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 17: Cobalah dengan jujur melihat segala sesuatu dari sudut pandang dan kacamata orang lain.",
    prompt: "Ceritakan saat di mana kamu sempat kesal pada tindakan seseorang, tapi setelah kamu mencoba memposisikan diri jadi dia, kamu akhirnya bisa paham dan maklum!",
    text: "Dale Carnegie Prinsip 17: \"Lihatlah dari sudut pandang orang lain.\" — Ceritakan saat kamu sempat kesal pada orang lain, lalu setelah berempati kamu bisa memahami posisinya!"
  },
  {
    id: "carnegie_18",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 18: Tunjukkan simpati dan empati terhadap ide, perasaan, serta keinginan orang lain.",
    prompt: "Ceritakan kalimat atau respon empati apa yang pernah kamu gunakan dan terbukti ampuh membuat orang yang sedang sedih/stres merasa sangat dimengerti!",
    text: "Dale Carnegie Prinsip 18: \"Tunjukkan empati terhadap perasaan orang lain.\" — Ceritakan caramu memvalidasi perasaan orang lain yang sedang sedih atau stres!"
  },
  {
    id: "carnegie_19",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 19: Sentuh motif-motif yang mulia dan niat baik seseorang saat meminta bantuan.",
    prompt: "Ceritakan pengalaman saat kamu mengajak seseorang bekerja sama dengan menyentuh nilai kejujuran, kebaikan bersama, atau reputasi baik yang dia miliki!",
    text: "Dale Carnegie Prinsip 19: \"Sentuh motif-motif yang mulia.\" — Ceritakan caramu mengajak seseorang bekerja sama dengan menyentuh nilai kebaikan atau integritasnya!"
  },
  {
    id: "carnegie_20",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 20: Dramatisasi ide dan ceritamu. Sampaikan pesan menggunakan visual, analogi, atau demonstrasi yang menarik.",
    prompt: "Ceritakan pengalamanmu saat presentasi atau menjelaskan sesuatu di mana kamu memakai cerita/analogi kreatif yang bikin audiens langsung paham dan terpukau!",
    text: "Dale Carnegie Prinsip 20: \"Dramatisasi ide dan ceritamu.\" — Ceritakan caramu memakai analogi atau visualisasi kreatif saat menjelaskan sesuatu hingga orang lain terpukau!"
  },
  {
    id: "carnegie_21",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 21: Lempar tantangan yang membakar semangat. Cara terbaik memotivasi orang yang berbakat adalah dengan memberi tantangan.",
    prompt: "Ceritakan satu momen di mana sebuah tantangan sulit dari orang lain justru membakar semangatmu untuk membuktikan kemampuan terbaikmu!",
    text: "Dale Carnegie Prinsip 21: \"Lempar tantangan yang memicu semangat.\" — Ceritakan saat sebuah tantangan sulit justru memicu semangatmu untuk tampil maksimal!"
  },

  // BAGIAN 4: MENJADI PEMIMPIN YANG MENGUBAH ORANG LAIN TANPA MENYINGGUNG
  {
    id: "carnegie_22",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 22: Mulailah dengan pujian dan apresiasi yang tulus sebelum kamu menyampaikan kritik atau koreksi.",
    prompt: "Ceritakan caramu memberi evaluasi atau teguran ke teman/tim dengan metode 'sandwich' (puji dulu, beri masukan, lalu tutup dengan motivasi)!",
    text: "Dale Carnegie Prinsip 22: \"Mulailah dengan pujian tulus sebelum koreksi.\" — Ceritakan caramu memberi evaluasi ke rekan kerja/teman dengan mengawali pujian tulus!"
  },
  {
    id: "carnegie_23",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 23: Tunjukkan kesalahan orang lain secara tidak langsung dan halus, jangan langsung mempermalukan.",
    prompt: "Ceritakan caramu mengingatkan kesalahan seseorang secara elegan (misal lewat tindakan nyata atau petunjuk halus) tanpa membuatnya tersinggung!",
    text: "Dale Carnegie Prinsip 23: \"Tunjukkan kesalahan secara tidak langsung.\" — Ceritakan caramu mengingatkan kesalahan seseorang secara halus tanpa membuatnya merasa disalahkan!"
  },
  {
    id: "carnegie_24",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 24: Bicarakan kesalahan dirimu sendiri terlebih dahulu sebelum kamu mengkritik kesalahan orang lain.",
    prompt: "Ceritakan caramu menenangkan junior atau teman yang baru berbuat salah dengan menceritakan pengalaman bahwa kamu dulu juga pernah melakukan kesalahan serupa!",
    text: "Dale Carnegie Prinsip 24: \"Bicarakan kesalahanmu sendiri dulu sebelum mengkritik.\" — Ceritakan saat kamu menenangkan orang lain dengan menceritakan kesalahan serupa yang pernah kamu buat!"
  },
  {
    id: "carnegie_25",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 25: Ajukan pertanyaan daripada memberi perintah langsung. Pertanyaan membuat orang merasa dilibatkan.",
    prompt: "Ceritakan bagaimana caramu mengarahkan tim dengan kalimat seperti 'Menurutmu apakah cara ini bisa berhasil?' dibanding berkata 'Kamu harus lakukan ini!'",
    text: "Dale Carnegie Prinsip 25: \"Ajukan pertanyaan daripada memberi perintah langsung.\" — Ceritakan caramu memimpin dengan mengajukan pertanyaan terbuka dibanding menyuruh langsung!"
  },
  {
    id: "carnegie_26",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 26: Beri ruang bagi orang lain untuk menyelamatkan harga dirinya (Save Face), jangan permalukan di depan umum.",
    prompt: "Ceritakan momen saat rekan kerjamu melakukan blunder di hadapan orang banyak, dan bagaimana caramu membantunya menutupi masalah tersebut agar dia tidak malu!",
    text: "Dale Carnegie Prinsip 26: \"Beri ruang untuk menyelamatkan harga diri.\" — Ceritakan caramu melindungi rekan atau teman yang salah agar tidak dipermalukan di depan orang banyak!"
  },
  {
    id: "carnegie_27",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 27: Puji setiap kemajuan sekecil apa pun. Pujian yang tulus adalah pupuk terbaik untuk perkembangan seseorang.",
    prompt: "Ceritakan pengalaman saat kamu mengapresiasi progres kecil seseorang, dan bagaimana pujian itu membuat dia menjadi jauh lebih bersemangat dan percaya diri!",
    text: "Dale Carnegie Prinsip 27: \"Puji setiap kemajuan sekecil apa pun.\" — Ceritakan bagaimana pujian atas progres kecil berhasil membangkitkan rasa percaya diri seseorang!"
  },
  {
    id: "carnegie_28",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 28: Beri orang lain reputasi baik yang ingin mereka jaga dan wujudkan.",
    prompt: "Pernahkah kamu memberi label positif pada seseorang (misal 'kamu orangnya teliti banget') yang akhirnya membuat dia berusaha keras membuktikan hal tersebut?",
    text: "Dale Carnegie Prinsip 28: \"Beri reputasi baik yang ingin mereka jaga.\" — Ceritakan caramu memberi label positif pada orang lain sehingga memicu dia membuktikan reputasi tersebut!"
  },
  {
    id: "carnegie_29",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 29: Gunakan dorongan semangat dan buat sebuah kesalahan terasa mudah untuk diperbaiki.",
    prompt: "Ceritakan caramu menyemangati seseorang yang sedang merasa gagal atau putus asa dengan meyakinkannya bahwa masalah tersebut masih bisa diperbaiki!",
    text: "Dale Carnegie Prinsip 29: \"Buat kesalahan terasa mudah diperbaiki.\" — Ceritakan caramu menyemangati orang yang gagal dengan meyakinkannya bahwa situasinya bisa diperbaiki!"
  },
  {
    id: "carnegie_30",
    category: "Dale Carnegie",
    mode: "carnegie",
    quote: "Prinsip 30: Buat orang lain merasa senang dan bangga mengerjakan apa yang kamu sarankan atau delegasikan.",
    prompt: "Ceritakan caramu mendelegasikan tugas atau tanggung jawab ke orang lain dengan cara yang membuat mereka merasa bangga dan terhormat menerima tugas tersebut!",
    text: "Dale Carnegie Prinsip 30: \"Buat orang lain senang melakukan saranmu.\" — Ceritakan caramu mendelegasikan tugas sehingga orang tersebut merasa bangga dan bersemangat menjalankannya!"
  }
];


