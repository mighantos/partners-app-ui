import {StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Index.</Text>
            <Link href={"/meetingPlans"} style={styles.link}>Go to MeetingPlans</Link>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#25292e",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
    },
    link: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "white",
    },
});
