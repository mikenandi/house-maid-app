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
import {MaterialIcons} from "@expo/vector-icons";

function LocationForm(props) {
	// going to register
	const handleGoToRegister = () => {
		// console.log(props.navigation.navigate("Signup"));
		// props.navigation.navigate('')
		props.navigation.navigate("Register");
	};

	const handleGoPrev = () => {
		props.navigation.navigate("GenderForm");
	};

	const handleGoNext = () => {
		props.navigation.navigate("ContactsForm");
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View>
				{/* logo of the app. */}
				<HeadingL style={styles.logoText}>Smart Maids</HeadingL>

				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Location</HeadingM>

				{/* username input area with a caption at the top. */}
				<Caption style={styles.labelText}>Region</Caption>
				<TextInput placeholder='Region' style={styles.inputText} />

				{/* a place where the user will be allowed to enter his/ her password. */}
				<Caption style={styles.labelText}>District</Caption>
				<TextInput placeholder='District' style={styles.inputText} />

				<Caption style={styles.labelText}>Ward</Caption>
				<TextInput placeholder='Ward' style={styles.inputText} />

				<Caption style={styles.labelText}>Street</Caption>
				<TextInput placeholder='Street' style={styles.inputText} />
			</View>
			{/* for going next or prev state. */}
			<View style={styles.stepContainer}>
				{/* 👈 Going back. */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoPrev}>
					<MaterialIcons
						name='arrow-back'
						size={24}
						color={color.primary}
						style={styles.iconWrapper}
					/>
				</TouchableOpacity>

				{/* 👉 Going forward */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoNext}>
					<MaterialIcons
						name='arrow-forward'
						size={24}
						color={color.primary}
						style={styles.iconWrapper}
					/>
				</TouchableOpacity>
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
});

export default memo(LocationForm);
