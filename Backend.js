import * as firebase from 'firebase';
import React,{Component} from 'react';
export default class Backend extends React.Component{
    uid='';
    messageRef=null;
    constructor(){
        firebase.initializeApp(
            {
                    apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
                    authDomain: 'newpr-8a746.firebaseapp.com',
                    databaseURL: 'https://newpr-8a746.firebaseio.com',
                    projectId: 'newpr-8a746',
                    storageBucket: 'newpr-8a746.appspot.com',
                    messagingSenderId: '291968886604'
             
            }
        );
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.setUid(user.uid);
            } else {
              firebase
                .auth()
                .signInAnonymously()
                .catch(error => {
                  alert(error.message);
                });
            }
          });
    }
    setUid(value){
        this.uid=value;
    }
    getUid(){
        return this.uid;
    }
    loadMessages=(callback)=>{
        this.messageRef=firebase.auth().ref('chat');
        this.messageRef.off();
        const onReceive=(data)=>{
            const message=data.val();
            callback({
                _id:data.key,
                text:message.text,
                createdAt:new Data(message.createdAt),
                user:{
                    _id : message.user._id,
                    name:message.user.name,
                },
            });
        };
        this.messageRef.limitToLast(20).on('child_added',onReceive);

    }
    sendMessage(message)
    {
      for(let i =0 ;i<message.length;i++){
          this.messageRef.push({
              text:message[i].text,
              user:message[i].user,
              createdAt:firebase.database.ServerValue.TIMESTAMP,
          });

      }
    }
    closeChat(){
        if(this.messageRef){
            this.messageRef.off();
        }
    }
}
