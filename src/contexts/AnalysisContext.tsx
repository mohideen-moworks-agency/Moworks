import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { generateAnalysis } from '../lib/perplexity';
import { checkRateLimit, recordAnalysis } from '../lib/analysis';

type Analysis = {
  region: string;
  industry: string;
  companySize: string;
  department: string;
};

type AnalysisResults = {
  problems: any[];
  tools: any[];
  solutions: any[];
  benefits: any[];
  summary: {
    costImpact: string;
    quickWins: string[];
    strategicRecommendations: string[];
  };
};

type AnalysisContextType = {
  performAnalysis: (data: Analysis) => Promise<void>;
  results: AnalysisResults | null;
  loading: boolean;
  error: string | null;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const performAnalysis = async (data: Analysis) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      // Check rate limit
      const canProceed = await checkRateLimit(user.id);
      if (!canProceed) {
        throw new Error('Daily analysis limit reached');
      }

      // Generate analysis
      const analysisResults = await generateAnalysis(data);
      
      // Record the analysis
      await recordAnalysis(user.id, {
        input: data,
        results: analysisResults,
      });

      setResults(analysisResults);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error instanceof Error ? error.message : 'Analysis failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider value={{ performAnalysis, results, loading, error }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}