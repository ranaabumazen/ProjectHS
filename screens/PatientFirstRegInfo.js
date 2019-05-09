import React,{ Component } from 'react';
import { View ,TouchableOpacity,Alert,Text,StyleSheet,ScrollView,Image,ImageBackground } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';
import  DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';


export default class PatientFirstRegInfo extends Component{
    constructor(props){
        super(props);
        this.state = { error :'',FirstNamevalid:true,LastNamevalid:true,
  FirstName:'',LastName:'',PhoneNumbervalid:true,
  DisplayName:'',DisplayLastName:'',

  PhoneNumber:"",
  birthdayDate: new Date(),
  age:'',
    }
}
componentDidMount(){
  alert('Hello... Please fill these fields before get your profile')
}

   validateFirstName = (FirstName) => {
    let alphaF = /^[a-zA-Z]+$/ ;
    if(alphaF.test(FirstName) == false){
      this.state.FirstNamevalid= false
      this.setState({FirstName})
 
  return false;
    }
    this.setState({FirstName})
    this.state.FirstNamevalid= true
    }
    validateLastName = (LastName) => {
      let alphaL = /^[a-zA-Z]+$/ ;
      if(alphaL.test(LastName) == false){
        this.state.LastNamevalid= false
        this.setState({LastName})
    
    return false;
      }
      this.setState({LastName})
      this.state.LastNamevalid= true
      }
      validatePhoneNumber=(PhoneNumber)=>
      {
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phoneno.test(PhoneNumber)==false)
           {
            this.state.PhoneNumbervalid=false
             this.setState({PhoneNumber})
            
             return false;      
         }
         this.state.PhoneNumbervalid=true
         this.setState({PhoneNumber})
       
        }
        getAge =(dateString) =>
        {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
           this.setState({age:age});
        }
        Cancel(){
          this.props.navigation.navigate('SignUp')
        }
       Save(FirstName,LastName,PhoneNumber,Age){
            Alert.alert(
                '',
                'Confirm Submit Patient Information',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                 
                  {text: 'Sumbit Info', onPress:this.ConfirmSave(FirstName,LastName,PhoneNumber,Age)
                },
                 
                 
                ],
              
                {cancelable: false},
              );
        }
        ConfirmSave (FirstName,LastName,PhoneNumber,Age){
            var user = firebase.auth().currentUser
         if(FirstName == '' || LastName === '' || PhoneNumber === '' || Age === null)
           {
             alert('','please fill all fields')
             return null
           }
           else if(Age === new Date()){
             alert('please put a defined birthdate')
           }
           else {
            console.log(FirstName)
              firebase.database().ref('/patients/'+user.uid)
      .update({
        FirstName:FirstName,
        LastName:LastName,
        PhoneNumber:PhoneNumber,
        Age:Age,
        name:FirstName+LastName,
        uid:user.uid
    
      }).then(()=> {
        console.log('INSERTED !');
        this.props.navigation.navigate('Patient')
      }).catch((error)=> {
        console.log(error);
      
      
      }); 
}
        }
      
    render(){
        return(
          <View>
            <ScrollView style={{ marginTop: 60 }}>
              <View style={[styles.inputContainer, { marginLeft: 50 }]}>
                <TextInputPaper style={[styles.inputs, !this.state.FirstNamevalid ? styles.error : null]}
                  label='First Name'
                  onChangeText={(FirstName) => this.setState({ FirstName })}
                  onChangeText={(FirstName) => this.validateFirstName(FirstName)}
                  value={this.state.FirstName}
                />
                <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png' }} />
              </View>
              <View style={[styles.inputContainer, { marginLeft: 50 }]}>
                <TextInputPaper style={[styles.inputs, !this.state.LastNamevalid ? styles.error : null]}
                  label='Last Name'
                  onChangeText={(LastName) => this.setState({ LastName })}
                  onChangeText={(LastName) => this.validateLastName(LastName)}
                  value={this.state.LastName}
                />
                <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png' }} />
              </View>
              <View style={styles.inputContainer}>
                <TextInputPaper style={[styles.inputs, !this.state.PhoneNumbervalid ? styles.error : null]}
                  label='Phone Number'
                  onChangeText={(PhoneNumber) => this.setState({ PhoneNumber })}
                  onChangeText={(PhoneNumber) => this.validatePhoneNumber(PhoneNumber)}
                  value={this.state.PhoneNumber}
                />
              </View>
              <DatePicker
                style={styles.datePicker}
                date={this.state.birthdayDate}
                mode='date'
                format='MMMM Do, YYYY'
                confirmBtnText='Save'
                cancelBtnText='Cancel'
                customStyles={{ dateInput: { borderRadius: 10, borderWidth: 0, paddingLeft: 50 } }}
                onDateChange={birthdayDate => this.setState({ birthdayDate })}
              // onDateChange={birthdayDate => this.getAge({birthdayDate})}
              />

              <View style={{ marginBottom: 10, flexDirection: 'row', flex: 0.5 }}>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton, { marginLeft: 20 }]}
                  onPress={() => this.ConfirmSave(this.state.FirstName, this.state.LastName, this.state.PhoneNumber, this.state.birthdayDate)}

                >
                  <Text style={styles.loginText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton, { marginLeft: 20 }]}
                  onPress={() => this.Cancel.bind(this)}>
                  <Text style={styles.loginText}>Cancel</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View>

        )
    }
}

const styles = StyleSheet.create ({
    title:{
  marginRight:20,
  marginTop:20,
  fontSize:20,
    },
    row:{
  
      flexDirection:'row',
      flex:1,
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
      borderRadius:30,
      borderBottomWidth: 1,
      width:290,
      height:45,
      marginBottom:10,
      flexDirection: 'row',
     marginLeft:50,
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
    inputs:{
      height:30,
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
      height:45,
      flexDirection: 'row',
     justifyContent: 'center',
      alignItems: 'center',
      marginTop:20,
      marginBottom:50,
      width:150,
      borderRadius:20,
      backgroundColor:'transparent',
    
      textAlign:'center',
    },
    btnByRegister: {
      height:15,
      flexDirection: 'row',
     // justifyContent: 'center',
     // alignItems: 'center',
      marginVertical:20,
      width:200,
      backgroundColor:'transparent',
      marginLeft:5,
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
      color:'white',
      fontWeight:'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
    textByRegister:{
      color:'white',
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
        paddingTop:15,
        fontWeight:'bold',
        fontSize: 40,
        color:'#2b8475',
      },
      icon:{
        width:30,
        height:30,
        marginTop:15,
        //color:'#2b8475',
      },
      textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 40,
        fontSize:14,
        width:50,
        paddingLeft:40,
        marginRight:80,
      
       
        marginBottom:10,
        color:'black',
      },
           
      });