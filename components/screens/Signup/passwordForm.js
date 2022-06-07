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
} from "../../typography";
import {MaterialIcons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {deletePassword} from "../../../Store/homeScreen/registerSlice";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loggedIn} from "../../../Store/auth";

function PasswordForm(props) {
	//initializing
	const dispatch = useDispatch();

	// getting data from register.
	const register = useSelector((state) => {
		return state.register;
	});

	// console.log(register);

	const [error, set_error] = useState("");
	const [password, set_password] = useState("");
	const [confirm_password, set_confirm_password] = useState("");

	const handlePassword = (password) => {
		set_password(password);
		return;
	};

	const handleConfirmPassword = (confirm_password) => {
		set_confirm_password(confirm_password);
		return;
	};

	// going to register
	const handleGoPrev = () => {
		// console.log(props.navigation.navigate("Signup"));
		// props.navigation.navigate('')
		dispatch(deletePassword());
		props.navigation.navigate("ContactsForm");
		return;
	};

	const saveToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
		return;
	};

	const saveCredentials = async (key, value) => {
		await AsyncStorage.setItem(key, value);
		return;
	};
	const handleRegister = async () => {
		try {
			if (password.length < 6) {
				set_error("Too short password, min 6 characters.");
				setTimeout(() => {
					set_error("");
				}, 5000);
				return;
			}

			if (password !== confirm_password) {
				set_error("Passwords do not match");
				setTimeout(() => {
					set_error("");
				}, 5000);
				return;
			}

			let response = await axios({
				method: "POST",
				url: "http://nuhu-backend.herokuapp.com/api/v1/register",
				data: {
					first_name: register.firstName,
					last_name: register.lastName,
					email: register.email,
					password: password,
					phone_number: register.phoneNumber,
					gender: register.gender,
					birthdate: register.birthDate,
					region: register.location.region,
					district: register.location.district,
					ward: register.location.ward,
					street: register.location.street,
					role: register.role,
				},
			});

			// saving token.
			saveToken("authToken", response.data.data.auth_token);
			// saving id
			saveCredentials("user_id", response.data.data.user_id);
			// saving role
			saveCredentials("user_type", response.data.data.role);

			dispatch(loggedIn());
			return;
		} catch (error) {
			set_error(error.response.message);
			return;
		}
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View>
				{/* logo of the app. */}
				<HeadingL style={styles.logoText}>Smart Maids</HeadingL>

				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Password</HeadingM>

				{
					//hiding error when there is nothing to see.
					!!error && <Caption style={styles.errorText}>{error}</Caption>
				}

				<Caption style={styles.labelText}>password</Caption>
				<TextInput
					placeholder='password'
					secureTextEntry={true}
					style={styles.inputText}
					value={password}
					onChangeText={handlePassword}
				/>

				{/* a place where the user will be allowed to enter his/ her password. */}
				<Caption style={styles.labelText}>confirm password</Caption>
				<TextInput
					placeholder='password'
					secureTextEntry={true}
					style={styles.inputText}
					value={confirm_password}
					onChangeText={handleConfirmPassword}
				/>

				{/* A buton for registering. */}
				<TouchableOpacity
					style={styles.buttoncontainer}
					activeOpacity={0.8}
					onPress={handleRegister}>
					<ButtonText style={styles.loginText}>Register</ButtonText>
				</TouchableOpacity>
			</View>

			{
				// making things not visible
				false && (
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={handleGoPrev}
						style={styles.stepContainer}>
						<MaterialIcons
							name='arrow-back'
							size={20}
							color={color.primary}
							style={styles.iconWrapper}
						/>
					</TouchableOpacity>
				)
			}
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
		justifyContent: "flex-end",
		alignItems: "flex-start",
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

export default memo(PasswordForm);
