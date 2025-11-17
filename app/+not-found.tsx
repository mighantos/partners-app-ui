import {StyleSheet, Text, View} from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page not found. :(</Text>
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
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "white",
    }
})
