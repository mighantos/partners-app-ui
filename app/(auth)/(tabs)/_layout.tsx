import {Tabs} from "expo-router";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {backgroundColor: "black"},
            headerShadowVisible: false,
            headerTintColor: "white",
            tabBarActiveTintColor: "green",
            tabBarStyle: {backgroundColor: "black"},
        }}>
            <Tabs.Screen name="index" options={{
                headerTitle: "Home",
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? "home" : "home-outline"} color={color} size={20}/>
                ),
            }}/>
            <Tabs.Screen name="meetingPlans" options={{
                headerTitle: "Meeting plans",
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? "calendar" : "calendar-outline"} color={color} size={20}/>
                ),
            }}/>
            <Tabs.Screen name="profile" options={{
                headerTitle: "Profile",
                tabBarIcon: ({color, focused}) => (
                    <MaterialCommunityIcons name={focused ? "account-circle" : "account-circle-outline"} color={color}
                                            size={20}/>
                ),
            }}/>
        </Tabs>
    );
}
