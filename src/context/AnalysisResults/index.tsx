import React from 'react';
import {
  AnalysisResultsContextProps,
  AnalysisResultsProviderProps,
  AnalysisResultsTypes,
} from './types';

const AnalysisResultsContext =
  React.createContext<AnalysisResultsContextProps | null>(null);

const AnalysisResultsProvider: React.FC<AnalysisResultsProviderProps> = ({
  children,
}) => {
  const [analyticsResults, setAnalyticsResults] =
    React.useState<AnalysisResultsTypes>({
      illness: null,
      illnessChancePercentage: null,
      illnessPhaseDescription: null,
      illnessComplications: null,
    });

  return (
    <AnalysisResultsContext.Provider
      value={{
        analysisResults: analyticsResults,
        setAnalysisResults: setAnalyticsResults,
      }}>
      {children}
    </AnalysisResultsContext.Provider>
  );
};

export {AnalysisResultsContext, AnalysisResultsProvider};
