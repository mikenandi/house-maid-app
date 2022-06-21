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
	HeadingS,
} from "../../../typography";
import {
	EvilIcons,
	MaterialCommunityIcons,
	MaterialIcons,
	Foundation,
	AntDesign,
} from "@expo/vector-icons";

import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
	hideGenderPreference,
	hidePost,
	hideSalary,
	showPostDesc,
} from "../../../../Store/homeScreen/modalSlice";
import Description from "../PostJob/description";
import {saveSalary} from "../../../../Store/homeScreen/postJobSlice";

function Salary(props) {
	// initializing dispatch
	const dispatch = useDispatch();

	// 👊 initializing states
	const [error, set_error] = React.useState("");
	const [salary, set_salary] = React.useState("");

	const visible = useSelector((state) => {
		return state.modal.postDescVisible;
	});

	const handleBack = () => {
		dispatch(hideSalary());
		return;
	};

	const handleNext = () => {
		if (salary.length < 1) {
			set_error("Please enter salary you offer.");

			setTimeout(() => {
				set_error("");
			}, 7000);

			return;
		}

		if (Number(salary) < 50000) {
			set_error("salary should be greater than Tsh 50,000");

			setTimeout(() => {
				set_error("");
			}, 7000);

			return;
		}

		dispatch(saveSalary(salary));
		dispatch(showPostDesc());
		return;
	};
	const handleClose = () => {
		// dispatch(hidePost());
	};

	const handleSalary = (salary) => {
		set_salary(salary);
		return;
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			{/* 👐 close modals */}
			{false && (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={handleClose}
					style={styles.crossIcon}>
					<EvilIcons name='close' size={30} color='black' />
				</TouchableOpacity>
			)}
			<View style={styles.buttoncontainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={handleBack}>
					<FontAwesome5
						name='long-arrow-alt-left'
						size={24}
						color={color.primary}
					/>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.9} onPress={handleNext}>
					<FontAwesome5
						name='long-arrow-alt-right'
						size={24}
						color={color.primary}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.bodyContainer}>
				<HeadingM style={styles.titleText}>what salary do you offer.</HeadingM>

				{!!error && <BodyS style={styles.errorText}>{error}</BodyS>}

				<View style={styles.inputContainer}>
					<TextInput
						placeholder='amount'
						style={styles.textInput}
						value={salary}
						onChangeText={handleSalary}
						keyboardType='number-pad'
					/>
				</View>
			</View>

			{/* A buton for login */}

			<Modal transparent={false} animationType='fade' visible={visible}>
				<Description />
			</Modal>
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
		backgroundColor: "white",
		width: "100%",
		padding: 15,
		justifyContent: "space-between",
		flexDirection: "row",
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
		padding: 15,
		borderWidth: 1,
		fontSize: 25,
		width: 180,
		borderRadius: 0,
		marginTop: 10,
		backgroundColor: color.lightgray,
		borderRadius: 5,
		fontFamily: "serif",
	},
	inputContainer: {
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		marginLeft: 5,
		textTransform: "capitalize",
	},
});

export default memo(Salary);
