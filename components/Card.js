import {View, StyleSheet} from "react-native";

export default function Card(props) {
	return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		shadowColor: "black",
		shadowOffset: {width: 0, height: 1},
		shadowRadius: 20,
		shadowOpacity: 1,
		elevation: 5,
		borderRadius: 1,
	},
});
