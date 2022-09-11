import React, {useState} from "react"; //object importing from react module
import{ StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';


    export default function Cuisine() {

        const Food = [
            {
                id: 1,
                subject: 'American',
                selected: false,
                image: require('./assets/american.jpg'),
            },
            {
                id: 2,
                subject: 'Polish',
                selected: false,
                image: require('./assets/polish.jpg'),
            },

            {
                id: 3,
                subject: 'Indian',
                selected: false,
                image: require('./assets/indian.jpg'),
            },
            {
                id: 4,
                subject: 'Jamaican',
                selected: false,
                image: require('./assets/jamaican.jpg'),
            },

            {
                id: 5,
                subject: 'Mediterranean',
                selected: false,
                image: require('./assets/mediterranean.jpg'),
            },
            {
                id: 6,
                subject: 'Mexican',
                selected: false,
                image: require('./assets/mexican.jpg'),
            },
            {
                id: 7,
                subject: 'Chines',
                selected: false,
                image: require('./assets/chines.jpg'),
            },
            {
                id: 8,
                subject: 'French',
                selected: false,
                image: require('./assets/french.jpg'),
            },
            {
                id: 9,
                subject: 'Filipino',
                selected: false,
                image: require('./assets/filipino.jpg'),
            }
        ];

        const headerComponent = () => {
            return <Text style={styles.listHeadline}>Favorite Cuisines</Text>
        }

        const [select, setSelect] = useState(Food);
        const handleOnpress = (item) => {
            const newItem = select.map((val) => {
                if (val.id === item.id){
                    console.log(val.id);
                    return { ...val, select:!val.select};
                }
                else{
                    return val;
                }
            })
            setSelect(newItem);
        }

        return (
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    ListHeaderComponentStyle={styles.listHeader}
                    ListHeaderComponent={headerComponent}
                    data={select}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={()=> handleOnpress(item)}>
                            <View style={{marginTop:10,backgroundColor:item.select?'#643464':'#927092',padding:20}}>
                            <Text style={styles.fancyText}>{item.subject}</Text>
                            </View>
                            </TouchableOpacity>
                        )
                    }} 
                    />
            </View>
        );
    }
const styles = StyleSheet.create({
    buttons: {
        borderRadius: 4,
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: 'center',
    },
    fancyText: {
        fontSize: 18, 
        color: '#ECBC74', 
        fontWeight: 'bold' 
    },
    listHeader: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeadline: {
        color: 'grey',
        fontSize: 21,
        fontWeight: 'bold',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
    },
    avavtarContainer:{
        bakcgroundColor: 'coral',
        borderRadius: 100,
        height: 89,
        weidth: 89,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 55,
        width: 55,
    },
    name: {
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 13,
    }
});