import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, Button, Image, Alert } from 'react-native'
import CheckBox from 'react-native-check-box'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { API, graphqlOperation, Storage } from 'aws-amplify';
import * as gqlMutations from '../../graphql/mutations'
import * as ImagePicker from 'expo-image-picker'
import {useForm, Controller} from 'react-hook-form' 
import RNpickerSelect from 'react-native-picker-select'
import { FlatList } from 'react-native-gesture-handler';

export const CreateTab = () => {
    const [item, setItem] = useState({})
    const [imageURLs, setImageURLs] = useState([])

    //データ作成
    const createItem = async () => {
        console.log('aitemu', item)
        try {
            const res = await API.graphql(graphqlOperation(gqlMutations.createItem, {
                input: item
            }))
            console.log(res)
            Alert.alert('アイテムデータの作成に成功しました')
        } catch(e) {
            console.error(e)
            Alert.alert('アイテムデータの作成に失敗しました')
        }
    }

    const onChangeData = (key, value) => {
        const changeItem = item
        changeItem[key] = value
        console.log('アイテムデータを更新します', changeItem)
        setItem(changeItem)
    }

    const onChangeMultiData = (key, value, idx) => {
        const changeItem = item
        if(!changeItem[key]) changeItem[key] = []
        changeItem[key][idx] = value
        console.log('マルチアイテムデータを更新します', changeItem)
        setItem(changeItem)
    }

    //アップロードする画像を選択
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if(!result.cancelled) {
            const res = await fetch(result.uri)
            const blob = await res.blob()
            setImageURLs([...imageURLs,
                {
                    'blob': blob,
                    'uri': result.uri
                }
            ])
        }
    }

    //s3アップロード
    const uploadImage = async () => {
        if(!item['id']) {
            Alert.alert('品番を入力してください')
            return
        }
        try {
            let imageURLsArr = []
            //for文で実行するとfor内が同期的処理される
            for(let i = 0; i < imageURLs.length; i++) {
                await Storage.put(
                    item['id'] + '/' + i + '.JPG',
                    imageURLs[i]['blob'],
                    { contentType: 'image/jpeg' }
                )
                .then(result => {
                    console.log(result)
                    imageURLsArr.push('https://dz6mt8z4mgz4m.cloudfront.net/public/' + item['id'] + '/' + i + '.JPG')
                })
                .catch(err => console.error('アップロード時のエラーです', err))
            }
            const changeItem = item
            changeItem['imageURLs'] = imageURLsArr
            console.log(changeItem)
            setItem(changeItem)
            Alert.alert('s3に画像をアップロードしました')
        } catch(e) {
            Alert.alert('エラーが発生しました')
            console.error(e)
        }
    }

    const deleteImage = idx => {
        console.log('indexです', idx)
        let updateImageURLs = imageURLs.concat()
        updateImageURLs.splice(idx, 1)
        setImageURLs(updateImageURLs)
    }

    const { control, handleSubmit, errors } = useForm()
    const rules = {
        name: {required: true}
    }
    const onChange = args => {
        return {
          selectedValue: args,
        };
      };

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ marginLeft: 20 }}>画像アップロード</Text>
                        <View>
                            {imageURLs.map((imageURL, idx) =>
                                <View style={{ flexDirection: 'row' }} key={idx}>
                                    <Button
                                        title='削除'
                                        onPress={() => deleteImage(idx)}
                                    />
                                    <Image
                                        source={{ uri: imageURL['uri'] }}
                                        style={{ width: wp('13%'), height: wp('13%'), margin: 5 }}
                                        key={idx}
                                    />
                                </View>
                            )}
                        </View>
                        <Button
                            title='写真を投稿する'
                            onPress={pickImage}
                        />
                        <Button
                            title='s3アップロード'
                            onPress={uploadImage}
                        />
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>名前</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.dataInput}
                                            onChangeText={(data) => onChange(data)}
                                            multiline={true}
                                        />
                                    )
                                }}
                                name='name'
                                defaultValue='sample'
                                rules = {rules.name}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ステータス</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <RNpickerSelect
                                            onValueChange={value => onChange(value)}
                                            items={[
                                                { label:'A', value:'A'},
                                                { label:'B', value:'B'},
                                                { label:'C', value:'C'},
                                                { label:'D', value:'D'},
                                                { label:'E', value:'E'},
                                                { label:'F', value:'F'}

                                            ]}
                                        />
                                    )
                                }}
                                name='status' 
                                onChangeName={'onValueChange'}
                                valueName={'selectedValue'}
                                defaultValue='UNDONE'
                            />
                        </View>
                        <Text>ハロー</Text>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ランク</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <RNpickerSelect
                                            onValueChange={value => onChange(value)}
                                            items={[
                                                { label:'A', value:'A'},
                                                { label:'B', value:'B'},
                                                { label:'C', value:'C'},
                                                { label:'D', value:'D'},
                                                { label:'E', value:'E'},
                                                { label:'F', value:'F'}

                                            ]}
                                        />
                                    )
                                }}
                                name='rank' 
                                onChangeName={'onValueChange'}
                                valueName={'selectedValue'}
                                defaultValue='A'
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>季節</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <CheckBox
                                            onClick={()=>{console.log(value);onChange(!value)}}
                                            isChecked={!!value}
                                        />
                                    )
                                }}
                                name='isSpring'
                                defaultValue={false}
                            />
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <CheckBox
                                            onClick={()=>{console.log(value);onChange(!value)}}
                                            isChecked={!!value}
                                        />
                                    )
                                }}
                                name='isSummer'
                                defaultValue={false}
                            />
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <CheckBox
                                            onClick={()=>{console.log(value);onChange(!value)}}
                                            isChecked={!!value}
                                        />
                                    )
                                }}
                                name='isAutumn'
                                defaultValue={false}
                            />
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <CheckBox
                                            onClick={()=>{console.log(value);onChange(!value)}}
                                            isChecked={!!value}
                                        />
                                    )
                                }}
                                name='isWinter'
                                defaultValue={false}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ブランド</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.dataInput}
                                            onChangeText={(data) => onChange(data)}
                                            multiline={true}
                                        />
                                    )
                                }}
                                name='brandName'
                                defaultValue={'no brand'}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>カラー</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.dataInput}
                                            onChangeText={(data) => onChange(data)}
                                            multiline={true}
                                        />
                                    )
                                }}
                                name='name'
                                defaultValue='sample'
                                rules = {rules.name}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>素材</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(material) => onChangeMultiData('material', material, 0)}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>大カテゴリ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(bigCategory) => onChangeMultiData('bigCategory', bigCategory, 0)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>小カテゴリ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(smallCategory) => onChangeMultiData('smallCategory', smallCategory, 0)}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>サイズ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(size) => onChangeData('size', size)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>仕入れ先</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(supplierName) => onChangeData('supplierName', supplierName)}
                            />
                        </View>
                    </View>
                    <Text style={styles.topsText}>トップス</Text>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>着丈</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(dressLength) => onChangeData('dressLength', dressLength)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>身幅</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(dressWidth) => onChangeData('dressWidth', dressWidth)}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>袖丈</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(sleeveLength) => onChangeData('sleeveLength', sleeveLength)}
                            />
                        </View>
                    </View>
                    <Text style={styles.bottomText}>ボトムス</Text>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ウエスト</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(waist) => onChangeData('waist', waist)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>股上</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(rise) => onChangeData('rise', rise)}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>ヒップ</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(hip) => onChangeData('hip', hip)}
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>股下</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(inseam) => onChangeData('inseam', inseam)}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>裾幅</Text>
                            <TextInput
                                style={styles.dataInput}
                                onChangeText={(hemWidth) => onChangeData('hemWidth', hemWidth)}
                            />
                        </View>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>アイテム説明</Text>
                        <TextInput
                            style={styles.descriptionInput}
                            onChangeText={(description) => onChangeData('description', description)}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>アイテム状態説明</Text>
                        <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.dataInput}
                                            onChangeText={(data) => onChange(data)}
                                            multiline={true}
                                        />
                                        )
                                }}
                                name='item_state_expression'
                                rules = {{ required: true, minLength: 5}}
                                defaultValue='test'
                            />
                            <Text>{errors.item_state_expression?.type === "minLength" && 'Your input is required'}</Text>
                    </View>
                    <Button
                        title='作成'
                        // onPress={handleSubmit(createItem)}
                        onPress={handleSubmit((value) => console.log(value))}
                    />
                    <View style={{ height: hp('30%') }}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
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
        fontSize: 18,
        borderBottomWidth: 1,
    },
    updateButtonView: {
        marginLeft: wp('50%'),
        marginTop: hp('5%'),
        backgroundColor: '#7389D9',
        width: wp('40%'),
        borderRadius: 18
    },
    descriptionView: {
        borderBottomWidth: 1,
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
    },
    topsText: {
        marginTop: 40,
        left: wp('4%'),
        fontSize: 16
    },
    bottomText: {
        marginTop: 40,
        left: wp('4%'),
        fontSize: 16
    }
})