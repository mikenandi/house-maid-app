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
} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
	hidePost,
	showGenderPreference,
} from "../../../../Store/homeScreen/modalSlice";
import GenderPreference from "../PostJob/gender-preference";
import {
	deleteService,
	homeAssistant,
	homeBabySitter,
	homeCleaning,
	homeCooking,
} from "../../../../Store/homeScreen/postJobSlice";

function PostJob(props) {
	// initializing dispatch
	const dispatch = useDispatch();

	const visible = useSelector((state) => {
		return state.modal.genderPreferenceVisible;
	});

	// going to register
	const handleGoNext = () => {
		// 👇 action.
		dispatch(showGenderPreference());
		return;
	};

	const handleClose = () => {
		dispatch(deleteService());
		dispatch(hidePost());
		return;
	};

	const handleHomeAssistant = () => {
		dispatch(homeAssistant());
		dispatch(showGenderPreference());
		return;
	};

	const handleHouseCleaning = () => {
		dispatch(homeCleaning());
		dispatch(showGenderPreference());
		return;
	};

	const handleCooking = () => {
		dispatch(homeCooking());
		dispatch(showGenderPreference());
		return;
	};

	const handleBabySitter = () => {
		dispatch(homeBabySitter());
		dispatch(showGenderPreference());
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
				<EvilIcons name='close' size={30} color='black' />
			</TouchableOpacity>

			<View style={styles.bodyContainer}>
				<HeadingM style={styles.titleText}>What service do you need.</HeadingM>
				<View>
					<TouchableOpacity
						style={styles.serviceContainer}
						activeOpacity={0.8}
						onPress={handleHomeAssistant}>
						<View style={styles.iconBox}>
							<MaterialCommunityIcons
								name='home-assistant'
								size={35}
								color='white'
							/>
						</View>
						<HeadingS>Home assistant</HeadingS>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.serviceContainer}
						activeOpacity={0.8}
						onPress={handleHouseCleaning}>
						<View style={styles.iconBox}>
							<MaterialIcons name='cleaning-services' size={35} color='white' />
						</View>

						<HeadingS>Home cleaning</HeadingS>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.serviceContainer}
						activeOpacity={0.8}
						onPress={handleBabySitter}>
						<View style={styles.iconBox}>
							<MaterialCommunityIcons
								name='human-baby-changing-table'
								size={35}
								color='white'
							/>
						</View>

						<HeadingS>Home Baby sitter</HeadingS>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.serviceContainer}
						activeOpacity={0.8}
						onPress={handleCooking}>
						<View style={styles.iconBox}>
							<MaterialCommunityIcons name='chef-hat' size={35} color='white' />
						</View>
						<HeadingS>Home cooking</HeadingS>
					</TouchableOpacity>
				</View>
			</View>

			{/* A buton for login */}
			{false && (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={handleGoNext}
					style={styles.buttoncontainer}>
					<EvilIcons name='arrow-right' size={45} color='black' />
				</TouchableOpacity>
			)}

			<Modal transparent={false} animationType='fade' visible={visible}>
				<GenderPreference />
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
		alignItems: "flex-end",
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

export default memo(PostJob);
