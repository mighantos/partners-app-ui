import {Stack} from "expo-router";
import {useAuth} from "@/contexts/AuthProvider";

export default function AuthLayout() {
    const {isLoggedIn, isLoading} = useAuth();
    return (<>
        <Stack>
            <Stack.Protected guard={isLoggedIn() || isLoading}>
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false,
                }}/>
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn() && !isLoading}>
                <Stack.Screen name="login" options={{
                    headerShown: false,
                }}/>
            </Stack.Protected>
        </Stack>
    </>);
}
