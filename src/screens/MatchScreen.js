import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../authContext";

function MatchScreen() {
	const { userInfo } = useContext(AuthContext);
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>{userInfo ? userInfo._id : "Undefined"}</Text>
		</View>
	);
}

export default MatchScreen;
