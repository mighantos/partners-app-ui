import {Text} from "react-native-paper";
import {useLocalSearchParams} from "expo-router";
import {StyleSheet, View} from "react-native";

export default function MeetingPlanScreen() {
    const {meetingPlanId} = useLocalSearchParams<{ meetingPlanId: string }>();
    return (
        <View style={styles.container}>
            <Text variant={"headlineLarge"}>{meetingPlanId}</Text>
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
});