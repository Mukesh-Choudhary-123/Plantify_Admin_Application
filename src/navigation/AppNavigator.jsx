// src/navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabsNavigator from './TabsNavigator';
import { useSelector } from 'react-redux';


const AppNavigator = () => {
  const { admin, isAuthenticated } = useSelector((state) => state.auth);
  
  console.log("Is Authenticated:", isAuthenticated);

  const isLoggedIn = false; 
  return (
    <NavigationContainer>
      {isAuthenticated ? <TabsNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
