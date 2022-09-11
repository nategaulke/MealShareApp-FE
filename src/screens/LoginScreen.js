import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigation = useNavigation();

	return (
		<View>
			<Text>Log In</Text>
			<View>
				<TextInput
					placeholder="Your Email"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View>
				<TextInput
					placeholder="Your Password"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>

			<Button
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
			<Button
				onPress={() => navigation.navigate("Register")}
				title={"Register New Account"}
			/>
			{error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
		</View>
	);
}
