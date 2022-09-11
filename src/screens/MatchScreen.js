import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
	Button,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	View,
} from "react-native";
import { AuthContext } from "../context/authContext";

const PRODUCERS = 0,
	CONSUMERS = 1;

function ConsumerCardComponent({
	ticketData,
	refreshTickets,
}) {
	return (
		<View
			style={{
				borderColor: "black",
				borderWidth: 1,
				maxWidth: 200,
				minHeight: 100,
				backgroundColor: ticketData.filled ? "#d2fadd" : "white",
			}}
		>
			<View>
				<Text>
					Food Interests:{" "}
					{ticketData.foodInterests.length === 0
						? "None!"
						: ticketData.foodInterests.join(", ")}
				</Text>
			</View>

			<View>
				<Text>Location: {ticketData.location}</Text>
			</View>

			<View>
				<Text>
					Dietary Restrictions:{" "}
					{ticketData.dietaryRestrictions.length === 0
						? "None!"
						: ticketData.dietaryRestrictions.join(", ")}
				</Text>
			</View>

			<View>
				<Text>People Setting: {ticketData.peopleSetting}</Text>
			</View>

			<View>
				<Text>Filled: {ticketData.filled ? "True" : "False"}</Text>
			</View>
		</View>
	);
}

function ProducerCardComponent({
	ticketData,
	refreshTickets,
}) {
	return (
		<View
			style={{
				borderColor: "black",
				borderWidth: 1,
				maxWidth: 200,
				minHeight: 100,
				backgroundColor: ticketData.filled ? "#d2fadd" : "white",
			}}
		>
			<View>
				<Text
					style={{ numberOfLines: 1 }}
				>{`Desc: ${ticketData.itemDescription}`}</Text>
			</View>

			<View>
				<Text>
					Types of Food:{" "}
					{ticketData.foodKind.length === 0
						? "None!"
						: ticketData.foodKind.join(", ")}
				</Text>
			</View>

			<View>
				<Text>
					Safe For:{" "}
					{ticketData.dietaryRestrictions.length === 0
						? "None!"
						: ticketData.dietaryRestrictions.join(", ")}
				</Text>
			</View>

			<View>
				<Text>Location: {ticketData.location}</Text>
			</View>

			<View>
				<Text>
					Spaces Filled: {ticketData.numberAccepted}/
					{ticketData.serves}
				</Text>
			</View>
		</View>
	);
}

function MatchScreen() {
	const { userInfo } = useContext(AuthContext);

	const [myTicketData, setMyTicketData] = useState({});
	const [showing, setShowing] = useState(PRODUCERS);
	const [showAccepted, setShowAccepted] = useState(false);


	const getMyCards = () => {
		axios
			.get(
				`https://meet4meal.azurewebsites.net/user/getQueue/${userInfo._id}`
			)
			.then((res) => {
				if (res.status !== 200) {
					console.error(res.data);
					setMyTicketData({});
					return;
				}
				setMyTicketData(res.data);
			})
			.catch((err) => {
				setMyTicketData({});
				console.error(err);
			});
	};


	useEffect(() => getMyCards(), [userInfo, showAccepted]);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>

			<View style={{ display: "flex", flexDirection: "row" }}>
				<Text style={{ margin: 2 }}>
					Viewing: {showing === PRODUCERS ? "Offers" : "Requests"}
				</Text>
				<Switch
					style={{ margin: 2 }}
					onValueChange={() => setShowing((showing + 1) % 2)}
					value={showing === PRODUCERS}
				/>
			</View>
			<View style={{ display: "flex", flexDirection: "row" }}>
				<Text style={{ margin: 2 }}>Show Accepted</Text>
				<Switch
					style={{ margin: 2 }}
					onValueChange={() => setShowAccepted(!showAccepted)}
					value={showAccepted}
				/>
			</View>
			<ScrollView>
				<View style={{ display: "flex", flexDirection: "row" }}>
					<Text style={{ margin: 2 }}>
						My {showing === PRODUCERS ? "Offers" : "Requests"}
					</Text>
				</View>
				{showing === PRODUCERS && myTicketData.producerTickets !== undefined &&
					(myTicketData.producerTickets.prodQueue ?? []).map((ticketData) => {
						return (
							(ticketData !== null) ?
								<ProducerCardComponent
									ticketData={ticketData}
									refreshTickets={getMyCards}
									key={ticketData._id}
								/>
								: null
						);
					})}
				{showing === CONSUMERS && myTicketData.consumerTickets !== undefined &&
					(myTicketData.consumerTickets.conQueue ?? []).map((ticketData) => {
						return (
							(ticketData !== null) ?
								<ConsumerCardComponent
									ticketData={ticketData}
									refreshTickets={getMyCards}
									key={ticketData._id}
								/>
								: null
						);
					})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default MatchScreen