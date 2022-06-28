import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	Image,
	Modal,
	FlatList,
} from "react-native";
import color from "../../color";
import {Body, HeadingS} from "../../typography";
import {AntDesign} from "@expo/vector-icons";
import Job from "./job";
import {useDispatch, useSelector} from "react-redux";
import {
	showPost,
	showProfile,
	showSearch,
} from "../../../Store/homeScreen/modalSlice";
import TopBar from "../TopBar";
import Post from "../Home/PostJob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as helpers from "../../helpers";
import * as Notifications from "expo-notifications";

function MaidHome(props) {
	// initializing dispatch.
	const dispatch = useDispatch();
	const [data, set_data] = React.useState([]);

	const user_id = useSelector((state) => {
		return state.auth.userId;
	});

	React.useEffect(() => {
		(async () => {
			try {
				let response = await axios({
					method: "GET",
					url: "http://nuhu-backend.herokuapp.com/api/v1/available-jobs",
					params: {
						user_id: user_id,
					},
				});

				set_data(response.data.data);
				return;
			} catch (error) {
				console.log(error.response.data);
				return;
			}
		})();

		return () => {
			set_data([]);
		};
	}, []);

	// Getting token from register for token helpers.
	React.useEffect(() => {
		// getToken();
		(async () => {
			try {
				let token = await helpers.registerForPushNotificationsAsync();

				let response = await axios({
					method: "POST",
					url: "http://nuhu-backend.herokuapp.com/api/v1/save-token-record",
					data: {
						user_id: user_id,
						notificationToken: token,
					},
				});
				console.log(response.data);
				return;
			} catch (error) {
				console.log(error.response.data);
				return;
			}
		})();
	}, []);

	const renderItem = ({item}) => {
		return (
			<Job
				service={item.service}
				genderPreference={item.gender_preference}
				region={item.region}
				salary={item.salary}
				status={item.job_status}
				ward={item.ward}
				type={item.job_type}
				id={item.id}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<TopBar />

			{/* 👊 body contents. */}
			<View style={styles.bodyContainer}>
				<Body>Recent jobs.</Body>

				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.flatlistContainer}
				/>
			</View>
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
	buttonContaier: {
		backgroundColor: color.blue,
		padding: 15,
		width: 120,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 30,
		right: 15,
		borderRadius: 10,
	},
	floatingText: {
		color: "white",
		fontWeight: "bold",
	},
	flatlistContainer: {
		paddingBottom: 60,
	},
});

export default memo(MaidHome);
