import {I18n} from "i18n-js";
import {localization} from "@/localizations/localization";
import {useEffect, useState} from "react";
import * as Localization from "expo-localization";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import Button from "@/components/Button";
import {HttpMethod} from "@/modules/api/http";
import {Endpoints} from "@/modules/api/endpoints";
import {useAuth} from "@/contexts/AuthProvider";
import {MeetingPlanDto} from "@/modules/api/dto/MeetingPlanDto";
import {Card, CardContent, Typography, Stack, Paper, Grid} from "@mui/material";

export default function MeetingPlansScreen() {
    const {requestWithAuth, isLoading} = useAuth();
    const i18n = new I18n(localization);
    const [locale, setLocale] = useState(Localization.getLocales()[0].languageCode!);
    const [meetingPlans, setMeetingPlans] = useState<MeetingPlanDto[]>([]);
    const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
    i18n.locale = locale;
    i18n.enableFallback = true;
    i18n.defaultLocale = "en";
    useEffect(() => {
        if (isLoading) return;
        setLoadingPlans(true);
        requestWithAuth<MeetingPlanDto[]>(HttpMethod.GET, Endpoints.MEETINGS).then(data => setMeetingPlans(data));
        setLoadingPlans(false);
    }, [isLoading]);

    if (!meetingPlans) return null;

    const meetingPlanCards = meetingPlans.map((meetingPlan: MeetingPlanDto) => (
        <Paper sx={{p: 2}} elevation={1} key={meetingPlan.id}>
            <Grid container>
                <Typography variant="body2" color="textSecondary">
                    {meetingPlan.title}
                </Typography>
            </Grid>
        </Paper>
    ));

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Meeting plans</Text>
            <Stack spacing={2}>
                {meetingPlanCards}
            </Stack>
            {isLoading ? (<ActivityIndicator/>) : (<></>)}
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
    },
});