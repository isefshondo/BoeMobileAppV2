type TreatmentStatusTypes = 'Sem tratamento' | 'Em tratamento' | 'Tratamento concluído';
type CowIllnessTypes = 'Dermatofitose bovina' | 'Dermatofilose bovina' | 'Lumpy Skin';

export interface CowInfosCardProps {
    cowNIdentification: string;
    cowName: string;
    statusTreatment: TreatmentStatusTypes;
    cowIllness: CowIllnessTypes;
    illnessPercentage: string;
}