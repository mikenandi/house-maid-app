import React, {memo} from "react";
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
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login(props) {
	// initializing states
	const [error, set_error] = React.useState("");
	const [email, set_email] = React.useState("");
	const [password, set_password] = React.useState("");

	// functions to handle the inputs.
	const handleEmail = (email) => {
		set_email(email);
		return;
	};

	const handlePassword = (password) => {
		set_password(password);
		return;
	};

	const handleLogin = async () => {
		try {
			if (!email || !password) {
				set_error("fill all fields");

				setTimeout(() => {
					set_error("");
				}, 3000);

				return;
			}

			let response = await axios({
				method: "POST",
				url: "http://nuhu-backend.herokuapp.com/api/v1/login",
				data: {
					email: email,
					password: password,
				},
			});

			await SecureStore.setItemAsync(
				"authToken",
				response.data.data.auth_token,
			);

			await AsyncStorage.setItem("user_id", response.data.data.user_id);
			await AsyncStorage.setItem("user_type", response.data.data.user_role);

			// initializing states.
			set_email("");
			set_password("");

			// props.navigation.navigate("Home");
			return;
		} catch (error) {
			if (error.response.data.code === "username_not_found") {
				set_error(error.response.data.message);

				setTimeout(() => {
					set_error("");
				}, 5000);

				return;
			}

			if (error.response.data.code === "wrong_password") {
				set_error(error.response.data.message);

				setTimeout(() => {
					set_error("");
				}, 5000);

				return;
			}

			return;
		}
	};
	// going to register
	const handleGoToRegister = () => {
		// Going to register route.
		props.navigation.navigate("Register");
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View>
				{/* logo of the app. */}
				<HeadingL style={styles.logoText}>Smart Maids</HeadingL>

				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Login</HeadingM>

				{/* username input area with a caption at the top. */}
				{!!error && <Caption style={styles.errorText}>{error}</Caption>}
				<Caption style={styles.labelText}>email</Caption>
				<TextInput
					placeholder='email'
					style={styles.inputText}
					onChangeText={handleEmail}
					value={email}
				/>

				{/* a place where the user will be allowed to enter his/ her password. */}
				<Caption style={styles.labelText}>password</Caption>
				<TextInput
					placeholder='password'
					secureTextEntry={true}
					style={styles.inputText}
					value={password}
					onChangeText={handlePassword}
				/>

				{/* A buton for login */}
				<TouchableOpacity
					style={styles.buttoncontainer}
					activeOpacity={0.7}
					onPress={handleLogin}>
					<ButtonText style={styles.loginText}>Login</ButtonText>
				</TouchableOpacity>

				{/* for registering new user */}
				<View style={styles.bottomContainer}>
					<BodyS style={styles.descText}>Don't have account? </BodyS>
					<Pressable onPress={handleGoToRegister}>
						<Body style={styles.registerText}>Register</Body>
					</Pressable>
				</View>
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
	bottomContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
	},
	errorText: {
		color: "red",
		marginLeft: 10,
		textTransform: "capitalize",
	},
});

export default memo(Login);
