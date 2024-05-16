import { HomeStackParams } from "@/navigation/RootStack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { CowAnalysisListDataTypes } from "./types";
import { SafeAreaView, Text, View } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import { styles } from "./styles";

export const CowAnalysisListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const [searchInputValue, setSearchInputValue] = React.useState<string>();
  const [cowAnalysisListData, setCowAnalysisListData] = React.useState<CowAnalysisListDataTypes>();
  const [filteredCowAnalysisData, setFilteredCowAnalysisData] = React.useState<CowAnalysisListDataTypes>();

  const handleSearchInputChange = () => {
    if (searchInputValue.length !== 0 && cowAnalysisListData) {
    }
  };

  const fetchCowAnalysisListData = async () => {
    const res = await fetch('');
    const data = await res.json();
    setCowAnalysisListData(data);
  };

  React.useEffect(() => {
    fetchCowAnalysisListData()
  }, []);

  React.useEffect(() => {

  }, [searchInputValue, cowAnalysisListData]);

  return (
    <SafeAreaView>
      {/* <View>
        <View style={styles.mixedTitleContainer}>
          <Text>Registro de</Text>
          <Text style={{fontWeight: '700'}}>análises</Text>
        </View>
        <Text style={{fontWeight: '700'}}>de imagem</Text>
      </View> */}
      <SearchBar setSearchInputValue={setSearchInputValue} />
    </SafeAreaView>
  );
};