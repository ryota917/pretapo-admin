import React from 'react'
import { View, Text} from 'react-native'
import CheckBox from 'react-native-check-box'

const SeasonSelectForm = props => {
    const formProperties = props.formProperties;
    const {control} = formProperties;
    const Controller = props.Controller
    const styles = props.style;

    return(
        <View style={styles.flexView}>
            <Text style={styles.dataText}>季節</Text>
            <View style={styles.flexView}>
                <Text>春</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => {
                        return(
                            <CheckBox
                                onClick={()=>{onChange(!value)}}
                                isChecked={!!value}
                            />
                        )
                    }}
                    name='isSpring'
                    defaultValue={false}
                />
                <Text>夏</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => {
                        return(
                            <CheckBox
                                onClick={()=>{onChange(!value)}}
                                isChecked={!!value}
                            />
                        )
                    }}
                    name='isSummer'
                    defaultValue={false}
                />
                <Text>秋</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => {
                        return(
                            <CheckBox
                                onClick={()=>{onChange(!value)}}
                                isChecked={!!value}
                            />
                        )
                    }}
                    name='isAutumn'
                    defaultValue={false}
                />
                <Text>冬</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => {
                        return(
                            <CheckBox
                                onClick={()=>{onChange(!value)}}
                                isChecked={!!value}
                            />
                        )
                    }}
                    name='isWinter'
                    defaultValue={false}
                />
            </View>
        </View>
    )
}

export default SeasonSelectForm