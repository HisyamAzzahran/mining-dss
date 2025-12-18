import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Slider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import gsap from 'gsap';
import { DEFAULT_INDICATORS, DEPARTMENTS, Indicator } from '../types';

interface WeightConfigurationProps {
  onNext: (weights: Record<string, number>) => void;
  onBack: () => void;
}

export const WeightConfiguration: React.FC<WeightConfigurationProps> = ({ onNext, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('hcd');
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    // Initialize weights from selected department
    const dept = DEPARTMENTS.find(d => d.id === selectedDepartment);
    if (dept) {
      setWeights(dept.weights);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.section-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo('.dept-selector',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo('.weight-card',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.4, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.summary-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const isValidTotal = Math.abs(totalWeight - 1) < 0.01;

  const handleWeightChange = (indicatorId: string, value: number) => {
    setWeights(prev => ({
      ...prev,
      [indicatorId]: value
    }));
    setIsCustom(true);
  };

  const handleDepartmentChange = (deptId: string) => {
    setSelectedDepartment(deptId);
    setIsCustom(false);
  };

  const handleReset = () => {
    const dept = DEPARTMENTS.find(d => d.id === selectedDepartment);
    if (dept) {
      setWeights(dept.weights);
      setIsCustom(false);
    }
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

  const currentDept = DEPARTMENTS.find(d => d.id === selectedDepartment);

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
            label="Step 2: Weight Configuration"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(34, 211, 238, 0.2)',
              color: '#67e8f9',
              border: '1px solid rgba(34, 211, 238, 0.3)',
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
            Konfigurasi Bobot Indikator ⚖️
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Setiap department memiliki prioritas yang berbeda. Sesuaikan bobot indikator 
            berdasarkan kebutuhan spesifik department Anda.
          </Typography>
        </Box>

        {/* Department Selector */}
        <Card
          className="dept-selector"
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Pilih Department
                  </InputLabel>
                  <Select
                    value={selectedDepartment}
                    label="Pilih Department"
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    sx={{
                      color: 'white',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6366f1',
                      },
                      '.MuiSvgIcon-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                  >
                    {DEPARTMENTS.map(dept => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {currentDept?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {currentDept?.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  {isCustom && (
                    <Chip
                      label="Customized"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        color: '#f59e0b',
                      }}
                    />
                  )}
                  <Tooltip title="Reset ke default department">
                    <IconButton onClick={handleReset} sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      <RestartAltIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Weight Sliders */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {DEFAULT_INDICATORS.map((indicator) => {
            const color = indicatorColors[indicator.id];
            const emoji = indicatorEmojis[indicator.id];
            const weight = weights[indicator.id] || 0;

            return (
              <Grid item xs={12} md={6} key={indicator.id}>
                <Card
                  className="weight-card"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: `1px solid ${color}`,
                      background: `${color}10`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>{emoji}</Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                          {indicator.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {indicator.nameId}
                        </Typography>
                      </Box>
                      <Chip
                        label={indicator.type}
                        size="small"
                        sx={{
                          backgroundColor: indicator.type === 'Benefit' 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : 'rgba(239, 68, 68, 0.2)',
                          color: indicator.type === 'Benefit' ? '#10b981' : '#ef4444',
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Slider
                        value={weight}
                        onChange={(_, value) => handleWeightChange(indicator.id, value as number)}
                        min={0}
                        max={0.5}
                        step={0.05}
                        sx={{
                          flex: 1,
                          color: color,
                          '& .MuiSlider-thumb': {
                            backgroundColor: color,
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: `0 0 0 8px ${color}30`,
                            },
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: color,
                          },
                          '& .MuiSlider-rail': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          minWidth: 70,
                          textAlign: 'center',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: `${color}20`,
                          border: `1px solid ${color}`,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: color,
                          }}
                        >
                          {(weight * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {indicator.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Total Weight Summary */}
        <Card
          className="summary-card"
          sx={{
            mb: 4,
            background: isValidTotal 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
            border: `1px solid ${isValidTotal ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Total Bobot
                  </Typography>
                  <Chip
                    label={isValidTotal ? '✓ Valid' : '⚠ Harus = 100%'}
                    size="small"
                    sx={{
                      backgroundColor: isValidTotal 
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(239, 68, 68, 0.3)',
                      color: isValidTotal ? '#10b981' : '#ef4444',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(totalWeight * 100, 100)}
                      sx={{
                        height: 12,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: isValidTotal ? '#10b981' : totalWeight > 1 ? '#ef4444' : '#f59e0b',
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: isValidTotal ? '#10b981' : totalWeight > 1 ? '#ef4444' : '#f59e0b',
                      minWidth: 100,
                      textAlign: 'right',
                    }}
                  >
                    {(totalWeight * 100).toFixed(0)}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end' }}>
                  {DEFAULT_INDICATORS.map(indicator => (
                    <Chip
                      key={indicator.id}
                      label={`${indicatorEmojis[indicator.id]} ${((weights[indicator.id] || 0) * 100).toFixed(0)}%`}
                      size="small"
                      sx={{
                        backgroundColor: `${indicatorColors[indicator.id]}20`,
                        color: indicatorColors[indicator.id],
                        border: `1px solid ${indicatorColors[indicator.id]}40`,
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {!isValidTotal && (
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 4,
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: '#f59e0b',
              },
            }}
          >
            Total bobot harus sama dengan 100%. Saat ini: {(totalWeight * 100).toFixed(0)}%. 
            {totalWeight > 1 ? ' Kurangi beberapa bobot.' : ' Tambahkan bobot.'}
          </Alert>
        )}

        {/* Info Card */}
        <Card
          className="summary-card"
          sx={{
            mb: 4,
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <InfoIcon sx={{ color: '#6366f1', mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  Tentang Bobot untuk Human Capital Development
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                  Untuk department e-learning, <strong>Accuracy (20%)</strong> dan <strong>Response Time (20%)</strong> mendapat 
                  prioritas tertinggi karena konten pembelajaran harus akurat dan sistem harus responsif. 
                  <strong> Relevance (15%)</strong> dan <strong>Completeness (15%)</strong> penting untuk memastikan 
                  materi sesuai kebutuhan dan lengkap. Indikator lainnya mendapat porsi lebih kecil namun tetap relevan.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            onClick={() => onNext(weights)}
            disabled={!isValidTotal}
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 1.5,
              background: isValidTotal 
                ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              boxShadow: isValidTotal ? '0 10px 40px rgba(99, 102, 241, 0.4)' : 'none',
              '&:hover': {
                background: isValidTotal 
                  ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Lanjut ke Penilaian GenAI
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WeightConfiguration;
