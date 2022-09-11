import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import TicketModal from "../components/TicketModal";
import {
	Button,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	View,
} from "react-native";
import { AuthContext } from "../context/authContext";

const CLOSED = -1,
	EDITING = 0,
	CREATING = 1;

const PRODUCERS = 0,
	CONSUMERS = 1;

function ConsumerCardComponent({
	ticketData,
	editTicket,
	refreshTickets,
	showActions = true,
}) {
	const deleteTicket = (ticketData) => {
		axios
			.delete(
				`https://meet4meal.azurewebsites.net/consumer/delete/${ticketData._id}`
			)
			.then((res) => refreshTickets())
			.catch((err) => console.error(err));
	};

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

			{showActions && (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 10,
					}}
				>
					<Button
						title="Edit"
						onPress={() => editTicket(ticketData)}
					/>
					<Button
						title="Delete"
						onPress={() => deleteTicket(ticketData)}
					/>
				</View>
			)}
		</View>
	);
}

function ProducerCardComponent({
	ticketData,
	editTicket,
	refreshTickets,
	showActions = true,
}) {
	const deleteTicket = (ticketData) => {
		axios
			.delete(
				`https://meet4meal.azurewebsites.net/producer/delete/${ticketData._id}`
			)
			.then((res) => refreshTickets())
			.catch((err) => console.error(err));
	};

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

			{showActions && (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 10,
					}}
				>
					<Button
						title="Edit"
						onPress={() => editTicket(ticketData)}
					/>
					<Button
						title="Delete"
						onPress={() => deleteTicket(ticketData)}
					/>
				</View>
			)}
		</View>
	);
}

function AddScreen() {
	const { userInfo } = useContext(AuthContext);

	const [myTicketData, setMyTicketData] = useState({});
	const [showing, setShowing] = useState(PRODUCERS);
	const [showAccepted, setShowAccepted] = useState(false);
	const [modalMode, setModalMode] = useState(CLOSED);

	const [modalTicketData, setModalTicketData] = useState({});

	const getMyCards = () => {
		axios
			.get(
				`https://meet4meal.azurewebsites.net/user/${
					showAccepted ? "accepted" : "outstanding"
				}/${userInfo._id}`
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

	const editTicket = (ticketData) => {
		setModalMode(EDITING);
		setModalTicketData(ticketData);
	};

	useEffect(() => getMyCards(), [userInfo, showAccepted]);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<TicketModal
				modalMode={modalMode}
				setModalMode={setModalMode}
				initialTicketData={modalTicketData}
				refreshTickets={getMyCards}
			/>
			<View style={{ width: 200, marginVertical: 10 }}>
				<Button
					title="Share a Meal!"
					onPress={() => {
						setModalTicketData({});
						setModalMode(CREATE);
					}}
				/>
			</View>

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
				{showing === PRODUCERS &&
					(myTicketData.producerTickets ?? []).map((ticketData) => {
						return (
							<ProducerCardComponent
								ticketData={ticketData}
								editTicket={editTicket}
								refreshTickets={getMyCards}
								key={ticketData._id}
							/>
						);
					})}
				{showing === CONSUMERS &&
					(myTicketData.consumerTickets ?? []).map((ticketData) => {
						return (
							<ConsumerCardComponent
								ticketData={ticketData}
								editTicket={editTicket}
								refreshTickets={getMyCards}
								key={ticketData._id}
							/>
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
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
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
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default AddScreen;
