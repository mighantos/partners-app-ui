import {Stack} from "expo-router";
import AuthProvider from "@/contexts/AuthProvider";
import {PaperProvider} from "react-native-paper";

export default function RootLayout() {
    return (<>
        <PaperProvider>
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
        </PaperProvider>
    </>);
}
