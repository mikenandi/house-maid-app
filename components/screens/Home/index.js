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
import {Body, HeadingS} from "../../typography";
import {Entypo, Ionicons} from "@expo/vector-icons";
import Job from "./job";
import {useDispatch, useSelector} from "react-redux";
import Search from "./search";
import Profile from "./profile";
import {showProfile, showSearch} from "../../../Store/homeScreen/modalSlice";

function Home(props) {
	//initializing dispatch
	const dispatch = useDispatch();

	// initilizing values
	const profileVisible = useSelector((state) => {
		return state.modal.profileVisible;
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

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => props.navigation.toggleDrawer()}
					activeOpacity={0.8}>
					<View style={styles.drawerContainer}>
						<Entypo name='menu' size={30} color={color.dimblack} />
					</View>
				</TouchableOpacity>

				<View style={styles.searchContainer}>
					{/* 0👇 A button to show and hide search. */}
					<TouchableOpacity activeOpacity={0.9} onPress={handleShowSearch}>
						<View style={styles.searchWrapper}>
							<Ionicons
								name='search'
								size={20}
								color='black'
								style={styles.searchIcon}
							/>
						</View>
					</TouchableOpacity>

					{/* 👇 A image which when pressed will show profile of the user. */}
					<TouchableOpacity activeOpacity={0.9} onPress={handleShowProfile}>
						<Image
							source={require("../../../assets/person.jpg")}
							style={styles.profileImage}
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* 👊 body contents. */}
			<View style={styles.bodyContainer}>
				<HeadingS>Recent jobs.</HeadingS>
				<Job />
			</View>

			{/* modal for showing searches. */}
			<Modal animationType='fade' transparent={true} visible={searchVisible}>
				<Search />
			</Modal>
			{/* modal for showing profile of user. */}
			<Modal animationType='fade' transparent={false} visible={profileVisible}>
				<Profile />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	bodyContainer: {
		marginTop: 5,
		marginHorizontal: 10,
	},
	drawerContainer: {
		marginLeft: 10,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
		marginTop: 5,
	},
	searchIcon: {
		marginLeft: 10,
		marginRight: 10,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
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
});

export default memo(Home);
