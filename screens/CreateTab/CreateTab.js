import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, Button, Image, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { API, graphqlOperation, Storage } from 'aws-amplify';
import * as gqlMutations from '../../graphql/mutations'
import * as ImagePicker from 'expo-image-picker'
import {useForm, Controller} from 'react-hook-form' 
import Icon from 'react-native-vector-icons/Feather';
import TopsForm from './Forms/TopsForm'
import BottomsForm from './Forms/BottomsForm'
import DropDownModal from './Forms/DropDown'
import SeasonSelectForm from './Forms/SeasonSelectForm'
import {generateItemId} from '../../utils/generateItemId'
import DropDownPicker from 'react-native-dropdown-picker';
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

    // const { handleSubmit, errors, watch, trigger } = useForm()
    const { control, register, watch,errors, handleSubmit, trigger ,getValues} = useForm({mode:'onSubmit'});
    const initialBigCategory = 'TOPS'
    const [ bigCategory, changeBigCategory ] = useState(initialBigCategory) //bigCategoryごとにフォームの項目を変化させたかったので
    const [topsData, setTopsData] = useState({})
    const [bottomsData, setBottomsData] = useState({})
    const formProperties = {
        control: control,
        watch: watch,
        errors: errors,
        getValues: getValues
    }
    const onError = (errors, e) => console.log('error',errors);
    const temp = async () =>{
        const data = {
            id: '2000',
            name: 'Pretapo',
            index: 1,
        }
        const res = await API.graphql(
            {
                query: gqlMutations.createSupplierIndex,
                variables: {
                    input: data
                    
                }
            }
        )
        console.log(res)
    }
    const onSubmit = async (formData, e) => {
        const itemData = {
            ...formData,
        };
        console.log('itemdata',itemData)
        const itemId = await generateItemId(
            'Pretapo',
            itemData['color'],
            itemData['size'],
            itemData['bigCategory']
        )

        console.log(itemId)
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} keyboardShouldPersistTaps={'always'}>
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
                            <Text>{(errors.name?.type === "required") && '商品名は必須項目です。'}</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.dataInput}
                                            onChangeText={(data) => {onChange(data)}}
                                            multiline={true}
                                            value={value}
                                        />
                                    )
                                }}
                                name='name'
                                defaultValue=''
                                rules = {{required: true}}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView2}>
                            <Text style={styles.dataText}>ステータス</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <DropDownModal 
                                            onPress={v => onChange(v)}
                                            initialValue={value}
                                            dropDownOptions={
                                                [
                                                    {label: '購入可能', value: 'WAITING', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
                                                    {label: '発送中', value: 'SHIPPING', icon: () => <Icon name="flag" size={18} color="#900" />},
                                                    {label: '画像なし', value: 'UNDONE', icon: () => <Icon name="flag" size={18} color="#900" />},
                                                ]
                                            }
                                        />
                                    )
                                }}
                                name='status' 
                                onChangeName={'onChangeItem'}
                                valueName={'selectedValue'}
                                defaultValue='WAITING'
                            />
                        </View>
                        <View style={styles.dataView2}>
                            <Text style={styles.dataText}>ランク</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <DropDownModal 
                                            onPress={v => onChange(v)}
                                            initialValue={value}
                                            dropDownOptions={
                                                [
                                                    {label:'A', value:'A'},
                                                    {label:'B', value:'B'},
                                                    {label:'C', value:'C'},
                                                ]
                                            }
                                        />
                                    )
                                }}
                                name='rank' 
                                onChangeName={'onChangeItem'}
                                // valueName={'selectedValue'}
                                defaultValue='A'
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
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
                                name='color'
                                defaultValue='sample'
                            />
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>素材</Text>
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
                                name='material'
                                defaultValue='sample'
                            />
                        </View>
                    </View>
                    <SeasonSelectForm
                        style={styles}
                        formProperties={formProperties}
                        Controller={Controller}
                    />
                    <View style={styles.flexView}>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>サイズ</Text>
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
                                name='size'
                                defaultValue={'S'}
                                rules={{required: true, pattern: /(S|M|L|XL)/}}
                            />
                            <Text>{(errors.size?.type === 'pattern') && 'サイズは(S,M,L,XL)のうち一つです。'}</Text>
                            <Text>{(errors.size?.type === 'required') && 'サイズは必須項目です。'}</Text>
                        </View>
                        <View style={styles.dataView}>
                            <Text style={styles.dataText}>仕入れ先</Text>
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
                                name='supplierName'
                                defaultValue={'S'}
                                rules={{required: true, pattern: /(S|M|L|XL)/}}
                            />
                        </View>
                    </View>
                    <View style={styles.flexView}>
                        <View style={styles.dataView2}>
                            <Text style={styles.dataText}>大カテゴリ</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <DropDownModal 
                                            onPress={v => {onChange(v);changeBigCategory(v)}}
                                            initialValue={value}
                                            dropDownOptions={
                                                [
                                                    {label:'トップス', value:'TOPS'},
                                                    {label:'ボトムス', value:'BOTTOMS'},
                                                ]
                                            }
                                        />
                                    )
                                }}
                                name='bigCategory' 
                                onChangeName={'onPress'}
                                // valueName={'selectedValue'}
                                defaultValue='TOPS'
                            />
                            <Text style={styles.dataText}>小カテゴリ</Text>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.descriptionInput}
                                            onChangeText={(smallCategory) => onChange(smallCategory)}
                                            multiline={true}
                                        />
                                    )
                                }}
                                name='smallCategory'
                                rules={{required: true }}
                                defaultValue='test'
                            />
                        </View>
                    </View>
                    {bigCategory==='TOPS' && (<TopsForm style={styles} formProperties={formProperties} Controller={Controller}/>)}
                    {bigCategory==='BOTTOMS' && (<BottomsForm style={styles} formProperties={formProperties} Controller={Controller}/>)}

                    
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>アイテム説明</Text>
                        <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            style={styles.descriptionInput}
                                            onChangeText={(description) => onChange(description)}
                                            multiline={true}
                                        />
                                    )
                                }}
                                name='item_description'
                                rules={{required: true }}
                                defaultValue='test'
                            />
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>アイテム状態説明</Text>
                        <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => {
                                    return(
                                        <TextInput
                                            onChangeText={(data) => onChange(data)}
                                            multiline={true}
                                            onBlur={()=>{onBlur()}}
                                        />
                                        )
                                }}
                                name='item_state_expression'
                                rules={{required: true}}
                                defaultValue='test'
                            />
                            <Text>{(errors.item_state_expression?.type === "minLength") && 'Your input is required'}</Text>
                    </View>
                    <Button
                        title='作成'
                        type='submit'
                        // onPress={handleSubmit((value) => {console.log(errors)})}
                        onPress={(handleSubmit(onSubmit, onError))}
                        // onPress={temp}
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
        marginTop: hp('3%'),
        zIndex: 1
    },
    dataView2: {
        width: wp('40%'),
        marginLeft: wp('5%'),
        marginTop: hp('3%'),
        zIndex:5000
        // marginBottom: hp('10%')
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