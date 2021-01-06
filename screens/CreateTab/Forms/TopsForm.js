import React from 'react'
import { View, Text, TextInput } from 'react-native'

const TopsForm = props => {
    const formProperties = props.formProperties;
    const {control, errors, getValues} = formProperties;
    const Controller = props.Controller
    const styles = props.style
    return(
        <View>
            <Text style={styles.topsText}>トップス</Text>
            <View style={styles.flexView}>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>着丈</Text>
                    <Text>{(errors.dressLength?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.dressLength?.type === 'required') && '着丈は必須項目です。'}</Text>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => {
                            return(
                                <TextInput
                                    style={styles.dataInput}
                                    onChangeText={(data) => {onChange(data)}}
                                    placeholder={'67'}
                                    multiline={false}
                                />
                            )
                        }}
                        name='dressLength'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>身幅</Text>
                    <Text>{(errors.dressWidth?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.dressWidth?.type === 'required') && '身幅は必須項目です。'}</Text>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => {
                            return(
                                <TextInput
                                    style={styles.dataInput}
                                    onChangeText={(data) => {onChange(data)}}
                                    placeholder={'67'}
                                    multiline={false}
                                />
                            )
                        }}
                        name='dressWidth'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
            </View>
            <View style={styles.flexView}>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>袖丈</Text>
                    <Text>{(errors.sleeveLength?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.sleeveLength?.type === 'required') && '袖丈は必須項目です。'}</Text>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => {
                            return(
                                <TextInput
                                    style={styles.dataInput}
                                    onChangeText={(data) => {onChange(data)}}
                                    placeholder={'67'}
                                    multiline={false}
                                />
                            )
                        }}
                        name='sleeveLength'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
            </View>
        </View>
    )
}
export default TopsForm;