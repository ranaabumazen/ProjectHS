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
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {TextInput}  from 'react-native';
import * as firebase from 'firebase';
//import data from './api/users';
//import console = require('console');

const configo = {
  apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
  authDomain: 'newpr-8a746.firebaseapp.com',
  databaseURL: 'https://newpr-8a746.firebaseio.com',
  projectId: 'newpr-8a746',
  storageBucket: 'newpr-8a746.appspot.com',
  messagingSenderId: '291968886604'
};
 firebase.initializeApp(configo);
export const db = firebase.database();
/*var user = firebase.auth().currentUser.uid;
console.log("j"+user);
*/
var radio_props = [
  {label: 'Doctor', value: 0 },
  {label: 'Patient', value: 1 }
];
export default class SignUp extends React.Component {
  state ={role:0, email: '',password:'' ,error :'', emailvalid:true, passwordvalid:true,FullNamevalid:true,Confirmpassword:''};
  
 
  Return(){
    
       this.props.navigation.navigate('HomeLoginScreen')
     
     }
  
  validate = (email) => {
     
   // console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email) === false)
    {
    this.setState({email})
    this.state.emailvalid= false
    return false;
      }
      this.setState({email})
      this.state.emailvalid= true
      //firebase.auth().createUserWithEmailAndPassword(email,password)
  }
  validatepass = (password) => {
   //let reg =6;
     if(this.state.password.lentgh<6)
     {
     this.setState({password})
     this.state.passwordvalid= false
  
     return false;
       }
       this.setState({password})
       this.state.passwordvalid= true
       //firebase.auth().createUserWithEmailAndPassword(email,password)
   }
   validateConfirmpass = (Confirmpassword) => {
    //let reg =6;
      if(this.state.Confirmpassword.lentgh<6)
      {
      this.setState({Confirmpassword})
      this.state.passwordvalid= false
   
      return false;
        }
        this.setState({Confirmpassword})
        this.state.passwordvalid= true
        //firebase.auth().createUserWithEmailAndPassword(email,password)
    }
    validateFullName = (FullName) => {
      let alpha = /^[a-zA-Z]+$/ ;
      if(alpha.test(FullName) == false){
        this.setState({FullName})
    this.state.FullNamevalid= false
    return false;
      }
      this.setState({FullName})
      this.state.FullNamevalid= true
      }
    
