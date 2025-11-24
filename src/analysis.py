
import pandas as pd
import numpy as np

from .config import DATA_PROCESSED_DIR
from .data_prep import load_raw_data, add_basic_features

def compute_attribute_importance():
    attrs, survey = load_raw_data()
    attrs = add_basic_features(attrs)

    # Hitung mean dan std importance per atribut dari data survei
    attr_ids = attrs["attr_id"].tolist()
    imp_stats = []

    for aid in attr_ids:
        if aid in survey.columns:
            scores = survey[aid].dropna().astype(float)
            imp_stats.append({
                "attr_id": aid,
                "importance_mean": scores.mean(),
                "importance_std": scores.std()
            })

    imp_df = pd.DataFrame(imp_stats)
    merged = attrs.merge(imp_df, on="attr_id", how="left")

    # Simpan ke processed
    out_path = DATA_PROCESSED_DIR / "attributes_with_importance.csv"
    merged.to_csv(out_path, index=False, encoding="utf-8-sig")
    return merged, out_path
