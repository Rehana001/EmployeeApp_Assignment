import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';

const EmployeeSearchBar = ({ query, setQuery }) => {
  return (
    <SearchBar
      placeholder="Search by Name, Age, or Salary..."
      onChangeText={(text) => setQuery(text)}
      value={query}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      lightTheme
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c8d9f7',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  inputContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: moderateScale(20, 0.1),
    width:moderateScale(360,0.1),
   marginLeft:moderateScale(10,0.1),
    borderBottomWidth: 0,
  },
  input: {
    color: '#000', // Optional: to ensure the text is visible
    fontSize:moderateScale(14,0.1)
  },
});

export default EmployeeSearchBar;
