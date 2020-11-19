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

//import ImageTab
import SearchItemImage from './screens/ImageTab/SearchItemImage'
import ItemImageList from './screens/ImageTab/ItemImageList'
import ItemImageDetail from './screens/ImageTab/ItemImageDetail'

//import OrderTab
import OrderItem from './screens/OrderTab/OrderItem'
import OrderList from './screens/OrderTab/OrderList'
import TakeItemImage from './screens/ImageTab/TakeItemImage';

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

const ImageTabStack = createStackNavigator(
  {
    SearchItemImage: { screen: SearchItemImage },
    ItemImageList: { screen: ItemImageList },
    TakeItemImage: { screen: TakeItemImage },
    ItemImageDetail: { screen: ItemImageDetail },
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
    '画像投稿': {
      screen: ImageTabStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon size={24} name='camera' color={tintColor} />
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