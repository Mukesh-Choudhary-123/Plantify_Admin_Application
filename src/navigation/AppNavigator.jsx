import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabsNavigator from './TabsNavigator';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCredentials } from '../redux/slice/authSlice';
import {
  ActivityIndicator,
  View,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please turn on your internet to use the app.',
          [
            {
              text: 'Exit App',
              onPress: () => BackHandler.exitApp(),
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem('user');

        if (token && user) {
          dispatch(setCredentials({ token, admin: JSON.parse(user) }));
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabsNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
