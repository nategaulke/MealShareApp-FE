import React, { useState, useCallback } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import FieldComponent from '../components/FieldComponent';


function ConsumerCardComponent() {
    const [isEditing, setIsEditing] = useState(false);

    const [zip, setZip] = useState("00000")

    const [foodOpen, setFoodOpen] = useState(false);
    const [foodSetting, setFoodSetting] = useState(null);
    const [food, setFood] = useState([
        { label: 'American', value: 'American' },
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Mediterranean', value: 'Mediterranean' },
        { label: 'Mexican', value: 'Mexican' },
        { label: 'Indian', value: 'Indian' }
    ])

    const [restrictionsOpen, setRestrictionsOpen] = useState(false);
    const [restrictionsSetting, setRestrictionsSetting] = useState([]);
    const [restrictions, setRestrictions] = useState([
        { label: 'Vegan', value: 'Vegan' },
        { label: 'Vegetarian', value: 'Vegetarian' },
        { label: 'Pescatarian', value: 'Pescatarian' },
        { label: 'Halal', value: 'Halal' },
        { label: 'Kosher', value: 'Kosher' }
    ])

    const [peopleOpen, setPeopleOpen] = useState(false);
    const [peopleSetting, setPeopleSetting] = useState(null);
    const [people, setPeople] = useState([
        { label: 'Individual', value: 'Individual' },
        { label: 'Group', value: 'Group' }
    ])

    const onFoodOpen = useCallback(() => {
        setPeopleOpen(false);
        setRestrictionsOpen(false);
    }, [])

    const onReestrictionsOpen = useCallback(() => {
        setPeopleOpen(false);
        setFoodOpen(false)
    }, [])

    const onPeopleOpen = useCallback(() => {
        setRestrictionsOpen(false);
        setFoodOpen(false)
    }, [])

    return (
        <View style={{ borderColor: "black" }}>
            <View style={styles.row}>
                <Button
                    title={isEditing ? "save" : "edit"}
                    onPress={() => setIsEditing(!isEditing)}
                />
                <Button
                    title="Delete"
                    onPress={() => setIsEditing(!isEditing)}
                />
            </View>

            <FieldComponent
                fieldName="Zipcode"
                isEditing={isEditing}
                field={zip}
                setIsField={setZip}
            />

            <View>
                <Text>Food Interests?</Text>
            </View>
            {!isEditing ?
                <Text>{foodSetting}</Text> :
                <DropDownPicker
                    open={foodOpen}
                    onOpen={onFoodOpen}
                    value={foodSetting}
                    items={food}
                    setOpen={setFoodOpen}
                    setValue={setFoodSetting}
                    setItems={setFood}
                />
            }

            <View>
                <Text>Dietary Restrictions?</Text>
            </View>
            {!isEditing ?
                <Text>{restrictionsSetting}</Text> :
                <DropDownPicker
                    open={restrictionsOpen}
                    onOpen={onReestrictionsOpen}
                    value={restrictionsSetting}
                    items={restrictions}
                    setOpen={setRestrictionsOpen}
                    setValue={setRestrictionsSetting}
                    setItems={setRestrictions}
                    multiple={true}
                    min={0}
                />
            }


            <View>
                <Text>Individual or Group?</Text>
            </View>
            {!isEditing ?
                <Text>{peopleSetting}</Text> :
                <DropDownPicker
                    open={peopleOpen}
                    onOpen={onPeopleOpen}
                    value={peopleSetting}
                    items={people}
                    setOpen={setPeopleOpen}
                    setValue={setPeopleSetting}
                    setItems={setPeople}
                />
            }
        </View>
    );
}

function ProducerCardComponent() {
    const [isEditing, setIsEditing] = useState(false);

    const [zip, setZip] = useState("00000")

    const [foodOpen, setFoodOpen] = useState(false);
    const [foodSetting, setFoodSetting] = useState(null);
    const [food, setFood] = useState([
        { label: 'American', value: 'American' },
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Mediterranean', value: 'Mediterranean' },
        { label: 'Mexican', value: 'Mexican' },
        { label: 'Indian', value: 'Indian' }
    ])
    const [description, setDescription] = useState("")

    return (
        <View>
            <View style={styles.row}>
                <Button
                    title={isEditing ? "save" : "edit"}
                    onPress={() => setIsEditing(!isEditing)}
                />
                <Button
                    title="Delete"
                    onPress={() => setIsEditing(!isEditing)}
                />
            </View>

            <FieldComponent
                fieldName="Zipcode"
                isEditing={isEditing}
                field={zip}
                setIsField={setZip}
            />

            <View>
                <Text>Food Interests?</Text>
            </View>
            {!isEditing ?
                <Text>{foodSetting}</Text> :
                <DropDownPicker
                    open={foodOpen}
                    value={foodSetting}
                    items={food}
                    setOpen={setFoodOpen}
                    setValue={setFoodSetting}
                    setItems={setFood}
                />
            }

            <Text>Item Description</Text>
            <TextInput
                onChangeText={setDescription}
                value={description}
                placeholder="Item Description"
                keyboardType="default"
            />
        </View>
    )
}

function AddScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView>
                <ProducerCardComponent />
            </ScrollView>
        </View>
    )
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
})

export default AddScreen