import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function FieldComponent({ fieldName, isEditing, field, setIsField }) {
	return (
		<View style={isEditing ? styles.stacked : styles.row}>
			<Text>{fieldName}: </Text>
			{!isEditing && <Text>{field}</Text>}
			{isEditing && (
				<TextInput
					style={styles.textInput}
					placeholder={field}
					onChangeText={(text) => setIsField(text)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	stacked: {
		marginVertical: 10,
	},
	row: {
		marginVertical: 10,
		flexDirection: "row",
	},
	textInput: {
		borderColor: "gray",
		borderWidth: 1,
	},
});

export default FieldComponent;
