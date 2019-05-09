import React,{Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown' ;


export default class addDoctor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            textcolorr:'white',
            text:'',
            email: '',error :'',emailvalid:true,FirstNamevalid:true,
            FirstName:'',LastName:'',PhoneNumbervalid:true,
            text:'',
            University:'',
            Speciality:'', 
            Age:'',
          };
    }
    addDoctor(FirstName,Email,PhoneNumber,University,Speciality,Age){
       
       firebase.database().ref('/doctors/'+FirstName.toUpperCase()).update({
        name:FirstName.toUpperCase(),
        email:Email,
        PhoneNumber:PhoneNumber,
        Age:Age,
        University:University,
        Speciality:Speciality,

       });
       this.setState({textcolorr:'black'});
       alert('added new doctor sucessfully');

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
    validate = (email) => {
     
        // console.log(email);
         let reg =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
       Cancel(){
        //this.props.navigation.navigate('UserProfileScreen')
      }

      buildTable(FirstName){
        this.props.navigation.navigate('SearchUsers')
       /* this.props.navigation.navigate('BuilddoctorTableScreen',{
          JSON_ListView_Clicked_Item: FirstName,
        }) */
    }
     
    render(){
      const { navigate } = this.props.navigation;
      let data = [{
        value: 'Al-najah-national University',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];
        //const { navigate } = this.props.navigation;
        return(
          <ScrollView style={{marginTop:60}}>
            <View style={[styles.inputContainer,{marginLeft:50}]}>
  
  <TextInput  style={[styles.inputs,!this.state.FirstNamevalid ? styles.error:null]}
   
        placeholder="doctor's name"
        placeholderTextColor ="#155B52"
      underlineColorAndroid={'transparent'}
      returnKeyType="next"
      onChangeText={(FirstName) =>this.setState({FirstName})}
       
      // Note: persist input}
      onChangeText={(FirstName) => this.validateFirstName(FirstName)}
      value={this.state.FirstName}
     
     
      />
  <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png'}}/>
</View>
<View style={styles.inputContainer}>
<TextInput style={[styles.inputs,! this.state.emailvalid ? styles.error:null]}
     placeholder = "Email" 
placeholderTextColor ="#155B52"
underlineColorAndroid={'transparent'}
returnKeyType="next"

keyboardType="email-address"
autoCapitalize="none"
autoCorrect={false}
//style={styles.input}
onChangeText={(email) => this.setState({email})}
onChangeText={(email) => this.validate(email)}
value={this.state.email}

/>
<Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/flat_round/40/000000/secured-letter.png'}}/>
       </View>
<View style={styles.inputContainer}>
   <TextInput style={[styles.inputs,!this.state.PhoneNumbervalid ? styles.error:null]}
     placeholder ="Phone number"
     placeholderTextColor ="#155B52"
     underlineColorAndroid={'transparent'}
     returnKeyType="next"
//onSubmitEditing ={() => this.passwordInput.focus()}

//style={styles.input}
onChangeText={(PhoneNumber) => this.setState({PhoneNumber})}


onChangeText={(PhoneNumber) => this.validatePhoneNumber(PhoneNumber)}
value={this.state.PhoneNumber}

/>
<Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/windows/32/000000/keypad.png'}}/>
       </View>
       <Dropdown style={[styles.textInput,{marginBottom:10,marginLeft:40}]}
        label='University'
        placeholder="university"
        data={data}
        
        handler={(selection, row) => this.setState({text: data[selection][row]})}
      onChangeText={(University)=>this.setState({University})}
      value={this.state.University}
  // dropdownOffset={'top:32, right: 20'}
  dropdownMargins= { 'min: 8, max: 16' }
      selectedItemColor={'rgba(0,0,0, .87)'}
      
        
         />
          <Dropdown style={[styles.textInput,{marginTop:10,marginLeft:40}]}
        label='Speciality'
        placeholder="Speciality"
        data={data}
        
        handler={(selection, row) => this.setState({Speciality: data[selection][row]})}
      onChangeText={(Speciality)=>this.setState({Speciality})}
      value={this.state.Speciality}
  // dropdownOffset={'top:32, right: 20'}
  dropdownMargins= { 'min: 8, max: 16' }
      selectedItemColor={'rgba(0,0,0, .87)'}
      
        
         />
           <Dropdown style={[styles.textInput,{marginTop:10,marginLeft:40}]}
        label='Age'
        placeholder="Age"
        data={data}
        
        handler={(selection, row) => this.setState({Age: data[selection][row]})}
      onChangeText={(Age)=>this.setState({Age})}
      value={this.state.Age}
  // dropdownOffset={'top:32, right: 20'}
  dropdownMargins= { 'min: 8, max: 16' }
      selectedItemColor={'rgba(0,0,0, .87)'}
      
        
         />
         
<View style={[styles.row,{marginTop:50}]}>
<View style={{marginBottom:10}}>       
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton,{marginLeft:20}]}
onPress={this.Cancel.bind(this)}
>
   <Text style={styles.loginText}>Cancel</Text>
</TouchableOpacity>

</View>      
<View style={{marginBottom:10}}>       
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton,{marginLeft:10}]}
onPress={()=> this.addDoctor(this.state.FirstName,this.state.email,this.state.PhoneNumber,this.state.University,this.state.Speciality,this.state.Age)}
>
   <Text style={styles.loginText}>Save</Text>
</TouchableOpacity>

</View>      
</View>
<View style={{marginBottom:10}}>       
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton,{marginLeft:10}]}
onPress={/*()=>navigate('BuilddoctorTableScreen', {
  JSON_Item: this.state.FirstName,
})*/
this.buildTable.bind(this)
}
>
   <Text style={styles.loginText}>create doctor's table</Text>
</TouchableOpacity>

</View>    
               
              
               </ScrollView>
        );
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