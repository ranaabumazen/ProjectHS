import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
    ImageBackground,
} from 'react-native';
//import WebClient from  '../nodemodules/websocket-extenions';


import styles from './styles';
//import console = require('console');
//import Images from './images';
import * as firebase from 'firebase';

const configf = {
  apiKey: 'AIzaSyBkJypajBMwTeoNSXx9XYzJNjirv9zEy0k',
  authDomain: 'fir-p-8133a.firebaseapp.com',
  databaseURL: 'https://fir-p-8133a.firebaseio.com',
  projectId: 'fir-p-8133a',
  storageBucket: 'fir-p-8133a.appspot.com',
  messagingSenderId: '340403638151'
};

export default class ForgotPasswordScreen extends Component {
    /**
     * Default props
     */
    static defaultProps = {  
     
        backgroundColor :"white",
        titleText:"Forgot Password",
        submitText:"Send",
        placeHolderText:"Email Address"
    };

    constructor(props) {
        super(props);
        this.state = {
           email:""
        };
    }

    /**
     * Validate email
     */
    validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * Button submit pressed
     */
    btnSubmitPress() {
        if (this.state.email.trim().length == 0) {
            console.log("Please enter email");
          }else if(this.validateEmail(this.state.email) == false){
            console.log("Please enter valid email");
          }else {
            this.callForgotPassword(this.state.email);
          }
    }

    /**
     * Call your webservice for forgot pasword
     */
    callForgotPassword (email) 
    {

        firebase.auth().sendPasswordResetEmail(email).then(function (user) {
            alert('Please check your email ...') }). catch( function(error){
                alert('There is no user record corresponding to this identifier. The user may have been deleted')
                console.log(error)
        
            })
        
       /*  this.setState({spinnerVisible: true});
         WebClient.postRequest(Settings.URL.FORGOT_PASSWORD, {
            "email": this.state.email
         }, (response, error) => {
             this.setState({spinnerVisible: false});
             if (error == null) {
                console.log(response.message);
                this.props.callbackAfterCheckForgotPassword();
              } else {
               console.log(error.message);
         }
         });*/
    }

    /**
     * Button close pressed
     */
    btnClosePress(){
        this.props.callbackAfterForgotPassword(0, this.props.otherParamsToSend);
    }
    Return(){
    
        this.props.navigation.navigate('HomeLoginScreen')
      
      }

    render() {
        return (
            <ImageBackground source={require('../src/img/dd.png')} style={{width:'100%',height:'100%',opacity:0.7}}>
            <View  style={{ padding:30,paddingTop:120}}>
                <View style={[styles.bottomView,{backgroundColor:this.props.backgroundColor}]}>
                    <TouchableOpacity style={styles.btnClose} activeOpacity={0.6} onPress={() => this.btnClosePress()}>
                        
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{this.props.titleText}</Text>
                    <View style={styles.starView}>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText} placeholder={this.props.placeHolderText}
                            multiline={false} placeholderTextColor={'#3c3c3c'} autoCapitalize={'none'} keyboardType={'email-address'} autoCorrect={false} underlineColorAndroid={'transparent'} onChangeText={(email) => this.setState({email})} value={this.state.email}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.btnCancel} activeOpacity={0.6} onPress={() => this.btnSubmitPress()}>
                            <Text style={styles.textCancel} numberOfLines={1}>
                            {this.props.submitText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={stylesicon.item}>
              <View  onPress={this.Return.bind(this)} style={stylesicon.iconContent}>
               <TouchableOpacity onPress={this.Return.bind(this)}>
                <Image style={stylesicon.icon} source={{uri: 'https://img.icons8.com/windows/32/ffffff/reply-arrow.png'}}/>
                </TouchableOpacity>
              </View>
              
            
            </View>
            </ImageBackground>
        );
    }


}
const stylesicon = StyleSheet.create({ 
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
        paddingTop:110,
        fontWeight:'bold',
        fontSize: 30,
      },
      icon:{
        width:30,
        height:30,
        marginTop:20,
      },
  });
  