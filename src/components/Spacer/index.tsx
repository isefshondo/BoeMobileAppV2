import React from 'react';
import {View} from 'react-native';

/** What is a Spacer in my vision? It is a rectangle that adjusts its size when needed */

interface SpacerProps {
  spaceOrientation: 'column' | 'row';
  spaceSize: {
    primarySpaceSize: number;
    secondarySpaceSize?: number;
  };
}

export const Spacer: React.FC<SpacerProps> = ({
  spaceOrientation,
  spaceSize,
}: SpacerProps) => {
  return spaceOrientation === 'column' ? (
    <View
      style={{
        width: spaceSize.primarySpaceSize,
        height: spaceSize.secondarySpaceSize ?? '100%',
      }}
    />
  ) : (
    <View
      style={{
        width: spaceSize.secondarySpaceSize ?? '100%',
        height: spaceSize.primarySpaceSize,
      }}
    />
  );
};
