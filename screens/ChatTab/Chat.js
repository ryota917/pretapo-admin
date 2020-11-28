import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../../graphql/queries' // read
import * as gqlMutations from '../../graphql/mutations'

const Chat = (props) => {
    const [messages, setMessages] = useState([])
    const room = props.navigation.state.params.message['room']

    useEffect(() => {
        const fetchRoomMessage = async () => {
            const res = await API.graphql(graphqlOperation(gqlQueries.searchMessages, {
                filter: {
                    room: {
                        eq: room
                    }
                },
                sort: {
                    field: 'createdAt',
                    direction: 'desc'
                }
            }))
            let roomMessages = []
            //メッセージを整形
            res.data.searchMessages.items.map(obj => {
                obj['_id'] = obj['id']
                obj['user'] = { '_id': obj['user'][0], 'name': obj['user'][0] }
                roomMessages.push(obj)
            })
            setMessages(GiftedChat.append([], roomMessages))
        }
        fetchRoomMessage()
    }, [])

    const onSend = (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        API.graphql(graphqlOperation(gqlMutations.createMessage, {
            input: {
                id: messages[0]['_id'],
                text: messages[0]['text'],
                room: room,
                user: ['support']
            }
        }))
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <GiftedChat
                alwaysShowSend={true}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 'support',
                }}
            />
        </SafeAreaView>
    )
}

export default Chat