import * as React from "react";
import {Button, View, StyleSheet, StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./components/screens/Home";
import Notification from "./components/screens/Notification";
import {FontAwesome} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {Body, BodyS, HeadingM, HeadingS} from "./components/typography";
import color from "./components/color";
import {store} from "./Store";
import {Provider, useDispatch, useSelector} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import NameForm from "./components/screens/Signup/nameForm";
import GenderForm from "./components/screens/Signup/genderForm";
import ContactsForm from "./components/screens/Signup/contactsForm";
import LocationForm from "./components/screens/Signup/locationForm";
import PasswordForm from "./components/screens/Signup/passwordForm";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import {loggedIn} from "./Store/auth";
import Loading from "./components/Loading";

// initiating screens functions.
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 👇 Handling authentication on the app.
function MyAuth() {
	// setting loading state
	const [isloading, set_isloading] = React.useState(true);

	// inititializing dispatch
	const dispatch = useDispatch();

	const isLoggedOut = useSelector((state) => {
		return state.auth.isLoggedOut;
	});

	React.useEffect(() => {
		(async () => {
			try {
				let token = await SecureStore.getItemAsync("authToken");

				if (!!token) {
					set_isloading(false);

					dispatch(loggedIn());
					return;
				}

				set_isloading(false);

				return;
			} catch (error) {
				return;
			}
		})();
	}, []);

	if (isloading) return <Loading />;

	return (
		<Stack.Navigator initialRouteName='login'>
			{isLoggedOut ? (
				<>
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
				</>
			) : (
				<>
					<Stack.Screen
						name='Root'
						component={MyTabs}
						options={{headerShown: false}}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

// 👇 signed screens contents.
function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{
				tabBarActiveTintColor: "black",
				headerShown: false,
				tabBarActiveBackgroundColor: color.lightgray,
				tabBarInactiveBackgroundColor: color.lightgray,
			}}>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
					title: "",
					tabBarIcon: ({color, size}) => (
						<MaterialIcons name='home' size={size} color={color} />
					),
					tabBarLabel: "",
				}}
			/>
			<Tab.Screen
				name='Notifications'
				component={Notification}
				options={{
					headerShown: false,
					tabBarIcon: ({color, size}) => (
						<MaterialIcons name='pending-actions' size={size} color={color} />
					),
					tabBarLabel: "",
				}}
			/>
		</Tab.Navigator>
	);
}

// 👇
export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar backgroundColor='white' />
				<MyAuth />
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
