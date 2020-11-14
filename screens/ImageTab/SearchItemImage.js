import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../../graphql/queries' // read
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather'

const SearchItemImage = () => {
    return (
        <View>
            <Text>hello world</Text>
        </View>
    )
}

export default SearchItemImage;
