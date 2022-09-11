import React, { createContext, useState, useCallback, Children } from 'react'

const ConsumerCardContext = createContext()

export const ConsumerCardProvider = ({ children }) => {
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
        <ConsumerCardContext.Provider
            value={{
                isEditing,
                setIsEditing,
                zip,
                setZip,
                foodOpen,
                setFoodOpen,
                foodSetting,
                setFoodSetting,
                food,
                setFood,
                restrictionsOpen,
                setRestrictionsOpen,
                restrictions,
                setRestrictions,
                peopleOpen,
                setPeopleOpen,
                peopleSetting,
                setPeopleSetting,
                people,
                setPeople,
                onFoodOpen,
                onReestrictionsOpen,
                onPeopleOpen
            }}
        >
            {children}
        </ConsumerCardContext.Provider>
    )
}

export default ConsumerCardContext