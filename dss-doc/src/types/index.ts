// Types for GenAI DSS Application

export interface Indicator {
  id: string;
  name: string;
  nameId: string;
  description: string;
  weight: number;
  type: 'Benefit' | 'Cost';
  attributes: Attribute[];
}

export interface Attribute {
  id: string;
  text: string;
  indicator: string;
  category: string;
  sourceLiterature: boolean;
  sourceInternal: boolean;
  sourceUserVoice: boolean;
  freqLiterature: number;
}

export interface GenAIModel {
  id: string;
  name: string;
  logo: string;
  color: string;
  scores: Record<string, number>;
  description: string;
}

export interface DSSResult {
  modelId: string;
  modelName: string;
  weightedScore: number;
  rank: number;
  indicatorScores: Record<string, number>;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  weights: Record<string, number>;
}

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

// Default Data
export const DEFAULT_INDICATORS: Indicator[] = [
  {
    id: 'accuracy',
    name: 'Accuracy',
    nameId: 'Akurasi',
    description: 'Kemampuan AI memberikan jawaban yang faktual, tepat, dan bebas dari informasi yang menyesatkan',
    weight: 0.20,
    type: 'Benefit',
    attributes: []
  },
  {
    id: 'relevance',
    name: 'Relevance',
    nameId: 'Relevansi',
    description: 'Seberapa relevan jawaban AI dengan pertanyaan dan konteks bisnis perusahaan',
    weight: 0.15,
    type: 'Benefit',
    attributes: []
  },
  {
    id: 'clarity',
    name: 'Clarity',
    nameId: 'Kejelasan',
    description: 'Kejelasan bahasa, struktur, dan penyampaian informasi oleh AI',
    weight: 0.10,
    type: 'Benefit',
    attributes: []
  },
  {
    id: 'coherence',
    name: 'Coherence',
    nameId: 'Koherensi',
    description: 'Keterkaitan logis antar paragraf dan konsistensi alur penjelasan',
    weight: 0.10,
    type: 'Benefit',
    attributes: []
  },
  {
    id: 'completeness',
    name: 'Completeness',
    nameId: 'Kelengkapan',
    description: 'Kemampuan AI menjawab seluruh poin penting dan memberikan solusi praktis',
    weight: 0.15,
    type: 'Benefit',
    attributes: []
  },
  {
    id: 'appropriateness',
    name: 'Appropriateness',
    nameId: 'Kesesuaian',
    description: 'Kesesuaian nada, gaya bahasa, dan penghormatan terhadap nilai perusahaan',
    weight: 0.10,
    type: 'Benefit',
    attributes: []
  },
  {
    id: 'responseTime',
    name: 'Response Time',
    nameId: 'Waktu Respons',
    description: 'Kecepatan dan stabilitas waktu respons AI dalam menjawab pertanyaan',
    weight: 0.20,
    type: 'Benefit',
    attributes: []
  }
];

export const DEFAULT_GENAI_MODELS: GenAIModel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: '🤖',
    color: '#10a37f',
    description: 'OpenAI\'s flagship model, dikenal dengan kemampuan conversational yang kuat',
    scores: {
      accuracy: 4,
      relevance: 4,
      clarity: 5,
      coherence: 5,
      completeness: 4,
      appropriateness: 5,
      responseTime: 4
    }
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    logo: '🔍',
    color: '#20b2aa',
    description: 'AI search engine dengan kemampuan research dan citation yang unggul',
    scores: {
      accuracy: 5,
      relevance: 5,
      clarity: 4,
      coherence: 4,
      completeness: 5,
      appropriateness: 4,
      responseTime: 4
    }
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: '✨',
    color: '#4285f4',
    description: 'Google\'s multimodal AI dengan integrasi ekosistem Google',
    scores: {
      accuracy: 4,
      relevance: 4,
      clarity: 4,
      coherence: 4,
      completeness: 4,
      appropriateness: 4,
      responseTime: 5
    }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    logo: '🌊',
    color: '#7c3aed',
    description: 'Model AI dengan fokus pada reasoning dan coding capabilities',
    scores: {
      accuracy: 5,
      relevance: 4,
      clarity: 4,
      coherence: 4,
      completeness: 4,
      appropriateness: 3,
      responseTime: 5
    }
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'hcd',
    name: 'Human Capital Development',
    description: 'Fokus pada pengembangan SDM dan e-learning',
    weights: {
      accuracy: 0.20,
      relevance: 0.15,
      clarity: 0.10,
      coherence: 0.10,
      completeness: 0.15,
      appropriateness: 0.10,
      responseTime: 0.20
    }
  },
  {
    id: 'it',
    name: 'Information Technology',
    description: 'Fokus pada infrastruktur dan solusi teknologi',
    weights: {
      accuracy: 0.25,
      relevance: 0.15,
      clarity: 0.10,
      coherence: 0.10,
      completeness: 0.15,
      appropriateness: 0.05,
      responseTime: 0.20
    }
  },
  {
    id: 'research',
    name: 'Research & Development',
    description: 'Fokus pada inovasi dan penelitian',
    weights: {
      accuracy: 0.25,
      relevance: 0.20,
      clarity: 0.10,
      coherence: 0.10,
      completeness: 0.20,
      appropriateness: 0.05,
      responseTime: 0.10
    }
  }
];

