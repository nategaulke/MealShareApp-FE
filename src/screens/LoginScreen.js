import React, { useContext, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { receiveUserInfo } = useContext(AuthContext);

	const navigation = useNavigation();

	return (
		<View
			style={{ display: "flex", alignItems: "center", paddingTop: 100 }}
		>
			<Text style={{ fontSize: 48, fontWeight: "bold" }}>Log In</Text>
			<View style={{ width: 250, marginVertical: 20 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Your Email"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View style={{ width: 250, marginVertical: 20 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Your Password"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 150 }}>
				<Button
					style={{ marginVertical: 20, width: 150 }}
					onPress={() => {
						// https://meet4meal.azurewebsites.net/
						// navigation.navigate("Home");
						axios
							.post(
								`https://meet4meal.azurewebsites.net/user/login`,
								{ email, password }
							)
							.then((res) => {
								if (res.status == 200) {
									receiveUserInfo(res.data.user);
									navigation.navigate("Content");
									setError("");
								} else {
									setError("Invalid Login");
								}
							})
							.catch((err) => {
								setError("Invalid Login");
								console.error(err);
							});
					}}
					title={"Submit Log In"}
				/>
			</View>
			<View style={{ marginTop: 20, width: 150 }}>
				<Button
					onPress={() => navigation.navigate("Register")}
					title={"Register New Account"}
				/>
			</View>
			{error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
		</View>
	);
}

const styles = {
	inputStyle: {
		borderColor: "gray",
		borderWidth: 1,
	},
};
