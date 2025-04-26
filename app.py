# app.py - File utama aplikasi Flask
from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Respons sederhana untuk chatbot
respons_umum = [
    "Halo! Apa yang bisa saya bantu?",
    "Terima kasih atas pertanyaan Anda.",
    "Saya masih belajar, tetapi saya akan mencoba membantu.",
    "Bisa jelaskan lebih detail?",
    "Menarik sekali! Ceritakan lebih lanjut."
]

# Basis pengetahuan sederhana - bisa diperluas
basis_pengetahuan = {
    "halo": ["Halo! Apa kabar?", "Selamat datang! Ada yang bisa saya bantu?"],
    "nama": ["Saya adalah chatbot AI sederhana.", "Nama saya AIBot, siap membantu Anda!"],
    "terima kasih": ["Sama-sama!", "Senang bisa membantu!", "Tidak masalah. Ada hal lain yang bisa saya bantu?"],
    "cuaca": ["Maaf, saya belum bisa mengakses data cuaca saat ini.", "Untuk informasi cuaca terbaru, sebaiknya periksa layanan cuaca online."]
}

def dapatkan_respons(pesan):
    pesan = pesan.lower()
    
    # Memeriksa kata kunci dalam pesan
    for kata_kunci, jawaban in basis_pengetahuan.items():
        if kata_kunci in pesan:
            return random.choice(jawaban)
    
    # Respons default jika tidak ada kata kunci yang cocok
    return random.choice(respons_umum)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/kirim_pesan', methods=['POST'])
def kirim_pesan():
    data = request.get_json()
    pesan = data['pesan']
    
    respons = dapatkan_respons(pesan)
    return jsonify({'respons': respons})

if __name__ == '__main__':
    app.run(debug=True)