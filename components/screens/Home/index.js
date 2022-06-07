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

function Home(props) {
	const [userType, setUserType] = React.useState("");

	React.useEffect(() => {
		(async () => {
			try {
				let user_type = await AsyncStorage.getItem("user_type");
				setUserType(user_type);

				return;
			} catch (error) {
				return;
			}
		})();
	}, []);

	//initializing dispatch
	const dispatch = useDispatch();

	const visible = useSelector((state) => {
		return state.modal.postVisible;
	});

	const handlePost = () => {
		dispatch(showPost());
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<TopBar />

			{/* 👊 body contents. */}
			<View style={styles.bodyContainer}>
				<Body>Recent jobs.</Body>
				<Job />
			</View>

			{/* 👋 making person to post an job. */}
			{userType === "employer" && (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={handlePost}
					style={styles.buttonContaier}>
					<AntDesign name='plus' size={20} color='white' />
					<Body style={styles.floatingText}>Post job</Body>
				</TouchableOpacity>
			)}

			{/* ✋ */}
			<Modal transparent={false} visible={visible} animationType='fade'>
				<Post />
			</Modal>
		</View>
	);
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
