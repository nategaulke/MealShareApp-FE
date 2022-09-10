import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import AddScreen from '../screens/AddScreen';
import MatchScreen from '../screens/MatchScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Profile">
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Add Ticket" component={AddScreen} />
                <Stack.Screen name="Matches" component={MatchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;