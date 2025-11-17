import {Pressable, StyleSheet, Text, View} from "react-native";
import {useAuth} from "@/contexts/AuthProvider";
import {HttpMethod} from "@/modules/api/http";
import {Endpoints} from "@/modules/api/endpoints";

type Props = {
    label: string;
}

export default function Button({label}: Props) {
    const {requestWithAuth}=useAuth();
    return (
        <View>
            <Pressable style={styles.buttonContainer}
                       onPress={() => {
                           requestWithAuth(HttpMethod.GET, Endpoints.MEETINGS).then(data => alert(JSON.stringify(data)));
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