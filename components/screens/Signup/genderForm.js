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
	he,
} from "../../typography";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

function GenderForm(props) {
	// going to register
	const handleGoToRegister = () => {
		// console.log(props.navigation.navigate("Signup"));
		// props.navigation.navigate('')
		props.navigation.navigate("Register");
	};

	const handleGoNext = () => {
		props.navigation.navigate("LocationForm");
	};

	const handleGoPrev = () => {
		props.navigation.navigate("NameForm");
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View>
				{/* logo of the app. */}
				<HeadingL style={styles.logoText}>Smart Maids</HeadingL>

				{/* title of the activity in the screen. */}
				<HeadingM style={styles.titleText}>Personal details</HeadingM>

				{/* <TextInput placeholder='First name' style={styles.inputText} /> */}

				{/* a place where the user will be allowed to enter his/ her password. */}

				<Caption style={styles.labelText}>Birth date</Caption>
				<View style={styles.dateInputs}>
					<TextInput
						placeholder='date'
						style={styles.inputText}
						keyboardType='number-pad'
						maxLength={2}
					/>
					<TextInput
						placeholder='month'
						style={styles.inputText}
						keyboardType='number-pad'
						maxLength={2}
					/>
					<TextInput
						placeholder='year'
						style={styles.inputText}
						keyboardType='number-pad'
						maxLength={4}
					/>
				</View>
				{/* username input area with a caption at the top. */}
				<View style={styles.space} />
				<Caption style={styles.labelText}>Gender</Caption>
				<View style={styles.dotContainer}>
					<View style={styles.dot}>
						<View style={styles.innerDot} />
					</View>
					<Body>Male</Body>
				</View>
				<View style={styles.dotContainer}>
					<View style={styles.dot}>
						<View style={styles.innerDot} />
					</View>
					<Body>Female</Body>
				</View>
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

					{/* 👉 Going forward */}
				</TouchableOpacity>
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
		width: 60,
		fontSize: 16,
		borderRadius: 5,
	},
	labelText: {
		marginHorizontal: 5,
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
	dotContainer: {
		flexDirection: "row",
		marginTop: 10,
	},
	dot: {
		width: 16,
		height: 16,
		padding: 4,
		borderRadius: 8,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: color.primary,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	innerDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: color.primary,
	},
	space: {
		marginTop: 20,
	},
	dateInputs: {
		flexDirection: "row",
	},
});

export default memo(GenderForm);
