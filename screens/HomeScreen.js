import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList
} from 'react-native';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
//import { MonoText } from '../components/StyledText';
import {TextInput}  from 'react-native';
import * as firebase from 'firebase';
import SignUp from './SignUp';
import ForgotPassword  from './ForgotPasswordScreen';
//import console = require('console');
import RadioForm  from 'react-native-simple-radio-button';
//import console = require('console');


var radio_props = [
  {label: 'Doctor', value: 0 },
  {label: 'Patient', value: 1 }
];
export default class HomeScreen extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    emailvalid: true,
    passwordvalid: true,
    currentUser: '',
    users: []
  };
  constructor(props){
    super(props);
    this.allusersitems=[]
    // all this binding bind(this)
  }
  componentDidMount(){
    firebase.auth().signOut().then(function () {
      //alert('SignOut is succedded')
    }, function (error) {
      // An error happened.
    });
  }
  componentWillMount() {

    const configU = {
      apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
      authDomain: 'newpr-8a746.firebaseapp.com',
      databaseURL: 'https://newpr-8a746.firebaseio.com',
      projectId: 'newpr-8a746',
      storageBucket: 'newpr-8a746.appspot.com',
      messagingSenderId: '291968886604'
    };
    //firebase.initializeApp({databaseURL: 'https://newpr-8a746.firebaseio.com'},'config2');
    //firebase.initializeApp(configU);
    const rootRef = firebase.database().ref();
    const usersRef = rootRef.child('users');
    //const user = firebase.auth().currentUser.uid;
    if (firebase.auth().currentUser) {
      var user = firebase.auth().currentUser.uid;
      //var firebaseAuth = configU.getInstance();
    }

    //console.log("j"+user);


    /*usersRef.on('value',(childSnapshot)=>{
      const users=[];
      childSnapshot.forEach(doc) => {
        users.push({
          key:doc.key,
          email:doc.toJSON().email
    
        });
        this.setState({
          users:users.sort((a,b)=> {
            return (users.email < b.email);
    
          }),
        });
        
      });
    });*/
    //firebase.initializeApp(configU);
    /*export const db = app.database();
    function writeUserData(userId, name, email) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        
      });
    }*/
  }
  
SignUpuser(){
  this.props.navigation.navigate('SignUp')
}

ForgotPassword(){
  this.props.navigation.navigate('ForgotPasswordScreen')
  //this.props.navigation.navigate('UserProfileScreen')
}
   
validate = (email) => {
   // console.log(email);
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) === false) {
      this.setState({ email })
      this.state.emailvalid = false
      return false;
    }
    this.setState({ email })
    this.state.emailvalid = true
    //firebase.auth().createUserWithEmailAndPassword(email,password)
  }
  validatepass = (password) => {
    //let reg =6;
    if (this.state.password.lentgh < 6) {
      this.setState({ password })
      this.state.passwordvalid = false

      return false;
    }
    this.setState({ password })
    this.state.passwordvalid = true
    //firebase.auth().createUserWithEmailAndPassword(email,password)
  }
   setCurrentUser() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.database().ref('/allUsers/'+firebase.auth().currentUser.uid).on('value',snapp=>{
      this.allusersitems.push({
        role:snapp.val().role
      })
    
    
    if(snapp.val().role == 1){
      this.props.navigation.navigate('Patient')
    }
    else {
    this.props.navigation.navigate('UserProfileScreen')
   }
  })
  }
 LogInUser = (email,password) => {
  if(this.state.emailvalid == true){
    if(this.state.passwordvalid == true){
    
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => this.setCurrentUser())
      . catch( function(error){
        alert('There is no user record corresponding to this identifier. The user may have been deleted')
        console.log(error)
        
      })
  }
    else {
      alert('Please enter 6 characters at least')
      return false;
    }
  }
  else {
    alert('User does not exist ,the user may be deleted if you do not have an account sign up' );
    return false;
  }
   

 
}  
  render() {
   // const { currentUser } = this.state
    return (
      <ImageBackground
        source={require('../src/img/bgsignup.jpg')}
        style={{width: '100%', height: '100%', opacity:0.7}}
      >
        <View style={styles.container}>
        <View style={styles.logoContainer}>
          <ImageBackground
            source={require('../images/login.png')}
             style={{width: '100%' , height: '100%' }}
          >
         </ImageBackground>
        </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputs, !this.state.emailvalid ? styles.error : null]}
              placeholder="Email"
              placeholderTextColor="#155B52"
              underlineColorAndroid={'transparent'}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              //style={styles.input}
              onChangeText={(email) => this.setState({ email })}
              onChangeText={(email) => this.validate(email)}
              value={this.state.email}
            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/flat_round/40/000000/secured-letter.png' }} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputs, !this.state.passwordvalid ? styles.error : null]}
              placeholder="password"
              placeholderTextColor="#2e7569"
              returnKeyType="go"
              secureTextEntry
              //onChangeText={(password) => this.setState({password})}
              onChangeText={(password) => this.validatepass(password)}
              value={this.state.password}
            />
            <Image
              style={styles.inputIcon}
              source={{ uri: 'https://img.icons8.com/color/40/000000/password.png' }}
            />
          </View>


          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.loginButton
            ]}
            onPress={() => this.LogInUser(this.state.email, this.state.password)}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.extraWidgetsContainer}>
          <TouchableOpacity
              onPress={this.ForgotPassword.bind(this)}
              style={{
                //marginRight: 10,
                fontSize: 14,
                color: '#660029',
               // marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#660029',
                  marginTop: '20%',
                  // marginRight: 10,
                  // marginLeft: 70,
                  // marginBottom: 7
                }}
              >
                Forgot Password ?
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.SignUpuser.bind(this)}
              style={[styles.helpLink, { alignItems: 'center' }]}
            >
              <Text style={[styles.helpLinkText, { alignItems: 'center',marginTop: '10%', }]}>Create Account</Text>
            </TouchableOpacity>

 
          </View>
        </View>
      </ImageBackground>
    );
  }

  _handleHelpPress = () => { 
  //AppNavigator.LinksScreen
   // navi(<LinksScreen />);
   /* WebBrowser.openBrowserAsync
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );*/
  };
}

const styles = StyleSheet.create({
  error: {   
    borderBottomColor:'red',
    borderBottomWidth:3
}, 
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop:'30%',
    // marginTop: '30%',
    //backgroundColor: '#DCDCDC',
    //  position: 'relative',
    //  top: '30%',
    //  width: '80%',
    //  height: '40%',
    
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:'80%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    shadowColor: "#808080",
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
    borderBottomColor: '#FFFFFF',
    flex:1,
    marginRight:10,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'80%',
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnByRegister: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    width:'80%',
    marginTop:30,
    height:45,
    backgroundColor: "#00b5ec",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
    borderRadius:30,
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
  alignSelf:'center',
  borderRadius: 14,
  paddingVertical:15
      },
      buttonText:{
  textAlign:'center',
  color:'white',
  fontWeight:'700'
  
      },
extraWidgetsContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '75%',
  height: 15,
},
logoContainer: {
  borderRadius: 85,
  height: '32%',
  width: '37%',
  overflow: 'hidden',
  marginBottom: 55
}
});

