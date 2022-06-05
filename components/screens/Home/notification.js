import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import color from "../../color";
import {Body, HeadingS} from "../../typography";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {hideNotification} from "../../../Store/homeScreen/modalSlice";

function Profile(props) {
	// initializing dispatch.
	const dispatch = useDispatch();

	// function to change state of the visible property to hide the modal
	const handleHide = () => {
		dispatch(hideNotification());
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
			<View style={styles.topbar}>
				<TouchableOpacity activeOpacity={0.9} onPress={handleHide}>
					<Ionicons name='arrow-back' size={24} color='black' />
				</TouchableOpacity>
				<HeadingS style={styles.headerText}>Notifications</HeadingS>
			</View>
			<View style={styles.body}>
				<View style={styles.notificationContainer}>
					<Body>notifications</Body>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	topbar: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	headerText: {
		color: color.dimblack,
		marginLeft: 15,
	},
	notificationContainer: {
		width: "90%",
		height: 120,
		padding: 10,
		borderLeftWidth: 8,
		borderLeftColor: color.primary,
		backgroundColor: color.lightgray,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		marginTop: 10,
	},
	body: {
		alignItems: "center",
	},
});

export default memo(Profile);
