import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import * as gqlQueries from '../../graphql/queries' // read
import { API, graphqlOperation } from 'aws-amplify';
import Icon from 'react-native-vector-icons/Feather'

export default class o extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            alertVisible: false
        }
    }

    static navigationOptions = () => ({
        title: '注文リスト'
    })

    onPressDisplay = async () => {
        const { date} = this.state
        const gteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const lteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        const res = await API.graphql(graphqlOperation(gqlQueries.searchCartLogs, {
            filter: {
                createdAt: {
                    gte: gteDate,
                    lte: lteDate
                }
            }
        }))
        const cartLogs = res.data.searchCartLogs.items
        if(cartLogs.length) {
            this.props.navigation.navigate('OrderList', {
                cartLogs: res.data.searchCartLogs.items,
                date: this.state.date
            })
        } else {
            this.setState({ alertVisible: true })
            setTimeout(() => this.setState({ alertVisible: false }), 3000)
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={{ flexDirection: 'row', display: this.state.alertVisible ? 'block' : 'none', left: wp('20%'), bottom: hp('5%') }}>
                        <Icon name='alert-circle' size={17} style={{ color: '#A60000' }} />
                        <Text style={styles.alertText}>注文がありません</Text>
                    </View>
                    <Text style={styles.text}>注文日を選択</Text>
                    <DateTimePicker
                        style={styles.timePicker}
                        value={this.state.date}
                        onChange = {(event, date) => this.setState({ date: date }) }
                        mode={'date'}
                    />
                    <Button
                        title='表示'
                        onPress={() => this.onPressDisplay() }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%')
    },
    innerContainer: {
        width: wp('80%'),
        left: wp('10%'),
        marginTop: hp('10%')
    },
    alertText: {
        marginLeft: wp('2%'),
        color: '#A60000',
        fontWeight: 'bold',
        marginTop: 2
    },
    text: {
        fontSize: 20
    },
    timePicker: {
        width: wp('70%'),
        marginTop: hp('1%')
    }
})