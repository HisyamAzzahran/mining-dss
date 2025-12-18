import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Rating,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import gsap from 'gsap';
import { DEFAULT_INDICATORS, DEFAULT_GENAI_MODELS, GenAIModel } from '../types';

interface GenAIComparisonProps {
  weights: Record<string, number>;
  onNext: (models: GenAIModel[]) => void;
  onBack: () => void;
}

export const GenAIComparison: React.FC<GenAIComparisonProps> = ({ weights, onNext, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [models, setModels] = useState<GenAIModel[]>(DEFAULT_GENAI_MODELS);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.section-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo('.model-card',
        { y: 60, opacity: 0, rotateY: -15 },
        { y: 0, opacity: 1, rotateY: 0, duration: 0.6, delay: 0.2, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo('.rating-row',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, delay: 0.6, stagger: 0.05, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleScoreChange = (modelId: string, indicatorId: string, value: number) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId
          ? { ...model, scores: { ...model.scores, [indicatorId]: value } }
          : model
      )
    );
  };

  const handleReset = (modelId: string) => {
    const defaultModel = DEFAULT_GENAI_MODELS.find(m => m.id === modelId);
    if (defaultModel) {
      setModels(prevModels =>
        prevModels.map(model =>
          model.id === modelId ? { ...model, scores: { ...defaultModel.scores } } : model
        )
      );
    }
  };

  const calculatePreviewScore = (model: GenAIModel) => {
    let score = 0;
    DEFAULT_INDICATORS.forEach(indicator => {
      const rawScore = model.scores[indicator.id] || 0;
      const weight = weights[indicator.id] || 0;
      score += rawScore * weight;
    });
    return score;
  };

  const indicatorColors: Record<string, string> = {
    accuracy: '#ef4444',
    relevance: '#f59e0b',
    clarity: '#10b981',
    coherence: '#06b6d4',
    completeness: '#6366f1',
    appropriateness: '#ec4899',
    responseTime: '#8b5cf6'
  };

  const indicatorEmojis: Record<string, string> = {
    accuracy: '🎯',
    relevance: '🔗',
    clarity: '💡',
    coherence: '🔄',
    completeness: '📦',
    appropriateness: '🤝',
    responseTime: '⚡'
  };

  const isAllScored = models.every(model =>
    DEFAULT_INDICATORS.every(indicator => model.scores[indicator.id] > 0)
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box className="section-header" sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="Step 3: GenAI Scoring"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#6ee7b7',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            Penilaian GenAI Models 🤖
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Berikan penilaian untuk setiap model GenAI berdasarkan 7 indikator evaluasi. 
            Skala 1-5, dimana 5 adalah nilai terbaik.
          </Typography>
        </Box>

        {/* Tabs for Mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.5)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#6366f1',
              },
            }}
          >
            {models.map((model, index) => (
              <Tab key={model.id} label={`${model.logo} ${model.name}`} />
            ))}
          </Tabs>
        </Box>

        {/* Model Cards - Desktop Grid */}
        <Grid container spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {models.map((model) => (
            <Grid item xs={12} md={6} lg={3} key={model.id}>
              <Card
                className="model-card"
                sx={{
                  height: '100%',
                  background: `linear-gradient(135deg, ${model.color}15 0%, ${model.color}05 100%)`,
                  border: `1px solid ${model.color}40`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 20px 40px ${model.color}20`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Model Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '2rem' }}>{model.logo}</Typography>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                          {model.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Preview: {calculatePreviewScore(model).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Tooltip title="Reset to default">
                      <IconButton
                        onClick={() => handleReset(model.id)}
                        size="small"
                        sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
                      >
                        <RestartAltIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Indicator Ratings */}
                  {DEFAULT_INDICATORS.map((indicator) => {
                    const score = model.scores[indicator.id] || 0;
                    const color = indicatorColors[indicator.id];
                    const emoji = indicatorEmojis[indicator.id];

                    return (
                      <Box
                        key={indicator.id}
                        className="rating-row"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 1.5,
                          px: 1.5,
                          mb: 1,
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: `${color}10`,
                          },
                        }}
                      >
                        <Tooltip title={indicator.description}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'help' }}>
                            <Typography sx={{ fontSize: '1rem' }}>{emoji}</Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: 500,
                              }}
                            >
                              {indicator.name}
                            </Typography>
                          </Box>
                        </Tooltip>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={score}
                            onChange={(_, value) => handleScoreChange(model.id, indicator.id, value || 0)}
                            size="small"
                            sx={{
                              '& .MuiRating-iconFilled': {
                                color: color,
                              },
                              '& .MuiRating-iconEmpty': {
                                color: 'rgba(255, 255, 255, 0.2)',
                              },
                            }}
                          />
                          <Chip
                            label={score}
                            size="small"
                            sx={{
                              minWidth: 32,
                              height: 24,
                              backgroundColor: `${color}30`,
                              color: color,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}

                  {/* Model Description */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 2,
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontStyle: 'italic',
                    }}
                  >
                    {model.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mobile View - Single Card */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {models.map((model, index) => (
            <Box
              key={model.id}
              sx={{ display: activeTab === index ? 'block' : 'none' }}
            >
              <Card
                sx={{
                  background: `linear-gradient(135deg, ${model.color}15 0%, ${model.color}05 100%)`,
                  border: `1px solid ${model.color}40`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '2.5rem' }}>{model.logo}</Typography>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                          {model.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Preview Score: {calculatePreviewScore(model).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => handleReset(model.id)}
                      sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      <RestartAltIcon />
                    </IconButton>
                  </Box>

                  {DEFAULT_INDICATORS.map((indicator) => {
                    const score = model.scores[indicator.id] || 0;
                    const color = indicatorColors[indicator.id];
                    const emoji = indicatorEmojis[indicator.id];

                    return (
                      <Box
                        key={indicator.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 2,
                          px: 2,
                          mb: 1.5,
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Typography sx={{ fontSize: '1.2rem' }}>{emoji}</Typography>
                          <Box>
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                              {indicator.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                              Bobot: {((weights[indicator.id] || 0) * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={score}
                            onChange={(_, value) => handleScoreChange(model.id, indicator.id, value || 0)}
                            sx={{
                              '& .MuiRating-iconFilled': { color: color },
                              '& .MuiRating-iconEmpty': { color: 'rgba(255, 255, 255, 0.2)' },
                            }}
                          />
                          <Chip
                            label={score}
                            sx={{
                              minWidth: 36,
                              backgroundColor: `${color}30`,
                              color: color,
                              fontWeight: 700,
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontStyle: 'italic',
                    }}
                  >
                    {model.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Score Legend */}
        <Card
          sx={{
            mt: 4,
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white', mb: 2 }}>
              📊 Panduan Penilaian (Skala 1-5)
            </Typography>
            <Grid container spacing={2}>
              {[
                { score: 1, label: 'Sangat Kurang', desc: 'Tidak memenuhi kriteria sama sekali', color: '#ef4444' },
                { score: 2, label: 'Kurang', desc: 'Memenuhi sebagian kecil kriteria', color: '#f59e0b' },
                { score: 3, label: 'Cukup', desc: 'Memenuhi kriteria dasar', color: '#eab308' },
                { score: 4, label: 'Baik', desc: 'Memenuhi sebagian besar kriteria', color: '#22c55e' },
                { score: 5, label: 'Sangat Baik', desc: 'Memenuhi semua kriteria dengan excellent', color: '#10b981' },
              ].map(item => (
                <Grid item xs={12} sm={6} md={2.4} key={item.score}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: `${item.color}10`,
                      border: `1px solid ${item.color}30`,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 700, color: item.color }}>
                      {item.score}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Preview Scores */}
        <Card
          sx={{
            mt: 3,
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white', mb: 2 }}>
              🏆 Preview Ranking (berdasarkan bobot saat ini)
            </Typography>
            <Grid container spacing={2}>
              {[...models]
                .sort((a, b) => calculatePreviewScore(b) - calculatePreviewScore(a))
                .map((model, index) => {
                  const score = calculatePreviewScore(model);
                  const maxScore = 5; // Maximum possible score
                  const percentage = (score / maxScore) * 100;

                  return (
                    <Grid item xs={6} md={3} key={model.id}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: index === 0 
                            ? 'rgba(245, 158, 11, 0.15)' 
                            : 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${index === 0 ? 'rgba(245, 158, 11, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                          textAlign: 'center',
                          position: 'relative',
                        }}
                      >
                        {index === 0 && (
                          <Typography
                            sx={{
                              position: 'absolute',
                              top: -10,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              fontSize: '1.2rem',
                            }}
                          >
                            👑
                          </Typography>
                        )}
                        <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>{model.logo}</Typography>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                          {model.name}
                        </Typography>
                        <Typography variant="h5" sx={{ color: model.color, fontWeight: 700 }}>
                          {score.toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          #{index + 1} • {percentage.toFixed(0)}%
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </CardContent>
        </Card>

        {!isAllScored && (
          <Alert
            severity="info"
            sx={{
              mt: 3,
              backgroundColor: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#22d3ee',
              },
            }}
          >
            Pastikan semua model dan indikator sudah dinilai sebelum melanjutkan ke hasil akhir.
          </Alert>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Kembali
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={() => onNext(models)}
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 1.5,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
              },
            }}
          >
            Lihat Hasil Akhir
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default GenAIComparison;
