

import React from 'react';
import {ScrollView, Text, View, TextInput, Button,ImageEditor,AsyncStorage, Linking, Alert,TouchableOpacity,Image,ImageBackground ,StyleSheet } from 'react-native';

import * as firebase from 'firebase';





export default class ChangeEmailAndPassScreen extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
      passwordvalid:true,
      emailvalid:true,
      avatarSource:null,
      image:null,
    };
  }
  render() {
   
    return (
      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 30, paddingHorizontal: 10,}}>
      
            <View style={styles.header}>
             <View style={styles.item}>
              <View  onPress={this.ReturnBack.bind(this)} style={styles.iconContent}>
               <TouchableOpacity onPress={this.ReturnBack.bind(this)}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/windows/32/000000/reply-arrow.png'}}/>
                </TouchableOpacity>
              </View>
              
            
            </View>
     
    </View>
    <View style={[styles.inputContainer,{marginTop:30}]}>
        <TextInput style={styles.textInput}  style={[styles.inputs,! this.state.passwordvalid ? styles.error:null]}
          placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
         // onChangeText={(text) => { this.setState({currentPassword: text}) }}
          onChangeText={(currentPassword) => this.validatepass(currentPassword)}
          value={this.state.currentPassword}
        />
        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/color/40/000000/password.png'}}/>
        </View>
<View style={styles.inputContainer}>
        <TextInput style={styles.textInput}  style={[styles.inputs,! this.state.passwordvalid ? styles.error:null]}
          placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
         // onChangeText={(text) => { this.setState({newPassword: text}) }}
          onChangeText={(newPassword) => this.validateConfirmpass(newPassword)}
          value={this.state.newPassword}
        />
        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/color/40/000000/password.png'}}/>
        </View>
 
 <View style={{marginTop:5}}>       
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
onPress={this.onChangePasswordPress}
>
    <Text style={styles.loginText}>Change Password</Text>
</TouchableOpacity>

</View> 

<View style={[styles.inputContainer,{marginTop:20}]}>

       <TextInput style={styles.textInput}  style={[styles.inputs,! this.state.emailvalid ? styles.error:null]}
          placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
         // onChangeText={(text) => { this.setState({newEmail: text}) }}
         onChangeText={(newEmail) => this.validate(newEmail)}
           value={this.state.newEmail}
        />
        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/flat_round/40/000000/secured-letter.png'}}/>
        </View>
       <View style={{marginTop:10}}>       
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
onPress={this.onChangeEmailPress}
>
    <Text style={styles.loginText}>Change Email</Text>
</TouchableOpacity>

</View> 

<View style={{marginTop:80}}> 


<TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
onPress={this.onSignoutPress}
>
    <Text style={styles.loginText}>Sign out</Text>
</TouchableOpacity>
 
</View>
    </ScrollView>
    );
  }
  
 
  validate = (newEmail) => {
     
    // console.log(email);
     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
     if(reg.test(newEmail) === false)
     {
     this.setState({newEmail})
     this.state.emailvalid= false
     return false;
       }
       this.setState({newEmail})
       this.state.emailvalid= true
       //firebase.auth().createUserWithEmailAndPassword(email,password)
   }
  validatepass = (currentPassword) => {
    //let reg =6;
      if(this.state.currentPassword.lentgh<6)
      {
      this.setState({currentPassword})
      this.state.passwordvalid= false
   
      return false;
        }
        this.setState({currentPassword})
        this.state.passwordvalid= true
        //firebase.auth().createUserWithEmailAndPassword(email,password)
    }
    validateConfirmpass = (newPassword) => {
     //let reg =6;
       if(this.state.newPassword.lentgh<6)
       {
       this.setState({newPassword})
       this.state.passwordvalid= false
    
       return false;
         }
         this.setState({newPassword})
         this.state.passwordvalid= true
         //firebase.auth().createUserWithEmailAndPassword(email,password)
     }
  // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        Alert.alert("Email was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }
  ReturnBack(){
    this.props.navigation.navigate('Settings');
  }
}

const styles=StyleSheet.create({

  
  imgcircel: {
      width: 200, 
      height: 200,
      borderRadius: 200/2
  } ,
  header:{
    backgroundColor: "#ffffff",
  },
  headerContent:{
    padding:20,
    alignItems: 'center',
  },
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: { borderWidth:1, marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    //borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#c97676",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderColor: '#ffffff',
    flex:1,
    marginRight:10,
    
    marginTop:5,
    marginVertical: 10, 
    padding:10,
  
     alignSelf: "stretch"
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
    marginBottom:20,
    marginLeft:10,
    width:300,
    borderRadius:30,
    backgroundColor:'#c97676'
  },
  btnByRegister: {
    height:15,
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
    marginVertical:20,
    width:300,
    backgroundColor:'#c97676',
    marginLeft:10,
  },
  loginButton: {
    backgroundColor: "#c97676",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    textAlign:'center',
    color:'white',
    fontWeight:'700'

  },
  /*bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },*/
  
  btnText:{
    color:"white",
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textByRegister:{
    color:"white",
    fontWeight:'bold',
    textAlign:'center',

    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  helpLink: {
    
    paddingVertical: 15,
   
   // marginTop:350,
    
  
  },
  helpLinkText: {
    fontSize: 14,
    color: '#660029',
  },
  
buttonContainer:{
  backgroundColor:'#2b8475',
  width: 150,
  //alignSelf:'center',
  borderRadius: 14,
  paddingVertical:10,
  marginLeft:20,
  marginTop:10,
      },
      buttonText:{
  textAlign:'center',
  color:'white',
  fontWeight:'700'
  
      },
      error:{
        
        borderBottomColor:'red',
        borderBottomWidth:3
    }, 
    item:{
      flexDirection : 'row',
    },
    infoContent:{
      flex:1,
      alignItems:'flex-start',
    },
    iconContent:{
      flex:1,
      alignItems:'flex-end',
      paddingRight:30,
      paddingTop:10,
      fontWeight:'bold',
     
    },
    icon:{
      width:30,
      height:30,
     // marginTop:20,
     
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },
});

