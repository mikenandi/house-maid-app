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
import {AntDesign} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import JobDescription from "./job-description";
import {useDispatch, useSelector} from "react-redux";
import {showDescription} from "../../../Store/homeScreen/modalSlice";

function Job(props) {
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
				<View style={styles.container}>
					<View style={styles.employerProfileContainer}>
						<AntDesign name='book' size={20} color='white' />
					</View>
					<View style={styles.descriptionContainer}>
						<View>
							<HeadingS style={styles.titleText}>House cleaning.</HeadingS>
							<Body style={styles.locationText}>location of the job</Body>
							<Body style={styles.salaryText}>salary: 12k /month</Body>
							<View style={styles.locationContainer}></View>
							<View style={styles.buttonsContainer}>
								<View style={styles.buttonContainer}>
									<ButtonText style={styles.applyText}>apply</ButtonText>
								</View>
							</View>
						</View>
						<View>
							<Ionicons
								name='ellipsis-vertical-outline'
								size={24}
								color='black'
							/>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			<Modal animationType='fade' transparent={false} visible={visible}>
				<JobDescription />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 5,
		padding: 10,
		borderRadius: 5,
		flexDirection: "row",
		backgroundColor: color.lightgray,
	},
	bubble: {
		width: 10,
		height: 10,
		padding: 5,
		borderRadius: 8,
		borderWidth: 3,
		borderColor: color.primary,
	},
	line: {
		width: 4,
		height: 70,
		backgroundColor: color.primary,
		marginLeft: 6,
		borderRadius: 2,
		marginTop: 2,
	},
	leftContainer: {
		justifyContent: "center",
		marginRight: 10,
		marginLeft: 5,
	},
	locationContainer: {
		flexDirection: "row",
	},
	titleText: {
		fontWeight: "bold",
	},
	employerProfileContainer: {
		backgroundColor: "black",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		width: 40,
		height: 40,
		marginRight: 10,
	},
	salaryText: {
		color: color.dimblack,
	},
	locationText: {
		color: color.dimblack,
		textTransform: "capitalize",
	},
	buttonContainer: {
		backgroundColor: color.primary,
		padding: 10,
		width: 80,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
		borderRadius: 5,
	},
	applyText: {
		color: "white",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	descriptionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		alignItems: "center",
	},
});

export default memo(Job);
