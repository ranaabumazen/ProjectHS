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

const rootref = firebase.database().ref();
const animalref = rootref.child('users');
export default class DatabaseComponent extends Component{
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
    )
}
}