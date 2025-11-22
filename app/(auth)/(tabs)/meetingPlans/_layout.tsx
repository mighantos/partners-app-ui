import {Stack} from "expo-router";
import {StyleSheet} from "react-native";

export default function MeetingPlansLayout() {
    return (<>
        <Stack screenOptions={{
            headerStyle: {backgroundColor: "black"},
            headerShadowVisible: false,
            headerTintColor: "white",
        }}>
            <Stack.Screen name="index" options={{
                headerTitle: "Meeting plans",
            }}/>
            <Stack.Screen name="[meetingPlanId]" options={{
                headerTitle: "Meeting plan",
            }}/>
        </Stack>
    </>);
}
