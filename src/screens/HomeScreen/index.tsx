import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {storageInstance} from '../../utils/storage/index.utils';

export type AnalyticsDataInfo = {
  animalsCount: number | null;
  currentPositiveCasesPercentage: number | null;
  sickAnimalsCount: number | null;
  curedAnimalsCount: number | null;
  graphics: number[] | null;
};

export const HomeScreen: React.FC = () => {
  const name = storageInstance.getString('name')?.split(' ')[0];
  const [analyticsDataInfo, setAnalyticsDataInfo] =
    React.useState<AnalyticsDataInfo>({
      animalsCount: null,
      currentPositiveCasesPercentage: null,
      sickAnimalsCount: null,
      curedAnimalsCount: null,
      graphics: null,
    });
  // TODO: Change the initial value of the filter to the default selected value of the design
  const [graphicsFilter, setGraphicsFilter] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    async function fetchHomeData() {
      try {
        // TODO: Introduce the real HTTPS URL
        const res = await fetch('');
        if (!res.ok) {
          throw new Error(
            `HTTP ERROR! Status: ${res.status}; Message: ${res.statusText}`,
          );
        }
        const data = await res.json();

        setAnalyticsDataInfo({
          animalsCount: data.animals_count,
          currentPositiveCasesPercentage:
            data.current_positive_cases_percentage,
          sickAnimalsCount: data.sick_animals_count,
          curedAnimalsCount: data.cured_animals_count,
          graphics: data.graphics,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchHomeData();
  }, [graphicsFilter]);

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};
