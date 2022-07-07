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
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import Job from "./JobList";
import {useDispatch, useSelector} from "react-redux";
import {
	hidePostedJobs,
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
					url: "http://nuhu-backend.herokuapp.com/api/v1/posted-jobs",
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

	const handleGoPrev = () => {
		dispatch(hidePostedJobs());
	};

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

			{/* for going next or prev state. */}
			<View style={styles.stepContainer}>
				{/* 👈 Going back. */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleGoPrev}>
					<FontAwesome5
						name='long-arrow-alt-left'
						size={28}
						color={color.primary}
						style={styles.icon}
					/>
				</TouchableOpacity>
				<Body>Jobs that you posted.</Body>

				{/* 👉 Going forward */}
				{false && (
					<TouchableOpacity activeOpacity={0.9} onPress={handleGoNext}>
						<FontAwesome5
							name='long-arrow-alt-right'
							size={24}
							color={color.primary}
						/>
					</TouchableOpacity>
				)}
			</View>
			{/* 👊 body contents. */}
			<View style={styles.bodyContainer}>
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
	stepContainer: {
		backgroundColor: "white",
		width: "90%",
		padding: 10,
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 20,
		flexDirection: "row",
	},
	icon: {
		marginLeft: 10,
		marginRight: 10,
	},
});

export default memo(MaidHome);
