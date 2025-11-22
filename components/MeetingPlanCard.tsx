import {StyleSheet} from "react-native";
import {Surface, Text} from "react-native-paper";
import {MeetingPlanDto} from "@/modules/api/dto/MeetingPlanDto";
import {Link} from "expo-router";

type Props = {
    meetingPlan: MeetingPlanDto;
}

export default function MeetingPlanCard({meetingPlan}: Props) {
    return (
        <Link href={{pathname: "/meetingPlans/[meetingPlanId]", params: {meetingPlanId: meetingPlan.id!}}}>
            <Surface elevation={1} key={meetingPlan.id} style={styles.p2}>
                <Text variant="titleMedium">
                    {meetingPlan.title}
                </Text>
                <Text variant="bodyMedium">
                    Start date: {meetingPlan.startingDate.toString()}
                </Text>
                <Text variant="bodyMedium">
                    Period: {meetingPlan.period}
                </Text>
                <Text variant="bodyMedium">
                    Creator: {meetingPlan.creator?.userName}
                </Text>
                <Text variant="bodyMedium">
                    Partner: {meetingPlan.partner.userName}
                </Text>
            </Surface>
        </Link>
    );
}

const styles = StyleSheet.create({
    p2: {
        padding: 2,
    },
});