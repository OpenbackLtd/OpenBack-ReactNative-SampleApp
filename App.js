/**
 * Sample React Native App
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen'
import InboxScreen from './InboxScreen'

const AppNavigator = createStackNavigator({
		Home: HomeScreen,
		Inbox: InboxScreen
	}, {
    	initialRouteName: "Home"
	}
);
  
export default createAppContainer(AppNavigator);