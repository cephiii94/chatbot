
//fungsi respon JSON
let dataChatbot = [];

async function loadData() {
  // Coba cek kalau ada const dataChatbot dari file datachatbot.js
  if (typeof window.dataChatbot !== "undefined") {
    console.log("Menggunakan data dari datachatbot.js");
    dataChatbot = window.dataChatbot;
  } else {
    try {
      console.log("Mengambil data dari datachatbot.json");
      const response = await fetch('datachatbot.json');
      dataChatbot = await response.json();
    } catch (error) {
      console.error("Gagal mengambil data chatbot:", error);
    }
  }
}

//fungsi respon javascript
function prosesInput() {
  const inputUser = document.getElementById("inputUser").value.toLowerCase();
  let jawabanBot = "Maaf, saya belum mengerti pertanyaan Anda.";

  for (let item of chatbotData) {
    for (let kata of item.keywords) {
      if (inputUser.includes(kata)) {
        const semuaJawaban = item.responses;
        jawabanBot = semuaJawaban[Math.floor(Math.random() * semuaJawaban.length)];
        if (item.action) {
          item.action();
        }
        break;
      }
    }
    if (jawabanBot !== "Maaf, saya belum mengerti pertanyaan Anda.") {
      break;
    }
  }

  document.getElementById("outputBot").innerText = jawabanBot;
}