import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import gsap from 'gsap';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.hero-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      
      gsap.fromTo('.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo('.hero-badge',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.4, ease: 'back.out(1.7)' }
      );

      gsap.fromTo('.hero-button',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );

      // Stats animation
      gsap.fromTo('.stat-item',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.8,
          ease: 'power3.out' 
        }
      );

      // Cards animation
      gsap.fromTo('.feature-card',
        { y: 80, opacity: 0, rotateX: -15 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 0.8, 
          stagger: 0.2, 
          delay: 1.2,
          ease: 'power3.out' 
        }
      );

      // Floating animation for decorative elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '30%', label: 'Tingkat Keberhasilan Transformasi Digital', icon: <TrendingUpIcon /> },
    { value: '20%', label: 'Rata-rata Budget R&D untuk Digital', icon: <AnalyticsIcon /> },
    { value: '7', label: 'Indikator Evaluasi Kunci', icon: <PsychologyIcon /> },
    { value: '4', label: 'GenAI Model Dibandingkan', icon: <SchoolIcon /> },
  ];

  const features = [
    {
      icon: '📊',
      title: 'Data Mining Berbasis Jurnal',
      description: 'Indikator evaluasi diekstrak dari puluhan jurnal ilmiah terkait AI evaluation.',
      color: '#6366f1'
    },
    {
      icon: '🎯',
      title: 'Bobot Fleksibel per Department',
      description: 'Sesuaikan prioritas berdasarkan kebutuhan spesifik departemen Anda.',
      color: '#22d3ee'
    },
    {
      icon: '🤖',
      title: 'Komparasi Multi-Model',
      description: 'Bandingkan ChatGPT, Perplexity, Gemini, dan DeepSeek secara objektif.',
      color: '#10b981'
    },
    {
      icon: '📈',
      title: 'Visualisasi Interaktif',
      description: 'Lihat hasil analisis dalam bentuk chart dan ranking yang mudah dipahami.',
      color: '#f59e0b'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #0f0f23 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          top: '-100px',
          right: '-100px',
          pointerEvents: 'none',
        }}
      />
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
          bottom: '100px',
          left: '-50px',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Section */}
      <Container maxWidth="lg" ref={heroRef}>
        <Box
          sx={{
            pt: { xs: 8, md: 12 },
            pb: 6,
            textAlign: 'center',
          }}
        >
          <Chip
            className="hero-badge"
            label="🏢 PT Astra International • Human Capital Development"
            sx={{
              mb: 3,
              px: 2,
              py: 2.5,
              fontSize: '0.9rem',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />

          <Typography
            className="hero-title"
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #818cf8 50%, #22d3ee 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            GenAI Decision
            <br />
            Support System
          </Typography>

          <Typography
            className="hero-subtitle"
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 700,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Sistem pendukung keputusan berbasis data mining untuk membantu 
            menentukan Generative AI yang tepat untuk implementasi e-learning perusahaan
          </Typography>

          <Box className="hero-button">
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 50px rgba(99, 102, 241, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Mulai Analisis
            </Button>
          </Box>
        </Box>

        {/* Stats Section */}
        <Box ref={statsRef} sx={{ py: 6 }}>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  className="stat-item"
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: '#6366f1',
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Background Problem Section */}
        <Box sx={{ py: 6 }}>
          <Card
            className="stat-item"
            sx={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              mb: 4,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#ef4444', mb: 2 }}>
                ⚠️ Tantangan Transformasi Digital
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                Di era digital saat ini, banyak perusahaan berlomba melakukan transformasi digital. 
                Namun kenyataannya, <strong>hanya sekitar 30% perusahaan yang berhasil</strong> dalam 
                transformasi ini. Biaya R&D untuk transformasi digital juga sangat tinggi, 
                <strong> mencapai ~20% dari total pengeluaran</strong>. Oleh karena itu, diperlukan 
                pendekatan yang terukur dan berbasis data untuk memastikan investasi teknologi yang tepat.
              </Typography>
            </CardContent>
          </Card>

          <Card
            className="stat-item"
            sx={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981', mb: 2 }}>
                ✅ Solusi: Best Practice R&D dengan DSS
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                Project ini mendemonstrasikan <strong>best practice</strong> untuk tim R&D dalam 
                menentukan GenAI yang tepat. Melalui pendekatan <strong>data mining</strong>, 
                kami mengekstrak indikator evaluasi dari berbagai jurnal ilmiah, mengelompokkannya 
                ke dalam 7 kategori utama, dan membuat sistem yang dapat disesuaikan dengan 
                kebutuhan spesifik setiap departemen.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Features Section */}
        <Box ref={cardsRef} sx={{ py: 6 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: 'white',
              mb: 5,
            }}
          >
            Fitur Utama
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  className="feature-card"
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      background: `rgba(${feature.color === '#6366f1' ? '99, 102, 241' : 
                        feature.color === '#22d3ee' ? '34, 211, 238' : 
                        feature.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.15)`,
                      border: `1px solid ${feature.color}`,
                      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'white',
                        mb: 1.5,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box ref={ctaRef} sx={{ py: 8, textAlign: 'center' }}>
          <Typography
            variant="h4"
            className="stat-item"
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            Siap untuk Memulai?
          </Typography>
          <Typography
            variant="body1"
            className="stat-item"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
            }}
          >
            Ikuti langkah-langkah simulasi untuk menemukan GenAI terbaik untuk kebutuhan Anda
          </Typography>
          <Button
            className="stat-item"
            variant="outlined"
            size="large"
            onClick={onGetStarted}
            sx={{
              px: 5,
              py: 1.5,
              borderColor: '#6366f1',
              color: '#6366f1',
              '&:hover': {
                borderColor: '#818cf8',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            Mulai Simulasi →
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
