import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	Image,
	Modal,
} from "react-native";
import color from "../../color";
import {Body, HeadingS, HeadingM} from "../../typography";
import {EvilIcons, FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import Search from "../Home/search";
import Profile from "../Home/profile";
import Notification from "../Home/notification";
import {
	showNofication,
	showProfile,
	showSearch,
} from "../../../Store/homeScreen/modalSlice";

function Home(props) {
	//initializing dispatch
	const dispatch = useDispatch();

	// initilizing values
	const profileVisible = useSelector((state) => {
		return state.modal.profileVisible;
	});

	const notificationVisible = useSelector((state) => {
		return state.modal.notificationVisible;
	});

	const searchVisible = useSelector((state) => {
		return state.modal.searchVisible;
	});
	// functions to make modals visible from screen
	const handleShowProfile = () => {
		dispatch(showProfile());
	};

	const handleShowSearch = () => {
		dispatch(showSearch());
	};

	const handleShowNotification = () => {
		dispatch(showNofication());
	};

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<HeadingM style={styles.logoText}>Smart Maids</HeadingM>

				<View style={styles.navigationContaier}>
					{/* 👇 Button to show and hide notifications. */}
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={handleShowNotification}>
						<EvilIcons
							name='bell'
							size={28}
							color='black'
							style={styles.iconContainer}
						/>
					</TouchableOpacity>

					{/* 👇 A button to show and hide search. */}
					{false && (
						<TouchableOpacity activeOpacity={0.9} onPress={handleShowSearch}>
							<EvilIcons
								name='search'
								size={28}
								color='black'
								style={styles.searchIcon}
							/>
						</TouchableOpacity>
					)}

					{/* 👇 A image which when pressed will show profile of the user. */}
					<TouchableOpacity activeOpacity={0.9} onPress={handleShowProfile}>
						{false && (
							<Image
								source={require("../../../assets/person.jpg")}
								style={styles.profileImage}
							/>
						)}
						<FontAwesome5 name='user-circle' size={28} color={color.primary} />
					</TouchableOpacity>
				</View>
			</View>

			{/* modal for showing searches. */}
			<Modal animationType='fade' transparent={true} visible={searchVisible}>
				<Search />
			</Modal>

			{/* modal for showing profile of user. */}
			<Modal animationType='fade' transparent={false} visible={profileVisible}>
				<Profile />
			</Modal>

			<Modal
				animationType='fade'
				transparent={false}
				visible={notificationVisible}>
				<Notification />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	bodyContainer: {
		marginTop: 5,
		marginHorizontal: 10,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	navigationContaier: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
		marginTop: 5,
	},
	searchIcon: {
		marginLeft: 15,
		marginRight: 15,
	},
	profileImage: {
		width: 30,
		height: 30,
		borderRadius: 15,
	},

	searchWrapper: {
		width: 40,
		height: 40,
		backgroundColor: color.lightgray,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		borderRadius: 20,
	},
	logoText: {
		color: color.primary,
		fontWeight: "bold",
		marginLeft: 10,
	},
	iconContainer: {
		marginRight: 20,
	},
});

export default memo(Home);
