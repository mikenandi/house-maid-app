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
import {Entypo} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../Card";

function Detail(props) {
	// 👋 using use dispatch.
	const dispatch = useDispatch();

	// 👇variable for making description visible.
	const visible = useSelector((state) => {
		return state.modal.descriptionVisible;
	});

	const handleShowDescription = () => {
		// dispatch(showDescription());
	};

	return (
		<View>
			<TouchableOpacity activeOpacity={0.9} onPress={handleShowDescription}>
				<Card style={styles.container}>
					<View style={styles.employerProfileContainer}>
						<FontAwesome5 name='user-tag' size={24} color='black' />
					</View>
					<View style={styles.descriptionContainer}>
						<View>
							<HeadingS style={styles.titleText}>House cleaning.</HeadingS>
							<View style={styles.row}>
								<EvilIcons name='location' size={30} color={color.primary} />
								<Body style={styles.locationText}>location of the job</Body>
							</View>
							<View style={styles.row}>
								<EvilIcons name='archive' size={30} color={color.primary} />
								<Body style={styles.salaryText}> Any gender </Body>
							</View>
							<View style={styles.row}>
								<EvilIcons name='archive' size={30} color={color.primary} />
								<Body style={styles.salaryText}> Full time </Body>
							</View>

							<View style={styles.row}>
								<EvilIcons name='credit-card' size={30} color={color.primary} />
								<Body style={styles.salaryText}> Tsh 1200000 </Body>
							</View>

							<View style={styles.row}>
								<EvilIcons name='exclamation' size={30} color={color.primary} />
								<Body style={styles.salaryText}> still available </Body>
							</View>

							<View style={styles.locationContainer}></View>
							{false && (
								<View style={styles.buttonsContainer}>
									<View style={styles.buttonContainer}>
										<ButtonText style={styles.applyText}>apply</ButtonText>
									</View>
								</View>
							)}
						</View>
						{false && (
							<View>
								<Ionicons
									name='ellipsis-vertical-outline'
									size={30}
									color='black'
								/>
							</View>
						)}
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
		flexDirection: "row",
		backgroundColor: "white",
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
		fontWeight: "normal",
	},
	employerProfileContainer: {
		backgroundColor: color.lightgray,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		width: 60,
		height: 60,
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
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 15,
	},
});

export default memo(Detail);
