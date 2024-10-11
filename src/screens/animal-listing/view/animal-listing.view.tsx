import { SearchBar } from "@/components/SearchBar";
import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import Menu from '../../../assets/menu.svg';
import BoeSymbol from '../../../assets/boe_symbol.svg';
import Filter from '../../../assets/filters_icon.svg';
import { CowInfosCard } from "@/components/CowInfosCard";

export const AnimalListing = () => {
  function renderCard({item}) {
    return <>
      <View style={styles.cardsContainer}>
        <CowInfosCard name={item.name} numberIdentification={item.identifier} treatmentStatus={item.treatmentStatus} illness={item.illness} chancePercentage={item.chancePercentage} onPress={() => {}} image={item.animalProfilePicture} />
        <View style={styles.sixthSpace} />
      </View>
    </>;
  }
  return <KeyboardAvoidingView style={styles.main} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <FlatList data={[]} renderItem={renderCard} keyExtractor={(item) => item.id} contentContainerStyle={{flexGrow: 1}} ListHeaderComponent={<>
      <View style={styles.firstSpace} />
      <View style={styles.header}>
        <Menu width={34} height={34} />
        <BoeSymbol width={25} height={33} />
      </View>
      <View style={styles.secondSpace} />
      <View style={styles.container}>
        <View>
          <View style={styles.row}>
            <Text style={styles.titleRegular}>Registro de </Text>
            <Text style={styles.titleSemibold}>análises </Text>
          </View>
          <Text style={styles.titleSemibold}>de imagem</Text>
        </View>
        <View style={styles.thirdSpace} />
        <SearchBar setSearchInputValue={() => {}} />
      </View>
      <View style={styles.fourthSpace} />
      <View style={styles.filter}>
        <Text style={styles.secondaryTitleSemibold}>Filtros</Text>
        <Filter width={28.02} height={24.02} />
      </View>
      <View style={styles.fifthSpace} />
    </>} />
  </KeyboardAvoidingView>
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
    paddingRight: responsiveHorizontalScale(33)
  },
  row: {flexDirection: 'row'},
  titleRegular: { fontSize: 32 },
  titleSemibold: {
    fontSize: 32,
    fontWeight: '600'
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
    height: responsiveVerticalScale(45.98)
  },
  cardsContainer: {
    paddingHorizontal: responsiveHorizontalScale(31),
  },
  sixthSpace: {
    width: '100%',
    height: responsiveVerticalScale(35),
  }
})