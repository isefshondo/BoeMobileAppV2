import {Illness} from './enums/illness.enum';
import {TreatmentStatus} from './enums/status.enum';

export interface ICowInfosCard {
  numberIdentification: string;
  name: string;
  treatmentStatus?: TreatmentStatus;
  illness?: Illness;
  chancePercentage?: number;
  onPress: () => void;
}
