import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// a function to get token.
export const registerForPushNotificationsAsync = async () => {
	let token;
	// Checking if it's a device or emulator.
	if (Device.isDevice) {
		// Checking current status.
		const {status: existingStatus} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		// Requesting permsion when it is not granted.
		if (existingStatus !== "granted") {
			const {status} = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		// When user failed to give permisions.
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		//  When permsions was granted get the token.
		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert("Must use physical device for Push Notifications");
	}

	// Making the android device not ignore our notifications.
	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
};
