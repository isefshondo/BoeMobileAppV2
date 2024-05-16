import { responsiveHorizontalScale } from "@/utils/metrics/index.utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mixedTitleContainer: {
        width: responsiveHorizontalScale(294),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});