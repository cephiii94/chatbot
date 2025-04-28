// dataChatbot.js
const chatbotData = [
  {
    keywords: ["hai", "halo", "hello", "hi"],
    responses: ["Halo! Ada yang bisa saya bantu?", "Hai! Apa kabar hari ini?"]
  },
  {
    keywords: ["apa kabar", "gimana kabarnya", "kabarmu"],
    responses: ["Saya baik-baik saja, terima kasih sudah bertanya!", "Alhamdulillah, saya sehat. Semoga kamu juga ya!"]
  },
  {
    keywords: ["siapa kamu", "kamu siapa", "kenalan dong"],
    responses: ["Saya adalah asisten chatbotmu yang selalu siap membantu!"]
  },
  {
    keywords: ["buka youtube", "youtube"],
    responses: ["Baik, membuka YouTube untukmu..."],
    action: function() {
      window.open("https://www.youtube.com", "_blank");
    }
  }
];

// Export supaya bisa dipakai file lain
// (Kalau di browser biasa cukup <script src="dataChatbot.js">)