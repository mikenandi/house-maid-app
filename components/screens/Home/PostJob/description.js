import React, {memo, useState} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	TextInput,
	Pressable,
} from "react-native";
import color from "../../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
	HeadingS,
} from "../../../typography";
import {
	EvilIcons,
	MaterialCommunityIcons,
	MaterialIcons,
	Foundation,
	AntDesign,
} from "@expo/vector-icons";

import {FontAwesome} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {
	hideGenderPreference,
	hidePost,
	hideSalary,
} from "../../../../Store/homeScreen/modalSlice";

function Salary(props) {
	// initializing dispatch
	const dispatch = useDispatch();

	// going to register
	const handleGoToRegister = () => {
		// 👇 action.
		props.navigation.navigate("Register");
	};

	const handleBack = () => {
		dispatch(hideSalary());
	};

	const handleNext = () => {};
	const handleClose = () => {
		// dispatch(hidePost());
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			{/* 👐 close modals */}
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handleClose}
				style={styles.crossIcon}>
				<EvilIcons name='close' size={30} color='black' />
			</TouchableOpacity>

			<View style={styles.bodyContainer}>
				<HeadingM style={styles.titleText}>more descriptions.</HeadingM>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='descriptions'
						style={styles.textInput}
						multiline={true}
						numberOfLines={6}
					/>
				</View>
			</View>

			{/* A buton for login */}
			<View style={styles.bottomContainer}>
				<TouchableOpacity style={styles.buttoncontainer}>
					<ButtonText style={styles.buttonText}>post now</ButtonText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		// justifyContent: "center",
		// alignItems: "center",
	},
	inputText: {
		padding: 10,
		borderWidth: 1,
		margin: 5,
		width: 240,
		fontSize: 16,
		borderRadius: 5,
	},
	labelText: {
		marginHorizontal: 5,
		marginTop: 5,
	},
	buttoncontainer: {
		backgroundColor: color.primary,
		width: "80%",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	loginText: {
		color: "white",
		fontWeight: "bold",
	},
	descText: {
		color: color.dimblack,
		marginLeft: 5,
	},
	registerText: {
		color: color.primary,
		fontWeight: "bold",
	},
	titleText: {
		color: color.dimblack,
	},
	crossIcon: {
		width: "100%",
		padding: 15,
	},
	bodyContainer: {
		padding: 15,
	},
	serviceContainer: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
		marginTop: 10,
	},
	iconBox: {
		backgroundColor: color.primary,
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	textInput: {
		padding: 10,
		borderWidth: 1,
		fontSize: 16,
		width: 240,
		borderRadius: 10,
		borderColor: "black",
	},
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	bottomContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
});

export default memo(Salary);
