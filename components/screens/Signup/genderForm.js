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
	he,
} from "../../typography";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {
	deletePersonal,
	savePersonal,
} from "../../../Store/homeScreen/registerSlice";

function GenderForm(props) {
	// initialing use dispatch
	const dispatch = useDispatch();

	// going to register
	const [error, set_error] = useState("");
	const [male, set_male] = useState(true);
	const [female, set_female] = useState(false);
	const [date, set_date] = useState("");
	const [month, set_month] = useState("");
	const [year, set_year] = useState("");

	const handleDate = (date) => {
		if (Number(date) <= 31) {
			set_date(date);
			return;
		}
	};

	const handleMonth = (month) => {
		if (Number(month) <= 12) {
			set_month(month);
			return;
		}
	};

	const handleYear = (year) => {
		set_year(year);
		return;
	};

	const handleMale = () => {
		set_female(!female);
		set_male(!male);
		return;
	};

	const handleFemale = () => {
		set_female(!female);
		set_male(!male);
		return;
	};

	const handleGoToRegister = () => {
		// console.log(props.navigation.navigate("Signup"));
		// props.navigation.navigate('')
		props.navigation.navigate("Register");
	};

	const handleGoNext = () => {
		if (!date || !month || !year) {
			set_error("fill all fields in birth date");
			setTimeout(() => {
				set_error("");
			}, 4000);

			return;
		}
		if (Number(date) <= 0 || Number(month) <= 0 || Number(year) <= 1960) {
			set_error("invalid date");
			setTimeout(() => {
				set_error("");
			}, 4000);

			return;
		}
		if (date && month && year) {
			let birthDate =
				date.padStart(2, "0") + "-" + month.padStart(2, "0") + "-" + year;

			if (male) {
				dispatch(savePersonal({gender: "male", birthDate}));
			}

			if (female) {
				dispatch(savePersonal({gender: "female", birthDate}));
			}

			props.navigation.navigate("LocationForm");
			return;
		}
	};

	const handleGoPrev = () => {
		dispatch(deletePersonal());
		props.navigation.navigate("NameForm");
		return;
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

				{!!error && <Caption style={styles.errorText}>{error}</Caption>}

				<View style={styles.dateInputs}>
					<TextInput
						placeholder='date'
						style={styles.inputText}
						keyboardType='number-pad'
						maxLength={2}
						onChangeText={handleDate}
						value={date}
					/>
					<TextInput
						placeholder='month'
						style={styles.inputText}
						keyboardType='number-pad'
						maxLength={2}
						onChangeText={handleMonth}
						value={month}
					/>
					<TextInput
						placeholder='year'
						style={styles.inputText}
						keyboardType='number-pad'
						maxLength={4}
						onChangeText={handleYear}
						value={year}
					/>
				</View>
				{/* Gender radio button. */}
				<View style={styles.space} />
				<Caption style={styles.labelText}>Gender</Caption>

				{/* for males */}
				<TouchableOpacity
					style={styles.dotContainer}
					activeOpacity={0.8}
					onPress={handleMale}>
					<View style={styles.dot}>
						{male && <View style={styles.innerDot} />}
					</View>
					<Body>Male</Body>
				</TouchableOpacity>

				{/* for females */}
				<TouchableOpacity
					style={styles.dotContainer}
					activeOpacity={0.8}
					onPress={handleFemale}>
					<View style={styles.dot}>
						{female && <View style={styles.innerDot} />}
					</View>
					<Body>Female</Body>
				</TouchableOpacity>
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
		width: 70,
		fontSize: 16,
		borderRadius: 5,
		letterSpacing: 0.5,
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
		marginHorizontal: 5,
		alignItems: "center",
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
	errorText: {
		color: "red",
		textTransform: "capitalize",
		marginLeft: 10,
	},
});

export default memo(GenderForm);
