import React, {useEffect, useState} from 'react'
import {Dimensions, Image, View, SafeAreaView, Button, Platform} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import AutoDragSortableView from '../../widget/AutoDragSortableView'
import * as ImagePicker from 'expo-image-picker'
import { Storage } from 'aws-amplify';

const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width/3 - 20
const childrenHeight = 48*4

const ItemImageList = ({navigation}) => {
    const [imageURLs, setImageURLs] = useState(navigation.state.params.item.imageURLs);
    const [hoge, setHoge] = useState('');

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      useEffect(() => {
        Storage.get("clothes_imgs/551/1.JPG", { level: 'public' }).then(result => {
            const blob = result.blob()
            setHoge(blob);
            console.log(blob, 'resultを取りましたyo-');
          }).catch(err => console.log(err));
      })

    const renderItem = (imageURLs,index) => {
        return (
            <View>
                <Image source={{uri: imageURLs}} style={{ width: wp('33%'), height: wp('33%') }} />
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

        if (!result.cancelled) {
          setImageURLs([...imageURLs, result.uri])
        }

        console.log(imageURLs);
    };

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
                    Storage.put('clothes_imgs/551/888.JPG', hoge, {
                        contentType: 'image/jpg',
                        level: 'public',
                    })
                      .then (result => console.log(result)) // {key: "test.txt"}
                      .catch(err => console.log(err));
                }}>
            </Button>
        </SafeAreaView>
    )
}

export default ItemImageList;
