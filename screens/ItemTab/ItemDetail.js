import React from 'react';
import { View, StyleSheet, Image, Text, TextInput, ScrollView, Button, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import { API, graphqlOperation } from 'aws-amplify';
import * as gqlMutations from '../../graphql/mutations'

export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item,
            description: this.props.navigation.state.params.item.description,
            stateDescription: this.props.navigation.state.params.item.stateDescription
        }
    }

    static navigationOptions = () => ({
        title: 'アイテム詳細'
    })

    onChangeData = (key, value) => {
        const changedItem = Object.assign({}, this.state.item)
        changedItem[key] = value
        this.setState({ item: changedItem })
    }

    updateItemData = async () => {
        delete this.state.item.itemCarts
        delete this.state.item.itemCartLogs
        delete this.state.item.favoriteUser
        delete this.state.item.createdAt
        delete this.state.item.updatedAt
        const res = await API.graphql(graphqlOperation(gqlMutations.updateItem, {
            input: this.state.item
        }))
        console.log(res)
        Alert.alert('アイテムデータが\n更新されました！')
    }

    onPressCleaning = async () => {
        Alert.alert('アイテムステータスを\nクリーニングに変更しました！')
        await API.graphql(graphqlOperation(gqlMutations.updateItem, {
            input: {
                id: this.state.item.id,
                status: 'CLEANING'
            }
        }))
    }

    onPressWaiting = async () => {
        Alert.alert('アイテムステータスを\n出荷待ちに変更しました！')
        await API.graphql(graphqlOperation(gqlMutations.updateItem, {
            input: {
                id: this.state.item.id,
                status: 'WAITING'
            }
        }))
    }


    render() {
        const { searchId, item } = this.state
        const prevItem = this.props.navigation.state.params.item
        const imagesDom = item.imageURLs.map((imgUrl, idx) =>
            <Image key={idx} source={{ uri: imgUrl }} style={{ width: wp('100%'), height: wp('100%') }}/>
        )
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.imagesView}>
                        <Swiper
                            style={styles.swiper}
                            showButtons={true}
                            activeDotColor='#7389D9'
                            dotStyle={{ top: hp('7%')}}
                            activeDotStyle={{ top: hp('7%')}}
                        >
                            {imagesDom}
                        </Swiper>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>品番</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(id) => this.onChangeData('id', id)}
                                placeholder={prevItem.id}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>アイテム名</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(name) => this.onChangeData('name', name)}
                                placeholder={prevItem.name}
                                multiline={true}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ステータス</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(status) => this.onChangeData('status', status)}
                                placeholder={prevItem.status}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ランク</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(rank) => this.onChangeData('rank', rank)}
                                placeholder={prevItem.rank}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>季節</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(season) => this.onChangeData('season', season)}
                                placeholder={prevItem.season[0]}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ブランド</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(brand) => this.onChangeData('brand', brand)}
                                placeholder={prevItem.brand}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>カラー</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(color) => this.onChangeData('color', color)}
                                placeholder={prevItem.color[0]}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>素材</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(material) => this.onChangeData('material', material)}
                                placeholder={prevItem.material[0]}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>大カテゴリ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(bigCategory) => this.onChangeData('bigCategory', bigCategory)}
                                placeholder={prevItem.bigCategory[0]}
                            />
                        </View>
                        {/* <View style={styles.dataView}>
                            <Text style={styles.dataText}>小カテゴリ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(smallCategory) => this.onChangeData('smallCategory', smallCategory)}
                                placeholder={prevItem.smallCategory[0]}
                            />
                        </View> */}
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>サイズ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(size) => this.onChangeData('size', size)}
                                placeholder={prevItem.size}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>仕入れ先</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(supplierName) => this.onChangeData('supplierName', supplierName)}
                                placeholder={prevItem.supplierName}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>着丈</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(dressLength) => this.onChangeData('dressLength', dressLength)}
                                placeholder={String(prevItem.dressLength)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>身幅</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(dressWidth) => this.onChangeData('dressWidth', dressWidth)}
                                placeholder={String(prevItem.dressWidth)}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>袖丈</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(sleeveLength) => this.onChangeData('sleeveLength', sleeveLength)}
                                placeholder={String(prevItem.sleeveLength)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>アイテムデータ作成日時</Text>
                            <Text style={{ fontSize: 18, marginTop: hp('1%') }}>{item.createdAt}</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>アイテム説明</Text>
                        <TextInput
                            style={styles.descriptionInput}
                            onChangeText={(description) => this.onChangeData('description', description)}
                            value={item.description}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>アイテム状態説明</Text>
                        <TextInput
                            style={styles.descriptionInput}
                            onChangeText={(stateDescription) => this.onChangeData('stateDescription', stateDescription)}
                            value={item.stateDescription}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.updateButtonView}>
                        <Button
                            onPress={() => this.updateItemData()}
                            title='更新する'
                            color='white'
                        />
                    </View>
                    <View　style={styles.updateButtonView}>
                        <Button
                            onPress={() => this.onPressCleaning()}
                            title='クリーニング'
                            color='white'
                        />
                    </View>
                    <View style={styles.updateButtonView}>
                        <Button
                            onPress={() => this.onPressWaiting()}
                            title='出荷可能'
                            color='white'
                        />
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
        height: hp("100%"),
    },
    scrollView: {
        width: wp('100%'),
        height: hp('100%'),
        flex: 1
    },
    imagesView: {
        width: wp('100%'),
        height: wp('80%'),
        marginBottom: hp('4%')
    },
    flexView: {
        flexDirection: 'row'
    },
    dataView: {
        width: wp('40%'),
        marginLeft: wp('5%'),
        marginTop: hp('3%')
    },
    dataText: {
        fontSize: 13,
    },
    dataInput: {
        marginTop: hp('1%'),
        fontSize: 18
    },
    updateButtonView: {
        marginLeft: wp('50%'),
        marginTop: hp('5%'),
        backgroundColor: '#7389D9',
        width: wp('40%'),
        borderRadius: 18
    },
    descriptionView: {
        width: wp('80%'),
        left: wp('5%'),
        marginTop: hp('3%')
    },
    descriptionText: {
        fontSize: 13
    },
    descriptionInput: {
        marginTop: hp('2%'),
        fontSize: 18,
    }
})