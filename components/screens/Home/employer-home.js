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
import {AntDesign, Foundation} from "@expo/vector-icons";
import Applicant from "./applicant";
import {useDispatch, useSelector} from "react-redux";
import {showPost, showPostedJobs} from "../../../Store/homeScreen/modalSlice";
import TopBar from "../TopBar";
import Post from "../Home/PostJob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MyJobs from "./PostedJobs";

function AgentHome(props) {
	//initializing dispatch
	const dispatch = useDispatch();

	const visible = useSelector((state) => {
		return state.modal.postVisible;
	});

	const JobsVisible = useSelector((state) => {
		return state.modal.postedJobsVisible;
	});

	const user_id = useSelector((state) => {
		return state.auth.userId;
	});

	const [applications, set_applications] = React.useState([]);

	const handlePost = () => {
		dispatch(showPost());
	};

	const handleShowJobs = () => {
		dispatch(showPostedJobs());
	};

	React.useEffect(() => {
		(async () => {
			try {
				let response = await axios({
					method: "GET",
					url: "http://nuhu-backend.herokuapp.com/api/v1/applications",
					params: {
						user_id: user_id,
					},
				});

				set_applications(response.data.data);

				return;
			} catch (error) {
				return;
			}
		})();

		return () => {
			set_applications([]);
		};
	}, [visible]);

	const renderItem = ({item}) => {
		return (
			<Applicant
				id={item.id}
				applicationId={item.application_id}
				firstName={item.first_name}
				lastName={item.last_name}
				region={item.region}
				ward={item.ward}
				phoneNumber={item.phone_number}
				gender={item.gender}
				age={item.age}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			<TopBar />

			{/* 👊 body contents. */}
			<View style={styles.bodyContainer}>
				<Body>Recent applications.</Body>

				<FlatList
					data={applications}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.flatlistContainer}
				/>
			</View>

			{/* 👋 making person to post an job. */}
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handleShowJobs}
				style={styles.jobListContaier}>
				<MaterialCommunityIcons
					name='format-list-checks'
					size={20}
					color='white'
				/>
				{/* <Body style={styles.floatingText}>Post</Body> */}
			</TouchableOpacity>

			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handlePost}
				style={styles.buttonContaier}>
				<AntDesign name='plus' size={20} color='white' />
				{/* <Body style={styles.floatingText}>Post</Body> */}
			</TouchableOpacity>

			{/* ✋ */}
			<Modal transparent={false} visible={visible} animationType='fade'>
				<Post />
			</Modal>

			<Modal transparent={false} visible={JobsVisible} animationType='fade'>
				<MyJobs />
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
	buttonContaier: {
		backgroundColor: "seagreen",
		padding: 15,
		width: 50,
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 30,
		right: 15,
		borderRadius: 30,
	},
	floatingText: {
		color: "white",
		fontWeight: "bold",
	},
	flatlistContainer: {
		paddingBottom: 100,
	},
	postedJobsContainer: {
		padding: 20,
		borderRadius: 10,
		marginTop: 10,
	},
	jobListContaier: {
		backgroundColor: "seagreen",
		padding: 15,
		width: 50,
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		position: "absolute",
		bottom: 90,
		right: 15,
		borderRadius: 30,
	},
});

export default memo(AgentHome);
