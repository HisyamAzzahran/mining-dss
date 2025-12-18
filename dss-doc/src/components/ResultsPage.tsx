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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Divider,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import gsap from 'gsap';
import { DEFAULT_INDICATORS, GenAIModel, DSSResult } from '../types';

interface ResultsPageProps {
  weights: Record<string, number>;
  models: GenAIModel[];
  onRestart: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ weights, models, onRestart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<DSSResult[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Calculate DSS results using Simple Additive Weighting (SAW)
    const calculatedResults: DSSResult[] = models.map(model => {
      let weightedScore = 0;
      const indicatorScores: Record<string, number> = {};

      DEFAULT_INDICATORS.forEach(indicator => {
        const rawScore = model.scores[indicator.id] || 0;
        const weight = weights[indicator.id] || 0;
        const normalizedScore = rawScore / 5; // Normalize to 0-1
        const weightedIndicatorScore = normalizedScore * weight;
        
        indicatorScores[indicator.id] = weightedIndicatorScore;
        weightedScore += weightedIndicatorScore;
      });

      return {
        modelId: model.id,
        modelName: model.name,
        weightedScore: weightedScore * 100, // Convert to percentage
        rank: 0,
        indicatorScores
      };
    });

    // Sort by weighted score and assign ranks
    calculatedResults.sort((a, b) => b.weightedScore - a.weightedScore);
    calculatedResults.forEach((result, index) => {
      result.rank = index + 1;
    });

    setResults(calculatedResults);
    setShowConfetti(true);
  }, [models, weights]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.section-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Winner card animation
      gsap.fromTo('.winner-card',
        { scale: 0.5, opacity: 0, rotateY: -180 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1, delay: 0.3, ease: 'back.out(1.4)' }
      );

