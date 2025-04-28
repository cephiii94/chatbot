//fungsi respon JSON
let dataChatbot = [];
let processedKnowledgeBase = [];

async function loadData() {
  // Coba cek kalau ada chatbotData dari file datachatbot.js
  if (typeof chatbotData !== "undefined") {
    console.log("Menggunakan data dari datachatbot.js");
    dataChatbot = chatbotData;
  } else {
    try {
      console.log("Mengambil data dari datachatbot.json");
      const response = await fetch('datachatbot.json');
      dataChatbot = await response.json();
    } catch (error) {
      console.error("Gagal mengambil data chatbot:", error);
    }
  }
  
  // Proses knowledge base jika tersedia
  if (typeof knowledgeBase !== "undefined") {
    processKnowledgeBase();
  }
}

// Fungsi untuk memproses knowledge base menjadi kalimat-kalimat
function processKnowledgeBase() {
  processedKnowledgeBase = knowledgeBase.map(doc => {
    return {
      ...doc,
      sentences: doc.content.split(/[.!?]+/)
                   .filter(s => s.trim().length > 0)
                   .map(s => s.trim() + ".")
    };
  });
  
  console.log("Knowledge base diproses:", processedKnowledgeBase);
}

// Panggil loadData saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadData);

// Fungsi untuk pencarian kata kunci yang ditingkatkan
function cariJawabanKontekstual(pertanyaan) {
  console.log("Mencari jawaban untuk:", pertanyaan);
  
  // Jika knowledge base belum diproses
  if (!processedKnowledgeBase || processedKnowledgeBase.length === 0) {
    console.log("Knowledge base kosong atau belum diproses");
    return null;
  }
  
  // Bersihkan pertanyaan
  const cleanQuestion = pertanyaan.toLowerCase().replace(/[^\w\sÀ-ÿ]/g, "");
  const questionWords = cleanQuestion.split(/\s+/);
  
  // Kata umum yang diabaikan
  const stopWords = ["apa", "yang", "dengan", "dari", "di", "ke", "pada", "dan", "atau", "untuk", "adalah", "ini", "itu"];
  const keywords = questionWords.filter(word => !stopWords.includes(word) && word.length > 1);
  
  console.log("Kata kunci yang diekstrak:", keywords);
  
  // Jika tidak ada kata kunci yang signifikan
  if (keywords.length === 0) {
    return null;
  }
  
  // Deteksi tipe pertanyaan
  const isWhenQuestion = questionWords.some(w => ["kapan", "tahun", "tanggal", "waktu", "mulai", "awal", "sejak"].includes(w));
  const isWhatQuestion = questionWords.some(w => ["apa", "apakah", "definisi", "maksud", "arti"].includes(w));
  const isHowQuestion = questionWords.some(w => ["bagaimana", "gimana", "cara", "langkah"].includes(w));
  
  console.log("Tipe pertanyaan:", { when: isWhenQuestion, what: isWhatQuestion, how: isHowQuestion });
  
  // Pencarian di dalam knowledge base
  const scoredSentences = [];
  
  processedKnowledgeBase.forEach(doc => {
    doc.sentences.forEach(sentence => {
      const sentenceLower = sentence.toLowerCase();
      let score = 0;
      
      // Hitung kecocokan kata kunci
      keywords.forEach(keyword => {
        if (sentenceLower.includes(keyword)) score += 2;
      });
      
      // Bonus skor untuk tipe pertanyaan
      if (isWhenQuestion && /\b(19|20)\d{2}\b/.test(sentence)) score += 5;
      if (isWhatQuestion && sentenceLower.includes("adalah")) score += 3;
      if (isHowQuestion && (sentenceLower.includes("cara") || sentenceLower.includes("dengan"))) score += 3;
      
      if (score > 0) {
        scoredSentences.push({ sentence, score });
      }
    });
  });
  
  // Urutkan berdasarkan skor
  scoredSentences.sort((a, b) => b.score - a.score);
  
  // Ambil maksimal 2 kalimat terbaik
  const topSentences = scoredSentences.slice(0, 2);
  console.log("Kalimat dengan skor tertinggi:", topSentences);
  
  if (topSentences.length > 0) {
    return topSentences.map(item => item.sentence).join(" ");
  }
  
  console.log("Tidak menemukan jawaban kontekstual");
  return null;
}

// Fungsi untuk mendapatkan jawaban
function getJawabanBot(inputUser) {
  let jawabanBot = "Maaf, saya belum mengerti pertanyaan Anda.";
  let tipeJawaban = "text";
  let dataJawaban = null;
  let hasAction = false;
  
  // Coba pencarian kontekstual terlebih dahulu
  const jawabanKontekstual = cariJawabanKontekstual(inputUser);
  
  if (jawabanKontekstual) {
    console.log("Jawaban kontekstual ditemukan:", jawabanKontekstual);
    jawabanBot = jawabanKontekstual;
  } else {
    // Kembalikan ke pencarian kata kunci sederhana yang sudah ada
    for (let item of dataChatbot) {
      for (let kata of item.keywords) {
        if (inputUser.includes(kata)) {
          if (item.type) {
            tipeJawaban = item.type;
          }
          
          if (tipeJawaban === "text" || tipeJawaban === "formatted") {
            const semuaJawaban = item.responses;
            jawabanBot = semuaJawaban[Math.floor(Math.random() * semuaJawaban.length)];
          } else if (tipeJawaban === "pdf") {
            jawabanBot = item.message || "Berikut adalah dokumen yang Anda minta:";
            dataJawaban = item.pdfURL;
          } else if (tipeJawaban === "multi") {
            dataJawaban = item.messages;
            jawabanBot = dataJawaban[0];
          }
          
          hasAction = !!item.action;
          break;
        }
      }
      if (jawabanBot !== "Maaf, saya belum mengerti pertanyaan Anda.") {
        break;
      }
    }
  }

  return {
    text: jawabanBot,
    type: tipeJawaban,
    data: dataJawaban,
    hasAction: hasAction
  };
}