import React from 'react'
import { View, Text, TextInput} from 'react-native'

const BottomsForm = props => {
    const formProperties = props.formProperties;
    const {control, errors, getValues} = formProperties;
    const Controller = props.Controller
    const styles = props.style;
    
    return(
        <View>
            <Text style={styles.topsText}>ボトムス</Text>
            <View style={styles.flexView}>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>股下</Text>
                    <Text>{(errors.inseam?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.inseam?.type === 'required') && '股下は必須項目です。'}</Text>
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
                        name='inseam'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>腹囲</Text>
                    <Text>{(errors.waist?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.waist?.type === 'required') && '腹囲は必須項目です。'}</Text>
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
                        name='waist'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
            </View>
            <View style={styles.flexView}>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>股上</Text>
                    <Text>{(errors.rise?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.rise?.type === 'required') && '股上は必須項目です。'}</Text>
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
                        name='rise'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
            </View>
            <View style={styles.flexView}>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>ヒップ</Text>
                    <Text>{(errors.hip?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.hip?.type === 'required') && 'ヒップは必須項目です。'}</Text>
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
                        name='hip'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
            </View>
            <View style={styles.flexView}>
                <View style={styles.dataView}>
                    <Text style={styles.dataText}>裾幅</Text>
                    <Text>{(errors.hemWidth?.type === 'pattern') && '0より大きな半角数字のみ有効です。'}</Text>
                    <Text>{(errors.hemWidth?.type === 'required') && '裾幅は必須項目です。'}</Text>
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
                        name='hemWidth'
                        defaultValue=''
                        rules={{required: true, pattern: /^[1-9][0-9]*$/}}
                    />
                </View>
            </View>
        </View>
    )
}
export default BottomsForm;