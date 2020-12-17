import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../../graphql/queries' // read
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather'

const SearchItemImage = (props) => {
    const [searchId, setSearchId] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [items, setItems] = useState([])

    const searchItemImage = async () => {
        try {
            const res = await API.graphql(graphqlOperation(gqlQueries.getItem, { id: searchId }))
            const item = res.data.getItem
            if(item) {
                props.navigation.navigate('ItemImageList', { item: item })
                console.log(item.imageURLs)
            } else {
                setAlertVisible(true)
                setTimeout(() => setAlertVisible(false), 3000)
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        console.log('useEffectが呼び出されます')
        const fetchItems = async () => {
            props.navigation.addListener('didFocus', async () => {
                const res = await API.graphql(graphqlOperation(gqlQueries.listItems))
                console.log(res)
                // setItems()
            })
        }
        fetchItems()
    }, [props.navigation])

    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={{ flexDirection: 'row', display: alertVisible ? 'block' : 'none', left: wp('20%'), bottom: hp('5%') }}>
                    <Icon name='alert-circle' size={17} style={{ color: '#A60000' }} />
                    <Text style={styles.alertText}>アイテムが存在しません</Text>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText = {id => setSearchId(id)}
                        placeholder='品番を入力してください'
                        value={searchId}
                    />
                    <Icon
                        name='search'
                        size={30}
                        onPress={() => searchItemImage()}
                        style={styles.icon}
                    />
                </View>
                {/* {messages.map((message, idx) =>
                    <TouchableHighlight
                        key={idx}
                        onPress={() => props.navigation.navigate('Chat', { message: message })}
                        underlayColor='white'
                    >
                        <View style={{ borderColor: 'silver', borderBottomWidth: 1, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginBottom: 10 }}>{message['room']}</Text>
                            <Text>{message['text']}</Text>
                        </View>
                    </TouchableHighlight>
                )} */}
                {}
            </View>
        </View>
    )
}

export default SearchItemImage;

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp("100%"),
        backgroundColor: 'white'
    },
    innerContainer: {
        height: hp('10%'),
        marginTop: hp('25%')
    },
    alertText: {
        marginLeft: wp('2%'),
        color: '#A60000',
        fontWeight: 'bold',
        marginTop: 2
    },
    searchContainer: {
        position: 'absolute',
        left: wp('10%'),
        flexDirection: 'row',
        width: wp('80%')
    },
    searchInput: {
        fontSize: 20
    },
    icon: {
        position: 'absolute',
        right: wp('0%')
    }
})