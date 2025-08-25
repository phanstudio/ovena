import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
	return (
		<ParallaxScrollView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>Step 4: Enjoy!</ThemedText>
				<ThemedText>
					{`This starter app is built with React Native, Expo, and TypeScript. `}
					{`Check out the `}
					<ThemedText type='defaultSemiBold'>README.md</ThemedText> for more
					information.
				</ThemedText>
			</ThemedView>

			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>Step 4: Enjoy!</ThemedText>
				<ThemedText>
					{`This starter app is built with React Native, Expo, and TypeScript. `}
					{`Check out the `}
					<ThemedText type='defaultSemiBold'>README.md</ThemedText> for more
					information.
				</ThemedText>
			</ThemedView>

			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>Step 4: Enjoy!</ThemedText>
				<ThemedText>
					{`This starter app is built with React Native, Expo, and TypeScript. `}
					{`Check out the `}
					<ThemedText type='defaultSemiBold'>README.md</ThemedText> for more
					information.
				</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
