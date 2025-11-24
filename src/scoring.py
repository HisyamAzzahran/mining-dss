
import pandas as pd
from .config import DATA_PROCESSED_DIR

def compute_indicator_weights(processed_attrs: pd.DataFrame):
    # Asumsikan kolom 'indicator_hint' dan 'importance_mean' sudah ada
    grouped = (
        processed_attrs
        .groupby("indicator_hint")["importance_mean"]
        .mean()
        .reset_index()
        .rename(columns={"importance_mean": "indicator_score"})
    )

    total = grouped["indicator_score"].sum()
    grouped["weight"] = grouped["indicator_score"] / total
    grouped["weight_percent"] = grouped["weight"] * 100

    out_path = DATA_PROCESSED_DIR / "indicator_weights.csv"
    grouped.to_csv(out_path, index=False, encoding="utf-8-sig")
    return grouped, out_path
