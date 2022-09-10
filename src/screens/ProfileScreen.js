import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const FieldComponent = ({ fieldName, isEditing, field, setIsField }) => {
    return (
        <View style={styles.row}>
            <Text>{fieldName}: </Text>
            {!isEditing &&
                <Text>{field}</Text>
            }
            {isEditing &&
                <TextInput
                    placeholder={field}
                    onChangeText={(text) => setIsField(text)}
                />
            }
        </View>
    );
}

function ProfileScreen({ navigation }) {
    const [isEditing, setIsEditing] = useState(false);

    const [isFirstName, setIsFirstName] = useState("Unknown");
    const [isLastName, setIsLastName] = useState("Unknown");
    const [isEmail, setIsEmail] = useState("Unknown");
    const [isPronouns, setIsPronouns] = useState("Unknown");
    const [isAge, setIsAge] = useState(0);

    return (
        <View style={styles.container}>
            <FieldComponent
                fieldName="First Name"
                isEditing={isEditing}
                field={isFirstName}
                setIsField={setIsFirstName}
            />
            <FieldComponent
                fieldName="Last Name"
                isEditing={isEditing}
                field={isLastName}
                setIsField={setIsLastName}
            />
            <FieldComponent
                fieldName="Email"
                isEditing={isEditing}
                field={isEmail}
                setIsField={setIsEmail}
            />
            <FieldComponent
                fieldName="Pronouns"
                isEditing={isEditing}
                field={isPronouns}
                setIsField={setIsPronouns}
            />
            <FieldComponent
                fieldName="Age"
                isEditing={isEditing}
                field={isAge}
                setIsField={setIsAge}
            />
            <Button
                title="Edit"
                onPress={() => setIsEditing(!isEditing)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    row: {
        flexDirection: "row"
    }
});

export default ProfileScreen;

