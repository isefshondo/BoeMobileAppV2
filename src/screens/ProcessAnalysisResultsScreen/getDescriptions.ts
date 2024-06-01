import {colors} from '@/themes/colors/index.themes';

export function getDescriptions(chancePercentage: number) {
  switch (true) {
    case chancePercentage >= 10 && chancePercentage <= 39:
      return {
        illnessPhase:
          'leve: As lesões são geralmente pequenas e localizadas, afetando áreas limitadas da pele do animal. Embora possam causar desconforto, não representam um risco significativo à saúde geral do animal.',
        futureComplications:
          ' O animal pode sentir um leve desconforto ou coceira, mas geralmente não há complicações graves. A recuperação tende a ser rápida e sem impactos duradouros na saúde ou produtividade do animal.',
        backgroundColor: colors.LIGHT_GREEN,
        infectionLevel: 'Nível baixo de infecção',
      };
    case chancePercentage >= 40 && chancePercentage <= 79:
      return {
        illnessPhase:
          'moderada: As lesões são mais numerosas e podem cobrir áreas maiores da pele. Isso pode causar um nível moderado de dor e desconforto, exigindo atenção para evitar o agravamento.',
        futureComplications:
          ' O animal pode sofrer com dor e coceira moderada, o que pode afetar seu apetite e comportamento. Sem tratamento adequado, há risco de infecções secundárias e uma recuperação mais prolongada.',
        backgroundColor: colors.YELLOW,
        infectionLevel: 'Nível moderado de infecção',
      };
    case chancePercentage >= 80:
      return {
        illnessPhase:
          'grave: As lesões podem ser extensas, afetando áreas significativas da pele do animal. Isso pode levar a complicações, como infecções secundárias, dor, desconforto e até mesmo problemas de saúde mais graves.',
        futureComplications:
          ' O animal pode sentir dor, coceira intensa e desconforto, afetando seu bem-estar, pode haver perda de peso, queda na produção de leite e comprometimento do sistema imunológico, tornando o animal mais suscetível a outras doenças.',
        backgroundColor: colors.LIGHT_RED,
        infectionLevel: 'Nível grave de infecção',
      };
  }
}
