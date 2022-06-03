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

function PostJob(props) {
	// going to register
	const handleGoToRegister = () => {
		// 👇 action.
		props.navigation.navigate("Register");
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View>
				{/* logo of the app. */}
				{/* <HeadingL style={styles.logoText}>Smart Maids</HeadingL> */}

				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Login</HeadingM>

				{/* username input area with a caption at the top. */}
				<Caption style={styles.labelText}>username</Caption>
				<TextInput placeholder='username' style={styles.inputText} />

				{/* a place where the user will be allowed to enter his/ her password. */}
				<Caption style={styles.labelText}>password</Caption>
				<TextInput
					placeholder='password'
					secureTextEntry={true}
					style={styles.inputText}
				/>

				{/* A buton for login */}
				<View style={styles.buttoncontainer}>
					<ButtonText style={styles.loginText}>Login</ButtonText>
				</View>

				{/* for registering new user */}
				<BodyS style={styles.descText}>
					Don't have account?{" "}
					<Pressable onPress={handleGoToRegister}>
						<Body style={styles.registerText}>Register</Body>
					</Pressable>
				</BodyS>
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
});

export default memo(PostJob);
