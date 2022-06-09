import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	Modal,
} from "react-native";
import color from "../../color";
import {Body, BodyS, HeadingS, ButtonText} from "../../typography";
import {EvilIcons} from "@expo/vector-icons";
import {FontAwesome5} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import JobDescription from "./job-description";
import {useDispatch, useSelector} from "react-redux";
import {showDescription} from "../../../Store/homeScreen/modalSlice";
import Card from "../../Card";

function Applicant(props) {
	// 👋 using use dispatch.
	const dispatch = useDispatch();

	// 👇variable for making description visible.
	const visible = useSelector((state) => {
		return state.modal.descriptionVisible;
	});

	const handleShowDescription = () => {
		dispatch(showDescription());
	};

	return (
		<View>
			<TouchableOpacity activeOpacity={0.9} onPress={handleShowDescription}>
				<Card style={styles.container}>
					<View style={styles.cardHeader}>
						<View style={styles.employerProfileContainer}>
							<FontAwesome5 name='user-tie' size={24} color='black' />
						</View>
						<HeadingS style={styles.titleText}>Applicant name.</HeadingS>
					</View>

					<View style={styles.row}>
						<EvilIcons name='location' size={30} color={color.primary} />
						<Body style={styles.locationText}>applicant location</Body>
					</View>

					<View style={styles.row}>
						<EvilIcons name='tag' size={30} color={color.primary} />
						<Body style={styles.salaryText}>078 724 253 2</Body>
					</View>

					<View style={styles.row}>
						<EvilIcons name='sc-instagram' size={30} color={color.primary} />
						<Body style={styles.salaryText}> gender </Body>
					</View>

					<View style={styles.row}>
						<EvilIcons name='sc-instagram' size={30} color={color.primary} />
						<Body style={styles.salaryText}> Age </Body>
					</View>

					<View style={styles.actionsContainer}>
						<View style={styles.hidebutton}>
							<ButtonText style={styles.hideText}>Hide</ButtonText>
						</View>

						<View style={styles.buttonContainer}>
							<ButtonText style={styles.applyText}>accept</ButtonText>
						</View>
					</View>
				</Card>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		padding: 15,
		borderRadius: 15,
		backgroundColor: "white",
	},

	actionsContainer: {
		flexDirection: "row",
		Padding: 20,
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 20,
	},
	titleText: {
		fontWeight: "normal",
	},
	employerProfileContainer: {
		backgroundColor: color.lightgray,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		width: 50,
		height: 50,
		marginRight: 10,
	},
	salaryText: {
		color: color.dimblack,
		marginLeft: 10,
	},
	locationText: {
		color: color.dimblack,
		marginLeft: 10,
	},
	buttonContainer: {
		backgroundColor: color.primary,
		padding: 10,
		width: 100,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		borderRadius: 5,
	},
	hidebutton: {
		backgroundColor: "white",
		padding: 10,
		width: 100,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		borderRadius: 5,
		borderColor: color.primary,
		borderWidth: 1,
	},
	applyText: {
		color: "white",
	},
	hideText: {
		color: color.primary,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 15,
		marginLeft: 10,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default memo(Applicant);
