
import os
from pathlib import Path

# Base directory (bisa kamu sesuaikan di lokal kalau perlu)
BASE_DIR = Path(__file__).resolve().parent.parent

DATA_RAW_DIR = BASE_DIR / "data" / "raw"
DATA_PROCESSED_DIR = BASE_DIR / "data" / "processed"
REPORTS_DIR = BASE_DIR / "reports"

ATTRIBUTES_FILE = DATA_RAW_DIR / "attributes_master.csv"
SURVEY_FILE = DATA_RAW_DIR / "survey_responses.csv"
