import React,{ Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
} from 'react-native';

import {TextInput}  from 'react-native';
import * as firebase from 'firebase';
//import console = require('console');

const config = {
  apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
  authDomain: 'newpr-8a746.firebaseapp.com',
  databaseURL: 'https://newpr-8a746.firebaseio.com',
  projectId: 'newpr-8a746',
  storageBucket: 'newpr-8a746.appspot.com',
  messagingSenderId: '291968886604'
};
//firebase.initializeApp(config);
const rootref = firebase.database().ref();
const animalref = rootref.child('users');
export default class UserDetail extends Component{
constructor(props){
    super(props);
    this.state =({
        users:[],
        newAnimalName:'',
        loading:false,
    });
}
componentDidMount () {
animalref.on('value',(childSnapshot) =>{
    const users = [];
    childSnapshot.forEach((doc) => {
        users.push({
            key:doc.key,
            name:doc.toJSON().name
        });
        this.setState({
            users:users.sort((a,b)=>{
                return (a.name > b.name );
            }),
            loading:false,
        });
    });

});
}
onPressAdd = () => {
    if(this.state.newAnimalName.trim()===''){
        alert('animalname is needed');
        return;
    }
    animalref.push({
        name:this.state.newAnimalName
    });


}
render(){
    return(
      <ImageBackground source={require('../src/img/dd.png')} style={{width: '100%', height: '100%',opacity:0.7}}>
    
        <View style={{marginTop:34,flex:1}}>
        <TextInput  style={{
        height:40,
        width:280,
        padding:10,
        margin:10
        }}
        onChangeText={(text)=> {this.setState({newAnimalName:text});
    }
}
value={this.state.newAnimalName}        
/>
<TouchableOpacity onPress={this.onPressAdd} 
style={{marginRight:10}}>
</TouchableOpacity>
        <FlatList
        data={this.state.users}
        renderItem={({ item,index })=>{
          return (
            <Text style={{fontSize:20,
            fontWeight:'bold',
            color:'black',
          margin:10
        }}>{ item.name } </Text>
          )
        }}
        >
  </FlatList>
        
      </View>
      </ImageBackground>
    )
}
}





/*import React, { Component } from 'react';
import {View,ImageBackground,Button,Text,TouchableOpacity,FlatList} from 'react-native';
import { ListItem } from 'react-native-elements' ;
//import { List } from 'react-native-elements' ;
//import {db} from './SignUp';

import * as firebase from 'firebase';
state={ itemsRef:''};
const config = {
  apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
  authDomain: 'newpr-8a746.firebaseapp.com',
  databaseURL: 'https://newpr-8a746.firebaseio.com',
  projectId: 'newpr-8a746',
  storageBucket: 'newpr-8a746.appspot.com',
  messagingSenderId: '291968886604'
};

let app = firebase.initializeApp(config);
const rootref = firebase.database().ref();
const animalref = rootref.child('users');

/*this.itemsRef = firebaseApp.database().ref();

export const db = app.database();
*/
/*const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
];



getUserData = ({email}) => {
  var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/details/' + userId).on('value', (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }

  let ref = firebase.database().ref('/users/details/');
  ref.on('value', snapshot => {
    const state = snapshot.val();
    this.setState(state);

  });
  console.log('DATA RETRIEVED');
}*/
/*
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) =>
  <li>{numbers}</li>
);


this.itemsRef = app.database().ref();
export default class UserDetail extends Component {
  constructor(props){
    super(props);
    this.state =({
        users:[],
        newAnimalName:'',
        loading:false,
    });
}
componentDidMount () {
animalref.on('value',(childSnapshot) =>{
    const users = [];
    childSnapshot.forEach((doc) => {
        users.push({
            key:doc.key,
            name:doc.toJSON().name
        });
        this.setState({
            users:users.sort((a,b)=>{
                return (a.name > b.name );
            }),
            loading:false,
        });
    });

});
}
  
  state = { email:'mm', phone:'nnn', login:'nn', dob:'nn', location:'m',users:[]};
 
  
  render() {
    return(
    <View style={{marginTop:34,flex:1}}>
      <FlatList
      data={this.state.users}
      renderItem={({ item,index })=>{
        return (
          <Text style={{fontSize:20,
          fontWeight:'bold',
          color:'black',
        margin:10
      }}>{ item.name } </Text>
        )
      }}
      >
</FlatList>
      
    </View>
    );
  //document.getElementById('root')
    //const { email, phone, login, dob, location } = this.props.navigation.state.params;
/*
    return (
      <View>
  
    
   
     
      <TouchableOpacity title="Add" onpress="{this._addItem.bind(this)}">
      <Text>Add</Text>
      </TouchableOpacity>

    
  
</View>
    );*/
    
/*  }
}

*/
