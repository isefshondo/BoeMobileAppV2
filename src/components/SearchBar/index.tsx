import React from "react";
import { TextInput, View } from "react-native";
import SearchBarIcon from "../../assets/search_icon.svg";
import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { styles } from "./styles";

interface ISearchBar {
    setSearchInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<ISearchBar> = ({setSearchInputValue}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputText} onChangeText={(value) => setSearchInputValue(value)} />
            <SearchBarIcon width={responsiveHorizontalScale(22)} height={responsiveVerticalScale(22)} />
        </View>
    );
};