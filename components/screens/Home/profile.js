import React, {memo} from "react";
import {
	View,
	Button,
	Image,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import color from "../../color";
import {Body, BodyS, HeadingM, HeadingS} from "../../typography";
import {Entypo} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {hideProfile} from "../../../Store/homeScreen/modalSlice";

function Profile(props) {
	// initializing dispatch.
	const dispatch = useDispatch();

	// function to change state of the visible property to hide the modal
	const handleHide = () => {
		dispatch(hideProfile());
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={color.lightorange} />
			<View style={styles.topbarContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={handleHide} style>
					<Ionicons name='arrow-back' size={30} color='white' />
				</TouchableOpacity>
				<HeadingM style={styles.headerText}>Profile</HeadingM>
			</View>
			<View>
				<View style={styles.avatarContainer}>
					<Image
						source={require("../../../assets/person.jpg")}
						style={styles.avatar}
					/>
					<HeadingS>Name Person</HeadingS>
					<View style={styles.locationContainer}>
						<Entypo name='location-pin' size={20} color={color.lightgray} />
						<BodyS style={styles.locationText}>location place</BodyS>
					</View>
				</View>
				<View>
					<View style={styles.detailContainer}>
						<Ionicons name='person-outline' size={24} color={color.primary} />
						<View style={styles.detailsTextContainer}>
							<HeadingS>User Type</HeadingS>
							<BodyS>Maid</BodyS>
						</View>
					</View>
					<View style={styles.detailContainer}>
						<MaterialCommunityIcons
							name='email-outline'
							size={24}
							color={color.primary}
						/>
						<View style={styles.detailsTextContainer}>
							<HeadingS>Email Address</HeadingS>
							<BodyS>nuhu@gmail.com</BodyS>
						</View>
					</View>

					<View style={styles.detailContainer}>
						<Ionicons name='ios-call-outline' size={24} color={color.primary} />
						<View style={styles.detailsTextContainer}>
							<HeadingS>Phone Number</HeadingS>
							<BodyS>+255 747 872 930</BodyS>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topbarContainer: {
		flexDirection: "row",
		backgroundColor: color.lightorange,
		padding: 15,
	},
	headerText: {
		marginLeft: 15,
		color: "white",
		fontWeight: "bold",
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 80,
	},
	avatarContainer: {
		backgroundColor: color.lightorange,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	locationContainer: {
		flexDirection: "row",
	},
	locationText: {
		color: color.dimblack,
		fontFamily: "serif",
		marginLeft: 5,
	},
	detailContainer: {
		flexDirection: "row",
		marginHorizontal: 20,
		marginTop: 20,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	detailsTextContainer: {
		marginLeft: 10,
		borderBottomWidth: 1,
		width: "80%",
		paddingBottom: 5,
		borderBottomColor: color.lightgray,
	},
});

export default memo(Profile);
