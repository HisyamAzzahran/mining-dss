# 📊 Ringkasan Hasil Analisis Data Mining Gen-AI

Dokumen ini merangkum hasil lengkap dari tahap data mining untuk pembentukan indikator dan bobot penilaian Gen-AI KM Astra.

---

## 🎯 Hasil Utama: Bobot 7 Indikator

| No. | Indikator | Importance Score | Bobot (%) | Status |
|-----|-----------|------------------|-----------|--------|
| 1 | Accuracy | 4.59 | **15.32%** | Tertinggi |
| 2 | Relevance | 4.47 | 14.91% | - |
| 3 | Completeness | 4.38 | 14.62% | - |
| 4 | Responsiveness | 4.28 | 14.27% | - |
| 5 | Tone/Appropriateness | 4.23 | 14.12% | - |
| 6 | Clarity | 4.11 | 13.73% | - |
| 7 | Conciseness/Coherence | 3.91 | **13.03%** | Terendah |

**Total**: 100% ✓

### Interpretasi

- **Accuracy** punya bobot tertinggi (15.32%) karena responden menganggapnya paling kritis. Ini logic: Gen-AI yang salah faktanya tidak berguna, apapun indikator lainnya.
- **Conciseness/Coherence** punya bobot terendah, tapi masih signifikan (13%). Artinya semua 7 indikator dianggap penting, tidak ada yang bisa diabaikan.
- Perbedaan bobot kecil (2-3 poin persentase) menunjukkan responden melihat 7 indikator sebagai seimbang dan saling melengkapi.

---

## 📈 Visualisasi yang Dihasilkan

Semua file ada di folder `visualizations/`:

### 1. **01_indicator_weights.png** – Bobot Indikator
Menampilkan bar chart distribusi bobot 7 indikator. Warna berbeda untuk tiap indikator, dengan nilai bobot di atas tiap bar.

**Kegunaan**: 
- Presentasi ke stakeholder
- Lampiran laporan
- Bukti bahwa indikator seimbang

---

### 2. **02_importance_by_indicator.png** – Rata-rata Kepentingan
Box plot menunjukkan skor importance rata-rata per indikator + standard deviation.

**Insight**:
- Skor semua indikator di atas 3.9 (dari skala 1-5)
- Garis merah menunjukkan rata-rata semua atribut
- Error bar menunjukkan ada variasi dalam tim responden, tapi konsisten dalam ranking

---

### 3. **03_top_attributes.png** – Top 15 Atribut
Horizontal bar chart menampilkan 15 atribut dengan skor importance tertinggi.

**Contoh insight**:
- Atribut tertinggi punya skor ~4.61 (hampir sempurna)
- Mayoritas dari kategori Accuracy dan Relevance
- Ini bisa dijadikan acuan atribut "must-have" untuk Gen-AI KM Astra

---

### 4. **04_source_diversity.png** – Sumber Atribut
Pie chart menunjukkan berapa banyak atribut yang berasal dari 1, 2, atau 3 sumber (literatur, internal, user).

**Kegunaan**:
- Buktikan bahwa indikator didasarkan pada penelitian komprehensif
- Atribut dari multiple source lebih kredibel
- Menunjukkan alignment antara teori, praktik internal, dan kebutuhan user

---

### 5. **05_correlation_heatmap.png** – Matriks Korelasi
Heatmap menunjukkan korelasi antar indikator (simplified view).

**Interpretasi**:
- Diagonal = 1.0 (indikator berkorelasi sempurna dengan dirinya)
- Korelasi tinggi antar indikator = mereka saling mendukung dalam menilai kualitas
- Korelasi rendah = mereka mengukur dimensi berbeda

---

### 6. **06_importance_distribution.png** – Box Plot Distribusi
Box plot detail distribusi skor importance per indikator.

**Baca chart**:
- Box = 50% tengah data (IQR)
- Garis tengah box = median
- Whiskers = min-max nilai
- Outlier (jika ada) = titik di luar whiskers

**Insight**: Variabilitas kecil = responden sepakat

---

### 7. **07_attribute_count.png** – Jumlah Atribut per Indikator
Bar chart menunjukkan berapa atribut yang membentuk tiap indikator.

**Detail**:
- Accuracy: 5 atribut
- Relevance: 5 atribut
- Completeness: 5 atribut
- Dst.

