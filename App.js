import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from './graphql/queries' // read
import * as gqlMutations from './graphql/mutations' // create, update, delete
import awsmobile from './aws-exports'

Amplify.configure(awsmobile)

export default  App = () => {
  const [data, setData] = useState([]);

  useEffect( async () => {
    const user = await API.graphql(graphqlOperation(gqlQueries.getUser, { id: 'ryotadegozaru917@icloud.com' }))
    console.log(user)
    setData(user)
  })

  return (
    <View style={styles.container}>
      <Text>テスト</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
