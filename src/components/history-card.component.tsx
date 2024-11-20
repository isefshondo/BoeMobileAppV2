import {colors} from '@/themes/colors/index.themes';
import {
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CircularProgress} from './circular-progress.component';
import {Avatar} from './avatar.component';
import ChevronUp from '../assets/chevron-down.svg';
import ChevronDown from '../assets/toggle-card-arrow-down.svg';

type CardProps = {
  title: string;
  titleColor: string;
  expandedCardDescription: string;
  borderBottomColor: string;
  description?: string;
};

interface HistoryCard {
  diseasePercentage: number;
  isExpandedCard: boolean;
  setIsExpandedCard: any;
  analyzedImage: string;
  analysisDate: string;
}

export const HistoryCard: React.FC<HistoryCard> = ({
  diseasePercentage,
  isExpandedCard,
  setIsExpandedCard,
  analyzedImage,
  analysisDate,
}) => {
  function getCardProps(): CardProps {
    switch (true) {
      case diseasePercentage >= 10 && diseasePercentage < 40:
        return {
          title: 'Risco baixo',
          titleColor: colors.LIGHT_GREEN,
          description: 'Chance baixa de infecção.',
          expandedCardDescription:
            'Probabilidade baixa, significa que as lesões ou sintomas observados não correspondem aos sinais típicos da doença',
          borderBottomColor: colors.LIGHT_GREEN,
        };
      case diseasePercentage >= 40 && diseasePercentage < 80:
        return {
          title: 'moderado',
          titleColor: colors.YELLOW,
          description: 'Chance de infecção com baixa complicação',
          expandedCardDescription:
            'Probabilidade baixa, significa que as lesões ou sintomas observados não correspondem aos sinais típicos da doença',
          borderBottomColor: colors.YELLOW,
        };
      case diseasePercentage >= 80:
        return {
          title: 'de chance de infecção',
          titleColor: '#000',
          expandedCardDescription:
            'Probabilidade alta, significa que as lesões ou sintomas observados correspondem aos sinais típicos da doença',
          borderBottomColor: colors.LIGHT_RED,
        };
    }
  }
  const {
    title,
    titleColor,
    expandedCardDescription,
    borderBottomColor,
    description,
  } = getCardProps();

  function renderDescription() {
    return (
      <View style={{width: responsiveHorizontalScale(195)}}>
        <Text style={[styles.descriptionTitle, {color: titleColor}]}>
          {title}
        </Text>
        {!!description && (
          <Text style={styles.descriptionText}>{description}</Text>
        )}
      </View>
    );
  }
  function renderExpandedCard() {
    return (
      <TouchableOpacity
        style={[styles.expandedCardContainer, {borderBottomColor}]}
        onPress={setIsExpandedCard}>
        <View
          style={{
            flexDirection: 'column',
            gap: responsiveVerticalScale(17),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              paddingLeft: responsiveHorizontalScale(26),
              paddingRight: responsiveHorizontalScale(23),
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <ChevronUp />
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={{fontSize: 14, color: '#717171'}}>
                {analysisDate}
              </Text>
            </View>
          </View>
          <View style={styles.expandedCardContent}>
            <View style={styles.diseaseStatusContainer}>
              <CircularProgress
                color={borderBottomColor}
                diseasePercentage={diseasePercentage}
                width={68}
                strokeWidth={5}
                isExpandedCard
              />
              {renderDescription()}
            </View>
            <View style={styles.analysisDescriptionContainer}>
              <Avatar width={81} height={79} isSquaredDisplay />
              <View style={{width: responsiveHorizontalScale(200)}}>
                <Text style={styles.descriptionTitle}>
                  Descrição da análise
                </Text>
                <Text style={styles.descriptionText}>
                  {expandedCardDescription}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  function renderPreviewCard() {
    return (
      <TouchableOpacity
        style={[styles.container, {borderBottomColor}]}
        onPress={setIsExpandedCard}>
        <CircularProgress
          color={borderBottomColor}
          diseasePercentage={diseasePercentage}
          width={57.5}
          strokeWidth={5}
        />
        {renderDescription()}
        <ChevronDown />
      </TouchableOpacity>
    );
  }
  return !isExpandedCard ? renderPreviewCard() : renderExpandedCard();
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveVerticalScale(104),
    backgroundColor: '#fff',
    paddingHorizontal: responsiveHorizontalScale(21),
    paddingTop: responsiveVerticalScale(13),
    paddingBottom: responsiveVerticalScale(18),
    borderRadius: 10,
    borderBottomWidth: responsiveHorizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 12,
  },
  expandedCardContainer: {
    width: '100%',
    height: responsiveVerticalScale(314),
    backgroundColor: '#fff',
    borderRadius: 13,
    borderBottomWidth: responsiveHorizontalScale(20),
    elevation: 12,
  },
  expandedCardContent: {
    height: responsiveVerticalScale(191),
    justifyContent: 'space-between',
  },
  diseaseStatusContainer: {
    width: responsiveHorizontalScale(294),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analysisDescriptionContainer: {
    width: responsiveHorizontalScale(306),
    height: responsiveVerticalScale(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '300',
  },
});
