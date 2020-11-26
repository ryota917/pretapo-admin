import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../../graphql/queries' // read
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather'

const SearchItemImage = ({ navigation }) => {
    const [searchId, setSearchId] = useState();
    const [alertVisible, setAlertVisible] = useState(false);

    const searchItemImage = async () => {
        try {
            const res = await API.graphql(graphqlOperation(gqlQueries.getItem, { id: searchId }))
            const item = res.data.getItem
            if(item) {
                navigation.navigate('ItemImageList', { item: item })
                console.log(item.imageURLs)
            } else {
                setAlertVisible(true)
                setTimeout(() => setAlertVisible(false), 3000)
            }
        } catch(err) {
            console.error(err)
        }
    }

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