import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	Image,
	Modal,
} from "react-native";
import color from "../../color";
import {Body, HeadingS} from "../../typography";
import {AntDesign} from "@expo/vector-icons";
import Job from "./job";
import {useDispatch, useSelector} from "react-redux";
import {
	showPost,
	showProfile,
	showSearch,
} from "../../../Store/homeScreen/modalSlice";
import TopBar from "../TopBar";
import Post from "../Home/PostJob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {saveProfile, saveUserId} from "../../../Store/auth";
import EmployerHome from "./employer-home";
import AgentHome from "./agent-home";
import MaidHome from "./maid-home";
import Loading from "../../Loading";
import axios from "axios";

function Home(props) {
	//initializing dispatch
	const dispatch = useDispatch();

	const [userType, setUserType] = React.useState("");

	React.useEffect(() => {
		(async () => {
			try {
				let user_type = await AsyncStorage.getItem("user_type");
				let user_id = await AsyncStorage.getItem("user_id");

				let response = await axios({
					method: "GET",
					url: "http://nuhu-backend.herokuapp.com/api/v1/profile",
					params: {
						user_id: user_id,
					},
				});

				dispatch(saveProfile(response.data.data));

				dispatch(saveUserId(user_id));

				setUserType(user_type);

				return;
			} catch (error) {
				return;
			}
		})();
	}, []);

	if (userType === "employer") return <EmployerHome />;

	if (userType === "agent") return <AgentHome />;

	if (userType === "maid" || userType === "maid-by-agent") return <MaidHome />;

	return <Loading />;
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	bodyContainer: {
		marginTop: 5,
		marginHorizontal: 10,
	},
	buttonContaier: {
		backgroundColor: color.blue,
		padding: 15,
		width: 120,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 30,
		right: 15,
		borderRadius: 10,
	},
	floatingText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default memo(Home);
