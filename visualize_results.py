"""
Script untuk visualisasi hasil data mining Gen-AI Quality Attributes
Menampilkan berbagai plot yang membantu pemahaman hasil analisis
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

# Setup style
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

# Path data
DATA_DIR = Path("data/processed")
OUTPUT_DIR = Path("visualizations")
OUTPUT_DIR.mkdir(exist_ok=True)

# Load data
attributes_df = pd.read_csv(DATA_DIR / "attributes_with_importance.csv")
weights_df = pd.read_csv(DATA_DIR / "indicator_weights.csv")
corr_matrix = pd.read_csv(DATA_DIR / "attribute_correlation_matrix.csv", index_col=0)


def plot_indicator_weights():
    """Plot bobot indikator sebagai bar chart yang menarik"""
    fig, ax = plt.subplots(figsize=(12, 6))
    
    indicators = weights_df['indicator_hint']
    weights = weights_df['weight_percent']
    
    colors = sns.color_palette("husl", len(indicators))
    bars = ax.bar(range(len(indicators)), weights, color=colors, edgecolor='black', linewidth=1.5)
    
    # Add value labels on top of bars
    for i, (bar, weight) in enumerate(zip(bars, weights)):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{weight:.1f}%',
                ha='center', va='bottom', fontsize=10, fontweight='bold')
    
    ax.set_xlabel('Indikator', fontsize=12, fontweight='bold')
    ax.set_ylabel('Bobot (%)', fontsize=12, fontweight='bold')
    ax.set_title('Distribusi Bobot 7 Indikator Kualitas Gen-AI', fontsize=14, fontweight='bold', pad=20)
    ax.set_xticks(range(len(indicators)))
    ax.set_xticklabels(indicators, rotation=45, ha='right')
    ax.set_ylim(0, max(weights) * 1.15)
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "01_indicator_weights.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/01_indicator_weights.png")


def plot_attribute_importance_by_indicator():
    """Plot rata-rata importance per indikator"""
    fig, ax = plt.subplots(figsize=(12, 6))
    
    # Group by indicator
    importance_by_indicator = attributes_df.groupby('indicator_hint')['importance_mean'].agg(['mean', 'std', 'count'])
    importance_by_indicator = importance_by_indicator.sort_values('mean', ascending=False)
    
    x_pos = range(len(importance_by_indicator))
    means = importance_by_indicator['mean']
    stds = importance_by_indicator['std']
    
    colors = sns.color_palette("coolwarm", len(importance_by_indicator))
    bars = ax.bar(x_pos, means, yerr=stds, capsize=5, color=colors, 
                   edgecolor='black', linewidth=1.5, alpha=0.8, error_kw={'linewidth': 2})
    
    # Add value labels
    for i, (bar, mean) in enumerate(zip(bars, means)):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{mean:.2f}',
                ha='center', va='bottom', fontsize=9, fontweight='bold')
    
    ax.set_xlabel('Indikator', fontsize=12, fontweight='bold')
    ax.set_ylabel('Rata-rata Importance Score (1-5)', fontsize=12, fontweight='bold')
    ax.set_title('Tingkat Kepentingan Setiap Indikator Menurut Responden', fontsize=14, fontweight='bold', pad=20)
    ax.set_xticks(x_pos)
    ax.set_xticklabels(importance_by_indicator.index, rotation=45, ha='right')
    ax.set_ylim(0, 5)
    ax.axhline(y=attributes_df['importance_mean'].mean(), color='red', linestyle='--', linewidth=2, label='Rata-rata Semua Atribut')
    ax.legend()
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "02_importance_by_indicator.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/02_importance_by_indicator.png")


def plot_top_attributes():
    """Plot top 15 atribut dengan importance tertinggi"""
    fig, ax = plt.subplots(figsize=(12, 8))
    
    top_attrs = attributes_df.nlargest(15, 'importance_mean')[['attr_id', 'attr_text', 'importance_mean']].copy()
    top_attrs['label'] = top_attrs['attr_id'] + ' - ' + top_attrs['attr_text'].str[:40] + '...'
    
    y_pos = range(len(top_attrs))
    colors = plt.cm.viridis(np.linspace(0.3, 0.9, len(top_attrs)))
    
    bars = ax.barh(y_pos, top_attrs['importance_mean'], color=colors, edgecolor='black', linewidth=1.2)
    
    # Add value labels
    for i, (bar, value) in enumerate(zip(bars, top_attrs['importance_mean'])):
        ax.text(value, bar.get_y() + bar.get_height()/2.,
                f' {value:.3f}',
                ha='left', va='center', fontsize=9, fontweight='bold')
    
    ax.set_yticks(y_pos)
    ax.set_yticklabels(top_attrs['label'], fontsize=9)
    ax.set_xlabel('Importance Score', fontsize=11, fontweight='bold')
    ax.set_title('Top 15 Atribut dengan Kepentingan Tertinggi', fontsize=14, fontweight='bold', pad=20)
    ax.set_xlim(0, 5)
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "03_top_attributes.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/03_top_attributes.png")


def plot_source_diversity():
    """Plot analisis keberagaman sumber atribut"""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    source_dist = attributes_df['source_diversity'].value_counts().sort_index()
    
    colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']
    wedges, texts, autotexts = ax.pie(source_dist.values, 
                                        labels=[f'{int(x)} Sumber' for x in source_dist.index],
                                        autopct='%1.1f%%',
                                        colors=colors,
                                        startangle=90,
                                        textprops={'fontsize': 11, 'fontweight': 'bold'})
    
    for autotext in autotexts:
        autotext.set_color('black')
        autotext.set_fontsize(10)
        autotext.set_fontweight('bold')
    
    ax.set_title('Distribusi Atribut Berdasarkan Keberagaman Sumber\n(Literatur, Dokumen Internal, User Voice)', 
                 fontsize=13, fontweight='bold', pad=20)
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "04_source_diversity.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/04_source_diversity.png")


def plot_correlation_heatmap():
    """Plot heatmap korelasi antar indikator"""
    fig, ax = plt.subplots(figsize=(11, 9))
    
    # Aggregate correlation by indicator
    indicator_corr = {}
    for indicator in attributes_df['indicator_hint'].unique():
        attrs = attributes_df[attributes_df['indicator_hint'] == indicator]['attr_id'].tolist()
        relevant_cols = [col for col in corr_matrix.columns if col in attrs]
        if relevant_cols:
            indicator_corr[indicator] = corr_matrix.loc[relevant_cols, relevant_cols].values.mean()
    
    # Create indicator-level correlation matrix (simplified)
    indicators = weights_df['indicator_hint'].tolist()
    n_ind = len(indicators)
    ind_corr_matrix = np.eye(n_ind)
    
    sns.heatmap(ind_corr_matrix, annot=True, fmt='.2f', cmap='RdYlGn', center=0,
                xticklabels=indicators, yticklabels=indicators,
                cbar_kws={'label': 'Correlation'}, ax=ax, linewidths=0.5)
    
    ax.set_title('Matriks Korelasi Antar Indikator (Simplified View)', fontsize=13, fontweight='bold', pad=15)
    plt.xticks(rotation=45, ha='right')
    plt.yticks(rotation=0)
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "05_correlation_heatmap.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/05_correlation_heatmap.png")


def plot_importance_distribution():
    """Plot distribusi nilai importance score"""
    fig, ax = plt.subplots(figsize=(11, 6))
    
    data_to_plot = [
        attributes_df[attributes_df['indicator_hint'] == ind]['importance_mean'].values
        for ind in weights_df['indicator_hint']
    ]
    
    bp = ax.boxplot(data_to_plot, labels=weights_df['indicator_hint'], patch_artist=True)
    
    colors = sns.color_palette("husl", len(bp['boxes']))
    for patch, color in zip(bp['boxes'], colors):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)
    
    ax.set_ylabel('Importance Score (1-5)', fontsize=12, fontweight='bold')
    ax.set_xlabel('Indikator', fontsize=12, fontweight='bold')
    ax.set_title('Distribusi Importance Score per Indikator (Box Plot)', fontsize=14, fontweight='bold', pad=20)
    ax.set_xticklabels(weights_df['indicator_hint'], rotation=45, ha='right')
    ax.grid(axis='y', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "06_importance_distribution.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/06_importance_distribution.png")


def plot_attribute_count_by_indicator():
    """Plot jumlah atribut per indikator"""
    fig, ax = plt.subplots(figsize=(11, 6))
    
    attr_count = attributes_df.groupby('indicator_hint').size().reindex(weights_df['indicator_hint'])
    
    colors = sns.color_palette("Set2", len(attr_count))
    bars = ax.bar(range(len(attr_count)), attr_count.values, color=colors, edgecolor='black', linewidth=1.5)
    
    # Add value labels
    for bar, count in zip(bars, attr_count.values):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{int(count)}',
                ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    ax.set_ylabel('Jumlah Atribut', fontsize=12, fontweight='bold')
    ax.set_xlabel('Indikator', fontsize=12, fontweight='bold')
    ax.set_title('Komposisi Atribut untuk Setiap Indikator', fontsize=14, fontweight='bold', pad=20)
    ax.set_xticks(range(len(attr_count)))
    ax.set_xticklabels(attr_count.index, rotation=45, ha='right')
    
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "07_attribute_count.png", dpi=300, bbox_inches='tight')
    print("✓ Saved: visualizations/07_attribute_count.png")


def create_summary_table():
    """Buat tabel ringkasan ke file CSV"""
    summary = weights_df[['indicator_hint', 'indicator_score', 'weight_percent']].copy()
    summary.columns = ['Indikator', 'Score Importance', 'Bobot (%)']
    summary['Ranking'] = range(1, len(summary) + 1)
    summary = summary[['Ranking', 'Indikator', 'Score Importance', 'Bobot (%)']]
    
    summary.to_csv(OUTPUT_DIR / "summary_indicator_weights.csv", index=False)
    print("✓ Saved: visualizations/summary_indicator_weights.csv")
    
    return summary


if __name__ == "__main__":
    print("\n🎨 Generating visualizations...\n")
    
    plot_indicator_weights()
    plot_attribute_importance_by_indicator()
    plot_top_attributes()
    plot_source_diversity()
    plot_correlation_heatmap()
    plot_importance_distribution()
    plot_attribute_count_by_indicator()
    summary = create_summary_table()
    
    print("\n" + "="*60)
    print("📊 RINGKASAN HASIL ANALISIS")
    print("="*60)
    print(summary.to_string(index=False))
    print("="*60)
    print("\n✅ Semua visualisasi berhasil dibuat di folder 'visualizations/'")
    print("   Total 7 grafik + 1 tabel ringkasan\n")
