import { StyleSheet, Text, View, TouchableOpacity, Image, Settings,SafeAreaView } from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';


const MainHeader = ({ navigation, backButton, logo, heading }) => {
  return (
    <SafeAreaView style={styles.header}>
      {
        backButton ? (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <FeatherIcon name="arrow-left" size={moderateScale(20, 0.1)} color={'white'} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View></View>
          </>
        )
      }

      {
         heading != '' ? (
          <>
            <Text style={styles.heading}>{heading}</Text>
          </>
        ) : (
          <>
            <View></View>
          </>
        )
      }

      <View>
        <View style={{...styles.backButton, opacity:0}}>
          <FeatherIcon name="arrow-left" size={moderateScale(20, 0.1)} color={'white'} />
        </View>
      </View>

    </SafeAreaView>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: moderateScale(40, 0.1),
    paddingHorizontal: moderateScale(30, 0.1),
    justifyContent: 'space-between',


  },
  backButton: {
    backgroundColor: '#0e1261',
    height: moderateScale(30, 0.1),
    width: moderateScale(30, 0.1),
    borderRadius: moderateScale(20, 0.1),
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: moderateScale(20, 0.1),
    color: '#5c0925',
    fontWeight:'bold'
  },
  LogoImage: {
    height: '100%',
    width: '100%',
  }
});