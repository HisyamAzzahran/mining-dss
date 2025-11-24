# 🚀 Quick Start Guide

Panduan singkat untuk langsung jalankan dan lihat hasil analisis data mining Gen-AI.

## 1️⃣ Setup Awal

```bash
# Masuk ke folder project
cd C:\Project\mining-dss

# Buat virtual environment
python -m venv .venv

# Aktifkan environment
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Selesai! Environment ready.

---

## 2️⃣ Jalankan Analisis

Jika data sudah ada di `data/raw/`:

```bash
# Jalankan semua tahap (prepare → analyze → score)
python run_pipeline.py
```

**Output**: File baru akan muncul di `data/processed/`:
- `attributes_with_importance.csv`
- `attribute_correlation_matrix.csv`
- `indicator_weights.csv`

---

## 3️⃣ Generate Visualisasi

```bash
# Buat 7 grafik + ringkasan
python visualize_results.py
```

**Output**: Folder `visualizations/` berisi:
- 7 file `.png` (grafik)
- 1 file `.csv` (ringkasan tabel)

Lihat hasilnya di folder tersebut! 📊

---

## 4️⃣ Baca Hasilnya

Hasil utama ada di 2 file:

### File 1: `data/processed/indicator_weights.csv`
```
Accuracy,4.59,0.153,15.32%
Relevance,4.47,0.149,14.91%
...
```
**Ini yang copy-paste ke Excel DSS kamu!** ⭐

### File 2: `ANALYSIS_SUMMARY.md`
Dokumentasi lengkap: apa artinya, gimana cara bacanya, next steps.

---

## 📊 Visualisasi yang Hasilnya

```
visualizations/
├── 01_indicator_weights.png       ← Bobot semua indikator (bar chart)
├── 02_importance_by_indicator.png ← Skor importance per indikator
├── 03_top_attributes.png          ← Top 15 atribut terbaik
├── 04_source_diversity.png        ← Dari mana asal atribut (pie chart)
├── 05_correlation_heatmap.png     ← Hubungan antar indikator
├── 06_importance_distribution.png ← Sebaran skor (box plot)
├── 07_attribute_count.png         ← Berapa atribut per indikator
└── summary_indicator_weights.csv  ← Tabel ringkasan
```

Buka file `.png` dengan image viewer untuk lihat grafik. 📈

---

## ⚡ Troubleshooting

**Q: Error "ModuleNotFoundError: No module named 'seaborn'"**
A: 
```bash
pip install seaborn
```

**Q: Script berhenti di tengah?**
A: Cek apakah file di `data/raw/` lengkap:
- `attributes_master.csv`
- `survey_responses.csv`

**Q: Folder `visualizations/` tidak ada?**
A: Normal, akan dibuat otomatis saat jalankan `visualize_results.py` pertama kali.

---

## 📋 Folder Structure

Setelah selesai, struktur harusnya:

```
mining-dss/
├── data/
│   ├── raw/
│   │   ├── attributes_master.csv
│   │   └── survey_responses.csv
│   └── processed/              ← Generated
│       ├── attributes_with_importance.csv
│       ├── attribute_correlation_matrix.csv
│       └── indicator_weights.csv
├── src/
│   ├── data_prep.py
│   ├── analysis.py
│   ├── clustering.py
│   ├── scoring.py
│   └── config.py
├── visualizations/             ← Generated
│   ├── 01_indicator_weights.png
│   ├── 02_importance_by_indicator.png
│   ├── ... (7 grafik total)
│   └── summary_indicator_weights.csv
├── visualize_results.py
├── run_pipeline.py
├── README.md
├── ANALYSIS_SUMMARY.md
└── requirements.txt
```

---

## 💡 Tips Berguna

1. **Jalankan satu per satu** jika mau debug:
   ```bash
   python src/data_prep.py
   python src/analysis.py
   python src/clustering.py
   python src/scoring.py
   ```

2. **Edit `config.py`** kalau path berbeda dari default.

3. **Visualisasi ulang** tanpa re-analyze:
   ```bash
   python visualize_results.py
   ```
   Cepat karena hanya baca data existing.

4. **Backup** folder `visualizations/` jika mau keep versi lama sebelum re-run.

---

## 🎯 Hasil yang Diharapkan

Setelah semua selesai, kamu punya:

✅ 7 indikator dengan bobot berbasis data  
✅ 7 grafik visualization yang menarik  
✅ Dokumentasi lengkap metodologi  
✅ Data siap pakai ke Excel DSS  

**Total waktu**: ~15 menit (termasuk download & install).

---

## 📞 Need Help?

- Baca `README.md` untuk dokumentasi lengkap
- Baca `ANALYSIS_SUMMARY.md` untuk interpretasi hasil
- Cek `src/config.py` untuk melihat path configuration

**Happy analyzing!** 🎉
