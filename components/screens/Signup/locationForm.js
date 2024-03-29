import React, {memo, useState} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	TextInput,
	Pressable,
	ScrollView,
} from "react-native";
import color from "../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
} from "../../typography";
import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {
	deleteLocation,
	saveLocation,
} from "../../../Store/homeScreen/registerSlice";

function LocationForm(props) {
	// intializing dispatch
	const dispatch = useDispatch();

	// states for filling forms
	const [error, set_error] = useState("");
	const [region, set_region] = useState("");
	const [district, set_district] = useState("");
	const [ward, set_ward] = useState("");
	const [street, set_street] = useState("");

	// functionts to handle inputing values
	const handleRegion = (region) => {
		set_region(region);
		return;
	};

	const handleDistrict = (district) => {
		set_district(district);
		return;
	};

	const handleWard = (ward) => {
		set_ward(ward);
		return;
	};

	const handleStreet = (street) => {
		set_street(street);
		return;
	};
	// going to register
	const handleGoToRegister = () => {
		// console.log(props.navigation.navigate("Signup"));
		// props.navigation.navigate('')
		props.navigation.navigate("Register");
		return;
	};

	const handleGoPrev = () => {
		dispatch(deleteLocation());
		props.navigation.navigate("GenderForm");
		return;
	};

	const handleGoNext = () => {
		if (!region || !district || !ward || !street) {
			set_error("fill all parts before going next step");
			setTimeout(() => {
				set_error("");
			}, 4000);
			return;
		}
		dispatch(saveLocation({region, district, ward, street}));
		props.navigation.navigate("ContactsForm");
		return;
	};

	return (
		<ScrollView style={styles.scrollContainer}>
			<View style={styles.screen}>
				<StatusBar backgroundColor='white' />
				{/* for going next or prev state. */}
				<View style={styles.stepContainer}>
					{/* 👈 Going back. */}
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
					<HeadingM style={styles.titleText}>Location</HeadingM>

					{/* username input area with a caption at the top. */}
					{!!error && <Caption style={styles.errorText}>{error}</Caption>}

					<Caption style={styles.labelText}>Region</Caption>
					<TextInput
						placeholder='Region'
						style={styles.inputText}
						onChangeText={handleRegion}
						value={region}
					/>

					{/* a place where the user will be allowed to enter his/ her password. */}
					<Caption style={styles.labelText}>District</Caption>
					<TextInput
						placeholder='District'
						style={styles.inputText}
						onChangeText={handleDistrict}
						value={district}
					/>

					<Caption style={styles.labelText}>Ward</Caption>
					<TextInput
						placeholder='Ward'
						style={styles.inputText}
						onChangeText={handleWard}
						value={ward}
					/>

					<Caption style={styles.labelText}>Street</Caption>
					<TextInput
						placeholder='Street'
						style={styles.inputText}
						onChangeText={handleStreet}
						value={street}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		backgroundColor: "white",
	},
	screen: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
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
		marginTop: 5,
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
		marginLeft: 5,
		textTransform: "capitalize",
	},
});

export default memo(LocationForm);
