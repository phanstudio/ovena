import { Ionicons } from "@expo/vector-icons"; // Expo built-in icons
import { useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import CountryPicker from "react-native-country-picker-modal";

import React, { useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function LoginScreen() {
	const navigation = useRouter();

	// ✅ states
	const [countryCode, setCountryCode] = useState<any>("NG"); // default Nigeria
	const [callingCode, setCallingCode] = useState("234");
	const [phoneNumber, setPhoneNumber] = useState(""); // phone input
	const [isLoading, setIsLoading] = useState(false); // SMS button
	const [error, setError] = useState<string | null>(null); // validation errors

	// ✅ handle SMS request
	const handleGetSMS = () => {
		if (!phoneNumber) {
			setError("Please enter your phone number.");
			return;
		}
		setError(null);
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			console.log(`Send SMS to +${callingCode}${phoneNumber}`);
			// navigation.push("/verify"); // example route
		}, 1500);
	};

	// ✅ Google login
	const handleGoogleLogin = () => {
		console.log("Google login triggered");
	};

	// ✅ Apple login
	const handleAppleLogin = () => {
		console.log("Apple login triggered");
	};

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator
			contentContainerStyle={{ flexGrow: 1, flex: 1 }}
		>
			{/* Header with logo */}
			<View style={styles.header}>
				<Image
					source={require("../assets/images/Mask group.png")}
					style={styles.mask}
					resizeMode='cover'
				/>
				<Image
					source={require("../assets/images/Ovena Logo 1.png")}
					style={styles.logo}
					resizeMode='contain'
				/>
				<TouchableOpacity
					style={styles.guestButton}
					onPress={() => navigation.replace("/home")}
				>
					<Text style={styles.guestText}>Continue as a Guest</Text>
					<Send />
				</TouchableOpacity>
			</View>

			<View
				style={{ borderTopRightRadius: 30, overflow: "hidden", margin: -30 }}
			>
				<View style={styles.formContainer}>
					{/* Free delivery banner */}
					<View style={styles.banner}>
						<Image source={require("../assets/images/delievery guy 1.png")} />
						<View style={{ marginLeft: 10 }}>
							<Text style={styles.bannerTitle}>
								first order with free delivery!
							</Text>
							<Text style={styles.bannerSub}>for new customers only</Text>
						</View>
					</View>

					{/* Welcome text */}
					<Text style={styles.welcome}>Welcome</Text>
					<Text style={styles.subText}>Let’s Start with your phone Number</Text>

					{/* Phone input */}
					<View style={{ flexDirection: "row", flex: 1, gap: 5 }}>
						<View style={styles.countryInput}>
							<CountryPicker
								countryCode={countryCode}
								withFlag
								withCallingCode
								withFilter
								withAlphaFilter
								withEmoji
								onSelect={(country) => {
									setCountryCode(country.cca2);
									setCallingCode(country.callingCode[0]);
								}}
							/>
						</View>
						<View style={styles.phoneInput}>
							<TextInput
								placeholder='Phone number'
								keyboardType='phone-pad'
								value={phoneNumber}
								onChangeText={setPhoneNumber}
								style={styles.input}
							/>
						</View>
					</View>

					{/* Error message */}
					{error && (
						<Text style={{ color: "red", marginTop: -5 }}>{error}</Text>
					)}

					{/* Get SMS */}
					<TouchableOpacity
						style={[styles.smsButton, isLoading && { opacity: 0.7 }]}
						disabled={isLoading}
						onPress={handleGetSMS}
					>
						<Text style={styles.smsText}>
							{isLoading ? "Sending..." : "Get SMS"}
						</Text>
					</TouchableOpacity>

					{/* Divider */}
					<Text style={styles.orText}>or with</Text>

					{/* Google login */}
					<TouchableOpacity
						style={styles.googleButton}
						onPress={handleGoogleLogin}
					>
						<Ionicons name='logo-google' size={20} color='black' />
						<Text style={styles.googleText}>Google</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.googleButton}
						onPress={handleAppleLogin}
					>
						<Ionicons name='logo-apple' size={20} color='black' />
						<Text style={styles.googleText}>Apple</Text>
					</TouchableOpacity>

					{/* Terms */}
					<Text style={styles.terms}>
						By continuing you automatically accept our Terms & conditions,
						privacy policy and cookie policy
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	// (same styles as before 👌)
	container: {
		flex: 1,
		paddingVertical: 20,
		backgroundColor: "#fff",
	},
	header: {
		alignItems: "center",
		backgroundColor: "#D9502E",
		position: "relative",
	},
	logo: {
		width: 140,
		height: 140,
		position: "absolute",
		top: 180,
	},
	mask: { width, height: 500 },
	guestButton: {
		position: "absolute",
		bottom: 30,
		right: 10,
		marginBottom: 10,
		backgroundColor: "#f7f7f7",
		paddingHorizontal: 8,
		paddingVertical: 8,
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		gap: 2,
		borderRadius: 20,
		marginLeft: "auto",
	},
	guestText: { fontSize: 14, fontWeight: "600" },
	formContainer: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		overflow: "hidden",
		paddingHorizontal: 40,
		paddingBottom: 40,
		flexDirection: "column",
		backgroundColor: "#fff",
	},
	banner: {
		flexDirection: "row",
		backgroundColor: "#E4572E",
		padding: 12,
		borderRadius: 12,
		marginTop: 20,
		alignItems: "center",
	},
	bannerTitle: { color: "white", fontWeight: "700" },
	bannerSub: { color: "white", fontSize: 12 },
	welcome: {
		fontSize: 24,
		fontWeight: "700",
		textAlign: "center",
		marginTop: 30,
	},
	subText: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		marginBottom: 20,
	},
	phoneInput: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 12,
		paddingHorizontal: 10,
		marginVertical: 10,
		flex: 1,
	},
	countryInput: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 12,
		paddingHorizontal: 10,
		marginVertical: 10,
	},
	countryCode: { marginRight: 10, fontWeight: "600" },
	input: { flex: 1, height: 40 },
	smsButton: {
		backgroundColor: "black",
		paddingVertical: 12,
		borderRadius: 12,
		alignItems: "center",
		marginVertical: 10,
	},
	smsText: { color: "white", fontWeight: "600" },
	orText: { textAlign: "center", marginVertical: 10, color: "#888" },
	googleButton: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 12,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	googleText: {
		marginLeft: 8,
		fontWeight: "600",
		flex: 1,
		textAlign: "center",
	},
	terms: {
		fontSize: 11,
		color: "#999",
		textAlign: "center",
		marginTop: 20,
		lineHeight: 16,
		marginBottom: 20,
	},
});
