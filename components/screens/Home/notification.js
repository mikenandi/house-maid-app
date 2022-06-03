import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import color from "../../color";
import {Body} from "../../typography";
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
			<StatusBar backgroundColor={color.lightgray} />
			<TouchableOpacity activeOpacity={0.9} onPress={handleHide}>
				<Ionicons name='arrow-back' size={24} color='black' />
			</TouchableOpacity>
			<View>
				<Body>notifications</Body>
			</View>
		</View>
	);
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
});

export default memo(Profile);
