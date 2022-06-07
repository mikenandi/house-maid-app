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
	hideJobType,
	showSalary,
} from "../../../../Store/homeScreen/modalSlice";
import Salary from "./salary";
import {
	deleteType,
	fulltimeType,
	partTimeType,
} from "../../../../Store/homeScreen/postJobSlice";

function JobType(props) {
	const visible = useSelector((state) => {
		return state.modal.salaryVisible;
	});

	// initializing dispatch
	const dispatch = useDispatch();

	const handleBack = () => {
		dispatch(hideJobType());
		return;
	};

	const handleNext = () => {
		dispatch(showSalary());
		return;
	};
	const handleClose = () => {
		// dispatch(hidePost());
		dispatch(deleteType());
		dispatch(hideJobType());
		return;
	};

	const handleFullTime = () => {
		dispatch(fulltimeType());
		dispatch(showSalary());
		return;
	};

	const handlePartTime = () => {
		dispatch(partTimeType());
		dispatch(showSalary());
		return;
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			{/* 👐 close modals */}
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handleClose}
				style={styles.crossIcon}>
				<FontAwesome5
					name='long-arrow-alt-left'
					size={24}
					color={color.primary}
				/>
			</TouchableOpacity>

			<View style={styles.bodyContainer}>
				<HeadingM style={styles.titleText}>What kind job is that.</HeadingM>
				<View>
					<TouchableOpacity
						style={styles.serviceContainer}
						activeOpacity={0.8}
						onPress={handlePartTime}>
						<View style={styles.iconBox}>
							<MaterialCommunityIcons
								name='clipboard-clock-outline'
								size={35}
								color='white'
							/>
						</View>
						<HeadingS>Part time</HeadingS>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.serviceContainer}
						activeOpacity={0.8}
						onPress={handleFullTime}>
						<View style={styles.iconBox}>
							<AntDesign name='clockcircle' size={35} color='white' />
						</View>

						<HeadingS>Full time</HeadingS>
					</TouchableOpacity>
				</View>
			</View>

			{/* A buton for login */}
			{false && (
				<View style={styles.buttoncontainer}>
					<TouchableOpacity activeOpacity={0.9} onPress={handleBack}>
						<EvilIcons name='arrow-left' size={45} color='black' />
					</TouchableOpacity>

					<TouchableOpacity activeOpacity={0.9} onPress={handleNext}>
						<EvilIcons name='arrow-right' size={45} color='black' />
					</TouchableOpacity>
				</View>
			)}

			<Modal transparent={false} animationType='fade' visible={visible}>
				<Salary />
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
});

export default memo(JobType);
