import {Text, StyleSheet} from "react-native";

export const HeadingL = (props) => {
	return (
		<Text style={{...styles.headingL, ...props.style}}>{props.children}</Text>
	);
};

export const HeadingM = (props) => {
	return (
		<Text style={{...styles.headingM, ...props.style}}>{props.children}</Text>
	);
};

export const HeadingS = (props) => {
	return (
		<Text style={{...styles.headingS, ...props.style}}>{props.children}</Text>
	);
};

export const Body = (props) => {
	return <Text style={{...styles.body, ...props.style}}>{props.children}</Text>;
};

export const BodyS = (props) => {
	return (
		<Text style={{...styles.bodyS, ...props.style}}>{props.children}</Text>
	);
};

export const Caption = (props) => {
	return (
		<Text style={{...styles.caption, ...props.style}}>{props.children}</Text>
	);
};

export const ButtonText = (props) => {
	return (
		<Text style={{...styles.buttonText, ...props.style}}>{props.children}</Text>
	);
};

const styles = StyleSheet.create({
	headingL: {
		fontSize: 34,
		letterSpacing: 0.25,
	},
	headingM: {
		fontSize: 24,
		letterSpacing: 0,
	},
	headingS: {
		fontSize: 20,
		letterSpacing: 0.15,
	},
	body: {
		fontSize: 16,
		letterSpacing: 0.5,
	},
	bodyS: {
		fontSize: 14,
		letterSpacing: 0.25,
	},
	caption: {
		fontSize: 12,
		letterSpacing: 0.4,
	},
	buttonText: {
		fontSize: 14,
		letterSpacing: 1.25,
		textTransform: "uppercase",
		fontWeight: "500",
	},
});
