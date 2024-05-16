import { responsiveHorizontalScale, responsiveVerticalScale } from "@/utils/metrics/index.utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: responsiveHorizontalScale(364),
        height: responsiveVerticalScale(46),
        borderRadius: 26,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        width: '100%',
        height: '100%',
    }
});