import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeList from './src/screens/EmployeeList';
import CreateEmployee from './src/screens/CreateEmployee';
import Profile from './src/screens/Profile';
import EditEmployee from './src/screens/EditEmployee';
import { ToastProvider } from 'react-native-toast-notifications'

const Stack = createStackNavigator();

const App = () => {
  return (
    <ToastProvider>
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
        name="EmployeeList" 
        component={EmployeeList} 
        options={{headerShown:false}}
        />
        <Stack.Screen
         name="CreateEmployee"
          component={CreateEmployee} 
          options={{headerShown:false}}
          />
        <Stack.Screen 
        name="Profile"
         component={Profile} 
         options={{headerShown:false}}
         />
        <Stack.Screen 
        name="EditEmployee" 
        component={EditEmployee}
         options={{headerShown:false}}
         />
      </Stack.Navigator>
    </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
