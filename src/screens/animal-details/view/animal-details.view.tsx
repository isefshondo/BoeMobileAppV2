import React from "react";
import { AnimalDetailsRes } from "../controller/animal-details.controller";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { Avatar } from "@/components/avatar.component";
import { DiseasesLabels } from "@/components/diseases-labels.component";
import { Status } from "@/components/status.component";
import { HistoryCard } from "@/components/history-card.component";
import { colors } from "@/themes/colors/index.themes";
import { Button } from "@/components/button.component";
import GoBack from '../../../assets/back_left_icon.svg';

interface AnimalDetails {
  isLoading: boolean;
  animalDetails: AnimalDetailsRes;
  isExpandedCard: boolean;
  handleHistoryCardPres: () => void;
  handleNewAnalysisPress: () => void;
}

export const AnimalDetails: React.FC<AnimalDetails> = ({isLoading, animalDetails, isExpandedCard, handleHistoryCardPres, handleNewAnalysisPress}) => {
  const definedAnalysis = animalDetails.mostRecentAnalysis.status ?? 'Sem tratamento';
  if (isLoading) return <Text>Carregando</Text>
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#fff'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{width: '100%', paddingLeft: responsiveHorizontalScale(34)}}>
            <GoBack width={33} height={33} />
          </View>
          <View
            style={{
              width: '100%',
              height: responsiveVerticalScale(268),
              justifyContent: 'space-between',
              paddingLeft: responsiveHorizontalScale(32),
              paddingRight: responsiveHorizontalScale(42),
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexGrow: 1}}>
                <Avatar image={animalDetails.image} width={95} height={95} isBorderedDisplay />
              </View>
              <View
                style={{
                  flexGrow: 3,
                  height: responsiveVerticalScale(80),
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 22, fontWeight: '600'}}>{animalDetails.identifier}</Text>
                <TextInput
                  value={animalDetails.name}
                  style={{width: '100%', fontSize: 23, fontWeight: '300'}}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: responsiveVerticalScale(116),
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 18, fontWeight: '300'}}>Resultado</Text>
                <DiseasesLabels diseases={animalDetails.mostRecentAnalysis.disease} />
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 17, fontWeight: '600'}}>
                  Status de tratamento
                </Text>
                <Status label={definedAnalysis} isBoxedStatusDisplay />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              gap: responsiveVerticalScale(37),
              paddingLeft: responsiveHorizontalScale(32),
              paddingRight: responsiveHorizontalScale(44),
            }}>
            <Text style={{fontSize: 21, fontWeight: '600'}}>Histórico</Text>
            <View>
              {animalDetails.animalAnalysisHistory.map(item => {
                return <HistoryCard diseasePercentage={item.percentage} analysisDate={item.creationDate} analyzedImage={item.image} isExpandedCard={isExpandedCard} setIsExpandedCard={handleHistoryCardPres} />;
              })}
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  color: colors.LIGHT_BLUE,
                  textAlign: 'right',
                }}>
                Ver todas as análises
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          width: '100%',
          height: responsiveVerticalScale(119),
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0, 98, 119, .16)',
              shadowRadius: 30,
              shadowOpacity: 0.3,
              shadowOffset: {width: 0, height: 10},
            },
            android: {
              elevation: 15,
            },
          }),
        }}>
        <Button
          width={354}
          height={72}
          leftAssets={
            <View>
              <Text>+</Text>
            </View>
          }
          handlePress={handleNewAnalysisPress}
          isRoundedButton 
        >
          nova análise
        </Button>
      </View>
    </>
  );
};