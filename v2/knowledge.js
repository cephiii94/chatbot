// Basis pengetahuan untuk pencarian kontekstual
const knowledgeBase = [
  // Entri-entri yang sudah ada
  {
    id: "html-info",
    content: "HTML pertama kali dikembangkan oleh Tim Berners-Lee pada tahun 1990..."
  },
  {
    id: "css-info",
    content: "CSS (Cascading Style Sheets) dikembangkan oleh W3C dan diperkenalkan pada tahun 1996..."
  },
  {
    id: "javascript-info",
    content: "JavaScript diciptakan oleh Brendan Eich pada tahun 1995 ketika ia bekerja di Netscape..."
  },
  
  // Tambahkan entri baru di sini
  {
    id: "react-info",
    content: "React adalah library JavaScript untuk membangun antarmuka pengguna yang dikembangkan oleh Facebook. React pertama kali dirilis pada tahun 2013 sebagai proyek open source. React menggunakan konsep Virtual DOM untuk meningkatkan kinerja aplikasi web. React memperkenalkan pendekatan berbasis komponen di mana UI dipecah menjadi komponen yang dapat digunakan kembali. React mengadopsi sintaks JSX yang memungkinkan pengembang untuk menulis HTML di dalam JavaScript. React Native, yang dirilis pada tahun 2015, adalah framework untuk membuat aplikasi mobile dengan React. React Hooks diperkenalkan pada versi 16.8 pada Februari 2019, memungkinkan penggunaan state dan fitur React lainnya tanpa menulis kelas."
  },
  {
    id: "python-info",
    content: "Python adalah bahasa pemrograman yang diciptakan oleh Guido van Rossum dan pertama kali dirilis pada tahun 1991. Python dikenal karena sintaksisnya yang sederhana dan mudah dibaca, menjadikannya bahasa yang ideal untuk pemula. Python mendukung berbagai paradigma pemrograman termasuk pemrograman berorientasi objek, pemrograman imperatif, dan pemrograman fungsional. Python 2.0 dirilis pada tahun 2000, dan Python 3.0 dirilis pada tahun 2008 dengan perubahan yang tidak kompatibel dengan versi sebelumnya. Python banyak digunakan dalam data science, machine learning, pengembangan web, dan otomatisasi tugas. Framework web populer untuk Python termasuk Django yang dirilis tahun 2005 dan Flask yang dirilis tahun 2010."
  }
];

// Daftar file yang akan dimuat
const filesToLoad = [
  { id: "python-info", path: "./data/python-info.txt" },
  { id: "react-info", path: "data/react-info.txt" },
  { id: "php-info", path: "data/php-info.txt" }
];

// Fungsi untuk memuat file
async function loadExternalFiles() {
  try {
    for (const file of filesToLoad) {
      try {
        const response = await fetch(file.path);
        if (!response.ok) {
          console.warn(`File ${file.path} not found or error: ${response.status}`);
          continue;
        }
        
        const content = await response.text();
        
        // Tambahkan ke knowledge base
        knowledgeBase.push({
          id: file.id,
          content: content
        });
        
        console.log(`Loaded: ${file.id}`);
      } catch (fileError) {
        console.warn(`Error loading ${file.path}:`, fileError);
      }
    }
    
    console.log("External content loading completed");
    
    // Update knowledge base jika chatbot sudah diinisialisasi
    if (typeof processKnowledgeBase === 'function') {
      processKnowledgeBase();
    }
  } catch (error) {
    console.error("Error in loading external files:", error);
  }
}

// Panggil fungsi load saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadExternalFiles);