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
} from "../../../typography";
import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
	deleteBirthDate,
	saveBirdthDate,
} from "../../../../Store/homeScreen/registerMaidSlice";
import {
	hideBirthDateForm,
	showContactForm,
	showLocationForm,
} from "../../../../Store/homeScreen/agentModalSlice";
import ContactsForm from "./ContactsForm";

function BirthDateForm(props) {
	// initialing use dispatch
	const dispatch = useDispatch();

	// going to register
	const [error, set_error] = useState("");
	const [date, set_date] = useState("");
	const [month, set_month] = useState("");
	const [year, set_year] = useState("");
	const visible = useSelector((state) => {
		return state.agentModal.contactsForm;
	});

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

			dispatch(saveBirdthDate(birthDate));
			dispatch(showContactForm());

			return;
		}
	};

	const handleGoPrev = () => {
		dispatch(deleteBirthDate());
		dispatch(hideBirthDateForm());

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

					{/* 👉 Going forward */}
				</TouchableOpacity>
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
				<HeadingM style={styles.titleText}>Birth Date</HeadingM>

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
			</View>

			<Modal transparent={false} animationType='fade' visible={visible}>
				<ContactsForm />
			</Modal>
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
		fontWeight: "bold",
	},
});

export default memo(BirthDateForm);
