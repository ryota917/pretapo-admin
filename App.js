import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import awsmobile from './aws-exports'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';

//import ItemTab
import SearchItem from './screens/ItemTab/SearchItem'
import ItemDetail from './screens/ItemTab/ItemDetail'

//import OrderTab
import OrderItem from './screens/OrderTab/OrderItem'
import OrderList from './screens/OrderTab/OrderList'

Amplify.configure(awsmobile);

const ItemTabStack = createStackNavigator(
  {
    SearchItem: { screen: SearchItem },
    ItemDetail: { screen: ItemDetail }
  },
  {
    initialRouteName: 'SearchItem'
  }
)

const OrderTabStack = createStackNavigator(
  {
    OrderItem: { screen: OrderItem },
    OrderList: { screen: OrderList }
  }
)

const Tab = createBottomTabNavigator(
  {
    'アイテム検索': {
      screen: ItemTabStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon size={24} name='search' color={tintColor} />
      }
    },
    '注文リスト': {
      screen: OrderTabStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon size={24} name='bars' color={tintColor} />
      }
    }
  }
)

export default class App extends React.Component {
  render() {
    const Layout = createAppContainer(Tab)
    return(
      <Layout />
    )
  }
}