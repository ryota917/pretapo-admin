import React, {useState} from 'react'
import {Dimensions, Image, View, SafeAreaView} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import AutoDragSortableView from '../../widget/AutoDragSortableView'

const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width/3 - 20
const childrenHeight = 48*4

const ItemImageList = ({navigation}) => {

    const [imageURLs, setImageURLs] = useState(navigation.state.params.item.imageURLs);

    const renderItem = (imageURLs,index) => {
        return (
            <View>
                <Image source={{uri: imageURLs}} style={{ width: wp('33%'), height: wp('33%') }} />
            </View>
        )
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
            />
        </SafeAreaView>
    )
}

export default ItemImageList;
