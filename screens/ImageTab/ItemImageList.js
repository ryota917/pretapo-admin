import React, {useEffect, useState} from 'react'
import {Dimensions, Image, View, SafeAreaView, Button, Platform} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import AutoDragSortableView from '../../widget/AutoDragSortableView'
import * as ImagePicker from 'expo-image-picker'
import { Storage, Amplify, API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../../graphql/mutations'

const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width/3 - 20
const childrenHeight = 48*4

const ItemImageList = ({navigation}) => {
    const [imageURLs, setImageURLs] = useState(navigation.state.params.item.imageURLs);

    const renderItem = (imageURLs,index) => {
        return (
            <View>
                <Image source={{uri: imageURLs}} style={{ width: wp('10%'), height: wp('10%') }} />
            </View>
        )
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result)

        if (!result.cancelled) {
            console.log(result.uri)
            setImageURLs([...imageURLs, result.uri])
        }

        console.log(imageURLs)
    };

    const onPressPut = async () => {
        let imagesArr = []
        imageURLs.map((image, idx) => {
            console.log(idx)
            Storage.put('clothes_imgs/551/' + (idx + 1) + '.JPG', image, { contentType: 'image/jpeg' })
                .then(result => console.log(result))
                .catch(err => console.log(err))
            imagesArr.push("https://d36tszdawvpfsc.cloudfront.net/public/clothes_imgs/551/" + (idx + 1) + ".JPG")
        })
        //dynamoを更新
        const res = await API.graphql(graphqlOperation(gqlMutations.updateItem, {
            input: {
                id: '551',
                imageURLs: imagesArr
            }
        }))
        console.log(res)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <AutoDragSortableView
                dataSource={imageURLs}
                parentWidth={parentWidth}
                childrenWidth= {childrenWidth}
                marginChildrenBottom={10}
                marginChildrenRight={10}
                marginChildrenLeft = {10}
                marginChildrenTop = {10}
                childrenHeight={childrenHeight}
                keyExtractor={(imageURLs,index)=> imageURLs}
                renderItem={(imageURLs,index)=>{
                    return renderItem(imageURLs,index)
                }}
                onDragEnd={(from, to)=> {
                    console.log(from, to)
                    const copedImageURLs = { ...imageURLs }
                    // fromを削除
                    imageURLs.splice(from, 1)
                    // toに挿入
                    imageURLs.splice(to, 0, copedImageURLs[from])

                    console.log(imageURLs)
                }}
            />
            <Button title="写真を投稿する" onPress={pickImage} />
            <Button
                onPress={() => navigation.navigate('ItemImageDetail', {item: navigation.state.params.item})}
                title='プレビュー'
                color='blue'
            />
            <Button
                title='届けS3'
                onPress={() => {
                    console.log(hoge)
                    Storage.put('clothes_imgs/551/12.JPG', hoge, {
                        contentType: 'image/jpg',
                        level: 'public',
                    })
                      .then (result => console.log(result)) // {key: "test.txt"}
                        .catch(err => console.log(err));
                }} />
            <Button
                onPress={onPressPut}
                title='onpressput'
            />
        </SafeAreaView>
    )
}

export default ItemImageList;
