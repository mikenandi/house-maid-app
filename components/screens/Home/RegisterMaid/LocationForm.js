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
import color from "../../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
} from "../../../typography";
import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
	deleteLocation,
	saveLocation,
} from "../../../../Store/homeScreen/registerMaidSlice";
import {
	hideAllRegisterMaidModals,
	hideLocationForm,
} from "../../../../Store/homeScreen/agentModalSlice";
import axios from "axios";
import Loading from "../../../Loading";

function LocationForm(props) {
	// intializing dispatch
	const dispatch = useDispatch();

	// states for filling forms
	const [error, set_error] = useState("");
	const [isloading, set_isloading] = useState(false);
	const [region, set_region] = useState("");
	const [district, set_district] = useState("");
	const [ward, set_ward] = useState("");
	const [street, set_street] = useState("");
	const inputs = useSelector((state) => {
		return state.registerMaid;
	});

	const user_id = useSelector((state) => {
		return state.auth.userId;
	});

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

	const handleGoPrev = () => {
		dispatch(deleteLocation());
		dispatch(hideLocationForm());
		return;
	};

	const handleRegister = async () => {
		try {
			if (!region || !district || !ward || !street) {
				set_error("fill all fields before registering");
				setTimeout(() => {
					set_error("");
				}, 4000);
				return;
			}

			dispatch(saveLocation({region, district, ward, street}));

			set_isloading(true);

			let response = await axios({
				method: "POST",
				url: "http://nuhu-backend.herokuapp.com/api/v1/register-maid",
				params: {user_id: user_id},
				data: {
					first_name: inputs.firstName,
					last_name: inputs.lastName,
					gender: inputs.gender,
					email: inputs.email,
					birthdate: inputs.birthDate,
					phone_number: inputs.phoneNumber,
					region: region,
					district: district,
					ward: ward,
					street: street,
				},
			});

			dispatch(hideAllRegisterMaidModals());

			return;
		} catch (error) {
			set_error(error.response.data.message);
			set_isloading(false);
			setTimeout(() => {
				set_error("");
			}, 7000);

			return;
		}
	};

	if (isloading) return <Loading />;

	return (
		<ScrollView>
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
				<TouchableOpacity
					style={styles.buttoncontainer}
					activeOpacity={0.8}
					onPress={handleRegister}>
					<ButtonText style={styles.buttonText}>register maid</ButtonText>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
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
		borderRadius: 10,
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

	errorText: {
		color: "red",
		marginLeft: 5,
		fontWeight: "bold",
		textTransform: "capitalize",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default memo(LocationForm);
