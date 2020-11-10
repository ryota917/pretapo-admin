import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from './graphql/queries' // read
import * as gqlMutations from './graphql/mutations' // create, update, delete

const pretapoConfig = {
  "aws_project_region": "ap-northeast-1",
  "aws_appsync_graphqlEndpoint": "https://lpysywb5rnamtdmuojjypxxkri.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "aws_appsync_region": "ap-northeast-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-xgoywjersjefvh6kg5fgy3r6ci",
}

Amplify.configure(pretapoConfig)

export default  App = () => {
  const [data, setData] = useState([]);

  useEffect( async () => {
    const user = await API.graphql(graphqlOperation(gqlQueries.getUser, { id: 'ryotadegozaru917@icloud.com' }))
    console.log(user)
    setState(user)
  })

  return (
    <View style={styles.container}>
      <Text>テスト</Text>
      <Text>{data}</Text>
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
