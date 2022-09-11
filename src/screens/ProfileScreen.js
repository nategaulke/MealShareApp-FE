import React, { useState, useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/authContext";
import FieldComponent from "../components/FieldComponent";
import axios from "axios";

function ProfileScreen({ navigation }) {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState("");
	const { userInfo, receiveUserInfo } = useContext(AuthContext);

	const [isFirstName, setIsFirstName] = useState(userInfo.firstName);
	const [isLastName, setIsLastName] = useState(userInfo.lastName);
	const [isEmail, setIsEmail] = useState(userInfo.email);
	const [isPronouns, setIsPronouns] = useState(userInfo.pronouns);
	const [isAge, setIsAge] = useState(userInfo.age);

	const handleSave = () => {
		setIsEditing(!isEditing);
		axios
			.post(`https://meet4meal.azurewebsites.net/user/edit`, {
				_id: userInfo._id,
				fields: {
					email: isEmail,
					age: isAge,
					firstName: isFirstName,
					lastName: isLastName,
					pronouns: isPronouns,
				},
			})
			.then((res) => {
				if (res.status == 200) {
					receiveUserInfo(res.data.user);
					setError("");
				} else {
					setError("Invalid Login");
				}
			})
			.catch((err) => {
				setError("Invalid Save");
				console.error(err);
			});
	};

	return (
		<View style={styles.container}>
			<FieldComponent
				fieldName="First Name"
				isEditing={isEditing}
				field={isFirstName}
				setIsField={setIsFirstName}
			/>
			<FieldComponent
				fieldName="Last Name"
				isEditing={isEditing}
				field={isLastName}
				setIsField={setIsLastName}
			/>
			<FieldComponent
				fieldName="Email"
				isEditing={isEditing}
				field={isEmail}
				setIsField={setIsEmail}
			/>
			<FieldComponent
				fieldName="Pronouns"
				isEditing={isEditing}
				field={isPronouns}
				setIsField={setIsPronouns}
			/>
			<FieldComponent
				fieldName="Age"
				isEditing={isEditing}
				field={isAge}
				setIsField={setIsAge}
			/>
			<Button title={!isEditing ? "Edit" : "Save"} onPress={handleSave} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	row: {
		flexDirection: "row",
	},
});

export default ProfileScreen;
