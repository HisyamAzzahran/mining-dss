import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import gsap from 'gsap';
import { RAW_ATTRIBUTES, DEFAULT_INDICATORS } from '../types';

interface IndicatorAnalysisProps {
  onNext: () => void;
}

export const IndicatorAnalysis: React.FC<IndicatorAnalysisProps> = ({ onNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndicator, setExpandedIndicator] = useState<string | false>('accuracy');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.section-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo('.methodology-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo('.indicator-accordion',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const getAttributesByIndicator = (indicatorId: string) => {
    const indicatorMap: Record<string, string[]> = {
      accuracy: ['Accuracy'],
      relevance: ['Relevance'],
      clarity: ['Clarity'],
      coherence: ['Coherence', 'Conciseness_Coherence'],
      completeness: ['Completeness'],
      appropriateness: ['Appropriateness', 'Tone_Appropriateness'],
      responseTime: ['Response Time', 'Responsiveness']
    };
    const indicatorNames = indicatorMap[indicatorId] || [];
    return RAW_ATTRIBUTES.filter(attr => 
      indicatorNames.some(name => attr.indicator === name)
    );
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
            label="Step 1: Data Mining Process"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
              border: '1px solid rgba(99, 102, 241, 0.3)',
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
            Analisis Indikator dari Jurnal 📚
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Indikator evaluasi GenAI diekstrak dari berbagai sumber: jurnal ilmiah, 
            dokumen internal perusahaan, dan feedback pengguna. Total {RAW_ATTRIBUTES.length} atribut 
            dikelompokkan menjadi 7 indikator utama.
          </Typography>
        </Box>

        {/* Data Sources */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              className="methodology-card"
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <ArticleIcon sx={{ fontSize: 48, color: '#6366f1', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  Literature Review
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                  Atribut dari puluhan jurnal ilmiah tentang evaluasi AI dan NLP
                </Typography>
                <Chip
                  label={`${RAW_ATTRIBUTES.filter(a => a.sourceLiterature).length} Atribut`}
                  size="small"
                  sx={{ backgroundColor: 'rgba(99, 102, 241, 0.3)', color: '#818cf8' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              className="methodology-card"
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.05) 100%)',
                border: '1px solid rgba(34, 211, 238, 0.3)',
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <BusinessIcon sx={{ fontSize: 48, color: '#22d3ee', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  Internal Document
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                  Kebutuhan spesifik dari dokumen internal Astra International
                </Typography>
                <Chip
                  label={`${RAW_ATTRIBUTES.filter(a => a.sourceInternal).length} Atribut`}
                  size="small"
                  sx={{ backgroundColor: 'rgba(34, 211, 238, 0.3)', color: '#67e8f9' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              className="methodology-card"
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <RecordVoiceOverIcon sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                  User Voice
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                  Feedback dan kebutuhan langsung dari calon pengguna
                </Typography>
                <Chip
                  label={`${RAW_ATTRIBUTES.filter(a => a.sourceUserVoice).length} Atribut`}
                  size="small"
                  sx={{ backgroundColor: 'rgba(16, 185, 129, 0.3)', color: '#6ee7b7' }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 7 Indicators Section */}
        <Box className="section-header" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            7 Indikator Evaluasi Utama
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            Klik pada setiap indikator untuk melihat detail atributnya
          </Typography>
        </Box>

        {/* Indicators Accordion */}
        <Box sx={{ mb: 6 }}>
          {DEFAULT_INDICATORS.map((indicator) => {
            const attributes = getAttributesByIndicator(indicator.id);
            const color = indicatorColors[indicator.id];
            const emoji = indicatorEmojis[indicator.id];

            return (
              <Accordion
                key={indicator.id}
                className="indicator-accordion"
                expanded={expandedIndicator === indicator.id}
                onChange={(_, isExpanded) => setExpandedIndicator(isExpanded ? indicator.id : false)}
                sx={{
                  mb: 2,
                  background: expandedIndicator === indicator.id 
                    ? `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`
                    : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${expandedIndicator === indicator.id ? color : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                  sx={{
                    px: 3,
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Typography sx={{ fontSize: '2rem' }}>{emoji}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                          {indicator.name}
                        </Typography>
                        <Chip
                          label={`${(indicator.weight * 100).toFixed(0)}%`}
                          size="small"
                          sx={{
                            backgroundColor: `${color}30`,
                            color: color,
                            fontWeight: 600,
                          }}
                        />
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
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 0.5 }}>
                        {indicator.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${attributes.length} Atribut`}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <TableContainer
                    component={Paper}
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: 2,
                    }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>ID</TableCell>
                          <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Atribut</TableCell>
                          <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Kategori</TableCell>
                          <TableCell align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Sumber</TableCell>
                          <TableCell align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Freq.</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {attributes.map((attr) => (
                          <TableRow key={attr.id} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}>
                            <TableCell sx={{ color: color, fontWeight: 600 }}>{attr.id}</TableCell>
                            <TableCell sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{attr.text}</TableCell>
                            <TableCell>
                              <Chip
                                label={attr.category}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  fontSize: '0.7rem',
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                <Tooltip title="Literature">
                                  <Chip
                                    label="L"
                                    size="small"
                                    sx={{
                                      minWidth: 24,
                                      height: 24,
                                      backgroundColor: attr.sourceLiterature 
                                        ? 'rgba(99, 102, 241, 0.3)' 
                                        : 'rgba(255, 255, 255, 0.05)',
                                      color: attr.sourceLiterature ? '#818cf8' : 'rgba(255, 255, 255, 0.3)',
                                      fontSize: '0.7rem',
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title="Internal Doc">
                                  <Chip
                                    label="I"
                                    size="small"
                                    sx={{
                                      minWidth: 24,
                                      height: 24,
                                      backgroundColor: attr.sourceInternal 
                                        ? 'rgba(34, 211, 238, 0.3)' 
                                        : 'rgba(255, 255, 255, 0.05)',
                                      color: attr.sourceInternal ? '#67e8f9' : 'rgba(255, 255, 255, 0.3)',
                                      fontSize: '0.7rem',
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title="User Voice">
                                  <Chip
                                    label="U"
                                    size="small"
                                    sx={{
                                      minWidth: 24,
                                      height: 24,
                                      backgroundColor: attr.sourceUserVoice 
                                        ? 'rgba(16, 185, 129, 0.3)' 
                                        : 'rgba(255, 255, 255, 0.05)',
                                      color: attr.sourceUserVoice ? '#6ee7b7' : 'rgba(255, 255, 255, 0.3)',
                                      fontSize: '0.7rem',
                                    }}
                                  />
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={attr.freqLiterature}
                                size="small"
                                sx={{
                                  minWidth: 32,
                                  backgroundColor: attr.freqLiterature > 5 
                                    ? 'rgba(16, 185, 129, 0.3)' 
                                    : attr.freqLiterature > 0 
                                    ? 'rgba(245, 158, 11, 0.3)' 
                                    : 'rgba(255, 255, 255, 0.05)',
                                  color: attr.freqLiterature > 5 
                                    ? '#10b981' 
                                    : attr.freqLiterature > 0 
                                    ? '#f59e0b' 
                                    : 'rgba(255, 255, 255, 0.4)',
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* Summary Stats */}
        <Card
          className="methodology-card"
          sx={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 3 }}>
              📊 Ringkasan Data Mining
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#6366f1' }}>
                    {RAW_ATTRIBUTES.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Total Atribut
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#22d3ee' }}>
                    7
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Indikator Utama
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#10b981' }}>
                    3
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Sumber Data
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                    {RAW_ATTRIBUTES.filter(a => a.sourceLiterature && a.sourceInternal && a.sourceUserVoice).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Validasi 3 Sumber
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Next Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={onNext}
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
              },
            }}
          >
            Lanjut ke Konfigurasi Bobot
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default IndicatorAnalysis;
