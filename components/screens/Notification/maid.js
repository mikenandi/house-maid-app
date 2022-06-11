import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	FlatList,
} from "react-native";
import color from "../../color";
import {Body} from "../../typography";
import {Ionicons} from "@expo/vector-icons";
import TopBar from "../TopBar";
import Detail from "../Notification/detail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
import axios from "axios";
import MaidApplicationStatus from "./maid-application-status";

function Notification(props) {
	const [data, set_data] = React.useState([]);

	const user_id = useSelector((state) => {
		return state.auth.userId;
	});

	React.useEffect(() => {
		(async () => {
			try {
				let response = await axios({
					method: "GET",
					url: "http://nuhu-backend.herokuapp.com/api/v1/application-statuses",
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
	}, []);

	const renderItem = ({item}) => {
		return (
			<MaidApplicationStatus
				service={item.job_title}
				employer={item.employer}
				phoneNumber={item.phone_number}
				salary={item.salary}
				status={item.status}
				location={item.location}
				type={item.type}
			/>
		);
	};
	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
			<TopBar />
			<View style={styles.body}>
				<Body>application status</Body>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
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
	body: {
		marginTop: 10,
		marginHorizontal: 20,
	},
	flatlistContainer: {
		paddingBottom: 40,
	},
});

export default memo(Notification);
