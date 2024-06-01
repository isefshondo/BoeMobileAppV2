import React from 'react';
import {TextInput, View} from 'react-native';
import SearchBarIcon from '../../assets/search_icon.svg';
import {styles} from './styles';

interface ISearchBar {
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<ISearchBar> = ({setSearchInputValue}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={value => setSearchInputValue(value)}
      />
      <SearchBarIcon style={styles.searchBarIcon} />
    </View>
  );
};