export const RAW_ATTRIBUTES: Attribute[] = [
  { id: 'A1', text: 'Jawaban AI faktual dan sesuai sumber terpercaya', indicator: 'Accuracy', category: 'content', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 8 },
  { id: 'A2', text: 'Jawaban AI jarang mengandung informasi salah atau menyesatkan', indicator: 'Accuracy', category: 'content', sourceLiterature: true, sourceInternal: false, sourceUserVoice: false, freqLiterature: 8 },
  { id: 'A3', text: 'AI konsisten ketika ditanya ulang tentang topik yang sama', indicator: 'Accuracy', category: 'content', sourceLiterature: true, sourceInternal: false, sourceUserVoice: false, freqLiterature: 6 },
  { id: 'A4', text: 'AI mampu mengutip referensi atau sumber jika diperlukan', indicator: 'Accuracy', category: 'content', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 8 },
  { id: 'A5', text: 'AI menghindari jawaban spekulatif pada topik sensitif terkait perusahaan', indicator: 'Accuracy', category: 'governance', sourceLiterature: false, sourceInternal: true, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'R1', text: 'Jawaban AI relevan dengan pertanyaan yang diajukan', indicator: 'Relevance', category: 'content', sourceLiterature: false, sourceInternal: false, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'R2', text: 'AI memahami konteks bisnis Astra International', indicator: 'Relevance', category: 'context', sourceLiterature: false, sourceInternal: true, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'R3', text: 'AI menyesuaikan jawaban dengan konteks Knowledge Management Astra', indicator: 'Relevance', category: 'context', sourceLiterature: true, sourceInternal: false, sourceUserVoice: false, freqLiterature: 6 },
  { id: 'R4', text: 'AI mampu mengaitkan jawaban dengan proses kerja di unit terkait', indicator: 'Relevance', category: 'context', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 8 },
  { id: 'R5', text: 'AI tidak keluar topik ketika diberi pertanyaan yang spesifik', indicator: 'Relevance', category: 'context', sourceLiterature: true, sourceInternal: false, sourceUserVoice: false, freqLiterature: 4 },
  { id: 'C1', text: 'Bahasa yang digunakan AI jelas dan mudah dipahami', indicator: 'Clarity', category: 'style', sourceLiterature: false, sourceInternal: true, sourceUserVoice: true, freqLiterature: 2 },
  { id: 'C2', text: 'Struktur jawaban AI rapi dan terorganisir', indicator: 'Clarity', category: 'style', sourceLiterature: true, sourceInternal: false, sourceUserVoice: true, freqLiterature: 7 },
  { id: 'C3', text: 'Istilah teknis dijelaskan dengan cara yang sederhana', indicator: 'Clarity', category: 'style', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 5 },
  { id: 'C4', text: 'AI menggunakan contoh yang membantu pemahaman', indicator: 'Clarity', category: 'style', sourceLiterature: false, sourceInternal: true, sourceUserVoice: false, freqLiterature: 0 },
  { id: 'C5', text: 'AI meminimalkan ambiguitas dalam penjelasan', indicator: 'Clarity', category: 'style', sourceLiterature: false, sourceInternal: false, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'CC1', text: 'Jawaban AI tidak bertele-tele', indicator: 'Coherence', category: 'style', sourceLiterature: false, sourceInternal: true, sourceUserVoice: true, freqLiterature: 2 },
  { id: 'CC2', text: 'Paragraf dalam jawaban AI saling terhubung dengan logis', indicator: 'Coherence', category: 'style', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 7 },
  { id: 'CC3', text: 'AI mampu merangkum poin penting dengan singkat', indicator: 'Coherence', category: 'style', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 2 },
  { id: 'CC4', text: 'AI membatasi informasi yang tidak relevan', indicator: 'Coherence', category: 'style', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 6 },
  { id: 'CC5', text: 'AI menjaga alur penjelasan tetap runtut dari awal sampai akhir', indicator: 'Coherence', category: 'style', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 7 },
  { id: 'CP1', text: 'AI menjawab seluruh poin penting dalam pertanyaan', indicator: 'Completeness', category: 'coverage', sourceLiterature: true, sourceInternal: true, sourceUserVoice: false, freqLiterature: 5 },
  { id: 'CP2', text: 'AI memberikan langkah atau rekomendasi yang bisa dipraktikkan', indicator: 'Completeness', category: 'coverage', sourceLiterature: false, sourceInternal: false, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'CP3', text: 'AI menambahkan konteks tambahan yang relevan jika diperlukan', indicator: 'Completeness', category: 'coverage', sourceLiterature: true, sourceInternal: false, sourceUserVoice: true, freqLiterature: 5 },
  { id: 'CP4', text: 'AI memberikan alternatif solusi ketika memungkinkan', indicator: 'Completeness', category: 'coverage', sourceLiterature: true, sourceInternal: false, sourceUserVoice: true, freqLiterature: 5 },
  { id: 'CP5', text: 'AI menyertakan risiko atau catatan penting terkait rekomendasi', indicator: 'Completeness', category: 'coverage', sourceLiterature: true, sourceInternal: false, sourceUserVoice: true, freqLiterature: 5 },
  { id: 'T1', text: 'Nada jawaban AI profesional dan sopan', indicator: 'Appropriateness', category: 'tone', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 7 },
  { id: 'T2', text: 'AI menghargai nilai dan budaya perusahaan Astra', indicator: 'Appropriateness', category: 'tone', sourceLiterature: false, sourceInternal: false, sourceUserVoice: true, freqLiterature: 2 },
  { id: 'T3', text: 'AI menghindari konten yang sensitif atau ofensif', indicator: 'Appropriateness', category: 'tone', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 4 },
  { id: 'T4', text: 'AI memberikan respon yang suportif dan tidak menyalahkan', indicator: 'Appropriateness', category: 'tone', sourceLiterature: true, sourceInternal: true, sourceUserVoice: false, freqLiterature: 3 },
  { id: 'T5', text: 'AI menyesuaikan gaya bahasa dengan audiens internal Astra', indicator: 'Appropriateness', category: 'tone', sourceLiterature: false, sourceInternal: false, sourceUserVoice: false, freqLiterature: 0 },
  { id: 'RT1', text: 'Waktu respon AI tergolong cepat', indicator: 'Response Time', category: 'performance', sourceLiterature: true, sourceInternal: true, sourceUserVoice: false, freqLiterature: 5 },
  { id: 'RT2', text: 'Waktu respon AI stabil dan tidak sering mengalami keterlambatan', indicator: 'Response Time', category: 'performance', sourceLiterature: false, sourceInternal: false, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'RT3', text: 'Pengguna dapat mengatur panjang atau detail jawaban AI', indicator: 'Response Time', category: 'usability', sourceLiterature: false, sourceInternal: true, sourceUserVoice: true, freqLiterature: 0 },
  { id: 'RT4', text: 'Pengguna dapat mengoreksi atau mengarahkan ulang jawaban AI dengan mudah', indicator: 'Response Time', category: 'usability', sourceLiterature: true, sourceInternal: false, sourceUserVoice: true, freqLiterature: 7 },
  { id: 'RT5', text: 'AI dapat menangani beberapa pertanyaan berurutan tanpa penurunan kualitas', indicator: 'Response Time', category: 'usability', sourceLiterature: true, sourceInternal: true, sourceUserVoice: true, freqLiterature: 2 }
];

