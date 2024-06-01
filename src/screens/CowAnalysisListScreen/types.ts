import {Illness} from '@/components/CowInfosCard/enums/illness.enum';
import {TreatmentStatus} from '@/components/CowInfosCard/enums/status.enum';

interface IListingCowsData {
  id: number;
  numberIdentification: string;
  name: string;
  treatmentStatus: TreatmentStatus;
  illness: Illness;
  chancePercentage: number;
}

export type CowAnalysisListDataTypes = ReadonlyArray<IListingCowsData>;
