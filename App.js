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

//import ChatTab
import ChatList from './screens/ChatTab/ChatList'
import Chat from './screens/ChatTab/Chat'

//import CreateTab
import { CreateTab } from './screens/CreateTab/CreateTab'

Amplify.configure(
  {
    "aws_project_region": "ap-northeast-1",
    "aws_appsync_graphqlEndpoint": "https://bk7lszqtorbhrjwsv6kpumcdrq.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-uiuqep6yuvgx7f6wppqqtrtwuq",
    "aws_cognito_identity_pool_id": "ap-northeast-1:4394e108-1e7d-449c-a1bb-a8a729ed4541",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "ap-northeast-1_kZyCxD80X",
    "aws_user_pools_web_client_id": "7a7nv8v8462d0cc1bev5v1v7dg",
    "oauth": {},
    "aws_user_files_s3_bucket": "amplify-pretapo-prod-121107-deployment",
    "aws_user_files_s3_bucket_region": "ap-northeast-1",
    Auth: {
      identityPoolId: 'ap-northeast-1:4394e108-1e7d-449c-a1bb-a8a729ed4541', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'ap-northeast-1', // REQUIRED - Amazon Cognito Region
    },
    Storage: {
      AWSS3: {
          bucket: 'amplify-pretapo-prod-121107-deployment', //REQUIRED -  Amazon S3 bucket name
          region: 'ap-northeast-1', //OPTIONAL -  Amazon service region
      }
    }
  },
)

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
    ItemImageDetail: { screen: ItemImageDetail },
    // 使っていない
    TakeItemImage: { screen: TakeItemImage },
  }
)

const OrderTabStack = createStackNavigator(
  {
    OrderItem: { screen: OrderItem },
    OrderList: { screen: OrderList }
  }
)

const SupportTabStack = createStackNavigator(
  {
    ChatList: { screen: ChatList },
    Chat: { screen: Chat }
  }
)

const CreateTabStack = createStackNavigator(
  {
    '新規データ作成': { screen: CreateTab }
  }
)

const Tab = createBottomTabNavigator(
  {
    'アイテム更新': {
      screen: ItemTabStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon size={24} name='search' color={tintColor} />
      }
    },
    '新規データ作成': {
      screen: CreateTabStack
    },
    '注文リスト': {
      screen: OrderTabStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon size={24} name='bars' color={tintColor} />
      }
    },
    'サポート': {
      screen: SupportTabStack,
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