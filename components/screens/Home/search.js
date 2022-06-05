import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	TextInput,
} from "react-native";
import color from "../../color";
import {Body, BodyS} from "../../typography";
import {EvilIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {hideSearch} from "../../../Store/homeScreen/modalSlice";

function Search(props) {
	// initializing dispatch.
	const dispatch = useDispatch();

	// function to change state of the visible property to hide the modal
	const handleHide = () => {
		dispatch(hideSearch());
	};

	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
			<View style={styles.topbarContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={handleHide}>
					<Ionicons name='arrow-back' size={24} color={color.dimblack} />
				</TouchableOpacity>
				<View style={styles.textInputContainer}>
					<TextInput placeholder='search...' style={styles.textInput} />
					<EvilIcons name='close' size={24} color='black' />
				</View>
			</View>

			<View style={styles.resultsContainer}>
				<EvilIcons name='search' size={20} color='black' />
				<BodyS style={styles.resultsText}>search results</BodyS>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	topbarContainer: {
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	textInput: {
		fontSize: 16,
		width: "70%",
		padding: 8,
	},
	textInputContainer: {
		flexDirection: "row",
		backgroundColor: color.lightgray,
		alignItems: "center",
		justifyContent: "space-between",
		paddingRight: 10,
		marginLeft: 10,
	},
	resultsContainer: {
		flexDirection: "row",
		paddingTop: 5,
		paddingHorizontal: 20,
		alignItems: "center",
	},
	resultsText: {
		marginLeft: 10,
	},
});

export default memo(Search);
