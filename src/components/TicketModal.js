import { useState } from "react";
import { Modal, Pressable, Switch, Text, View, StyleSheet } from "react-native";

const CLOSED = -1,
	EDITING = 0,
	CREATING = 1;

export default function TicketModal({
	initialTicketData,
	modalMode,
	setModalMode,
	refreshTickets,
}) {
	const [isConsumer, setIsConsumer] = useState(!modalMode.serves);
	const [ticketData, setTicketData] = useState(initialTicketData);

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
						/>
					</View>

					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => {
							// TODO: Submit new or edit
							setModalMode(CLOSED);
							refreshTickets();
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
