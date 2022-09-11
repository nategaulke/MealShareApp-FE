import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [age, setAge] = useState("");
	const [location, setLocation] = useState("");
	const [error, setError] = useState("");

	const navigation = useNavigation();

	return (
		<View>
			<Text>Register New Account</Text>
			<View>
				<TextInput
					placeholder="Your Email"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View>
				<TextInput
					placeholder="Choose a Password"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>

			<View>
				<TextInput
					placeholder="Confirm your Password"
					secureTextEntry={true}
					onChangeText={(confirmPassword) =>
						setConfirmPassword(confirmPassword)
					}
				/>
			</View>

			<View>
				<TextInput
					placeholder="First Name"
					onChangeText={(firstName) => setFirstName(firstName)}
				/>
			</View>

			<View>
				<TextInput
					placeholder="Last Name"
					onChangeText={(lastName) => setLastName(lastName)}
				/>
			</View>

			<View>
				<TextInput
					placeholder="Age"
					onChangeText={(age) => setAge(age)}
				/>
			</View>

			<View>
				<TextInput
					placeholder="Zip Code"
					onChangeText={(zip) => setLocation(zip)}
				/>
			</View>

			<Button
				onPress={() => {
					if (confirmPassword !== password) {
						setError("Passwords Do Not Match");
						return;
					}

					if (email === "") {
						setError("Email Cannot Be Empty");
						return;
					}

					if (password.length < 7) {
						setError("Password Must Be 7+ Characters");
						return;
					}

					if (firstName === "") {
						setError("First Name Cannot Be Empty");
						return;
					}

					if (lastName === "") {
						setError("Last Name Cannot Be Empty");
						return;
					}

					if (age === "" || isNaN(Number(age)) || Number(age) < 18) {
						setError("Must Be 18+ To Use This App");
						return;
					}

					if (location === "") {
						setError("Zip Code Cannot Be Empty");
						return;
					}

					// https://meet4meal.azurewebsites.net/
					// navigation.navigate("Home");
					axios
						.post(
							`https://meet4meal.azurewebsites.net/user/register`,
							{
								email,
								password,
								firstName,
								lastName,
								location,
								age: Number(age),
							}
						)
						.then((res) => {
							if (res.status == 200) {
								navigation.navigate("Content");
								setError("");
							} else {
								setError("Registration Failed");
							}
						})
						.catch((err) => {
							setError("Invalid Login");
							console.error(err);
						});
				}}
				title={"Submit Registration"}
			/>
			<Button
				title={"Return to Log In"}
				onPress={() => navigation.navigate("Login")}
			/>
			{error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
		</View>
	);
}
