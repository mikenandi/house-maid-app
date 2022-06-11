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
import EmployerStatus from "../Notification/employer-status";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

function Notification(props) {
	const dispatch = useDispatch();
	const user_id = useSelector((state) => {
		return state.auth.userId;
	});
	const [data, set_data] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			try {
				let response = await axios({
					method: "GET",
					url: "http://nuhu-backend.herokuapp.com/api/v1/applicants-to-interview",
					params: {
						user_id: user_id,
					},
				});

				set_data(response.data.data);

				return;
			} catch (error) {
				return;
			}
		})();
	}, []);

	const renderItem = ({item}) => {
		return (
			<EmployerStatus
				id={item.id}
				name={item.applicant_name}
				service={item.service}
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
			<View style={styles.body}>
				<Body>interviewing applications.</Body>
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
		paddingBottom: 60,
	},
});

export default memo(Notification);
