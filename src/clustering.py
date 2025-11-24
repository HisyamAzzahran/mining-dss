
import pandas as pd
from sklearn.metrics import pairwise_distances
from .config import DATA_PROCESSED_DIR

def build_attribute_correlation_matrix(processed_attrs: pd.DataFrame, survey: pd.DataFrame):
    # Matriks: responden x atribut (skor penting)
    attr_ids = processed_attrs["attr_id"].tolist()
    used_cols = [c for c in attr_ids if c in survey.columns]

    mat = survey[used_cols].astype(float)
    corr = mat.corr()

    out_path = DATA_PROCESSED_DIR / "attribute_correlation_matrix.csv"
    corr.to_csv(out_path, encoding="utf-8-sig")
    return corr, out_path
