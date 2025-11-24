import sys
from pathlib import Path
import pandas as pd

# Tambah path project ke sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

from src import analysis, data_prep, clustering, scoring
from src.config import DATA_PROCESSED_DIR

def main():
    # 1. Hitung importance per atribut
    processed_attrs, imp_path = analysis.compute_attribute_importance()

    # 2. Load data mentah untuk korelasi
    attrs, survey = data_prep.load_raw_data()
    corr, corr_path = clustering.build_attribute_correlation_matrix(processed_attrs, survey)

    # 3. Hitung bobot indikator
    weights_df, weights_path = scoring.compute_indicator_weights(processed_attrs)

    # 4. Buat ringkasan ke Excel
    summary_path = DATA_PROCESSED_DIR / "mining_outputs_summary.xlsx"
    processed_sorted = processed_attrs.sort_values(
        ["indicator_hint", "importance_mean"],
        ascending=[True, False]
    )

    with pd.ExcelWriter(summary_path, engine="xlsxwriter") as writer:
        processed_sorted.to_excel(writer, sheet_name="attributes_with_importance", index=False)
        corr.to_excel(writer, sheet_name="attribute_corr_matrix")
        weights_df.to_excel(writer, sheet_name="indicator_weights", index=False)

    print(f"Ringkasan hasil disimpan di {summary_path}")

if __name__ == "__main__":
    main()