export const TOUR_STEPS: TourStep[] = [
  {
    target: '.tour-welcome',
    title: 'Selamat Datang di GenAI DSS! 🎉',
    content: 'Decision Support System untuk membantu Anda menentukan GenAI yang tepat untuk kebutuhan e-learning perusahaan.',
    placement: 'center'
  },
  {
    target: '.tour-background',
    title: 'Latar Belakang 📊',
    content: 'Transformasi digital adalah tantangan besar. Hanya ~30% perusahaan yang berhasil, dan biaya R&D bisa mencapai 20% dari pengeluaran.',
    placement: 'bottom'
  },
  {
    target: '.tour-methodology',
    title: 'Metodologi Data Mining 🔬',
    content: 'Kami menggunakan pendekatan data mining untuk mengidentifikasi indikator evaluasi dari berbagai jurnal ilmiah.',
    placement: 'bottom'
  },
  {
    target: '.tour-indicators',
    title: '7 Indikator Utama 📋',
    content: 'Indikator dikelompokkan menjadi 7 kategori: Accuracy, Relevance, Clarity, Coherence, Completeness, Appropriateness, dan Response Time.',
    placement: 'right'
  },
  {
    target: '.tour-weights',
    title: 'Bobot Department 🎯',
    content: 'Setiap department memiliki prioritas berbeda. Bobot dapat disesuaikan berdasarkan kebutuhan spesifik.',
    placement: 'left'
  },
  {
    target: '.tour-comparison',
    title: 'Perbandingan GenAI 🤖',
    content: 'Bandingkan ChatGPT, Perplexity, Gemini, dan DeepSeek berdasarkan 7 indikator dengan skala 1-5.',
    placement: 'bottom'
  },
  {
    target: '.tour-results',
    title: 'Hasil & Rekomendasi 🏆',
    content: 'Lihat ranking final dan rekomendasi GenAI terbaik untuk kebutuhan Anda!',
    placement: 'top'
  }
];
