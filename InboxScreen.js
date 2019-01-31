/**
 * Inbox Screen
 *
 * @format
 * @flow
 */

import React from 'react'
import { NativeModules, NativeEventEmitter, Platform, FlatList, TouchableHighlight, StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment'

import UnreadImage from './img/unread.png'
import ReadImage from './img/read.png'

const OpenBackAppInbox = NativeModules.RNOpenBackAppInbox;

export default class InboxScreen extends React.Component {
    static navigationOptions = {
        title: 'App Inbox',
        headerTitleStyle: { color: '#000' },
        headerTintColor: '#E74B99',
    };

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.getAllMessages();        
    };

    componentDidMount() {
        this.openBackAppInboxEmitter = new NativeEventEmitter(OpenBackAppInbox);

        this.openBackAppInboxEmitter.addListener('OBKAppInboxMessageAdded', (message) => {
            console.log('Message added: ' + JSON.stringify(message));
            this.getAllMessages();
        });

        this.openBackAppInboxEmitter.addListener('OBKAppInboxMessageRead', (message) => {
            console.log('Message read: ' + JSON.stringify(message));
            this.getAllMessages();
        });

        this.openBackAppInboxEmitter.addListener('OBKAppInboxMessageExpired', (message) => {
            console.log('Message expired: ' + JSON.stringify(message));
            this.getAllMessages();
        });
    }

    componentWillUnmount() {
        this.openBackAppInboxEmitter.removeAllListeners('OBKAppInboxMessageAdded');
        this.openBackAppInboxEmitter.removeAllListeners('OBKAppInboxMessageRead');
        this.openBackAppInboxEmitter.removeAllListeners('OBKAppInboxMessageExpired');
    }

    async getAllMessages() {
        try {
            var messages = await OpenBackAppInbox.getAllMessages();
            this.setState({messages: messages});
        } catch (e) {
            console.error(e);
        }
    };

    itemSelected = (item, index) => {
        let { messages } = this.state;
        let message = messages[index];
        let objCopy = Object.assign({}, message);

        if (!message.read) {
            message.read = true;
            this.setState({ messages });
        }
        
        if (objCopy.actionable) {
            OpenBackAppInbox.executeMessage(objCopy);
        } else if (!objCopy.read) {
            OpenBackAppInbox.markMessageAsRead(objCopy);        
        }
    };

    renderItem = ({item, index}) => {
        let imgSource = item.read ? ReadImage : UnreadImage;
        let readText = item.read ? {} : {fontWeight: 'bold'};
        return (
            <TouchableHighlight onPress={() => this.itemSelected(item, index)} underlayColor='#e0e0e0'>
                <View style={{ flex:1, flexDirection: 'column' }}>
                    <Text style={styles.itemTime}>
                        {moment.unix(item.deliveryTime).from(moment())}
                    </Text>
                    <View style={styles.item}>
                        <Image source={imgSource} style={styles.itemEnvelope}/>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={[styles.itemTitle, readText]}>
                                {item.title}
                            </Text>
                            <Text style={[styles.itemContent, readText]}>
                                {item.content}
                            </Text>
                            {item.payload.length > 0 && <Text style={styles.itemPayload}>{item.payload}</Text>}
                        </View>
                        {item.actionable && <Image source={require('./img/action.png')} style={styles.itemAction}/> }
                    </View>
                </View>
            </TouchableHighlight>          
        );
    };

    render() {
        return (
            <FlatList style={styles.container}
                contentInsetAdjustmentBehavior="automatic"
                data={this.state.messages}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row'
    },
    itemEnvelope: {
        flex: 0,
        width: 20,
        height: 20,
        alignSelf: 'flex-start',
        marginTop: 6,
        marginRight: 8,
        tintColor: '#E74B99'
    },
    itemAction: {
        flex: 0,
        width: 20,
        height: 20,
        alignSelf: 'center',
        tintColor: '#E74B99'
    },
    itemTitle: {
        fontSize: 26
    },
    itemContent: {
        fontSize: 18
    },
    itemPayload: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 12,
        fontStyle: 'italic',
        ...Platform.select({
            ios: { fontFamily: 'Courier' },
            android: { fontFamily : 'monospace'}
        })
    },
    separator: {
        height: 0.5,
        marginLeft: 38,
        backgroundColor: '#d1d0d4'
    },
   itemTime: {
        textAlign: 'right', 
        paddingTop: 4, 
        paddingRight: 4,
        color: '#c9c9c9'
    }
});
  