import React, {memo, useState} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	TextInput,
	Pressable,
	Modal,
} from "react-native";
import color from "../../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
} from "../../../typography";
import {Ionicons, MaterialIcons, FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
	deleteName,
	saveName,
} from "../../../../Store/homeScreen/registerMaidSlice";
import {
	hideNameForm,
	showBirthDateForm,
} from "../../../../Store/homeScreen/agentModalSlice";
import BirthDateForm from "./BirthDateForm";

function NameForm(props) {
	// setting states
	const [error, set_error] = useState("");
	const [first_name, set_first_name] = useState("");
	const [last_name, set_last_name] = useState("");
	const visible = useSelector((state) => {
		return state.agentModal.birthdateForm;
	});

	// initating dispatch
	const dispatch = useDispatch();

	const handleGoNext = () => {
		if (!first_name || !last_name) {
			set_error("fill all fields");

			setTimeout(() => {
				set_error("");
			}, 5000);
			return;
		}

		dispatch(saveName({first_name, last_name}));
		dispatch(showBirthDateForm());
		return;
	};

	const handleGoPrev = () => {
		dispatch(deleteName());
		dispatch(hideNameForm());
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
			<View style={styles.stepContainer}>
				{/* 🔚 Going back. */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoPrev}>
					<FontAwesome5
						name='long-arrow-alt-left'
						size={24}
						color={color.primary}
					/>
				</TouchableOpacity>
				{/* 👉 Going forward */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoNext}>
					<FontAwesome5
						name='long-arrow-alt-right'
						size={24}
						color={color.primary}
					/>
				</TouchableOpacity>
			</View>
			<View>
				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Names</HeadingM>

				{!!error && <Caption style={styles.errorText}>{error}</Caption>}

				<Caption style={styles.labelText}>First Name</Caption>
				<TextInput
					placeholder='First name'
					style={styles.inputText}
					onChangeText={handleFirstName}
					value={first_name}
				/>

				<Caption style={styles.labelText}>Last Name</Caption>
				<TextInput
					placeholder='Last name'
					style={styles.inputText}
					onChangeText={handleLastName}
					value={last_name}
				/>
			</View>
			<Modal visible={visible} transparent={false} animationType='fade'>
				<BirthDateForm />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
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
		letterSpacing: 0.5,
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
		textTransform: "capitalize",
		marginLeft: 10,
		fontWeight: "bold",
	},
});

export default memo(NameForm);
