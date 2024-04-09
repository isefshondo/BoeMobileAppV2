import React from "react";
import { CowInfosCardProps } from "./types";
import { Text, View } from "react-native";
import { colors } from "../../themes/colors/index.themes";
import { styles } from "./styles";

export const CowInfosCard: React.FC<Readonly<CowInfosCardProps>> = ({cowNIdentification, cowName, statusTreatment, cowIllness, illnessPercentage}: CowInfosCardProps) => {
    const illnessVisualRepresentation = {
        'Dermatofitose bovina': <Text>Dermatofitose bovina</Text>,
        'Dermatofilose bovina': <Text>Dermatofilose bovina</Text>,
        'Lumpy Skin': <Text>Lumpy Skin</Text>,
    };
    // Will be used on styles
    const statusTreatmentVisualRepresentation = {
        'Sem tratamento': colors.LIGHT_RED,
        'Em tratamento': colors.YELLOW,
        'Tratamento concluído': colors.LIGHT_GREEN,
    };
    return (
        <View style={[styles.cardContainer, {backgroundColor: statusTreatmentVisualRepresentation[statusTreatment]}]}>
            <View>
                {/* The first View is for the Cow's PFP */}
                <View />
                <View>
                    <View>
                        <Text>{cowNIdentification}</Text>
                        <Text>{cowName}</Text>
                    </View>
                    <View>
                        <View>
                            {/* Here comes the indicator */}
                            <Text>{statusTreatment}</Text>
                        </View>
                        <View>
                            {illnessVisualRepresentation[cowIllness]}
                            <Text>{illnessPercentage}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* This View may not be necessary */}
            <View />
        </View>
    );
};