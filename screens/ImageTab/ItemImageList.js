import React, {useEffect, useState} from 'react'
import {Dimensions, Image, View, SafeAreaView, Button, Platform} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import AutoDragSortableView from '../../widget/AutoDragSortableView'
import * as ImagePicker from 'expo-image-picker'

const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width/3 - 20
const childrenHeight = 48*4

const ItemImageList = ({navigation}) => {
    const imageURLs = navigation.state.params.item.imageURLs;
    // 1からはじまる
    const imageURLsIndex = {};

    useEffect(() => {
        imageURLs.forEach((imageURL, i) => {
            imageURLsIndex[i+1] = imageURL
        })
        console.log(imageURLsIndex)
    }, [])

    const [newImage, setNewImage] = useState(null);

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
  
        console.log(result);

        if (!result.cancelled) {
          setNewImage(result.uri);
        }
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
                    const copedImageURLsIndex = { ...imageURLsIndex }
                    const finalIndex = imageURLs.length - 1
                    // 最小から最大へ動いた時
                    if (from == 0 && to == finalIndex) {
                        imageURLsIndex[finalIndex+1] = copedImageURLsIndex[1]
                        for (let i = 1; i <= finalIndex; i++) {
                            imageURLsIndex[i] = copedImageURLsIndex[i+1]
                        }
                    // 最大から最小へ動いた時
                    } else if (from == finalIndex && to == 0) {
                        imageURLsIndex[1] = copedImageURLsIndex[finalIndex+1]
                        for (let i = 2; i <= finalIndex + 1; i++) {
                            imageURLsIndex[i] = copedImageURLsIndex[i-1]
                        }
                    } else {
                        imageURLsIndex[from+1] = copedImageURLsIndex[to+1]
                        imageURLsIndex[to+1] = copedImageURLsIndex[from+1]
                    }
                    console.log(from, to)
                    console.log(imageURLsIndex)
                }}
            />
            <Button title="写真を投稿する" onPress={pickImage} />
            <Button
                onPress={() => navigation.navigate('ItemImageDetail', {item: navigation.state.params.item})}
                title='プレビュー'
                color='blue'
            />
            {/* {newImage && <Image source={{ uri: newImage }} style={{ width: 200, height: 200 }} />} */}
        </SafeAreaView>
    )
}

export default ItemImageList;
