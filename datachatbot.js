// Contoh data chatbot yang mendukung berbagai tipe konten
const chatbotData = [
  // Respons teks biasa
  {
    keywords: ["halo", "hai", "hello", "hi"],
    responses: ["Halo! Ada yang bisa saya bantu?", "Hai! Senang berbicara dengan Anda."]
  },
  
  // Respons berformat (Markdown)
  {
    keywords: ["fitur", "kemampuan", "bisa apa"],
    type: "formatted",
    responses: [
      "## Kemampuan Chatbot Nava\n\n* **Menjawab pertanyaan** - Saya bisa menjawab pertanyaan umum\n* **Menampilkan PDF** - Saya bisa menampilkan dokumen PDF\n* **Format teks kaya** - Saya mendukung teks berformat\n* **Konten multi-bagian** - Saya bisa mengirim jawaban dalam beberapa pesan\n\nAda lagi yang ingin Anda ketahui?"
    ]
  },
  
  // Respons PDF
  {
    keywords: ["panduan", "manual", "buku panduan", "pdf"],
    type: "pdf",
    message: "Berikut adalah panduan pengguna yang Anda minta:",
    pdfURL: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Contoh PDF dummy
  },
  
  // Respons multi-bagian (beberapa pesan berurutan)
  {
    keywords: ["penjelasan panjang", "detail", "ceritakan", "jelaskan"],
    type: "multi",
    messages: [
      "Saya akan menjelaskan cara kerja chatbot secara detail. Perhatikan penjelasan berikut...",
      "Pertama, chatbot seperti saya bekerja dengan mencocokkan kata kunci dalam pesan Anda dengan database jawaban yang telah diprogram sebelumnya.",
      "Kedua, ketika menemukan kecocokan, saya akan memilih salah satu respons yang sesuai, yang bisa berupa teks biasa, konten berformat, PDF, atau bahkan beberapa pesan terpisah seperti ini.",
      "Ketiga, untuk menampilkan PDF, saya menggunakan iframe yang memuat file PDF langsung dalam chat, sehingga Anda tidak perlu meninggalkan halaman ini untuk melihatnya.",
      "Terakhir, saya juga bisa menangani format teks kaya dengan markdown, yang memungkinkan saya menampilkan teks dengan heading, bold, italic, daftar, dan format lainnya."
    ]
  },
  
  // Artikel panjang dalam format markdown
  {
    keywords: ["artikel", "bacaan", "tulisan"],
    type: "formatted",
    responses: [
      "# Artikel Tentang Kecerdasan Buatan\n\n## Pendahuluan\n\nKecerdasan Buatan (AI) telah menjadi salah satu topik paling menarik dalam dunia teknologi. Dari asisten virtual seperti saya hingga sistem yang mampu mengalahkan juara dunia catur, AI telah membuktikan potensinya untuk mengubah cara kita hidup dan bekerja.\n\n## Sejarah Singkat\n\nKonsep kecerdasan buatan pertama kali diperkenalkan pada tahun 1950-an. Sejak itu, bidang ini telah berkembang pesat dengan berbagai terobosan penting:\n\n* **1950-an**: Konsep dasar dan istilah 'Artificial Intelligence' lahir\n* **1960-an**: Pengembangan awal program AI dan pendekatan simbolik\n* **1980-an**: Sistem pakar mulai dikembangkan untuk aplikasi praktis\n* **1990-an**: Peningkatan dalam pembelajaran mesin dan robotika\n* **2010-an**: Deep learning dan neural networks membawa kemajuan besar\n\n## Aplikasi Modern\n\nSaat ini, AI digunakan dalam berbagai bidang:\n\n1. **Asisten Virtual** - Seperti chatbot yang sedang Anda gunakan\n2. **Pengenalan Wajah & Suara** - Digunakan dalam keamanan dan smartphone\n3. **Kendaraan Otonom** - Mobil self-driving dan sistem navigasi\n4. **Diagnostik Medis** - Membantu dokter mendiagnosis penyakit\n5. **Prediksi Finansial** - Analisis pasar dan deteksi penipuan\n\n## Masa Depan AI\n\nMasa depan AI penuh dengan kemungkinan menarik. Para ahli memprediksi sistem AI akan menjadi semakin integratif dalam kehidupan sehari-hari, dengan kemampuan yang meningkat untuk memahami konteks, emosi, dan nuansa bahasa manusia.\n\n## Kesimpulan\n\nAI terus berkembang dengan kecepatan luar biasa. Meskipun ada tantangan etis dan keamanan yang perlu dihadapi, potensi AI untuk membawa manfaat positif bagi masyarakat tidak dapat diabaikan. Yang pasti, masa depan dengan AI akan sangat berbeda dari apa yang kita kenal saat ini.\n\n---\n\nApakah Anda tertarik mempelajari lebih lanjut tentang topik tertentu dalam artikel ini?"
    ]
  },
  
  // Respons untuk pertanyaan tidak dikenal
  {
    keywords: ["bantuan", "help", "tolong", "bantu"],
    responses: ["Saya bisa membantu Anda dengan berbagai pertanyaan. Beberapa topik yang bisa Anda tanyakan: 'fitur', 'panduan', 'jelaskan cara kerja', atau 'tunjukkan artikel'."]
  }
];