import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export interface LineGraphics {
  labels: any[];
  datasets: any[];
}

export const LineGraphics: React.FC<LineGraphics> = ({labels, datasets}) => {
  const graphicsWidth =
    Dimensions.get('window').width - responsiveHorizontalScale(63);
  return (
    <LineChart
      data={{
        labels,
        datasets: [
          {
            data: datasets[0].data,
            color: () => `rgb(3, 171, 50)`,
          },
          {
            data: datasets[1].data,
            color: () => `rgb(255, 6, 6)`,
          },
        ],
      }}
      width={responsiveHorizontalScale(graphicsWidth)}
      height={responsiveVerticalScale(259)}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        propsForLabels: {fontWeight: '600'},
        propsForDots: {r: 0},
        labelColor: () => 'rgb(0,0,0)',
        color: () => 'rgb(255,255,255)',
      }}
      bezier
      style={{borderRadius: 20}}
    />
  );
};
