import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(undefined);

	const receiveUserInfo = (receivedInfo) => {
		setUserInfo(receivedInfo);
	};

	return (
		<AuthContext.Provider
			value={{
				userInfo,
				receiveUserInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
