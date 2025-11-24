
import pandas as pd
from .config import ATTRIBUTES_FILE, SURVEY_FILE

def load_raw_data():
    attributes = pd.read_csv(ATTRIBUTES_FILE)
    survey = pd.read_csv(SURVEY_FILE)
    return attributes, survey

def add_basic_features(attributes: pd.DataFrame):
    # Hitung diversity sumber sebagai contoh fitur awal
    source_cols = ["source_literature", "source_internal_doc", "source_user_voice"]
    if all(col in attributes.columns for col in source_cols):
        attributes["source_diversity"] = attributes[source_cols].sum(axis=1)
    return attributes
