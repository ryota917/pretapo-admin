import React, { useState, useCallback, useEffect } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify';
import * as gqlQueries from '../../graphql/queries' // read

const ChatList = (props) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessage = async () => {
            console.log('useEffectを呼び出します')
            props.navigation.addListener('didFocus', async () => {
                const res = await API.graphql(graphqlOperation(gqlQueries.searchMessages, {
                    sort: {
                        field: 'createdAt',
                        direction: 'desc'
                    }
                }))
                let latestMessages = []
                res.data.searchMessages.items.map(message => {
                    const sameRoomMessage = latestMessages.find(({ room }) => room === message['room'])
                    if(sameRoomMessage) {
                        const sameRoomMessasgeIndex = latestMessages.findIndex(({ room }) => room === message['room'])
                        const changedLatestMessage = sameRoomMessage['createdAt'] > message['createdAt'] ? sameRoomMessage : message
                        latestMessages.splice(sameRoomMessasgeIndex, 1, changedLatestMessage)
                    } else {
                        latestMessages.push(message)
                    }
                })
                setMessages(latestMessages)
            })
        }
        fetchMessage()
    }, [props.navigation])

    return(
        <View>
            {messages.map((message, idx) =>
                <TouchableHighlight
                    key={idx}
                    onPress={() => props.navigation.navigate('Chat', { message: message })}
                    underlayColor='white'
                >
                    <View style={{ borderColor: 'silver', borderBottomWidth: 1, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ marginBottom: 10 }}>{message['room']}</Text>
                        <Text>{message['text']}</Text>
                    </View>
                </TouchableHighlight>
            )}
        </View>
    )
}

export default ChatList