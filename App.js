/*

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator,createAppContainer,createSwitchNavigator  } from 'react-navigation';
import Home from './src/screens/Home';
import AddItem from './src/screens/AddItem';
import ListItem from './src/screens/ListItem';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
setTimeout(function(){ alert("Hello"); }, 553798);

const AppNavigator = createStackNavigator({
  HomeScreen:  Home ,
  AddItemScreen: { screen: AddItem },
  ListItemScreen: { screen: ListItem }
});

 class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

export default createAppContainer(createSwitchNavigator(
  {
    HomeScreen:  Home ,
  AddItemScreen: AddItem ,
  ListItemScreen:  ListItem ,
   
  
   
  },
  {
    initialRouteName: 'AddItemScreen',
  }
));

*/

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import { MyApp} from './screens/MyHomeScreen';
import UserProfileScreen from './screens/UserProfileScreen';
//import  { PersonalInfo } from './screens/PersonalInfo';
import {
  Router,
  Scene,
} from 'react-native-router-flux';
import  Chat  from './screens/Chat';

//import UserProfileScreen from './screens/UserProfileScreen';

export default class App extends React.Component {
  
 state = {
    isLoadingComplete: false,
    isAuthenticated :false,
    isAuthenticationReady:false,
  };

  render() {
   if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
            //return <MyApp  /> ;
     /// return <UserProfileScreen />;
     
         
        
      
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});