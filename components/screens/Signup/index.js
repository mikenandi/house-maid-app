import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	TextInput,
	Pressable,
} from "react-native";
import color from "../../color";
import {
	Body,
	HeadingL,
	HeadingM,
	ButtonText,
	Caption,
	BodyS,
	HeadingS,
} from "../../typography";
import {Ionicons} from "@expo/vector-icons";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {
	roleEmployer,
	roleMaid,
	roleAgent,
} from "../../../Store/homeScreen/registerSlice";

function Register(props) {
	//setting up dispatch
	const dispatch = useDispatch();

	// going to register
	const handleGoToLogin = () => {
		// props.navigation.navigate("Register");
	};

	const handleGoNext = () => {
		// props.navigation.navigate("NameForm");
	};

	const handleMaid = () => {
		dispatch(roleMaid());
		props.navigation.navigate("NameForm");
	};

	const handleEmployer = () => {
		dispatch(roleEmployer());
		props.navigation.navigate("NameForm");
	};

	const handleAgent = () => {
		dispatch(roleAgent());
		props.navigation.navigate("NameForm");
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
			<View style={styles.container}>
				{/* logo of the app. */}
				<HeadingL style={styles.logoText}>House Maids</HeadingL>

				{/* title of the activity in the screen. */}
				<HeadingS style={styles.titleText}>Register as </HeadingS>

				{/* A buton for login */}
				<TouchableOpacity activeOpacity={0.9} onPress={handleMaid}>
					<View style={styles.buttoncontainer}>
						<View style={styles.iconContainer}>
							<FontAwesome5 name='person-booth' size={40} color='white' />
						</View>
						<HeadingS style={styles.loginText}>Maid</HeadingS>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.9} onPress={handleEmployer}>
					<View style={styles.buttoncontainer}>
						<View style={styles.iconContainer}>
							<Ionicons name='ios-ribbon' size={40} color='white' />
						</View>
						<HeadingS style={styles.loginText}>Employer</HeadingS>
					</View>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.9} onPress={handleAgent}>
					<View style={styles.buttoncontainer}>
						<View style={styles.iconContainer}>
							<MaterialIcons name='support-agent' size={40} color='white' />
						</View>
						<HeadingS style={styles.loginText}>Agent</HeadingS>
					</View>
				</TouchableOpacity>
			</View>

			{false && (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={handleGoNext}
					style={styles.stepContainer}>
					<MaterialIcons
						name='arrow-forward'
						size={24}
						color={color.primary}
						style={styles.iconWrapper}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	drawerContainer: {
		marginLeft: 10,
		marginVertical: 5,
		backgroundColor: "white",
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		padding: 5,
	},
	logoText: {
		color: color.primary,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	inputText: {
		padding: 10,
		borderWidth: 1,
		margin: 5,
		width: 240,
		fontSize: 16,
		borderRadius: 5,
		letterSpacing: 0.5,
	},
	labelText: {
		marginHorizontal: 5,
	},
	buttoncontainer: {
		flexDirection: "row",
		backgroundColor: "white",
		width: 240,
		height: 80,
		padding: 15,
		margin: 5,
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 5,
	},
	loginText: {
		color: "black",
		fontWeight: "normal",
		marginLeft: 15,
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
		textAlign: "left",
		marginLeft: 15,
		color: color.dimblack,
	},
	container: {
		marginBottom: 30,
	},
	iconContainer: {
		backgroundColor: color.primary,
		padding: 10,
		borderRadius: 5,
		width: 60,
		height: 60,
		alignItems: "center",
		justifyContent: "center",
	},
	stepContainer: {
		backgroundColor: "white",
		width: "90%",
		padding: 10,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	iconWrapper: {
		backgroundColor: color.lightgray,
		padding: 10,
		borderRadius: 20,
	},
});

export default memo(Register);
