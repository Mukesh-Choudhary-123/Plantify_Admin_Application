// src/navigation/TabsNavigator.jsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const iconContainerStyle = focused => ({
  backgroundColor: focused ? 'lightgrey' : 'transparent',
  width: 70,
  borderRadius: 19,
  height: 35,
  alignItems: 'center',
  justifyContent: 'center',
});

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0D986A',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        tabBarItemStyle: { paddingTop: 7 },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={iconContainerStyle(focused)}>
              <FontAwesome name="home" size={30} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={iconContainerStyle(focused)}>
              <FontAwesome name="user" size={30} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
