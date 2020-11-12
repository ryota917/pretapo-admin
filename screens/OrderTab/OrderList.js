import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import * as gqlQueries from '../../graphql/queries' // read
import { API, graphqlOperation } from 'aws-amplify';

export default class o extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartLogs: this.props.navigation.state.params.cartLogs,
            date: this.props.navigation.state.params.date
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { date } = navigation.state.params
        const dateText = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日の注文'
        return {
            title: dateText
        }
    }

    componentDidMount = () => {
        this.props.navigation.addListener('didFocus', () => {
            console.log(this.state.cartLogs)
        })
    }

    render() {
        const { cartLogs } = this.state
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        <Text style={styles.orderNumText}>{cartLogs.length}つの注文があります</Text>
                        {cartLogs.map(cartLog =>
                            <View style={styles.orderView}>
                                <View style={styles.orderUserView}>
                                    <Text style={styles.titleText}>ユーザーid</Text>
                                    <Text style={styles.dataText}>{cartLog.user.id}</Text>
                                    <Text style={styles.titleText}>ユーザー名</Text>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.dataText}>{cartLog.user.name}</Text>
                                        <Text style={styles.dataText}>{cartLog.user.nameKana}</Text>
                                    </View>
                                    <Text style={styles.titleText}>所在地</Text>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.dataText}>{cartLog.user.address}</Text>
                                        <Text style={styles.dataText}>{cartLog.user.postalCode}</Text>
                                    </View>
                                </View>
                                <Text style={styles.orderTitleText}>注文されたアイテム</Text>
                                {cartLog.itemCartLogs.items.map(item =>
                                    <View style={styles.orderItemView}>
                                        <Image style={styles.itemImage} source={{ uri: item.item.imageURLs[0] }}/>
                                        <View>
                                            <Text style={styles.itemTitleText}>id</Text>
                                            <Text style={styles.itemDataText}>{item.item.id}</Text>
                                            <Text style={styles.itemTitleText}>アイテム名</Text>
                                            <Text style={styles.itemDataText}>{item.item.name}</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                    <View style={{ height: hp('30%') }}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: 'white'
    },
    innerContainer: {
        width: wp('80%'),
        left: wp('10%'),
        marginTop: hp('4%')
    },
    orderNumText: {
        fontSize: 18,
        marginBottom: hp('3%')
    },
    orderView: {
        marginBottom: hp('5%'),
        marginTop: hp('2%')
    },
    dataContainer: {
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 11,
        marginBottom: hp('1%'),
        color: 'grey'
    },
    dataText: {
        fontSize: 20,
        marginBottom: hp('2%'),
        marginRight: wp('2%')
    },
    orderUserView: {
    },
    orderTitleText: {
        marginBottom: hp('2%'),
        fontSize: 18
    },
    itemContainer: {
        flexDirection: 'row'
    },
    orderItemView: {
        flexDirection: 'row',
        marginBottom: hp('1%')
    },
    itemImage: {
        width: wp('24%'),
        height: wp('24%')
    },
    itemTitleText: {
        fontSize: 11,
        color: 'grey',
        marginLeft: wp('5%'),
    },
    itemDataText: {
        marginLeft: wp('5%'),
        fontSize: 20,
        marginBottom: hp('1%')
    }
})