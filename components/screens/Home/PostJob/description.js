import React, {memo, useState} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	TextInput,
	Pressable,
} from "react-native";
import color from "../../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
	HeadingS,
} from "../../../typography";
import {
	EvilIcons,
	MaterialCommunityIcons,
	MaterialIcons,
	Foundation,
	AntDesign,
} from "@expo/vector-icons";

import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {
	hideDescription,
	hideGenderPreference,
	hidePost,
	hidePostDesc,
	hidePostModals,
	hideSalary,
} from "../../../../Store/homeScreen/modalSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {restorePost} from "../../../../Store/homeScreen/postJobSlice";
import Loading from "../../../Loading";

function Salary(props) {
	// initializing dispatch
	const dispatch = useDispatch();

	const [isloading, set_isloading] = React.useState(false);

	const post_data = useSelector((state) => {
		return state.postJob;
	});

	const [description, set_description] = useState("");

	const handleDescription = (description) => {
		set_description(description);
	};

	const handlePost = async () => {
		try {
			let user_id = await AsyncStorage.getItem("user_id");

			set_isloading(true);

			let response = await axios({
				method: "POST",
				url: "http://nuhu-backend.herokuapp.com/api/v1/post-job",
				data: {
					user_id: user_id,
					service: post_data.service,
					gender_preference: post_data.gender_preference,
					job_type: post_data.job_type,
					salary: post_data.salary,
					description: description,
				},
			});

			dispatch(restorePost());

			dispatch(hidePostModals());

			return;
		} catch (error) {
			console.log(error.response.data);
			return;
		}
	};

	const handleClose = () => {
		// dispatch(hidePost());
		dispatch(hidePostDesc());
	};

	if (isloading) return <Loading />;

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			{/* 👐 close modals */}
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handleClose}
				style={styles.crossIcon}>
				<FontAwesome5
					name='long-arrow-alt-left'
					size={24}
					color={color.primary}
				/>
			</TouchableOpacity>

			<View style={styles.bodyContainer}>
				<HeadingM style={styles.titleText}>more descriptions.</HeadingM>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='descriptions'
						style={styles.textInput}
						multiline={true}
						value={description}
						onChangeText={handleDescription}
					/>
				</View>
			</View>

			{/* A buton for login */}
			<View style={styles.bottomContainer}>
				<TouchableOpacity
					style={styles.buttoncontainer}
					activeOpacity={0.7}
					onPress={handlePost}>
					<ButtonText style={styles.buttonText}>post</ButtonText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		// justifyContent: "center",
		// alignItems: "center",
	},
	inputText: {
		padding: 10,
		borderWidth: 1,
		margin: 5,
		width: 240,
		fontSize: 16,
		borderRadius: 5,
	},
	labelText: {
		marginHorizontal: 5,
		marginTop: 5,
	},
	buttoncontainer: {
		backgroundColor: color.primary,
		width: "80%",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	loginText: {
		color: "white",
		fontWeight: "bold",
	},
	descText: {
		color: color.dimblack,
		marginLeft: 5,
	},
	registerText: {
		color: color.primary,
		fontWeight: "bold",
	},
	titleText: {
		color: color.dimblack,
	},
	crossIcon: {
		width: "100%",
		padding: 15,
	},
	bodyContainer: {
		padding: 15,
	},
	serviceContainer: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
		marginTop: 10,
	},
	iconBox: {
		backgroundColor: color.primary,
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	textInput: {
		padding: 15,
		borderWidth: 1,
		fontSize: 16,
		width: 260,
		borderRadius: 5,
		borderColor: "black",
		backgroundColor: color.lightgray,
	},
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	bottomContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
});

export default memo(Salary);
