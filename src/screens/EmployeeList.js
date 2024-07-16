import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import axios from '../Providers/axios';
import { moderateScale } from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../components/MainHeader';
import { useToast } from 'react-native-toast-notifications';
import SearchBar from '../components/SearchBar';

const EmployeeList = ({ navigation }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const toast = useToast();

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/employees');
            setEmployees(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

   
    const filteredEmployees = useMemo(() => {
        const lowercasedQuery = query.toLowerCase();
        return employees.filter(employee => (
            employee.employee_name.toLowerCase().includes(lowercasedQuery) ||
            employee.employee_age.toString().includes(lowercasedQuery) ||
            employee.employee_salary.toString().includes(lowercasedQuery)
        ));
    }, [query, employees]); 

    const handleUpdateEmployee = (updatedEmployee) => {
        const updatedEmployees = employees.map(employee =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
        setEmployees(updatedEmployees);
    };

    const deleteEmployee = (employeeId, onDeleteEmployee) => {
        axios.delete(`/delete/${employeeId}`)
            .then(response => {
                console.log("Employee deleted successfully", response);
                if (typeof onDeleteEmployee === 'function') {
                    onDeleteEmployee(employeeId);
                    toast.show("Employee deleted successfully", {
                        type: 'success',
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                    });
                } else {
                    console.error('onDeleteEmployee is not a function');
                    toast.show("onDeleteEmployee is not a function", {
                        type: 'danger',
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                    });
                }
            })
            .catch(error => {
                console.error("There was an error deleting the employee!", error);
                toast.show("There was an error deleting the employee!", {
                    type: 'danger',
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            });
    };

    const handleDeleteEmployee = (deletedEmployeeId) => {
        setEmployees(employees.filter(employee => employee.id !== deletedEmployeeId));
    };

    const EditAlert = (item) => {
        Alert.alert(
            "Alert",
            "Are you sure you want to edit employee details?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => navigation.navigate('EditEmployee', {
                        employee: item,
                        onUpdateEmployee: handleUpdateEmployee
                    })
                }
            ],
            { cancelable: true }
        );
    };

    const DeleteAlert = (employeeId) => {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this Employee?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => deleteEmployee(employeeId, handleDeleteEmployee)
                }
            ],
            { cancelable: true }
        );
    };

    const renderEmployee = ({ item }) => (
        <View style={styles.employeeContainer}>
            <Text style={styles.employeeText}>Name: {item.employee_name}</Text>
            <Text style={styles.employeeText}>Age: {item.employee_age}</Text>
            <Text style={styles.employeeText}>ID: {item.id}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.EmployeeDataStyle}>
                <View style={styles.ProfileImageView}>
                    <Image
                        source={require('../assets/Userimage.jpg')}
                        style={styles.ImageStyle}
                    />
                    <Text style={styles.title}>{item.employee_name}</Text>
                </View>
                <View style={styles.AgeView}>
                    <Text style={styles.AgeHeading}>Age:</Text>
                    <Text>{item.employee_age}</Text>
                </View>
            </View>
            <View style={styles.IconsView}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { employee: item })}>
                    <FontAwesomeIcon name="user" size={20} color={'#5c0925'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.EditIconStyle} onPress={() => EditAlert(item)}>
                    <EntypoIcon name="edit" size={20} color={'#5c0925'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => DeleteAlert(item.id)}>
                    <MaterialIcon name="delete" size={20} color={'#5c0925'} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.MainHeaderStyle}>
                <MainHeader navigation={navigation} backButton={true} heading={'Employee List'} />
            </View>
            <View>
                <SearchBar query={query} setQuery={setQuery} />
            </View>
            <View style={styles.CreateEmployeeView}>
                <TouchableOpacity style={styles.CreateEmployeeButton} onPress={() => navigation.navigate('CreateEmployee')}>
                    <Text style={styles.CreateEmployeeText}>Create Employee</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredEmployees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0e1261',
        paddingLeft: moderateScale(10, 0.1),
        paddingTop: moderateScale(10, 0.1)
    },
    ProfileImageStyle: {
        backgroundColor: '#ffffe4',
        padding: moderateScale(20, 0.1),
        borderRadius: moderateScale(100, 0.1),
        width: moderateScale(60, 0.1),
        height: moderateScale(60, 0.1),
        borderWidth: 2,
        borderColor: 'black',
    },
    ProfileImageView: {
        flexDirection: 'row',
        marginLeft: moderateScale(10, 0.1),
        marginRight: moderateScale(10, 0.1)
    },
    AgeView: {
        flexDirection: 'row',
        marginLeft: moderateScale(80, 0.1),
        bottom: moderateScale(20, 0.1)
    },
    AgeHeading: {
        fontSize: moderateScale(13, 0.1),
        paddingRight: moderateScale(6, 0.1),
        color: '#0e1261',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: moderateScale(10, 0.1),
        padding: moderateScale(15, 0.1),
        marginVertical: moderateScale(10, 0.1),
        marginHorizontal: moderateScale(20, 0.1),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        backgroundColor: '#c8d9f7',
        flex: 1,
    },
    CreateEmployeeButton: {
        backgroundColor: '#0e1261',
        padding: moderateScale(10, 0.1),
        width: moderateScale(140, 0.1),
        borderRadius: moderateScale(10, 0.1),
        borderWidth: 2,
        borderColor: '#e5fa25',
    },
    CreateEmployeeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(12, 0.1),
        textAlign: 'center'
    },
    CreateEmployeeView: {
        paddingLeft: moderateScale(25, 0.1),
        paddingBottom: moderateScale(10, 0.1),
        paddingTop: moderateScale(20, 0.1)
    },
    IconsView: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: moderateScale(10, 0.1),
        paddingRight: moderateScale(10, 0.1)
    },
    EditIconStyle: {
        paddingRight: moderateScale(10, 0.1),
        paddingLeft: moderateScale(10, 0.1)
    },
    EmployeeDataStyle: {
        paddingRight: moderateScale(60, 0.1)
    },
    MainHeaderStyle: {
        paddingBottom: moderateScale(25, 0.1)
    },
    ImageStyle:{
        width:moderateScale(50,0.1),
        height:moderateScale(50,0.1),
        marginTop:moderateScale(10,0.1)
    }
});

export default EmployeeList;

