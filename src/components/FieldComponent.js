import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


function FieldComponent({ fieldName, isEditing, field, setIsField }) {
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

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    }
})

export default FieldComponent