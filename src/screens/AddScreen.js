import React, { useState, useCallback } from 'react'
import { Button, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import FieldComponent from '../components/FieldComponent';


function ConsumerCardComponent({ newTicket, edit }) {
    const [isEditing, setIsEditing] = useState(edit);

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

            {!newTicket &&
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
            }
        </View>
    );
}

function ProducerCardComponent({ newTicket, edit }) {
    const [isEditing, setIsEditing] = useState(edit);

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

            {!newTicket && <View style={styles.row}>
                <Button
                    title={isEditing ? "save" : "edit"}
                    onPress={() => setIsEditing(!isEditing)}
                />
                <Button
                    title="Delete"
                    onPress={() => setIsEditing(!isEditing)}
                />
            </View>}
        </View>
    )
}

function AddScreen() {
    const [popupVisible, setPopupVisible] = useState(false)
    const [isConsumer, toggleConsumer] = useState(false)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Add"
                onPress={() => setPopupVisible(true)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={popupVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setPopupVisible(!popupVisible);
                    // Create New Card based on type
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Have Food to Give | Looking for Food</Text>
                        <Switch
                            onValueChange={toggleConsumer}
                            value={isConsumer}
                        />
                        {isConsumer && <ConsumerCardComponent newTicket={true} edit={true} />}
                        {!isConsumer && <ProducerCardComponent newTicket={true} edit={true} />}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setPopupVisible(!popupVisible)}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <ProducerCardComponent newTicket={false} edit={false} />
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default AddScreen