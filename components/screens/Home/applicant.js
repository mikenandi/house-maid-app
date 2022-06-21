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
import {MaterialCommunityIcons} from "@expo/vector-icons";
import JobDescription from "./job-description";
import {useDispatch, useSelector} from "react-redux";
import {showDescription} from "../../../Store/homeScreen/modalSlice";
import Card from "../../Card";
import axios from "axios";

function Applicant(props) {
	// 👋 using use dispatch.
	const dispatch = useDispatch();
	const [visible, set_visible] = React.useState(true);

	const handleHide = () => {
		set_visible(false);
	};

	const handleInterview = async () => {
		try {
			let response = await axios({
				method: "PUT",
				url: "http://nuhu-backend.herokuapp.com/api/v1/call-for-interview",
				data: {
					application_id: props.applicationId,
				},
			});

			set_visible(false);

			return;
		} catch (error) {
			return;
		}
	};

	return (
		<View>
			{visible && (
				<Card style={styles.container}>
					<View style={styles.cardHeader}>
						<View style={styles.employerProfileContainer}>
							<FontAwesome5 name='user-tie' size={24} color='black' />
						</View>
						<HeadingS style={styles.titleText}>
							{props.firstName} {props.lastName}
						</HeadingS>
					</View>

					<View style={styles.row}>
						<EvilIcons name='location' size={30} color={color.primary} />
						<Body style={styles.locationText}>
							{props.region}, {props.ward}
						</Body>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='phone-dial-outline'
							size={22}
							color={color.primary}
						/>
						<Body style={styles.salaryText}>{props.phoneNumber}</Body>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='checkbox-multiple-blank-circle-outline'
							size={24}
							color={color.primary}
						/>
						<Body style={styles.salaryText}> {props.gender} </Body>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='checkbox-multiple-blank-circle-outline'
							size={24}
							color={color.primary}
						/>
						<Body style={styles.salaryText}> {props.age} </Body>
					</View>

					<View style={styles.actionsContainer}>
						<TouchableOpacity
							style={styles.hidebutton}
							activeOpacity={0.8}
							onPress={handleHide}>
							<ButtonText style={styles.hideText}>Hide</ButtonText>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={handleInterview}>
							<ButtonText style={styles.applyText}>Interview</ButtonText>
						</TouchableOpacity>
					</View>
				</Card>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		padding: 15,
		borderRadius: 15,
		backgroundColor: "white",
		marginBottom: 10,
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
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		borderRadius: 5,
	},
	hidebutton: {
		backgroundColor: "white",
		padding: 10,
		width: 120,
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
		marginTop: 10,
		marginLeft: 10,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default memo(Applicant);
