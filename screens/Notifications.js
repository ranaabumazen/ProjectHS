import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

export default class Notfications extends Component {
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    const localNotification = {
      title: 'done',
      body: 'done!',
      
  };

  const schedulingOptions = {
      time:(new Date()).getTime()+((new Date('4/15/2019')).getTime()-(new Date()).getTime())+1000
  }

  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleLocalNotificationAsync(
      localNotification, schedulingOptions
  );

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      console.log("tokennnnnn")

      console.log(token)
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      firebase
        .database()
        .ref('doctors/' + firebase.auth().currentUser.uid + '/push_token')
        .update({token:token});
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.currentUser = await firebase.auth().currentUser;
    await this.registerForPushNotificationsAsync();
  }

  sendPushNotification = () => {
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[ORqYY2MtvpHEIAwRgw5PHS]',
        sound: 'default',
        title: 'Demo',
        body: 'Demo notificaiton'
      })
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        <Button
          title="Send Push Notification"
          onPress={() => this.sendPushNotification()}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});