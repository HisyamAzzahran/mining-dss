# 🤖 GenAI Decision Support System

## PT Astra International - Human Capital Development

Sistem Pendukung Keputusan (DSS) berbasis Data Mining untuk membantu menentukan Generative AI yang paling sesuai untuk implementasi e-learning perusahaan.

![GenAI DSS Preview](https://via.placeholder.com/800x400/0f0f23/6366f1?text=GenAI+DSS+Preview)

---

## 📋 Daftar Isi

- [Latar Belakang](#-latar-belakang)
- [Fitur Utama](#-fitur-utama)
- [Metodologi](#-metodologi)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Project](#-struktur-project)

---

## 🎯 Latar Belakang

### Tantangan Transformasi Digital

Di era digital saat ini, banyak perusahaan berlomba melakukan transformasi digital. Namun kenyataannya:

- **Hanya ~30% perusahaan** yang berhasil dalam transformasi digital
- **Budget R&D mencapai ~20%** dari total pengeluaran perusahaan
- Keputusan pemilihan teknologi seringkali tidak berbasis data

### Solusi

Project ini mendemonstrasikan **best practice** untuk tim R&D dalam menentukan GenAI yang tepat melalui:

1. **Data Mining** - Ekstraksi indikator evaluasi dari jurnal ilmiah
2. **Weighted Scoring** - Pembobotan berdasarkan kebutuhan department
3. **Multi-Criteria Decision Making** - Perbandingan objektif antar alternatif

---

## ✨ Fitur Utama

### 1. 📊 Analisis Indikator dari Jurnal
- 35 atribut diekstrak dari berbagai sumber
- Dikelompokkan menjadi 7 indikator utama
- Validasi dari 3 sumber: Literature, Internal Doc, User Voice

### 2. ⚖️ Konfigurasi Bobot Fleksibel
- Preset untuk berbagai department (HCD, IT, R&D)
- Slider interaktif untuk kustomisasi
- Validasi total bobot = 100%

### 3. 🤖 Perbandingan GenAI Models
- ChatGPT, Perplexity, Gemini, DeepSeek
- Rating 1-5 untuk setiap indikator
- Preview score real-time

### 4. 🏆 Hasil & Rekomendasi
- Ranking berdasarkan metode SAW
- Visualisasi detail per indikator
- Export hasil ke CSV

### 5. 🎉 Onboarding Tour
- Panduan interaktif untuk pengguna baru
- Penjelasan setiap fitur dan langkah

---

## 🔬 Metodologi

### 7 Indikator Evaluasi

| Indikator | Deskripsi | Bobot Default (HCD) |
|-----------|-----------|---------------------|
| 🎯 Accuracy | Ketepatan dan keakuratan jawaban | 20% |
| 🔗 Relevance | Relevansi dengan konteks pertanyaan | 15% |
| 💡 Clarity | Kejelasan bahasa dan struktur | 10% |
| 🔄 Coherence | Koherensi dan alur logis | 10% |
| 📦 Completeness | Kelengkapan jawaban | 15% |
| 🤝 Appropriateness | Kesesuaian tone dan nilai | 10% |
| ⚡ Response Time | Kecepatan respons | 20% |

### Metode Simple Additive Weighting (SAW)

```
V_i = Σ (w_j × r_ij)

Dimana:
- V_i = Nilai akhir alternatif i
- w_j = Bobot kriteria j  
- r_ij = Rating ternormalisasi (score/max_score)
```

---

## 🛠️ Teknologi

- **React 18** - UI Framework
- **Material UI (MUI)** - Component Library
- **GSAP** - Animation Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool

---

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>

# Masuk ke folder project
cd dss-doc

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

---

## 🚀 Penggunaan

1. **Landing Page** - Baca latar belakang dan klik "Mulai Analisis"
2. **Onboarding Tour** - Ikuti panduan (muncul untuk pengguna baru)
3. **Analisis Indikator** - Pelajari 7 indikator dan 35 atribut
4. **Konfigurasi Bobot** - Pilih department atau kustomisasi bobot
5. **Penilaian GenAI** - Berikan rating 1-5 untuk setiap model
6. **Hasil** - Lihat ranking dan rekomendasi

---

## 📁 Struktur Project

```
dss-doc/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # Halaman utama
│   │   ├── OnboardingTour.tsx   # Tour interaktif
│   │   ├── IndicatorAnalysis.tsx # Analisis indikator
│   │   ├── WeightConfiguration.tsx # Konfigurasi bobot
│   │   ├── GenAIComparison.tsx  # Penilaian GenAI
│   │   └── ResultsPage.tsx      # Hasil akhir
│   ├── types/
│   │   └── index.ts             # Type definitions & data
│   ├── theme.ts                 # MUI theme configuration
│   ├── App.tsx                  # Main application
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
└── README.md
```

---

## 📊 Data Source

Data indikator diekstrak dari:
- **Literature Review** - Jurnal ilmiah tentang AI evaluation
- **Internal Document** - Dokumen kebutuhan Astra International
- **User Voice** - Feedback dari calon pengguna

Total: **35 atribut** → **7 indikator** → **1 keputusan**

---

## 🎨 Screenshots

### Landing Page
![Landing](https://via.placeholder.com/600x300/0f0f23/6366f1?text=Landing+Page)

### Indicator Analysis
![Indicators](https://via.placeholder.com/600x300/0f0f23/22d3ee?text=Indicator+Analysis)

### Weight Configuration
![Weights](https://via.placeholder.com/600x300/0f0f23/10b981?text=Weight+Configuration)

### Results
![Results](https://via.placeholder.com/600x300/0f0f23/f59e0b?text=Results+Page)

---

## 📝 License

MIT License - PT Astra International © 2024

---

## 👥 Credits

Developed for **PT Astra International - Human Capital Development**

Built with ❤️ using React, MUI, and GSAP
