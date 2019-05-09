
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Print } from 'expo';
import * as firebase from 'firebase';




export default class doctorAppointments extends Component {
  
  
  constructor(props) {
    super(props);
    var that = this;
  this.items=[],
 
  this.state={
    name:'helllo',
    isPermitted:true,
    filePath:[],
  }
  this.n=''
  
}
_bookSlot(status,key,value){
 
 
  const uid = 'mVWyfx7jQgOc2HAD8IgwE9mSg802'
  let userDataJson = {}
  if(status)
  userDataJson[key] = uid
  else
  userDataJson[key] = null

  firebase.database().ref('slots').update(userDataJson)
}
  async createPDF() {
    firebase.database().ref('users').on('value',(snap)=>{
      //var items=[]
      snap.forEach((chid)=>{
       this.items.push({
          email:chid.val().email,
          name:chid.val().name
          //toto:chid.toJSON().day,
        });

     
      });

    console.log('heioo');
    var htmlString = '<!DOCTYPE html>'+'<html>'+'<title>'+'W3.CSS Template'+'</title>' +
    '<meta charset="UTF-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1">'+'<style>'+
    'body,p {font-family: "Raleway", sans-serif}'+
    '</style>'+'<body>';
   
   htmlString+='<p>'+'<font size="16">'+`Email:${this.items.map((item)=>(
  item.email+'\n'
))}`+'</font>'+'</p>'+'<br />'+'<p>'+'<font size="16">'+`Name:${this.items.map((item,index)=>(
  item.name
))}`+'</font>'+'</p>';
    htmlString +='</body>'+ '</html>';
  
    let options = {

      //Content to print
      html:htmlString,
     // html,
      /*this.state.filepath.map(item =>{
              return item.time }),*/
      
        //'<h1 style="text-align: center;"><strong>Hello Guys+</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
      //File Name
      //fileName: 'test',
    
      base64:true, 
      //File directory
      //directory: 'docs',
      

    };
    //let file = await RNHTMLtoPDF.convert(options);
    //console.log(file.filePath);
   // this.setState({filePath:file.filePath});
   
  let file =  Print.printAsync(options)
 // this.setState({filePath:file});
  //console.log(file);

});
//   this.items.map(function(item){
//     this.n=item
//     this.setState({name:item});
// })
  }
  render() {
  
        if (this.state.isPermitted) {
        return(
        <View style={styles.MainContainer}>
          <TouchableOpacity onPress={this.createPDF.bind(this)}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'http://aboutreact.com/wp-content/uploads/2018/09/pdf.png',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.text}>Create PDF</Text>
           
            </View>
          </TouchableOpacity>
          
        </View>
          
      );
            
    } else {
      return <ActivityIndicator />;
    }
  }

}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'white',
    textAlign:'center',
    fontSize: 25,
    marginTop:16,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});