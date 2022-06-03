import React, {memo} from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import color from "../../color";
import {Body} from "../../typography";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function Home(props) {
	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />

			{/* <TouchableOpacity
				onPress={() => props.navigation.openDrawer()}
				activeOpacity={0.8}>
			
			</TouchableOpacity> */}

			<View>
				<Body>profile page</Body>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	drawerContainer: {
		marginLeft: 10,
		marginVertical: 5,
		backgroundColor: color.lightred,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		padding: 5,
	},
});

export default memo(Home);
