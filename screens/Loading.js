import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
export default class Loading extends React.Component {
    componentDidMount() {
      this.user=[]
      
        firebase.auth().onAuthStateChanged(user => {
          if(user){
          firebase.database().ref('/allUsers/'+firebase.auth().currentUser.uid).on('value',snapp=>{
            this.user.push({
              role:snapp.val().role
            })
      ;
      
          this.props.navigation.navigate(!(snapp.val().role) ? 'UserProfileScreen' : 'Patient')
        })
        }
        else{
          this.props.navigation.navigate( 'HomeLoginScreen') 
        }
      })
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})