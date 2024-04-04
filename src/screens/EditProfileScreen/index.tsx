import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { storageInstance } from "../../utils/storage/index.utils";

export type EditProfileInputValues = { name: string | null; email: string | null };

export const EditProfileScreen: React.FC = () => {
    const [editProfileInputValues, setEditProfileInputValues] = React.useState<EditProfileInputValues>({
        name: null,
        email: null,
    });

    React.useEffect(() => {
        setEditProfileInputValues({
            name: storageInstance.getString('name'),
            email: storageInstance.getString('email'),
        });
    }, [storageInstance]);

    return (
        <SafeAreaView>
            <Text>Edit Profile Screen</Text>
        </SafeAreaView>
    );
};