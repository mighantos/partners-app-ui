import {StyleSheet, Text, View} from "react-native";
import Button from "@/components/Button";

export default function MeetingPlans() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Meeting plans</Text>
            <Button label={"New"}/>
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
    }
})