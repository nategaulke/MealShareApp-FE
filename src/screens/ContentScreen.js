import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import ProfileScreen from "./ProfileScreen";
import AddScreen from "./AddScreen";
import MatchScreen from "./MatchScreen";

const Tab = createBottomTabNavigator();

export default function ContentScreen() {
	return (
		<Tab.Navigator initialRouteName="Profile">
			<Tab.Screen name="Profile" component={ProfileScreen} />
			<Tab.Screen name="Add Ticket" component={AddScreen} />
			<Tab.Screen name="Matches" component={MatchScreen} />
		</Tab.Navigator>
	);
}
