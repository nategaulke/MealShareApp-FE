import React from "react";
import { View, Text } from "react-native";
import axios from "axios";

function ProducerCardComponent({ newTicket, edit }) {
	const [isEditing, setIsEditing] = useState(edit);

	const [zip, setZip] = useState("00000")

	const [foodSetting, setFoodSetting] = useState(null);
	const [description, setDescription] = useState("")

	return (
		<View>
			<View>
				<Text>Zipcode: {zip}</Text>
			</View>

			<View>
				<Text>Food Interests?</Text>
			</View>
			<Text>{foodSetting}</Text> :

			<Text>Item Description: {description}</Text>

			<Button
				title={isEditing ? "save" : "edit"}
				onPress={() => setIsEditing(!isEditing)}
			/>
		</View>
	)
}


function MatchScreen() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			{/* axios.get ("https://meet4meal.azurewebsites.net/user/getQueue/:userID").then(;
				res => {
				const queque = res.consumerTickets
			}
			) */}
		</View>
	);
}

export default MatchScreen;
