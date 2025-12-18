import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gsap from 'gsap';

interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon?: string;
}

interface OnboardingTourProps {
  steps: TourStep[];
  onComplete: () => void;
  isOpen: boolean;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, onComplete, isOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Animate entrance
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !tooltipRef.current) return;

    const step = steps[currentStep];
    const targetElement = step.target === '.tour-welcome' 
      ? null 
      : document.querySelector(step.target);

    // Animate tooltip
    gsap.fromTo(tooltipRef.current,
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );

    // Position spotlight and tooltip
    if (targetElement && step.placement !== 'center') {
      const rect = targetElement.getBoundingClientRect();
      
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: rect.left - 10,
          y: rect.top - 10,
          width: rect.width + 20,
          height: rect.height + 20,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    } else if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 100,
        width: 300,
        height: 200,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [currentStep, isOpen, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      gsap.to(tooltipRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentStep(prev => prev + 1);
        }
      });
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      gsap.to(tooltipRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentStep(prev => prev - 1);
        }
      });
    }
  };

  const handleComplete = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          onComplete();
          setCurrentStep(0);
        }
      });
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Box
      ref={overlayRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Spotlight effect */}
      <Box
        ref={spotlightRef}
        sx={{
          position: 'absolute',
          borderRadius: '16px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85)',
          pointerEvents: 'none',
        }}
      />

      {/* Tooltip/Modal */}
      <Paper
        ref={tooltipRef}
        elevation={24}
        sx={{
          position: 'relative',
          maxWidth: 500,
          width: '90%',
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
            },
          }}
        />

        {/* Close button */}
        <IconButton
          onClick={handleComplete}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Step indicator */}
        <Typography
          variant="caption"
          sx={{
            color: '#6366f1',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Step {currentStep + 1} of {steps.length}
        </Typography>

        {/* Icon/Emoji */}
        <Typography
          sx={{
            fontSize: '3rem',
            my: 2,
            textAlign: 'center',
          }}
        >
          {step.icon || ['🚀', '📊', '🔬', '📋', '🎯', '🤖', '🏆'][currentStep] || '✨'}
        </Typography>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'white',
            mb: 2,
            textAlign: 'center',
          }}
        >
          {step.title}
        </Typography>

        {/* Content */}
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          {step.content}
        </Typography>

        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Sebelumnya
          </Button>

          {/* Dots indicator */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {steps.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === currentStep 
                    ? '#6366f1' 
                    : index < currentStep 
                    ? '#22d3ee' 
                    : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>

          <Button
            onClick={handleNext}
            variant="contained"
            endIcon={currentStep === steps.length - 1 ? null : <ArrowForwardIcon />}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
              },
            }}
          >
            {currentStep === steps.length - 1 ? 'Mulai! 🎉' : 'Selanjutnya'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OnboardingTour;
