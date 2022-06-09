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
import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {
	deleteContacts,
	saveContacts,
} from "../../../Store/homeScreen/registerSlice";

function ContactsForm(props) {
	// initializing dispatch
	const dispatch = useDispatch();

	// intilizing states
	const [error, set_error] = React.useState("");
	const [email, set_email] = React.useState("");
	const [phone_number, set_phone_number] = React.useState("");

	const handleEmail = (email) => {
		set_email(email);
		return;
	};

	const handlePhoneNumber = (phone_number) => {
		set_phone_number(phone_number);
		return;
	};

	const handleGoPrev = () => {
		dispatch(deleteContacts());
		props.navigation.navigate("LocationForm");
	};

	const handleGoNext = () => {
		if (!email && !phone_number) {
			set_error("fill all fields before going next step.");
			setTimeout(() => {
				set_error("");
			}, 5000);
			return;
		}

		dispatch(saveContacts({email, phone_number}));
		props.navigation.navigate("PasswordForm");
		return;
	};

	return (
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
				<HeadingM style={styles.titleText}>Contacts</HeadingM>

				{/* username input area with a caption at the top. */}
				{!!error && <Caption style={styles.errorText}>{error}</Caption>}

				<Caption style={styles.labelText}>Email</Caption>
				<TextInput
					placeholder='email'
					style={styles.inputText}
					onChangeText={handleEmail}
					value={email}
				/>

				{/* a place where the user will be allowed to enter his/ her password. */}
				<Caption style={styles.labelText}>Phone Number</Caption>
				<TextInput
					placeholder='Phone number'
					style={styles.inputText}
					keyboardType='number-pad'
					onChangeText={handlePhoneNumber}
					value={phone_number}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
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
		marginLeft: 10,
		textTransform: "capitalize",
	},
});

export default memo(ContactsForm);
