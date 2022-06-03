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
import {Entypo, Ionicons} from "@expo/vector-icons";
import Job from "./job";
import {useDispatch, useSelector} from "react-redux";
import Search from "./search";
import Profile from "./profile";
import {showProfile, showSearch} from "../../../Store/homeScreen/modalSlice";
import TopBar from "../TopBar";

function Home(props) {
	//initializing dispatch
	const dispatch = useDispatch();

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<TopBar />

			{/* 👊 body contents. */}
			<View style={styles.bodyContainer}>
				<Body>Recent jobs.</Body>
				<Job />
			</View>
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
	drawerContainer: {
		marginLeft: 10,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
		marginTop: 5,
	},
	searchIcon: {
		marginLeft: 10,
		marginRight: 10,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},

	searchWrapper: {
		width: 40,
		height: 40,
		backgroundColor: color.lightgray,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		borderRadius: 20,
	},
});

export default memo(Home);
