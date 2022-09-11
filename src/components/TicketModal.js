import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
	Modal,
	Pressable,
	Switch,
	Text,
	View,
	StyleSheet,
	TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { dietaryRestrictions, foodTypes, peopleSettings } from "../constants";
import { AuthContext } from "../context/authContext";

const CLOSED = -1,
	EDITING = 0,
	CREATING = 1;

export default function TicketModal({
	initialTicketData,
	modalMode,
	setModalMode,
	refreshTickets,
}) {
	const [isConsumer, setIsConsumer] = useState(!initialTicketData.serves);
	const [location, setLocation] = useState(initialTicketData.location ?? "");
	const [itemDescription, setItemDescription] = useState(
		initialTicketData.itemDescription ?? ""
	);
	const [serves, setServes] = useState(initialTicketData.serves ?? "");

	const [foodKinds, setFoodKinds] = useState(foodTypes);
	const [food, setFood] = useState(
		initialTicketData.foodInterests
			? initialTicketData.foodInterests[0]
			: initialTicketData.foodKind
			? initialTicketData.foodKind[0]
			: undefined
	);
	const [foodOpen, setFoodOpen] = useState(false);

	const [restrictions, setRestrictions] = useState(dietaryRestrictions);
	const [restriction, setRestriction] = useState(
		initialTicketData.dietaryRestrictions
			? initialTicketData.dietaryRestrictions[0]
			: undefined
	);
	const [restrictionOpen, setRestrictionOpen] = useState(false);

	const [peopleOptions, setPeopleOptions] = useState(peopleSettings);
	const [people, setPeople] = useState(initialTicketData.peopleSetting);
	const [peopleOpen, setPeopleOpen] = useState(false);

	const { userInfo } = useContext(AuthContext);

	useEffect(() => {
		setIsConsumer(!initialTicketData.serves);
		setLocation(initialTicketData.location ?? "");
		setItemDescription(initialTicketData.itemDescription ?? "");
		setServes(initialTicketData.serves ?? "");
		setFood(
			initialTicketData.foodInterests
				? initialTicketData.foodInterests[0]
				: initialTicketData.foodKind
				? initialTicketData.foodKind[0]
				: undefined
		);
		setRestriction(
			initialTicketData.dietaryRestrictions
				? initialTicketData.dietaryRestrictions[0]
				: undefined
		);
		setPeople(initialTicketData.peopleSetting);
	}, [initialTicketData]);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalMode !== CLOSED}
			onRequestClose={() => {
				setModalMode(CLOSED);
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={{ fontWeight: "bold", fontSize: 28 }}>
						{modalMode === EDITING
							? "Editing Ticket"
							: "New Ticket!"}
					</Text>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text>
							{isConsumer
								? "I'm Looking for Food!"
								: "I'm Offering Food!"}
						</Text>
						<Switch
							onValueChange={() => setIsConsumer(!isConsumer)}
							value={isConsumer}
							disabled={modalMode === EDITING}
						/>
					</View>

					<View style={{ width: 250, marginVertical: 10 }}>
						<TextInput
							style={styles.inputStyle}
							placeholder="Your Zip Code"
							onChangeText={(location) => setLocation(location)}
							value={location}
						/>
					</View>

					{!isConsumer && (
						<View>
							<View style={{ width: 250, marginVertical: 10 }}>
								<TextInput
									style={styles.inputStyle}
									placeholder="Description of Dish"
									onChangeText={(itemDescription) =>
										setItemDescription(itemDescription)
									}
									value={itemDescription}
								/>
							</View>

							<View style={{ width: 250, marginVertical: 10 }}>
								<TextInput
									style={styles.inputStyle}
									placeholder="Serving Count"
									onChangeText={(serves) => setServes(serves)}
									value={serves}
								/>
							</View>
						</View>
					)}

					{isConsumer && (
						<>
							<Text>Desired Setting:</Text>
							<DropDownPicker
								style={{ zIndex: 101 }}
								open={peopleOpen}
								value={people}
								items={peopleOptions}
								setOpen={setPeopleOpen}
								setValue={setPeople}
								setItems={setPeopleOptions}
							/>
						</>
					)}

					<>
						<Text>Food Origin:</Text>
						<DropDownPicker
							style={{ zIndex: 102 }}
							open={foodOpen}
							value={food}
							items={foodKinds}
							setOpen={setFoodOpen}
							setValue={setFood}
							setItems={setFoodKinds}
						/>
					</>

					<>
						<Text>Dietary Restrictions:</Text>
						<DropDownPicker
							style={{ zIndex: 100 }}
							open={restrictionOpen}
							value={restriction}
							items={restrictions}
							setOpen={setRestrictionOpen}
							setValue={setRestriction}
							setItems={setRestrictions}
						/>
					</>

					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => {
							let consumerProps = {};
							let producerProps = {};

							if (isConsumer) {
								consumerProps = {
									foodInterests: [food],
									peopleSetting: people,
								};
							} else {
								producerProps = {
									foodKind: [food],
									itemDescription,
									serves: Number(serves),
								};
							}

							const newTicket = {
								creator: userInfo._id,
								location,
								creationDate: new Date().toISOString(),
								dietaryRestrictions: [restriction],
								...consumerProps,
								...producerProps,
							};

							if (modalMode === CREATING) {
								axios
									.post(
										`https://meet4meal.azurewebsites.net/${
											isConsumer ? "consumer" : "producer"
										}/create`,
										newTicket
									)
									.then((res) => {
										if (res.status !== 200) {
											console.error(res.data);
											return;
										}
										setModalMode(CLOSED);
										refreshTickets();
									})
									.catch((err) => console.error(err));
							} else {
								axios
									.post(
										`https://meet4meal.azurewebsites.net/${
											isConsumer ? "consumer" : "producer"
										}/edit`,
										{
											_id: initialTicketData._id,
											fields: {
												...newTicket,
											},
										}
									)
									.then((res) => {
										if (res.status !== 200) {
											console.error(res.data);
											return;
										}
										setModalMode(CLOSED);
										refreshTickets();
									})
									.catch((err) => console.error(err));
							}
						}}
					>
						<Text style={styles.textStyle}>Save</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
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
		marginTop: 10,
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
	inputStyle: {
		borderColor: "gray",
		borderWidth: 1,
	},
});
