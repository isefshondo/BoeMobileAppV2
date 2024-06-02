import {Illness} from '@/components/CowInfosCard/enums/illness.enum';
import {TreatmentStatus} from '@/components/CowInfosCard/enums/status.enum';

export interface CowHistoricProps {
  illnessName: Illness;
  treatmentStatus: TreatmentStatus;
  chancePercentage: number;
  analysisDate: string | Date;
  analysisDescription: string;
}

export type SelectedCowHistoricTypes = ReadonlyArray<CowHistoricProps>;

export interface CowAnalysisProps {
  numberIdentification: string;
  name: string;
  selectedCowHistoric: SelectedCowHistoricTypes;
}
