# VEO3 Prompt Generator

Aplikasi ini membantu Anda merakit sebuah perintah (prompt) yang detail dan terstruktur agar hasil video atau gambar dari AI menjadi lebih spesifik dan sesuai keinginan. Anggap setiap kolom adalah bagian dari sebuah adegan yang ingin Anda ciptakan.

## 1. Kunci API Gemini (Opsional)

* **Fungsi:** Aplikasi ini memiliki fitur "Optimasi Prompt" yang menggunakan model AI Gemini untuk menyempurnakan prompt Anda secara otomatis. Untuk menggunakan fitur ini, Anda memerlukan Kunci API (API Key) dari Google.
* **Cara Mendapatkan:**
  1. Kunjungi halaman Google AI Studio untuk membuat kunci API Anda.
  2. Klik tautan berikut untuk membuat atau mendapatkan kunci Anda: [Buat Kunci API di Google AI Studio](https://aistudio.google.com/app/apikey).
  3. Salin (copy) kunci yang telah Anda buat dan tempel (paste) ke dalam kolom Kunci API yang tersedia di aplikasi.
* **Penting:** Kunci API Anda bersifat rahasia. Jangan bagikan kepada siapa pun.

## 2. Deskripsi Video Keseluruhan

* **Fungsi:** Tuliskan secara singkat apa yang ingin Anda capai atau hasilkan. Ini adalah ide dasar Anda.
* **Cara Mengisi:** Gunakan satu atau dua kalimat untuk merangkum adegan atau cerita.
* **Contoh:**
  * `Video sinematik seekor naga terbang di atas pegunungan.`
  * `Klip pendek seorang astronot menjelajahi planet asing.`

## 3. Detail Subjek & Aksi (Karakter)

* **Fungsi:** Ini adalah bagian terpenting untuk mendeskripsikan **siapa** atau **apa** yang menjadi fokus utama, **apa yang mereka lakukan**, dan **bagaimana perasaan mereka**.
* **Cara Mengisi:** Jadilah spesifik untuk mendeskripsikan karakter dan aksinya. Untuk menambahkan lebih dari satu karakter, klik tombol **"Tambah Karakter"**. Pertimbangkan untuk menyertakan detail berikut:
  * **Nama Karakter:** Contoh: `Arion`, `Luna`
  * **Kewarganegaraan:** Contoh: `Jepang`, `Viking`
  * **Usia:** Contoh: `7`, `25`, `40`
  * **Jenis Kelamin:** Contoh: `pria`, `wanita` atau sesuai opsi pilihan yang diberikan
  * **Ciri Fisik Utama:** Contoh: `seorang wanita muda dengan rambut panjang berwarna coklat`, `rambut merah panjang, mata biru bersinar dan memiliki bekas luka di pipi`
  * **Pakaian dan Aksesori:** Contoh: `mengenakan jubah penyihir hitam dengan topi runcing`, `memakai baju zirah perak dan membawa pedang`
  * **Aksi Utama Karakter:** Contoh: `mengeluarkan mantra yang kuat`, `terbang menembus awan badai`, `berjalan di jalanan kota yang ramai`
  * **Emosi Karakter:** Contoh: `terlihat gembira`, `dengan ekspresi marah`, `menatap dengan penuh harap`

## 4. Latar / Tempat (Setting / Place)

* **Fungsi:** Di mana adegan ini terjadi? Kolom ini memberikan konteks lingkungan untuk subjek Anda.
* **Cara Mengisi:** Jelaskan lokasi secara detail. **"Hutan"** bisa menjadi **"hutan ajaib yang dipenuhi jamur bercahaya di malam hari"**.
* **Contoh:** `in a forgotten ancient temple`, `on the surface of planet Mars`, `inside a cozy coffee shop during a rainy day`

## 5. Detail Kamera & Gaya Visual (Art & Camera Style)

* **Fungsi:** Bagian ini menentukan estetika visual dari hasil akhir. Apakah Anda ingin terlihat seperti foto, lukisan, atau film?
* **Cara Mengisi:** Sebutkan gaya seni, nama seniman, atau jenis sinematografi yang Anda inginkan.
* **Contoh Gaya Seni:** `photorealistic` (terlihat seperti foto asli), `anime style, Studio Ghibli` (gaya anime seperti Studio Ghibli), `watercolor painting` (lukisan cat air)
* **Contoh Gaya Kamera:** `cinematic shot` (terlihat seperti adegan film), `wide angle shot` (pengambilan gambar sudut lebar), `close-up shot` (pengambilan gambar dari dekat)

## 6. Detail Audio

* **Fungsi:** Jelaskan semua elemen suara yang ingin Anda dengar di dalam video untuk membangun suasana.
* **Cara Mengisi:** Rincikan suara lingkungan, jenis musik, dan dialog yang diucapkan oleh karakter.
  * **Suara Lingkungan:** Contoh: `suara angin yang bertiup kencang`, `gemuruh ombak di pantai`, `hiruk pikuk lalu lintas kota`
  * **Musik Latar Belakang:** Contoh: `musik orkestra yang epik dan megah`, `melodi piano yang lembut dan sedih`, `irama synthwave yang energik`
  * **Dialog Karakter:** Contoh: `Arion: "Kita harus pergi dari sini sekarang!"`, `Narator: "Di sebuah negeri yang terlupakan oleh waktu..."`

## 7. Detail Tambahan

* **Fungsi:** Untuk menambahkan elemen atau item-item spesifik yang ingin Anda lihat di dalam video, yang tidak termasuk dalam kategori lain.
* **Cara Mengisi:** Tuliskan objek, efek visual, atau detail kecil lainnya yang penting.
* **Contoh:** `sparks of lightning crackle around the wizard's hands` (percikan petir berderak di sekitar tangan penyihir), `a small, curious squirrel is watching from a tree branch` (seekor tupai kecil yang penasaran sedang menonton dari dahan pohon), `lens flare effect` (efek kilau lensa)

## 8. Detail Video

* **Fungsi:** Menentukan properti teknis dan format akhir dari video Anda.
* **Cara Mengisi:** Tentukan gaya, kualitas resolusi, dan panjang durasi video.
  * **Gaya Video:** Contoh: `video sinematik`, `klip dokumenter`,` animasi stop-motion`, `rekaman time-lapse` atau sesuai opsi pilihan yang diberikan
  * **Kualitas Video:** Contoh: `HD`, `Full HD`, `4K`
  * **Durasi:** Contoh: `klip pendek 5 detik`, `video 30 detik`, `trailer 1 menit`

## 9. Buat Prompt

* **Fungsi:** Tombol ini akan menggabungkan semua informasi untuk menghasilkan sebuah **Prompt Asli**.
Tombol ini akan menggabungkan semua informasi yang telah Anda masukkan di kolom-kolom sebelumnya untuk menghasilkan sebuah **Prompt Asli** yang lengkap dan siap digunakan.

## 10. Optimalkan dengan Gemini

* **Fungsi:** Jika Anda telah memasukkan Kunci API Gemini, tombol ini akan menggunakan AI untuk menyempurnakan prompt Anda.
* **Hasil yang Akan Anda Dapatkan:**
  * Prompt Versi Optimasi, Versi yang lebih detail dan terstruktur dari prompt asli Anda.
  * Saran Kreatif dari Gemini, Ide-ide tambahan dari AI untuk membuat adegan Anda lebih menarik dan unik.
  * dan Prompt Sinematik Final. Gabungan dari prompt asli dengan saran kreatif dari Gemini, menciptakan sebuah prompt akhir yang sangat deskriptif dan siap untuk menghasilkan video yang luar biasa.

## Tips Tambahan

1. **Jadilah Spesifik di Awal:** Semakin spesifik Anda dari awal, semakin baik AI akan memahami apa yang Anda inginkan. Mulailah dengan ide yang jelas untuk mendapatkan hasil terbaik.
2. **Mulai dengan Ide Dasar:** Jika bingung, cukup isi bagian Deskripsi Video Keseluruhan. Detail lainnya bisa ditambahkan kemudian, atau biarkan fitur "Optimalkan dengan Gemini" membantu menyempurnakan ide Anda.
3. **Eksperimen:** Jangan takut untuk mencoba kombinasi yang aneh atau tidak biasa untuk mendapatkan hasil yang unik dan mengejutkan.
