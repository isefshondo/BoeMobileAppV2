import React from 'react';
import {SearchBar} from '@/components/SearchBar';
import {
  responsiveFontSize,
  responsiveHorizontalScale,
  responsiveVerticalScale,
} from '@/utils/metrics/index.utils';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Menu from '../../../assets/menu.svg';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import Filter from '../../../assets/filters_icon.svg';
import {AnimalListingCard} from '@/components/animal-listing-card.component';
import { useTranslation } from 'react-i18next';

interface AnimalListing {
  isLoading: boolean;
  isError: boolean;
  animals: any[];
  handleMenuPress: () => void;
  handleSearchBarChange: (value: string) => void;
  navigateToAnimalProfile: (id: string) => void;
}

export const AnimalListing: React.FC<AnimalListing> = ({
  isLoading,
  isError,
  animals,
  handleMenuPress,
  handleSearchBarChange,
  navigateToAnimalProfile,
}) => {
  const {t} = useTranslation();
  function renderCard({item}) {
    return (
      <View style={styles.cardsContainer} key={item.id}>
        <AnimalListingCard
          id={item.id}
          identifier={item.identifier}
          name={item.name}
          disease={item.illness}
          diseasePercentage={item.chancePercentage}
          image={item.animalProfilePicture}
          navigateToAnimalProfile={navigateToAnimalProfile}
        />
        <View style={styles.sixthSpace} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        data={animals}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={
          <>
            <View style={styles.firstSpace} />
            <View style={styles.header}>
              <Menu width={34} height={34} onPress={handleMenuPress} />
              <BoeSymbol width={25} height={33} />
            </View>
            <View style={styles.secondSpace} />
            <View style={styles.container}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.titleRegular}>{t('animal_listing.title.first_line.regular')} </Text>
                  <Text style={styles.titleSemibold}>{t('animal_listing.title.first_line.bold')}</Text>
                </View>
                <Text style={styles.titleSemibold}>{t('animal_listing.title.second_line.bold')}</Text>
              </View>
              <View style={styles.thirdSpace} />
              <SearchBar setSearchInputValue={handleSearchBarChange} />
            </View>
            <View style={styles.fourthSpace} />
            <View style={styles.filter}>
              <Text style={styles.secondaryTitleSemibold}>{t('animal_listing.filters')}</Text>
              <Filter width={28.02} height={24.02} />
            </View>
            <View style={styles.fifthSpace} />
          </>
        }
      />
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: responsiveHorizontalScale(38),
    paddingRight: responsiveHorizontalScale(34),
  },
  firstSpace: {
    width: '100%',
    height: responsiveVerticalScale(55),
  },
  secondSpace: {
    width: '100%',
    height: responsiveVerticalScale(66),
  },
  container: {
    width: '100%',
    paddingLeft: responsiveHorizontalScale(31),
    paddingRight: responsiveHorizontalScale(33),
  },
  row: {flexDirection: 'row'},
  titleRegular: {fontSize: responsiveFontSize(32)},
  titleSemibold: {
    fontSize: responsiveFontSize(32),
    fontWeight: '600',
  },
  thirdSpace: {
    width: '100%',
    height: responsiveVerticalScale(44),
  },
  fourthSpace: {
    width: '100%',
    height: responsiveVerticalScale(61),
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: responsiveHorizontalScale(34),
    paddingRight: responsiveHorizontalScale(41.98),
  },
  secondaryTitleSemibold: {
    fontSize: 18,
    fontWeight: '600',
  },
  fifthSpace: {
    width: '100%',
    height: responsiveVerticalScale(45.98),
  },
  cardsContainer: {
    paddingHorizontal: responsiveHorizontalScale(31),
  },
  sixthSpace: {
    width: '100%',
    height: responsiveVerticalScale(35),
  },
});
