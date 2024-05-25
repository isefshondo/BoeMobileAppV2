import {Illness} from '@/components/CowInfosCard/enums/illness.enum';

export type AnalysisResultsTypes = {
  illness: Illness | null;
  illnessChancePercentage: number | null;
  illnessPhaseDescription: string | null;
  illnessComplications: string | null;
};

export interface AnalysisResultsContextProps {
  analysisResults: AnalysisResultsTypes;
  setAnalysisResults: (analysisResults: AnalysisResultsTypes) => void;
}

export interface AnalysisResultsProviderProps {
  children: React.ReactNode;
}
