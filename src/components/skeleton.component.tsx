import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
}) => {
  const normalizedWidth = responsiveHorizontalScale(width);
  const normalizedHeight = responsiveVerticalScale(height);
  return (
    <ContentLoader
      width={normalizedWidth}
      height={normalizedHeight}
      viewBox={`0 0 ${normalizedWidth} ${normalizedHeight}`}
      backgroundColor="#eee"
      foregroundColor="#d9d9d9">
      <Rect
        x={0}
        y={0}
        rx={borderRadius}
        ry={borderRadius}
        width="100%"
        height="100%"
      />
    </ContentLoader>
  );
};
