import { label } from 'aws-amplify';
import React, {useState} from 'react'
import {View, Text} from 'react-native'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const DropDownModal = (props) => {
    const dropDownOptions = props.dropDownOptions
    const [selectedValue, changeSelectedValue] = useState(dropDownOptions[0])
    const onPress = props.onPress;
    let _menu = null;

    // const manageShow
    const setMenuRef = ref => {
        _menu = ref;
    };
    
    const hideMenu = () => {
        _menu.hide();
    };

    const showMenu = () => {
        _menu.show();
    };

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
            ref={setMenuRef}
            button={<Text onPress={showMenu}>{selectedValue.label}</Text>}
        >
            {dropDownOptions.map(
                (option, index) => {
                    return(
                        <MenuItemWrapper
                            onPress={(value, label)=> {onPress(value); changeSelectedValue({value: value, label: label});hideMenu()}}
                            item={option.value}
                            label={option.label}
                            key={index}
                        />
                    )
                }
            )}
        </Menu>
      </View>
    )
}


const MenuItemWrapper = props =>{
    const onPress = props.onPress;
    const itemContent = props.item;
    const itemLabel = props.label
    const onItemPressd = () =>{
        onPress(itemContent, itemLabel)
    };
    return(<MenuItem onPress={onItemPressd}>{itemLabel}</MenuItem>)
}

export default DropDownModal;