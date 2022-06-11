import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaidStatus from "./maid";
import EmployerStatus from "./employer";
import AgentAnimation from "./agent-animation";

function Notification(props) {
	const [userType, setUserType] = React.useState("");

	React.useEffect(() => {
		(async () => {
			try {
				let user_type = await AsyncStorage.getItem("user_type");
				let user_id = await AsyncStorage.getItem("user_id");

				setUserType(user_type);

				return;
			} catch (error) {
				return;
			}
		})();

		return () => {
			setUserType("");
		};
	}, []);

	if (userType === "employer") return <EmployerStatus />;

	if (userType === "maid" || userType === "maid-by-agent")
		return <MaidStatus />;

	return <AgentAnimation />;
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	drawerContainer: {
		marginLeft: 10,
		marginVertical: 5,
		backgroundColor: "white",
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		padding: 5,
	},
	body: {
		marginTop: 10,
		marginHorizontal: 20,
	},
});

export default memo(Notification);
