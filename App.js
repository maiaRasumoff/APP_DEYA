
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import PopupDetailScreen from './PopupDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PopupDetailScreen" component={PopupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
