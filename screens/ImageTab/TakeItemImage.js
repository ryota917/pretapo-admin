import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../../graphql/queries' // read
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather'

const TakeItemImage = () => {
    return (
        <View>
            <Text>hello</Text>
        </View>
    )
}

export default TakeItemImage