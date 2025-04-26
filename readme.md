# Chatbot AI Indonesia dengan Python dan Flask

Template sederhana untuk membangun chatbot AI berbasis web menggunakan Python dan Flask.

## Fitur

- Antarmuka web interaktif dan responsif
- Backend Python dengan Flask
- Sistem respons berbasis kata kunci sederhana
- Mudah dikustomisasi dan dikembangkan

## Persyaratan

- Python 3.6+
- Flask

## Cara Menggunakan

### 1. Persiapan

Pastikan Anda sudah menginstal Python dan pip di komputer Anda. Kemudian, ikuti langkah-langkah berikut:

```bash
# Clone atau download kode dari repository
# Buat folder chatbot-ai-python dan salin semua file

# Masuk ke direktori proyek
cd chatbot-ai-python

# Buat virtual environment (opsional tapi direkomendasikan)
python -m venv venv

# Aktifkan virtual environment
# Untuk Windows:
venv\Scripts\activate
# Untuk macOS/Linux:
source venv/bin/activate

# Instal dependencies
pip install -r requirements.txt
```

### 2. Menjalankan Aplikasi

```bash
python app.py
```

Setelah dijalankan, aplikasi dapat diakses melalui browser di alamat: `http://127.0.0.1:5000`

## Struktur Proyek

```
chatbot-ai-python/
├── app.py               # File utama aplikasi Flask
├── requirements.txt     # Daftar dependencies
└── templates/           # Folder untuk template HTML
    └── index.html       # File template HTML untuk antarmuka chatbot
```

## Cara Mengembangkan Chatbot

### Menambahkan Basis Pengetahuan

Untuk menambahkan kemampuan chatbot dalam merespons lebih banyak kata kunci, Anda bisa mengedit basis pengetahuan di `app.py`:

```python
# Edit atau tambahkan kata kunci dan respons di sini
basis_pengetahuan = {
    "halo": ["Halo! Apa kabar?", "Selamat datang! Ada yang bisa saya bantu?"],
    # Tambahkan kata kunci dan respons baru:
    "produk": ["Kami memiliki berbagai produk unggulan.", "Silakan kunjungi katalog kami untuk melihat produk."],
    "lokasi": ["Kami berlokasi di Jakarta Pusat.", "Toko kami ada di Mall Central Park, Jakarta Barat."]
}
```

### Integrasi dengan Model AI

Untuk mengembangkan chatbot menjadi lebih cerdas, Anda bisa mengintegrasikan dengan model AI seperti:

1. **NLTK** untuk pemrosesan bahasa alami
2. **TensorFlow/PyTorch** untuk model AI yang lebih kompleks
3. **API eksternal** seperti OpenAI's GPT atau Hugging Face

## Selanjutnya

Anda dapat mengembangkan chatbot ini dengan:

1. Menambahkan database untuk menyimpan percakapan
2. Mengintegrasikan dengan model Machine Learning untuk respons yang lebih cerdas
3. Menambahkan fitur seperti analisis sentimen
4. Mengintegrasikan dengan platform lain seperti WhatsApp atau Telegram

Selamat mencoba dan bereksperimen dengan chatbot Anda!