Jumlah seimbang = tidak ada indikator yang overfitted dengan terlalu banyak atribut.

---

## 📋 Output Data Files

### 1. `attributes_with_importance.csv`
File yang paling detail. Berisi:

| Kolom | Arti |
|-------|------|
| `attr_id` | ID atribut (A1, A2, ..., RT5) |
| `indicator_hint` | Indikator yang menjadi category-nya |
| `attr_text` | Deskripsi lengkap atribut |
| `source_*` | Flag 0/1 apakah dari literatur/internal/user |
| `freq_literature` | Berapa sering muncul di literatur |
| `source_diversity` | Berapa sumber yang menyebut atribut ini |
| `importance_mean` | ⭐ **Rata-rata skor penting** (1-5) |
| `importance_std` | Variasi skor antar responden |

**Kegunaan**:
- Lampiran detail metodologi
- Data untuk drill-down analisis
- Acuan atribut individual untuk evaluasi Gen-AI

---

### 2. `attribute_correlation_matrix.csv`
Matriks NxN dimana N = 35 atribut.

**Cara baca**:
- Baris & kolom = attr_id (A1, A2, ..., RT5)
- Nilai di cell = korelasi Pearson (-1 sampai 1)
- Nilai mendekati 1 = kedua atribut dinilai serupa oleh responden
- Nilai mendekati 0 = independen

**Kegunaan**:
- Buktien clustering: atribut dalam 1 indikator berkorelasi tinggi
- Identifikasi atribut redundan (jika korelasinya terlalu tinggi bisa dipertimbangkan digabung)

---

### 3. `indicator_weights.csv` ⭐ **FILE PALING PENTING**
Output final yang langsung bisa dipakai di DSS Excel.

| Kolom | Arti |
|-------|------|
| `indicator_hint` | Nama indikator |
| `indicator_score` | Rata-rata importance semua atribut dalam indikator |
| `weight` | Proporsi desimal (0-1) |
| `weight_percent` | Bobot dalam persen (0-100%) |

**Copy-paste ke Excel DSS**:
```excel
Skor Total = SUM(Rating_Indikator_i × Weight_Indikator_i)
```

Contoh dengan nilai asli:
```
Skor Total = (Rating_Accuracy × 0.1532) 
           + (Rating_Relevance × 0.1491)
           + ...
           + (Rating_Conciseness × 0.1303)
```

---

## 📊 Statistik Ringkas

| Metrik | Nilai |
|--------|-------|
| Total atribut | 35 |
| Total indikator | 7 |
| Rata-rata atribut per indikator | 5 |
| Skor importance rata-rata (all) | 4.27 |
| Skor importance terendah | 3.81 (Responsiveness-R5) |
| Skor importance tertinggi | 4.61 (Accuracy-A1/A2) |
| Std deviation rata-rata | 0.52 |

---

## 🔍 Penjelasan Tiap Indikator

### 1. **Accuracy (15.32%)**
**Definisi**: Jawaban Gen-AI faktual, akurat, dan didukung referensi.

**Atribut termasuk**:
- A1: Jawaban faktual & sesuai sumber terpercaya
- A2: Jarang berisi info salah/menyesatkan
- A3: Konsisten ketika ditanya ulang
- A4: Mampu mengutip referensi
- A5: Hindari spekulasi di topik sensitif

**Mengapa penting**: Kalau factually wrong, nilai indikator lain tidak membantu.

---

### 2. **Relevance (14.91%)**
**Definisi**: Jawaban relevan dengan pertanyaan, konteks bisnis, dan proses Astra.

**Atribut termasuk**:
- R1: Relevan dengan pertanyaan
- R2: Memahami konteks bisnis Astra
- R3: Sesuai konteks Knowledge Management Astra
- R4: Mengaitkan dengan proses kerja unit
- R5: Tidak keluar topik

**Mengapa penting**: Jawaban bagus tapi tidak relevan = sia-sia.

---

### 3. **Completeness (14.62%)**
**Definisi**: Informasi yang diberikan lengkap dan cover semua aspek pertanyaan.

**Atribut termasuk**: CP1-CP5
- Tidak ada informasi penting yang terlewat
- Cover berbagai sudut pandang
- Sufficient depth untuk actionable