      // Ranking cards stagger animation
      gsap.fromTo('.rank-card',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.8, stagger: 0.15, ease: 'power3.out' }
      );

      // Table animation
      gsap.fromTo('.result-table',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      );

      // Methodology card
      gsap.fromTo('.methodology-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.5, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, [results]);

  // Confetti animation
  useEffect(() => {
    if (showConfetti) {
      const confettiCount = 100;
      const container = document.querySelector('.confetti-container');
      
      if (container) {
        for (let i = 0; i < confettiCount; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${['#6366f1', '#22d3ee', '#10b981', '#f59e0b', '#ef4444', '#ec4899'][Math.floor(Math.random() * 6)]};
            left: ${Math.random() * 100}%;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
          `;
          container.appendChild(confetti);

          gsap.to(confetti, {
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 720,
            duration: Math.random() * 3 + 2,
            ease: 'power1.out',
            delay: Math.random() * 0.5,
            onComplete: () => confetti.remove()
          });
        }
      }

      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [showConfetti]);

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

  const winner = results[0];
  const winnerModel = models.find(m => m.id === winner?.modelId);

  const handleDownload = () => {
    const csvContent = [
      ['Rank', 'Model', 'Weighted Score (%)', ...DEFAULT_INDICATORS.map(i => i.name)].join(','),
      ...results.map(r => [
        r.rank,
        r.modelName,
        r.weightedScore.toFixed(2),
        ...DEFAULT_INDICATORS.map(i => ((r.indicatorScores[i.id] || 0) * 100).toFixed(2))
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'genai_dss_results.csv';
    link.click();
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti Container */}
      <Box className="confetti-container" sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />

      <Container maxWidth="lg">
        {/* Header */}
        <Box className="section-header" sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="🏆 Final Results"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '1rem',
              py: 2,
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
            Hasil Analisis DSS 📊
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Rekomendasi GenAI terbaik untuk PT Astra International berdasarkan 
            metode Simple Additive Weighting (SAW)
          </Typography>
        </Box>

        {/* Winner Card */}
        {winner && winnerModel && (
          <Card
            className="winner-card"
            sx={{
              mb: 6,
              background: `linear-gradient(135deg, ${winnerModel.color}30 0%, rgba(245, 158, 11, 0.2) 50%, ${winnerModel.color}10 100%)`,
              border: '2px solid rgba(245, 158, 11, 0.5)',
              boxShadow: '0 20px 60px rgba(245, 158, 11, 0.3)',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 60, color: '#fbbf24' }} />
            </Box>
            <CardContent sx={{ p: 5, textAlign: 'center' }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#fbbf24',
                  fontWeight: 600,
                  letterSpacing: 2,
                  fontSize: '0.9rem',
                }}
              >
                🎉 Rekomendasi Terbaik untuk E-Learning
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, my: 3 }}>
                <Typography sx={{ fontSize: '5rem' }}>{winnerModel.logo}</Typography>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${winnerModel.color} 0%, #fbbf24 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {winnerModel.name}
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 300 }}>
                    Score: <strong style={{ color: '#fbbf24' }}>{winner.weightedScore.toFixed(1)}%</strong>
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                {winnerModel.description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                {DEFAULT_INDICATORS.map(indicator => {
                  const score = (winner.indicatorScores[indicator.id] || 0) * 100;
                  return (
                    <Chip
                      key={indicator.id}
                      label={`${indicatorEmojis[indicator.id]} ${score.toFixed(1)}%`}
                      sx={{
                        backgroundColor: `${indicatorColors[indicator.id]}20`,
                        color: indicatorColors[indicator.id],
                        border: `1px solid ${indicatorColors[indicator.id]}40`,
                      }}
                    />
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Ranking Cards */}
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
          📈 Ranking Lengkap
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {results.map((result, index) => {
            const model = models.find(m => m.id === result.modelId);
            if (!model) return null;

            const rankColors = ['#fbbf24', '#94a3b8', '#cd7f32', '#6366f1'];
            const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣'];

            return (
              <Grid item xs={12} sm={6} md={3} key={result.modelId}>
                <Card
                  className="rank-card"
                  sx={{
                    height: '100%',
                    background: index === 0
                      ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.05) 100%)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${index === 0 ? 'rgba(251, 191, 36, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 15px 40px ${model.color}30`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                      {rankEmojis[index]}
                    </Typography>
                    <Typography sx={{ fontSize: '2.5rem' }}>{model.logo}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mt: 1 }}>
                      {model.name}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: rankColors[index],
                        my: 1,
                      }}
                    >
                      {result.weightedScore.toFixed(1)}%
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      {DEFAULT_INDICATORS.map(indicator => {
                        const score = (result.indicatorScores[indicator.id] || 0) * 100;
                        const maxScore = (weights[indicator.id] || 0) * 100;

                        return (
                          <Box key={indicator.id} sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                {indicatorEmojis[indicator.id]}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                {score.toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={maxScore > 0 ? (score / maxScore) * 100 : 0}
                              sx={{
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: indicatorColors[indicator.id],
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Detailed Results Table */}
        <Card
          className="result-table"
          sx={{
            mb: 4,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                📋 Detail Perhitungan SAW
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Rank</TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Model</TableCell>
                    {DEFAULT_INDICATORS.map(indicator => (
                      <TableCell key={indicator.id} align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>
                        {indicatorEmojis[indicator.id]}
                        <Typography variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {((weights[indicator.id] || 0) * 100).toFixed(0)}%
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ color: '#fbbf24', fontWeight: 700 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result) => {
                    const model = models.find(m => m.id === result.modelId);
                    if (!model) return null;

                    return (
                      <TableRow key={result.modelId} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.03)' } }}>
                        <TableCell sx={{ color: 'white', fontWeight: 700 }}>#{result.rank}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>{model.logo}</Typography>
                            <Typography sx={{ color: 'white', fontWeight: 500 }}>{model.name}</Typography>
                          </Box>
                        </TableCell>
                        {DEFAULT_INDICATORS.map(indicator => {
                          const rawScore = model.scores[indicator.id] || 0;
                          const weightedScore = ((result.indicatorScores[indicator.id] || 0) * 100);

                          return (
                            <TableCell key={indicator.id} align="center">
                              <Typography variant="body2" sx={{ color: indicatorColors[indicator.id], fontWeight: 600 }}>
                                {rawScore}/5
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                = {weightedScore.toFixed(1)}%
                              </Typography>
                            </TableCell>
                          );
                        })}
                        <TableCell align="center">
                          <Typography variant="h6" sx={{ color: '#fbbf24', fontWeight: 700 }}>
                            {result.weightedScore.toFixed(1)}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Methodology Explanation */}
        <Card
          className="methodology-card"
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
              🔬 Metodologi: Simple Additive Weighting (SAW)
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}>
                    Formula Perhitungan:
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      fontFamily: 'monospace',
                    }}
                  >
                    <Typography sx={{ color: '#22d3ee' }}>
                      V<sub>i</sub> = Σ (w<sub>j</sub> × r<sub>ij</sub>)
                    </Typography>
                    <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Di mana:
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      • V<sub>i</sub> = Nilai akhir alternatif i
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      • w<sub>j</sub> = Bobot kriteria j
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      • r<sub>ij</sub> = Rating ternormalisasi (score/max_score)
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ color: '#22d3ee', fontWeight: 600, mb: 1 }}>
                  Langkah Perhitungan:
                </Typography>
                <Box component="ol" sx={{ pl: 2, color: 'rgba(255, 255, 255, 0.7)', '& li': { mb: 1 } }}>
                  <li>Normalisasi nilai (score ÷ 5)</li>
                  <li>Kalikan dengan bobot masing-masing indikator</li>
                  <li>Jumlahkan semua nilai terbobot</li>
                  <li>Ranking berdasarkan nilai tertinggi</li>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            <Typography variant="subtitle2" sx={{ color: '#10b981', fontWeight: 600, mb: 2 }}>
              📊 Contoh Perhitungan untuk {winnerModel?.name}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {DEFAULT_INDICATORS.map(indicator => {
                const rawScore = winnerModel?.scores[indicator.id] || 0;
                const weight = weights[indicator.id] || 0;
                const normalized = rawScore / 5;
                const weighted = normalized * weight * 100;

                return (
                  <Chip
                    key={indicator.id}
                    label={`${indicatorEmojis[indicator.id]} (${rawScore}/5 × ${(weight * 100).toFixed(0)}%) = ${weighted.toFixed(1)}%`}
                    size="small"
                    sx={{
                      backgroundColor: `${indicatorColors[indicator.id]}20`,
                      color: indicatorColors[indicator.id],
                      border: `1px solid ${indicatorColors[indicator.id]}40`,
                    }}
                  />
                );
              })}
              <Chip
                label={`Total = ${winner?.weightedScore.toFixed(1)}%`}
                sx={{
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  color: '#fbbf24',
                  border: '1px solid rgba(251, 191, 36, 0.5)',
                  fontWeight: 700,
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderColor: '#22d3ee',
              color: '#22d3ee',
              '&:hover': {
                borderColor: '#67e8f9',
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
              },
            }}
          >
            Download CSV
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={onRestart}
            startIcon={<RestartAltIcon />}
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
            Mulai Ulang Simulasi
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ResultsPage;
