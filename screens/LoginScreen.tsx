import {Button, StyleSheet, Text, View} from "react-native";
import {useAuth} from "@/contexts/AuthProvider";

export default function LoginScreen() {
    const {user, isLoggedIn, signIn, signOut} = useAuth();

    if (!isLoggedIn()){
        return (<>
            <View style={styles.container}>
                <Button title={"Sign in with Hugo"} onPress={signIn} />
            </View>
        </>)
    }

    return (<>
        <View style={styles.container}>
            <Text style={styles.text}>{JSON.stringify(user)}</Text>
            <Button title={"Sign out"} onPress={signOut} />
        </View>
    </>);
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#25292e",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        flexShrink: 1,
        color: "white",
    }
})