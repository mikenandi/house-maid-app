import React, {memo} from "react";
import {View, StyleSheet, StatusBar} from "react-native";
import LottieView from "lottie-react-native";
import {HeadingS} from "../../typography";
import TopBar from "../TopBar";
import color from "../../color";

function Loader(props) {
	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
			<TopBar />
			<HeadingS style={styles.headerText}>keep the good work agent.</HeadingS>
			<LottieView
				source={require("../../../assets/customer-service-support-agent-animation.json")}
				autoPlay
				loop
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	headerText: {
		color: "seagreen",
		marginLeft: 20,
		fontFamily: "serif",
		fontWeight: "bold",
	},
});

export default memo(Loader);
