import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import color from "../../color";
import {Body, HeadingS, ButtonText} from "../../typography";
import {
	MaterialIcons,
	FontAwesome,
	Entypo,
	Ionicons,
	FontAwesome5,
} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {hideDescription} from "../../../Store/homeScreen/modalSlice";
import {AntDesign} from "@expo/vector-icons";

function JobDescriptions(props) {
	// initializing dispatch.
	const dispatch = useDispatch();

	// function to change state of the visible property to hide the modal
	const handleHide = () => {
		dispatch(hideDescription());
	};

	const handleApply = () => {};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={handleHide}
				style={styles.topbar}>
				<Ionicons name='arrow-back' size={24} color='black' />
				<HeadingS style={styles.headerText}>Job Descriptions</HeadingS>
			</TouchableOpacity>
			<View style={styles.body}>
				<View style={styles.container}>
					<View style={styles.iconBox}>
						<AntDesign name='notification' size={35} color={color.primary} />
					</View>
					<View>
						<Body style={styles.labelText}>Service</Body>
						<HeadingS>some value</HeadingS>
					</View>
				</View>

				<View style={styles.container}>
					<View style={styles.iconBox}>
						<Ionicons
							name='ios-location-outline'
							size={35}
							color={color.primary}
						/>
					</View>
					<View>
						<Body style={styles.labelText}>Location</Body>
						<HeadingS>some valuewhite white white white white white</HeadingS>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.iconBox}>
						<FontAwesome name='transgender' size={35} color={color.primary} />
					</View>
					<View>
						<Body style={styles.labelText}>Gender preference</Body>
						<HeadingS>Some Value</HeadingS>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.iconBox}>
						<Entypo name='back-in-time' size={35} color={color.primary} />
					</View>
					<View>
						<Body style={styles.labelText}>Job type</Body>
						<HeadingS>some value</HeadingS>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.iconBox}>
						<Ionicons
							name='ios-wallet-outline'
							size={35}
							color={color.primary}
						/>
					</View>
					<View>
						<Body style={styles.labelText}>Salary</Body>
						<HeadingS>some value</HeadingS>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.iconBox}>
						<MaterialIcons
							name='messenger-outline'
							size={35}
							color={color.primary}
						/>
					</View>
					<View>
						<Body style={styles.labelText}>Descriptions</Body>
						<HeadingS>some value</HeadingS>
					</View>
				</View>
			</View>

			<View style={styles.floatingContainer}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={handleApply}
					style={styles.postButton}>
					<ButtonText style={styles.buttonText}>apply now</ButtonText>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	topbar: {
		padding: 10,
		flexDirection: "row",
	},
	container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	body: {
		padding: 10,
	},
	iconBox: {
		backgroundColor: color.lightgray,
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		borderWidth: 1,
		borderColor: color.lightorange,
	},
	labelText: {
		color: color.dimblack,
	},
	postButton: {
		width: "80%",
		backgroundColor: color.primary,
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	floatingContainer: {
		width: "100%",
		alignItems: "center",
		position: "absolute",
		bottom: 10,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	headerText: {
		color: color.dimblack,
		marginLeft: 15,
	},
});

export default memo(JobDescriptions);
