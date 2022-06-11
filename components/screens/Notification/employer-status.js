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
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../Card";
import axios from "axios";

function Applicant(props) {
	// 👋 using use dispatch.
	const dispatch = useDispatch();
	const [visible, set_visible] = React.useState(true);
	const user_id = useSelector((state) => {
		return state.auth.userId;
	});

	const handleHide = () => {
		set_visible(false);
	};

	const handleAccept = async () => {
		try {
			let response = await axios({
				method: "PUT",
				url: "http://nuhu-backend.herokuapp.com/api/v1/accept-applicant",
				params: {
					application_id: props.id,
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
						<HeadingS style={styles.titleText}>{props.name}</HeadingS>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='checkbox-blank-badge-outline'
							size={24}
							color={color.primary}
						/>
						<Body style={styles.locationText}>
							applied for: {props.service}
						</Body>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='checkbox-blank-badge-outline'
							size={24}
							color={color.primary}
						/>
						<Body style={styles.salaryText}>{props.phoneNumber}</Body>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='checkbox-blank-badge-outline'
							size={24}
							color={color.primary}
						/>
						<Body style={styles.salaryText}> {props.gender} </Body>
					</View>

					<View style={styles.row}>
						<MaterialCommunityIcons
							name='checkbox-blank-badge-outline'
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
							onPress={handleAccept}>
							<ButtonText style={styles.applyText}>accept</ButtonText>
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
		fontFamily: "serif",
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
		marginTop: 10,
		marginLeft: 10,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default memo(Applicant);
