import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import MainHeader from '../components/MainHeader'
import { moderateScale } from 'react-native-size-matters'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import CameraIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/FontAwesome5'
import RBSheet from "react-native-raw-bottom-sheet";
import { Divider } from 'react-native-paper';


const Profile = ({ navigation, route }) => {
  const { employee } = route.params;
  console.log("Employee Data: ",employee)


  return (
    <View style={styles.container}>
      <View>
        <MainHeader navigation={navigation} backButton={true} heading={'Profile'} />
      </View>
      <View style={{ marginTop: moderateScale(20, 0.1), paddingHorizontal: moderateScale(30, 0.1) }}>
        {/* <View style={styles.ProfilePicture}>
          <View style={{
            borderRadius: moderateScale(100, 0.1),
            overflow: 'hidden'
          }}>
            <Image style={{ height: '100%', width: '100%' }} />
          </View>
          <TouchableOpacity style={styles.CameraIcon} onPress={() => RBSheetRef.current.open()}>
            <View style={styles.IrisCameraIcon}>
              <Icon3 name="camera" size={30} color={'#0e1261'} />
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={{marginTop:moderateScale(30,0.1)}}>
          <View style={styles.inputView}>
            <View style={styles.UserIconStyle}>
              <FontAwesome name="user" size={20} color={"#575352"} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={employee.employee_name}
              editable={false}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.UserIconStyle}>
              <MaterialIcon name="cash-multiple" size={20} color={"#575352"} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Salary"
              value={employee.employee_salary.toString()}
              editable={false}
            />
          </View>

          <View style={styles.inputView}>
            <View  style={styles.UserIconStyle}>
              <EntypoIcon name='man' size={20}  color={"#575352"}/>
            </View>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={employee.employee_age.toString()}
            editable={false}
          />
          </View>
        </View>
      </View>
      
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c8d9f7',
    flex: 1,
  },
  ProfilePicture: {
    backgroundColor: '#D9D9D9',
    marginLeft: moderateScale(120, 0.1),
    marginRight: moderateScale(100, 0.1),
    borderRadius: moderateScale(100, 0.1),
    alignSelf: 'center',
    height: moderateScale(100, 0.1),
    width: moderateScale(100, 0.1),
    marginBottom: moderateScale(30, 0.1),
  },
  IrisCameraIcon: {
    backgroundColor: 'white',
    width: moderateScale(30, 0.1),
    borderRadius: moderateScale(100, 0.1),
    justifyContent: 'center',
    color: '#0e1261',
    alignItems: 'center',
  },
  CameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  input: {
    color: 'black',
    width: moderateScale(300, 0.1),
    borderRadius: moderateScale(10, 0.1),
    paddingLeft: moderateScale(15, 0.1),
  },
  inputView: {
    marginTop:moderateScale(20,0.1),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: moderateScale(20, 0.1),
    height: moderateScale(50, 0.1),
    marginTop: moderateScale(20, 0.1)

  },
  UserIconStyle: {
    paddingTop: moderateScale(15, 0.1),
    paddingLeft: moderateScale(20, 0.1),

  }
})