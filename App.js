import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigators';

export default function App() {
  return(
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  )
}
