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
import {MaterialCommunityIcons, Feather} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {hideProfile} from "../../../Store/homeScreen/modalSlice";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {loggedOut} from "../../../Store/auth";

function Profile(props) {
	// initializing dispatch.

	const dispatch = useDispatch();
	const [profile, setProfile] = React.useState({});

	React.useEffect(() => {
		(async () => {
			try {
				let user_id = await AsyncStorage.getItem("user_id");

				let response = await axios({
					method: "GET",
					url: "http://nuhu-backend.herokuapp.com/api/v1/profile",
					params: {
						user_id: user_id,
					},
				});
				setProfile(response.data.data);
				return;
			} catch (error) {
				return;
			}
		})();

		return () => {
			setProfile({});
		};
	}, []);

	// function to change state of the visible property to hide the modal
	const handleHide = () => {
		dispatch(hideProfile());
	};

	const handleLogout = async () => {
		try {
			await SecureStore.deleteItemAsync("authToken");

			dispatch(hideProfile());

			dispatch(loggedOut());

			return;
		} catch (error) {
			return;
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={color.lightorange} />
			<View style={styles.topbarContainer}>
				<View style={styles.topbarLeftContainer}>
					<TouchableOpacity activeOpacity={0.9} onPress={handleHide}>
						<Ionicons name='arrow-back' size={30} color='white' />
					</TouchableOpacity>
					<HeadingM style={styles.headerText}>Profile</HeadingM>
				</View>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={handleLogout}
					style={styles.logoutButton}>
					<Body style={styles.logoutText}>Log out</Body>
				</TouchableOpacity>
			</View>
			<View>
				<View style={styles.avatarContainer}>
					{true ? (
						<View style={styles.avatarIcon}>
							<Ionicons
								name='person-outline'
								size={60}
								color={color.dimblack}
							/>
						</View>
					) : (
						<Image
							source={require("../../../assets/person.jpg")}
							style={styles.avatar}
						/>
					)}

					<HeadingS>
						{profile.first_name} {profile.last_name}
					</HeadingS>
					<View style={styles.locationContainer}>
						<Entypo name='location-pin' size={20} color={color.lightgray} />
						<BodyS style={styles.locationText}>
							{profile.region}, {profile.ward}
						</BodyS>
					</View>
				</View>
				<View>
					<View style={styles.detailContainer}>
						<Ionicons name='person-outline' size={24} color={color.primary} />
						<View style={styles.detailsTextContainer}>
							<HeadingS>User Type</HeadingS>
							<BodyS>{profile.role}</BodyS>
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
							<BodyS>{profile.email}</BodyS>
						</View>
					</View>

					<View style={styles.detailContainer}>
						<Ionicons name='ios-call-outline' size={24} color={color.primary} />
						<View style={styles.detailsTextContainer}>
							<HeadingS>Phone Number</HeadingS>
							<BodyS>{profile.phone_number}</BodyS>
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
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: color.lightorange,
		padding: 15,
	},
	headerText: {
		marginLeft: 15,
		color: "white",
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
		borderBottomRightRadius: 80,
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
	topbarLeftContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoutText: {
		color: color.primary,
		fontWeight: "bold",
	},
	avatarIcon: {
		width: 120,
		height: 120,
		borderRadius: 80,
		backgroundColor: color.lightblue,
		alignItems: "center",
		justifyContent: "center",
	},
	logoutButton: {
		padding: 10,
		backgroundColor: "white",
		borderRadius: 20,
	},
});

export default memo(Profile);
