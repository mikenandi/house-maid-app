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
import color from "../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
	he,
} from "../../typography";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {deleteName, saveName} from "../../../Store/homeScreen/registerSlice";

function NameForm(props) {
	// setting states
	const [error, set_error] = useState("");
	const [first_name, set_first_name] = useState("");
	const [last_name, set_last_name] = useState("");

	// initating dispatch
	const dispatch = useDispatch();

	// going to register
	const handleGoToRegister = () => {
		// props.navigation.navigate('')
		props.navigation.navigate("Register");
	};

	const handleGoNext = () => {
		if (!first_name || !last_name) {
			set_error("fill all fields");

			setTimeout(() => {
				set_error("");
			}, 5000);
			return;
		}

		dispatch(saveName({first_name, last_name}));
		props.navigation.navigate("GenderForm");
		return;
	};

	const handleGoPrev = () => {
		dispatch(deleteName());
		props.navigation.navigate("Register");
	};

	const handleFirstName = (first_name) => {
		set_first_name(first_name);
	};

	const handleLastName = (last_name) => {
		set_last_name(last_name);
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View>
				{/* logo of the app. */}
				<HeadingL style={styles.logoText}>Smart Maids</HeadingL>

				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Names</HeadingM>

				{/* username input area with a caption at the top. */}
				{!!error && <Caption style={styles.errorText}>{error}</Caption>}

				<Caption style={styles.labelText}>First Name</Caption>
				<TextInput
					placeholder='First name'
					style={styles.inputText}
					onChangeText={handleFirstName}
					value={first_name}
				/>

				{/* a place where the user will be allowed to enter his/ her password. */}
				<Caption style={styles.labelText}>Last Name</Caption>
				<TextInput
					placeholder='Last name'
					style={styles.inputText}
					onChangeText={handleLastName}
					value={last_name}
				/>
			</View>
			{/* for going next or prev state. */}
			<View style={styles.stepContainer}>
				{/* 🔚 Going back. */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoPrev}>
					<MaterialIcons
						name='arrow-back'
						size={24}
						color={color.primary}
						style={styles.iconWrapper}
					/>

					{/* 👉 Going forward */}
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoNext}>
					<MaterialIcons
						name='arrow-forward'
						size={24}
						color={color.primary}
						style={styles.iconWrapper}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
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
	logoText: {
		color: color.primary,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
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
		marginTop: 10,
	},
	buttoncontainer: {
		backgroundColor: color.primary,
		width: 240,
		padding: 15,
		margin: 5,
		justifyContent: "center",
		alignItems: "center",
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
	stepContainer: {
		backgroundColor: "white",
		width: "90%",
		padding: 10,
		justifyContent: "space-between",
		alignItems: "flex-end",
		marginTop: 20,
		flexDirection: "row",
	},
	iconWrapper: {
		backgroundColor: color.lightgray,
		padding: 10,
		borderRadius: 20,
	},
	errorText: {
		color: "red",
		marginLeft: 10,
		textTransform: "capitalize",
	},
});

export default memo(NameForm);
