import {I18n} from "i18n-js";
import {localization} from "@/localizations/localization";
import {useState} from "react";
import * as Localization from "expo-localization";
import {StyleSheet, Text, View} from "react-native";
import Button from "@/components/Button";

export default function MeetingPlansScreen() {
    const i18n = new I18n(localization);
    let [locale, setLocale] = useState(Localization.getLocales()[0].languageCode!);
    i18n.locale = locale;
    i18n.enableFallback = true;
    i18n.defaultLocale = "en";
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Meeting plans</Text>
            <Button label={i18n.t("labelNew")}/>
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
    }
})