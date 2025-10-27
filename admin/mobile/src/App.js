import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantList from './screens/RestaurantList';
import RestaurantMenu from './screens/RestaurantMenu';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={RestaurantList} />
        <Stack.Screen name="Menu" component={RestaurantMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
