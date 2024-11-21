import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

interface CircularProgress {
  width: number;
  diseasePercentage: number;
  strokeWidth: number;
  color: string;
  isExpandedCard?: boolean;
}

export const CircularProgress: React.FC<CircularProgress> = ({
  width,
  diseasePercentage,
  strokeWidth,
  color,
  isExpandedCard,
}) => {
  const radius = width / 2;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (diseasePercentage / 100) * circumference;
  return (
    <View style={styles.container}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="#d9d9d9"
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <Text style={styles.diseasePercentage}>{`${Math.round(
        diseasePercentage,
      )}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseasePercentage: {
    position: 'absolute',
    fontWeight: 'bold',
  },
});