    setCurrentUser(){
      var userId = firebase.auth().currentUser
      //this.setState({ currentUser })
      const role = this.state.role
      firebase.database().ref('/allUsers/'+userId.uid).update({
        email:this.state.email,
       // uid: userId.uid,
        role:this.state.role,

      })
    if(this.state.role){
      firebase.database().ref('users').once('value',(data)=>{
        console.log(data.toJSON());
      
      })
      setTimeout(()=>{
        firebase.database().ref('/patients/').push(
          {
          //FullName:currentUser.FullName,      
          email:this.state.email,
          uid: userId.uid,
           
          
              //name: this.state.email.replace(/@[^@]+$/,""),
          
          
          //email:currentUser.email
        
        });
        firebase.database().ref('/patients/'+userId.uid)
        .update({
         email:this.state.email
      
        });
      firebase.database().ref('/users/').push(
        {
        //FullName:currentUser.FullName,      
        email:this.state.email,
        uid: userId.uid,
        role:this.state.role,
        name: this.state.email.replace(/@[^@]+$/,""),
            
        
            //name: this.state.email.replace(/@[^@]+$/,""),
        
        
        //email:currentUser.email
      
      }
      ).then(()=> {
        console.log('INSERTED !');
        this.props.navigation.navigate('PatientFirstRegInfo')
      }).catch((error)=> {
        console.log(error);
      
      
      });
      },500);
     
    }
    else if( !(this.state.role)) {
    //  var data = ["C", "Java", "JavaScript", "PHP"];
     firebase.database().ref('/doctors/'+userId.uid).push(
        {
        //FullName:currentUser.FullName,      
        email:this.state.email,
        uid: userId.uid,
            name: this.state.email.replace(/@[^@]+$/,""),
            
            // members:data

        
        //email:currentUser.email
      
      }
      )
      this.props.navigation.navigate('UserProfileScreen')
    }
  }
 SignUpUser = (email,password) => {
  if(this.state.emailvalid == true){
  if(this.state.passwordvalid == true) {
  if(this.state.Confirmpassword == this.state.password){

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.setCurrentUser())
    .catch(error => this.setState({ errorMessage: error.message }));
  }}  }
} 
goToAds(){
  this.props.navigation.navigate('AdsScreen');
}
  render() {
    
    return (
     
     <ImageBackground source={require('../src/img/bgsignup.jpg')} style={{width: '100%', height: '100%',opacity:0.7}}>
     <View style={styles.item}>
            <View onPress={this.Return.bind(this)}>
              <TouchableOpacity onPress={this.Return.bind(this)}>
                <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/windows/32/00b5ec/reply-arrow.png' }} />
              </TouchableOpacity>
            </View>
          </View>
      <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.inputs, !this.state.emailvalid ? styles.error : null]}
              placeholder="Email"
              placeholderTextColor="#155B52"
              underlineColorAndroid={'transparent'}
              returnKeyType="next"
              //onSubmitEditing ={() => this.passwordInput.focus()}
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
            <TextInput style={[styles.inputs, !this.state.passwordvalid ? styles.error : null]}
              placeholder="password"
              placeholderTextColor="#2e7569"
              returnKeyType="go"
              secureTextEntry
              //onChangeText={(password) => this.setState({password})}
              onChangeText={(password) => this.validatepass(password)}
              value={this.state.password}
            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/color/40/000000/password.png' }} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={[styles.inputs, !this.state.passwordvalid ? styles.error : null]}
              placeholder="Confirm password"
              placeholderTextColor="#2e7569"
              returnKeyType="go"
              secureTextEntry
              //onChangeText={(password) => this.setState({password})}
              onChangeText={(Confirmpassword) => this.validateConfirmpass(Confirmpassword)}
              value={this.state.Confirmpassword}
            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/color/40/000000/password.png' }} />
          </View>
          <View style={{ marginTop: 10 }}>
            <RadioForm style={{marginBottom: 10 }}
              radio_props={radio_props}
              initial={0}
              buttonColor={'#50C900'}
              formHorizontal={true}
              labelHorizontal={true}
              onPress={(role) => { this.setState({ role: role }) }}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.loginButton
            ]}
            onPress={() => this.SignUpUser(this.state.email, this.state.password, this.state.Confirmpassword)}
          >
          <Text style={styles.loginText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              styles.loginButton
            ]}
            onPress={this.goToAds.bind(this)} >
            <Text style={styles.loginText}>goToAds</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    );
  }

}
  /*_handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };
*/
  _handleHelpPress = () => { 
  //AppNavigator.LinksScreen
   // navi(<LinksScreen />);
   /* WebBrowser.openBrowserAsync
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );*/
  };

const resizeMode = 'center';

const styles = StyleSheet.create({
  error: {   
    borderBottomColor:'red',
    borderBottomWidth:3
}, 
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     position: 'relative',
     top:'0%',
     height: '70%'
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
    width: '80%',
    marginTop: 20,
    height: 45,
    backgroundColor: "#00b5ec",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
    borderRadius: 30,
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
  

extraWidgetsContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '75%',
  height: 10,
},
iconContent:{
  flex:1,
  alignItems:'flex-end',
  paddingLeft:30,
  paddingTop:110,
  fontWeight:'bold',
  fontSize: 40,
  color:'#2b8475',
},
icon:{
  width:30,
  height:30,
  marginTop:20,
  marginRight:20,
  marginLeft:20,
  color:'#2b8475',
},

});
