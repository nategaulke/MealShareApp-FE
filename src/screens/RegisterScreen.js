import React, { useContext, useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

export default function RegisterScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [pronouns, setPronouns] = useState("");
	const [age, setAge] = useState("");
	const [location, setLocation] = useState("");
	const [error, setError] = useState("");
	const { receiveUserInfo } = useContext(AuthContext);

	const navigation = useNavigation();

	return (
		<View style={{ display: "flex", alignItems: "center", paddingTop: 50 }}>
			<Text style={{ fontSize: 48, fontWeight: "bold" }}>
				New Account
			</Text>
			<View style={{ width: 250, marginVertical: 20 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Your Email"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View style={{ width: 250, marginTop: 20, marginBottom: 5 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Your Password"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>

			<View style={{ width: 250, marginBottom: 20 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="ConfirmYourPassword"
					secureTextEntry={true}
					onChangeText={(password) => setConfirmPassword(password)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 250 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="First Name"
					onChangeText={(firstName) => setFirstName(firstName)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 250 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Last Name"
					onChangeText={(lastName) => setLastName(lastName)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 250 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Pronouns"
					onChangeText={(pn) => setPronouns(pn)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 250 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Age"
					onChangeText={(age) => setAge(age)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 250 }}>
				<TextInput
					style={styles.inputStyle}
					placeholder="Zip Code"
					onChangeText={(zip) => setLocation(zip)}
				/>
			</View>

			<View style={{ marginTop: 20, width: 250 }}>
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

						if (
							age === "" ||
							isNaN(Number(age)) ||
							Number(age) < 18
						) {
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
									pronouns,
									age: Number(age),
								}
							)
							.then((res) => {
								if (res.status == 201) {
									receiveUserInfo(res.data.user);
									navigation.navigate("Content");
									setError("");
								} else {
									console.error(res.data);
									setError("Registration Failed");
								}
							})
							.catch((err) => {
								setError("Registration Error");
								console.error(err);
							});
					}}
					title={"Submit Registration"}
				/>
			</View>

			<View style={{ marginTop: 20, width: 150 }}>
				<Button
					title={"Return to Log In"}
					onPress={() => navigation.navigate("Login")}
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
