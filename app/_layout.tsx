import {Stack} from "expo-router";
import AuthProvider from "@/contexts/AuthProvider";

export default function RootLayout() { // TODO: Structure: https://medium.com/@md.alishanali/scalable-and-modular-react-native-expo-folder-structure-2025-606abc0bf7d6


    return (<>
        <AuthProvider>
            <Stack>
                <Stack.Screen name="(auth)" options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="+not-found" options={{
                    headerTitle: "Page not found",
                }}/>
            </Stack>
        </AuthProvider>
    </>);
}
