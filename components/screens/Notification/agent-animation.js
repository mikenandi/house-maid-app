import React, {memo} from "react";
import {View, StyleSheet, StatusBar} from "react-native";
import LottieView from "lottie-react-native";

function Loader(props) {
	return (
		<View style={styles.screen}>
			<StatusBar backgroundColor='white' />
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
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
});

export default memo(Loader);
