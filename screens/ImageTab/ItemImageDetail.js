import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ItemImageDetail = ({navigation}) => {
    console.log(navigation.state.params.item.imageURLs, 'hello')
    return (
        <View><Text>hello</Text></View>
    )
}

export default ItemImageDetail;
