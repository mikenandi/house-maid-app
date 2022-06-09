import React, {memo, useState} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	Modal,
} from "react-native";
import color from "../../../color";
import {Body, BodyS, HeadingS, ButtonText} from "../../../typography";
import {EvilIcons} from "@expo/vector-icons";
import {Fontisto} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../../Card";
import {
	showBirthDateForm,
	showNameForm,
} from "../../../../Store/homeScreen/agentModalSlice";
import {saveGender} from "../../../../Store/homeScreen/registerMaidSlice";
import NameForm from "./NameForm.js";

function RegisterMaid(props) {
	// 👋 using use dispatch.
	const dispatch = useDispatch();

	// 👇variable for making description visible.
	const visible = useSelector((state) => {
		return state.agentModal.nameForm;
	});

	const handleFemale = () => {
		dispatch(saveGender("female"));
		dispatch(showNameForm());
		return;
	};

	const handleMale = () => {
		dispatch(saveGender("male"));
		dispatch(showNameForm());
		return;
	};

	return (
		<View>
			<Card style={styles.container}>
				<View>
					<HeadingS style={styles.titleText}>select gender</HeadingS>
					<TouchableOpacity
						style={styles.row}
						activeOpacity={0.8}
						onPress={handleFemale}>
						<View style={styles.iconWrapper}>
							<Fontisto name='female' size={40} color={color.primary} />
						</View>

						<HeadingS style={styles.labelText}> female </HeadingS>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.row}
						activeOpacity={0.8}
						onPress={handleMale}>
						<View style={styles.iconWrapper}>
							<Fontisto name='male' size={40} color={color.primary} />
						</View>

						<HeadingS style={styles.labelText}>male</HeadingS>
					</TouchableOpacity>
				</View>

				{false && (
					<View style={styles.actionsContainer}>
						<View style={styles.hidebutton}>
							<ButtonText style={styles.hideText}>Hide</ButtonText>
						</View>

						<View style={styles.buttonContainer}>
							<ButtonText style={styles.applyText}>apply</ButtonText>
						</View>
					</View>
				)}
			</Card>

			<Modal transparent={false} animationType='fade' visible={visible}>
				<NameForm />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		padding: 15,
		borderRadius: 15,
		backgroundColor: "white",
		paddingHorizontal: 20,
	},

	actionsContainer: {
		flexDirection: "row",
		Padding: 20,
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 20,
	},
	titleText: {
		fontWeight: "normal",
	},

	labelText: {
		color: color.dimblack,
		marginLeft: 20,
		textTransform: "capitalize",
	},

	buttonContainer: {
		backgroundColor: color.primary,
		padding: 10,
		width: 100,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		borderRadius: 5,
	},
	hidebutton: {
		backgroundColor: "white",
		padding: 10,
		width: 100,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		borderRadius: 5,
		borderColor: color.primary,
		borderWidth: 1,
	},
	applyText: {
		color: "white",
	},
	hideText: {
		color: color.primary,
	},
	iconWrapper: {
		width: 80,
		height: 80,
		backgroundColor: color.lightgray,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
	},
});

export default memo(RegisterMaid);
