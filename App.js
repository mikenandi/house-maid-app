import "react-native-gesture-handler";
import * as React from "react";
import {Button, View, StyleSheet, StatusBar} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./components/screens/Home";
import Notification from "./components/screens/Notification";
import {FontAwesome} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Body, BodyS, HeadingM, HeadingS} from "./components/typography";
import color from "./components/color";
import {store} from "./Store";
import {Provider} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import NameForm from "./components/screens/Signup/nameForm";
import GenderForm from "./components/screens/Signup/genderForm";
import ContactsForm from "./components/screens/Signup/contactsForm";
import LocationForm from "./components/screens/Signup/locationForm";
import PasswordForm from "./components/screens/Signup/passwordForm";

// initiating screens functions.
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// 👇 Handling authentication on the app.
function MyAuth() {
	return (
		<Stack.Navigator initialRouteName='login'>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='Register'
				component={Signup}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name='NameForm'
				component={NameForm}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name='GenderForm'
				component={GenderForm}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name='ContactsForm'
				component={ContactsForm}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name='LocationForm'
				component={LocationForm}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name='PasswordForm'
				component={PasswordForm}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	);
}

// 👇 app contents.
function MyDrawer() {
	return (
		<Drawer.Navigator
			initialRouteName='Home'
			screenOptions={{
				drawerActiveBackgroundColor: color.lightgray,
				drawerActiveTintColor: "black",
				drawerStatusBarAnimation: "fade",
				drawerItemStyle: {
					width: "100%",
					marginLeft: 0,
					borderRadius: 0,
				},
				drawerHideStatusBarOnOpen: false,
				drawerLabelStyle: styles.drawerText,
			}}>
			<Drawer.Screen
				name='Profile'
				component={Home}
				options={{
					headerShown: false,
					drawerIcon: () => (
						<View style={styles.rowContainer}>
							<View style={styles.wordsContainer}>
								<HeadingM style={styles.LogoText}>Smart Maid</HeadingM>
							</View>
						</View>
					),
					drawerLabel: "",
					drawerActiveBackgroundColor: "white",
				}}
			/>
			<Drawer.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
					drawerIcon: () => <AntDesign name='home' size={23} color='black' />,
					drawerLabel: "Home",
				}}
			/>
			<Drawer.Screen
				name='Notifications'
				component={Notification}
				options={{
					headerShown: false,
					drawerIcon: () => (
						<FontAwesome name='bell-o' size={20} color='black' />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}

// 👇
export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar backgroundColor='white' />
				{true ? <MyDrawer /> : <MyAuth />}
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		borderBottomWidth: 1.5,
		borderBottomColor: color.lightgray,
		paddingBottom: 20,
	},
	editText: {
		color: "gray",
	},
	wordsContainer: {
		marginLeft: 10,
	},
	LogoText: {
		color: color.primary,
		fontWeight: "bold",
	},
	drawerText: {
		fontSize: 15,
		fontWeight: "normal",
		fontFamily: "serif",
	},
});
