/**
 * Home Screen
 *
 * @format
 * @flow
 */

import React from 'react'
import { NativeModules, Platform, TextInput, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { OpenBack } from 'react-native-openback'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            sdkVersion: '',
            goalStep: 1,
            goalValue: 10.0
        };
        
        OpenBack.sdkVersion((error, version) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({sdkVersion: version});
            }
        });
    }

    render() {
        return (
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={{marginVertical: 24, marginHorizontal: 16}}>
                    <Text style={{textAlign: "center", marginBottom: 16}}>
                        Using OpenBack SDK {this.state.sdkVersion}
                    </Text>
                    <View style={styles.button}>
                    <Button
                        color='#E74B99'
                        onPress={() => { 
                            OpenBack.setCustomTriggerString(OpenBack.kOBKCustomTrigger1, 'Bob', (error) => { });
                         }}
                        title="Set Custom Trigger 1 to 'Bob'"            
                    />
                    </View>
                    <View style={styles.button}>
                    <Button
                        color='#E74B99'
                        onPress={() => { 
                            OpenBack.setCustomTriggerInteger(OpenBack.kOBKCustomTrigger2, 42, (error) => { });
                         }}
                        title="Set Custom Trigger 2 to 42"            
                    />
                    </View>
                    <View style={styles.button}>
                    <Button 
                        color='#E74B99'
                        onPress={() => { 
                            OpenBack.setCustomTriggerFloat(OpenBack.kOBKCustomTrigger3, 1.12, (error) => { });
                         }}
                        title="Set Custom Trigger 3 to 1.12"            
                    />
                    </View>
                    <View style={styles.button}>
                    <Button
                        color='#E74B99'
                        onPress={() => { 
                            OpenBack.logGoal("test", this.state.goalStep, this.state.goalValue, (error) => { });
                            this.setState(prevState => {
                                return {
                                    goalStep: prevState.goalStep + 1,
                                    goalValue: prevState.goalValue + 3.1
                                }
                            });
                         }}
                        title={`Log goal 'test' with step ${this.state.goalStep} and value ${this.state.goalValue.toFixed(2)}`}
                    />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({firstName: text})}
                        value={this.state.firstName}
                        placeholder="First Name"
                        clearButtonMode="always"
                        underlineColorAndroid='#E74B99'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({lastName: text})}
                        value={this.state.lastName}
                        placeholder="Last Name"
                        clearButtonMode="always"
                        underlineColorAndroid='#E74B99'
                        autoCorrect={false}
                    />
                    <View style={styles.button}>
                    <Button
                        color='#E74B99'
                        onPress={() => {
                            OpenBack.setUserInfo({
                                surname: this.state.lastName,
                                firstName: this.state.firstName
                            }, (error) => { });
                         }}
                        title="Save User Info"            
                    />
                    </View>
                    <View style={styles.button}>
                    <Button
                        color='#E74B99'
                        onPress={() => this.props.navigation.navigate('Inbox')}
                        title="Show App Inbox"            
                    />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        fontSize: 18,
        padding: 8,
        marginTop: 8,
        ...Platform.select({
            ios: {
                borderRadius: 6,
                borderWidth: 0.5,
                borderColor: 'gray'
            }
        })    
    },
    button: {
        ...Platform.select({
            android: {
                padding: 8
            }
        })
    }
});