**Mengapa penting**: User butuh jawaban yang "selesai", bukan yang perlu cari lagi.

---

### 4. **Responsiveness (14.27%)**
**Definisi**: Kecepatan respons dan adaptif terhadap follow-up questions.

**Atribut termasuk**: RT1-RT5
- Response time cepat
- Adaptif dengan pertanyaan follow-up
- Bisa handle iterasi pertanyaan

**Mengapa penting**: Di knowledge management, user butuh jawaban cepat.

---

### 5. **Tone/Appropriateness (14.12%)**
**Definisi**: Nada komunikasi sesuai konteks, profesional, dan etis.

**Atribut termasuk**: TA1-TA5
- Nada profesional sesuai corporate culture Astra
- Menghindari bias atau stereotype
- Etis dalam handling info sensitif

**Mengapa penting**: Tone salah = bisa dianggap tidak trustworthy atau offensive.

---

### 6. **Clarity (13.73%)**
**Definisi**: Bahasa jelas, mudah dipahami, terstruktur rapi.

**Atribut termasuk**:
- C1: Bahasa jelas & mudah dipahami
- C2: Struktur rapi & terorganisir
- C3: Istilah teknis dijelaskan sederhana
- C4: Contoh membantu pemahaman
- C5: Minimize ambiguitas

**Mengapa penting**: Jawaban bagus tapi bingung = tidak berguna. Clarity adalah enabler.

---

### 7. **Conciseness/Coherence (13.03%)**
**Definisi**: Jawaban ringkas, tidak berbelit, tapi tetap logis & koheren.

**Atribut termasuk**:
- CC1: Tidak bertele-tele
- CC2: Paragraf saling terhubung logis
- CC3: Merangkum poin penting singkat
- CC4: Batasi info tidak relevan

**Mengapa penting**: User appreciate jawaban yang to-the-point, bukan essay panjang.

---

## 🚀 Next Steps: Implementasi di DSS

Setelah punya bobot ini, langkah selanjutnya untuk DSS penilaian Gen-AI:

1. **Design rating form**
   - 7 baris (indikator)
   - N kolom (Gen-AI models yang dinilai)
   - Rating 1-5 atau rubric detail per indikator

2. **Calculate score**
   ```
   Total Score = Σ (Rating_i × Weight_i)
   ```

3. **Rank models**
   - Sort by total score
   - Model dengan score tertinggi = rekomendasi

4. **Sensitivity analysis**
   - Bagaimana jika weight Accuracy naik 2%?
   - Apakah ranking berubah?
   - Ini buat DSS lebih robust

5. **Document & present**
   - Laporan metodologi: dari data mining ke indikator
   - Lampirkan output analisis ini
   - Present ke stakeholder dengan visualisasi

---

## ❓ FAQ

**Q: Bobot bisa diubah?**
A: Bisa, tapi harus tau risikonya. Perubahan bobot = perubahan prioritas yang implicit di survei. Kalau mau bobot beda, lebih baik re-survey dengan pertanyaan yang lebih spesifik tentang prioritas.

**Q: Bagaimana jika ada responden baru?**
A: Tambahkan survey responses baru ke `survey_responses.csv`, lalu ulang analysis. Script akan otomatis recount importance & recompute weights.

**Q: Bisa pakai indikator lebih dari 7?**
A: Bisa, tapi semakin banyak indikator, semakin susah untuk rate konsisten. 7 indikator adalah sweet spot antara detail dan practicality.

**Q: Apakah order indikator (di DSS form) penting?**
A: Tidak, order hanya aesthetic. Kalkulasi score tetap sama. Tapi recommend sort by importance score (Accuracy dulu, dst) untuk guide rater.

---

## 📞 Info Technical

**Script yang digunakan**:
- `visualize_results.py` – Generate semua grafik + summary table
- Script ini bisa dijalankan ulang kapanpun tanpa perlu re-analyze data

**Dependencies**:
- pandas, numpy, scikit-learn, matplotlib, seaborn

**Saat menjalankan ulang**:
```bash
python visualize_results.py
```
Folder `visualizations/` akan di-overwrite dengan versi terbaru.

---

**Dibuat**: November 2025  
**Versi**: 1.0  
**Status**: Ready for DSS Implementation
