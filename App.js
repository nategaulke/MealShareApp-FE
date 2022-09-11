import React from "react";
import { SafeAreaView } from "react-native";
import { AuthProvider } from "./src/authContext";
import Navigation from "./src/components/Navigation";

export default function App() {
	return (
		<AuthProvider>
			<Navigation />
		</AuthProvider>
	);
}
