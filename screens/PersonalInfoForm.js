

import { View, Text, FlatList, TextInput, Button, ScrollView, StyleSheet, Image, Keyboard, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import React, { Component } from 'react';


import { Dropdown } from 'react-native-material-dropdown';
import * as firebase from 'firebase';
import { db } from './SignUp';
import { pass } from './SignUp';
import { AsyncStorage } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';
//import console = require('console');


const configg = {
  apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
  authDomain: 'newpr-8a746.firebaseapp.com',
  databaseURL: 'https://newpr-8a746.firebaseio.com',
  projectId: 'newpr-8a746',
  storageBucket: 'newpr-8a746.appspot.com',
  messagingSenderId: '291968886604'
};
// !firebase.apps.length ? firebase.initializeApp(configg) : firebase.app();
const rootref = db.ref();
const userref = rootref.child('users');

//import console = require('console');

//const { currentUser } = firebase.auth();

//FirebaseUser user = configg.getInstance().getCurrentUser();
//user.updateEmail("");
export default class PersonalInfoForm extends Component {
  state = {
    email: '', password: '', error: '', emailvalid: true, passwordvalid: true, FirstNamevalid: true, LastNamevalid: true,
    Confirmpassword: '', FirstName: '', LastName: '', PhoneNumbervalid: true, DisplayName: '', DisplayLastName: '',
    DisplayEmail: '',
    DisplayPhoneNumber: '',
    DisplayUniver: '',
    DisplaySpeciality: '',
    DisplayAge: '',
    users: [],
    newUserName: '',
    loading: false,
    currentPassword: "",
    PhoneNumber: "",
    Fentered: true,
    Lentered: true,
    Eentered: true,
    Pentered: true,
    text: '',
    University: '',
    Speciality: '',

    Age: '',
  };


  constructor(props) {
    super(props);

    const userId = firebase.auth().currentUser.uid;
    console.log(userId);
  }
  componentDidMount() {
    AsyncStorage.getItem("FirstName").then((value) => {
      this.setState({ "FirstName": value });
    }).done();
    AsyncStorage.getItem("LastName").then((value) => {
      this.setState({ "LastName": value });
    }).done();
    AsyncStorage.getItem("email").then((value) => {
      this.setState({ "email": value });
    }).done();
    AsyncStorage.getItem("PhoneNumber").then((value) => {
      this.setState({ "PhoneNumber": value });
    }).done();
    AsyncStorage.getItem("Speciality").then((value) => {
      this.setState({ "Speciality": value });
    }).done();
    AsyncStorage.getItem("University").then((value) => {
      this.setState({ "University": value });
    }).done();
    AsyncStorage.getItem("Age").then((value) => {
      this.setState({ "Age": value });
    }).done();
  }

  componentWillMount() {


    const userId = firebase.auth().currentUser.uid;


  }
  async Save(FirstName, LastName, email, PhoneNumber, University, Speciality, Age) {
    var user = firebase.auth().currentUser
    await AsyncStorage.setItem("email", this.state.email);
    await AsyncStorage.setItem("FirstName", this.state.FirstName);
    await AsyncStorage.setItem("LastName", this.state.LastName);
    await AsyncStorage.setItem("PhoneNumber", this.state.PhoneNumber);

    /*var postData = {
      FullName: FullName,
      //uid: uid,
     email:email,
    };
    */
    /* var newPostKey = db.ref().child('users').push().key;
     var updates = {};
     updates['/users/' + newPostKey] = postData;
     db.ref().update(updates);*/
    let q = db.ref('/users/');
    var finished = [];
    q.once('value', snapshot => {
      snapshot.forEach(function (data) {
        let result = data.val();
        result["key"] = data.key;
        finished.push(result);
        // this.state.email=finished.email;
        console.log(finished);

        db.ref('/doctors/' + user.uid)
          .update({
            FirstName: FirstName,
            LastName: LastName,
            email: email,
            PhoneNumber: PhoneNumber,
            University: University,
            Speciality: Speciality,
            Age: Age,
            name: FirstName + LastName,
            uid: user.uid

          });
      }
      );
    }
    );
    this.state.Fentered = false;
    this.state.Lentered = false;
    this.state.Eentered = false;
    this.state.Pentered = false;
  }

  /*var credentials = firebase.auth.EmailAuthProvider.credential(email, 'firebase');
  user.reauthenticate(credentials);
  */
  ///finished.map(item,key);

  /* }).then(function(){
     console.log(finished);
     //console.log(finished[uuid])
   // console.log(doc.key);

     });
/*    
   const {curr} = cuu
const { currentUser } = curr
var x = cuu.uid;
//var Duid = uid;
return()=>{
db.ref('/users/'+ x +'/Doctors/'+ doc.key)
.set({FullName,email})
.then(()=>console.log('saved!'));
};*/
  /* if(this.state.FirstName.trim()===''){
     alert('animalname is needed');
     return;
 }*/
  /* userref.push({
     FullName:this.state.FirstName+this.state.LastName,
     email:this.state.email,
   });
*/
  /*db.ref('users/'+'-LaPiUtM1EBMuPVqsoJn').update({
    FullName:'Ranann'
  })*/

  Return() {

    this.props.navigation.navigate('InfoScreen')

  }
  handleNameChange(name) {
    this.setState({ name });
  }
  handleSubmit() {
    saveSettings(this.state);
  }
  validate = (email) => {

    // console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      this.setState({ email })
      this.state.emailvalid = false
      return false;
    }
    this.setState({ email })
    this.state.emailvalid = true
    //firebase.auth().createUserWithEmailAndPassword(email,password)
  }
  validateFirstName = (FirstName) => {
    let alphaF = /^[a-zA-Z]+$/;
    if (alphaF.test(FirstName) == false) {
      this.state.FirstNamevalid = false
      this.setState({ FirstName })

      return false;
    }
    this.setState({ FirstName })
    this.state.FirstNamevalid = true
  }
  validateLastName = (LastName) => {
    let alphaL = /^[a-zA-Z]+$/;
    if (alphaL.test(LastName) == false) {
      this.state.LastNamevalid = false
      this.setState({ LastName })

      return false;
    }
    this.setState({ LastName })
    this.state.LastNamevalid = true
  }
  validateFirstName = (City) => {
    let alphaF = /^[a-zA-Z]+$/;
    if (alphaF.test(City) == false) {
      this.state.Cityvalid = false
      this.setState({ City })

      return false;
    }
    this.setState({ City })
    this.state.Cityvalid = true
  }
  validatePhoneNumber = (PhoneNumber) => {
    let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneno.test(PhoneNumber) == false) {
      this.state.PhoneNumbervalid = false
      this.setState({ PhoneNumber })

      return false;
    }
    this.state.PhoneNumbervalid = true
    this.setState({ PhoneNumber })

  }
  Return() {

    this.props.navigation.navigate('Settings')

  }
  Cancel() {
    this.props.navigation.navigate('Settings')
  }


  saveFirstName(value) {

    AsyncStorage.setItem("FirstName", value);
    this.setState({ "FirstName": value });
  }
  saveLastName(value) {

    AsyncStorage.setItem("LastName", value);
    this.setState({ "LastName": value });
  }
  saveCity(value) {

    AsyncStorage.setItem("City", value);
    this.setState({ "City": value });
  }
  saveEmail(value) {

    AsyncStorage.setItem("email", value);
    this.setState({ "email": value });
  }
  savePhoneNumber(value) {

    AsyncStorage.setItem("PhoneNumber", value);
    this.setState({ "PhoneNumber": value });
  }
  saveSpeciality(value) {

    AsyncStorage.setItem("Speciality", value);
    this.setState({ "Speciality": value });
  }
  saveUniversity(value) {

    AsyncStorage.setItem("University", value);
    this.setState({ "University": value });
  }
  saveAge(value) {

    AsyncStorage.setItem("Age", value);
    this.setState({ "Age": value });
  }
  render() {
    let data = [{
      value: 'Al-najah-national University',
    }, {
      value: 'Birzet-university'
    }, {
      value: 'American-University',
    }];
    let SpData = [{
      value: 'Neurosurgery',
    }, {
      value: 'Eye Speciality'
    }, {
      value: 'X-ray speciality',
    }, {
      value: 'Diseases of blood and tumors Specility',

    },];
    // var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
    let AgeData = [{
      value: 28,

    },]

    return (
      /*<View style={{backgroundColor:'white',marginTop:50}}>
      <View style={styles.container}>
             <StatusBar barStyle="light-content"/>*/

      /*       <FlatList
      data={this.state.users}
      renderItem={({ item,index })=>{
        return (
          <Text style={{fontSize:20,
          fontWeight:'bold',
          color:'black',
        margin:10
      }}>{ item.FirstName} </Text>
        )
      }}
      >
</FlatList>*/
      <View>
        <View style={styles.item}>
          <View onPress={this.Return.bind(this)} style={styles.iconContent}>
            <TouchableOpacity onPress={this.Return.bind(this)}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/windows/32/000000/reply-arrow.png' }} />
            </TouchableOpacity>
          </View>


        </View>
        <ScrollView style={{ marginTop: 60 }}>


          <View style={[styles.inputContainer, { marginLeft: 50 }]}>

            <TextInputPaper style={[styles.inputs, !this.state.FirstNamevalid ? styles.error : null]}
              label='First Name'
              placeholder={this.state.DisplayName}
              placeholderTextColor="#155B52"
              underlineColorAndroid={'transparent'}
              returnKeyType="next"
              onChangeText={(FirstName) => this.setState(FirstName)}

              // Note: persist input}
              onChangeText={(FirstName) => this.validateFirstName(FirstName)}
              value={this.state.FirstName}


            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png' }} />
          </View>
          <View style={[styles.inputContainer, { marginLeft: 50 }]}>

            <TextInputPaper style={[styles.inputs, !this.state.LastNamevalid ? styles.error : null]}
              label='Last Name'
              placeholder={this.state.DisplayLastName}
              placeholderTextColor="#155B52"
              underlineColorAndroid={'transparent'}
              returnKeyType="next"
              onChangeText={(LastName) => this.setState({ LastName })}

              // Note: persist input}
              onChangeText={(LastName) => this.validateLastName(LastName)}
              value={this.state.LastName}


            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png' }} />
          </View>
          <View style={styles.inputContainer}>
            <TextInputPaper style={[styles.inputs, !this.state.PhoneNumbervalid ? styles.error : null]}
              label='Phone Number'
              placeholder={this.state.DisplayPhoneNumber}
              placeholderTextColor="#155B52"
              keyboardType='phone-pad'
              underlineColorAndroid={'transparent'}
              returnKeyType="next"
              //onSubmitEditing ={() => this.passwordInput.focus()}

              //style={styles.input}
              onChangeText={(PhoneNumber) => this.setState({ PhoneNumber })}


              onChangeText={(PhoneNumber) => this.validatePhoneNumber(PhoneNumber)}
              value={this.state.PhoneNumber}

            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/windows/32/000000/keypad.png' }} />
          </View>


          <View style={styles.inputContainer}>
            <TextInputPaper style={[styles.inputs, !this.state.emailvalid ? styles.error : null]}
              label='Email'
              placeholder={this.state.DisplayEmail}
              placeholderTextColor="#155B52"
              underlineColorAndroid={'transparent'}
              returnKeyType="next"
              keyboardType="email-address"

              //style={styles.input}
              onChangeText={(email) => this.setState({ email })}
              onChangeText={(email) => this.validate(email)}
              value={this.state.email}

            />
            <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/flat_round/40/000000/secured-letter.png' }} />
          </View>
          <Dropdown style={[styles.textInput, { marginBottom: 10, marginLeft: 40 }]}
            label='University'
            placeholder={this.state.DisplayUniver}
            data={data}

            handler={(selection, row) => this.setState({ text: data[selection][row] })}
            onChangeText={(University) => this.saveUniversity(University)}
            value={this.state.University}
            // dropdownOffset={'top:32, right: 20'}
            dropdownMargins={'min: 8, max: 16'}
            selectedItemColor={'rgba(0,0,0, .87)'}


          />
          <Dropdown style={[styles.textInput, { marginTop: 10, marginLeft: 40 }]}
            label='Speciality'
            placeholder={this.state.DisplaySpeciality}
            data={SpData}

            handler={(selection, row) => this.setState({ Speciality: data[selection][row] })}
            onChangeText={(Speciality) => this.saveSpeciality(Speciality)}
            value={this.state.Speciality}
            // dropdownOffset={'top:32, right: 20'}
            dropdownMargins={'min: 8, max: 16'}
            selectedItemColor={'rgba(0,0,0, .87)'}


          />
          <Dropdown style={[styles.textInput, { marginTop: 10, marginLeft: 40 }]}
            label='Age'
            placeholder={this.state.DisplayAge}
            data={data}

            handler={(selection, row) => this.setState({ Age: data[selection][row] })}
            onChangeText={(Age) => this.saveAge(Age)}
            value={this.state.Age}
            // dropdownOffset={'top:32, right: 20'}
            dropdownMargins={'min: 8, max: 16'}
            selectedItemColor={'rgba(0,0,0, .87)'}


          />

          <View style={[styles.row, { marginTop: 50 }]}>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton, { marginLeft: 20 }]}
                onPress={this.Cancel.bind(this)}
              >
                <Text style={styles.loginText}>Cancel</Text>
              </TouchableOpacity>

            </View>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton, { marginLeft: 10 }]}
                onPress={() => this.Save(this.state.FirstName, this.state.LastName, this.state.email, this.state.PhoneNumber, this.state.University, this.state.Speciality, this.state.Age)}
              >
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginRight: 20,
    marginTop: 20,
    fontSize: 20,
  },
  row: {

    flexDirection: 'row',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 290,
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
    marginLeft: 50,
    //alignItems:'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 30,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: 'transparent',

    textAlign: 'center',
  },
  btnByRegister: {
    height: 15,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 20,
    width: 200,
    backgroundColor: 'transparent',
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: '#00b5ec',

    /*shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,*/
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'

  },
  /*bgImage:{
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },*/
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  textByRegister: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
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


  error: {

    borderBottomColor: 'red',
    borderBottomWidth: 3
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 30,
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 40,
    color: '#2b8475',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 15,
    //color:'#2b8475',
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 40,
    fontSize: 14,
    width: 50,
    paddingLeft: 40,
    marginRight: 80,


    marginBottom: 10,
    color: 'black',
  },

});