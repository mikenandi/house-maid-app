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
import {useDispatch, useSelector} from "react-redux";
import Card from "../../Card";
import axios from "axios";

function Job(props) {
	// 👋 using use dispatch.
	const dispatch = useDispatch();

	const [visible, set_visible] = React.useState(true);

	const user_id = useSelector((state) => {
		return state.auth.userId;
	});

	const handleHide = () => {
		set_visible(false);
	};

	const handleApply = async () => {
		try {
			let response = await axios({
				method: "POST",
				url: "http://nuhu-backend.herokuapp.com/api/v1/apply-job",
				data: {
					user_id: user_id,
					job_id: props.id,
				},
			});

			set_visible(false);

			return;
		} catch (error) {
			console.log(error.response.data);
			return;
		}
	};

	return (
		<View>
			{visible && (
				<Card style={styles.container}>
					<View style={styles.cardHeader}>
						<View style={styles.avatar}>
							<Ionicons name='pricetags-sharp' size={24} color='black' />
						</View>
						<HeadingS style={styles.titleText}>
							{props.service.replace(/_/gi, " ")}
						</HeadingS>
					</View>
					{false && (
						<View style={styles.row}>
							<EvilIcons name='location' size={30} color={color.primary} />
							<Body style={styles.locationText}>{props.employer}</Body>
						</View>
					)}

					<View style={styles.row}>
						<EvilIcons name='archive' size={30} color={color.primary} />
						<Body style={styles.salaryText}> {props.phoneNumber} </Body>
					</View>
					<View style={styles.row}>
						<EvilIcons name='archive' size={30} color={color.primary} />
						<Body style={styles.salaryText}> {props.type}</Body>
					</View>

					<View style={styles.row}>
						<EvilIcons name='credit-card' size={30} color={color.primary} />
						<Body style={styles.salaryText}> Tsh {props.salary} </Body>
					</View>

					<View style={styles.row}>
						<EvilIcons name='exclamation' size={30} color={color.primary} />
						<Body style={styles.salaryText}>
							{props.status.replace(/-/gi, " ")}{" "}
						</Body>
					</View>
					{false && (
						<View style={styles.actionsContainer}>
							<TouchableOpacity
								style={styles.hidebutton}
								activeOpacity={0.8}
								onPress={handleHide}>
								<ButtonText style={styles.hideText}>Hide</ButtonText>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.buttonContainer}
								activeOpacity={0.8}
								onPress={handleApply}>
								<ButtonText style={styles.applyText}>apply</ButtonText>
							</TouchableOpacity>
						</View>
					)}
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
	avatar: {
		backgroundColor: color.lightgray,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		width: 50,
		height: 50,
		marginRight: 10,
		flexDirection: "row",
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
		marginLeft: 25,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default memo(Job);
