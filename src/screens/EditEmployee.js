import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MainHeader from '../components/MainHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import axios from '../Providers/axios'; 
import { useToast } from 'react-native-toast-notifications';

const EditEmployee = ({ navigation, route }) => {
  const { employee,onUpdateEmployee  } = route.params;
  const toast = useToast();

  const initialValues = {
    name: employee?.employee_name || '',
    salary: `${employee?.employee_salary}` || '',
    age: `${employee?.employee_age}` || ''
  };

  const CreateEditSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    salary: Yup.number().required('Required'),
    age: Yup.number().required('Required'),
  });



    const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`/update/${employee?.id}`, {
        employee_name: values.name,
        employee_salary: values.salary,
        employee_age: values.age
      });
      if (response.status === 200) {
        toast.show("Success",{
          type: 'success', 
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        
       
        onUpdateEmployee({ id: employee.id, ...values });
        
        navigation.goBack();
      } else {
        toast.show("error",{
          type: 'danger', 
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.show("error",{
        type: 'danger', 
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} backButton={true} heading={'Edit Employee'} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={CreateEditSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <View style={styles.AllInputs}>
              <View style={styles.InputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <View style={styles.errorContainer}>
                    <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                    <Text style={styles.errorTextStyle}>{errors.name}</Text>
                  </View>
                )}
              </View>
              <View style={styles.InputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Salary"
                  keyboardType='numeric'
                  onChangeText={handleChange('salary')}
                  onBlur={handleBlur('salary')}
                  value={values.salary}
                />
                {errors.salary && touched.salary && (
                  <View style={styles.errorContainer}>
                    <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                    <Text style={styles.errorTextStyle}>{errors.salary}</Text>
                  </View>
                )}
              </View>
              <View style={styles.InputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  keyboardType='numeric'
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                />
                {errors.age && touched.age && (
                  <View style={styles.errorContainer}>
                    <Icon name='asterisk' size={6} color={'red'} style={styles.ErrorIcon} />
                    <Text style={styles.errorTextStyle}>{errors.age}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.AddEmployeeView}>
              <TouchableOpacity style={styles.AddEmployee} onPress={handleSubmit}>
                <Text style={styles.AddEmployeeText}>Edit Employee</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditEmployee

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#c8d9f7',
    flex:1,
  },
  input: {
    height: moderateScale(40, 0.1),
    margin: moderateScale(12, 0.1),
    padding: moderateScale(10, 0.1),
    backgroundColor: 'white',
    width: moderateScale(300, 0.1),
    borderRadius: moderateScale(10, 0.1),
    paddingLeft: moderateScale(20, 0.1)
  },
  InputContainer: {
    paddingLeft: moderateScale(30, 0.1)
  },
  AllInputs: {
    paddingTop: moderateScale(40, 0.1)
  },
  AddEmployee: {
    backgroundColor: '#0e1261',
    padding: moderateScale(10, 0.1),
    width: moderateScale(140, 0.1),
    borderRadius: moderateScale(10, 0.1),
    borderWidth: 2,
    borderColor: '#e5fa25',
  },
  AddEmployeeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(12, 0.1),
    textAlign: 'center'
  },
  AddEmployeeView: {
    paddingBottom: moderateScale(10, 0.1),
    paddingTop: moderateScale(20, 0.1),
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(11, 0.1),
    marginLeft: moderateScale(25, 0.1),
    marginBottom: moderateScale(20, 0.1),
    marginTop: moderateScale(-20, 0.1)
  },
  errorTextStyle: {
    color: 'red',
    fontSize: moderateScale(11, 0.1),
    marginLeft: moderateScale(25, 0.1),
    marginBottom: moderateScale(10, 0.1),
    marginTop: moderateScale(-20, 0.1)
  },
  ErrorIcon: {
    marginBottom: moderateScale(10, 0.1),
    marginLeft: moderateScale(15, 0.1),
  },
})