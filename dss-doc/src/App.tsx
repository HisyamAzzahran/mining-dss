import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import {
  LandingPage,
  OnboardingTour,
  IndicatorAnalysis,
  WeightConfiguration,
  GenAIComparison,
  ResultsPage
} from './components';
import { TOUR_STEPS, GenAIModel, DEFAULT_INDICATORS } from './types';

type AppStep = 'landing' | 'indicators' | 'weights' | 'comparison' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [showTour, setShowTour] = useState(false);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [models, setModels] = useState<GenAIModel[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('genai-dss-visited');
    if (!visited) {
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }

    // Initialize weights with default values
    const defaultWeights: Record<string, number> = {};
    DEFAULT_INDICATORS.forEach(indicator => {
      defaultWeights[indicator.id] = indicator.weight;
    });
    setWeights(defaultWeights);
  }, []);

  const handleGetStarted = () => {
    if (isFirstVisit) {
      setShowTour(true);
    } else {
      setCurrentStep('indicators');
    }
  };

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('genai-dss-visited', 'true');
    setIsFirstVisit(false);
    setCurrentStep('indicators');
  };

  const handleWeightsNext = (newWeights: Record<string, number>) => {
    setWeights(newWeights);
    setCurrentStep('comparison');
  };

  const handleComparisonNext = (scoredModels: GenAIModel[]) => {
    setModels(scoredModels);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    // Reset to default weights
    const defaultWeights: Record<string, number> = {};
    DEFAULT_INDICATORS.forEach(indicator => {
      defaultWeights[indicator.id] = indicator.weight;
    });
    setWeights(defaultWeights);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'indicators':
        return <IndicatorAnalysis onNext={() => setCurrentStep('weights')} />;
      case 'weights':
        return (
          <WeightConfiguration
            onNext={handleWeightsNext}
            onBack={() => setCurrentStep('indicators')}
          />
        );
      case 'comparison':
        return (
          <GenAIComparison
            weights={weights}
            onNext={handleComparisonNext}
            onBack={() => setCurrentStep('weights')}
          />
        );
      case 'results':
        return (
          <ResultsPage
            weights={weights}
            models={models}
            onRestart={handleRestart}
          />
        );
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        {renderStep()}
        <OnboardingTour
          steps={TOUR_STEPS}
          isOpen={showTour}
          onComplete={handleTourComplete}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
