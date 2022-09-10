import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import AddScreen from '../screens/AddScreen';
import MatchScreen from '../screens/MatchScreen';

const Tab = createBottomTabNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Profile">
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Add Ticket" component={AddScreen} />
                <Tab.Screen name="Matches" component={MatchScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;