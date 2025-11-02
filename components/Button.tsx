import {Pressable, StyleSheet, Text, View} from "react-native";

type Props = {
    label: string;
}

export default function Button({label}: Props) {
    return (
        <View>
            <Pressable style={styles.buttonContainer}
                       onPress={() => {
                           getMeetings().then(data => alert(data));
                       }}>
                <Text>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10
    }
})

const getMeetings = async () => {
    try {
        const res = await fetch("http://localhost:8080/partners-meeting", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + ""
            }
        });
        const json = await res.json();
        return JSON.stringify(json);
    } catch (error) {
        console.error(error);
    }
}