import React,{ Component } from 'react';
import {
    Text,
    View,
    AppRegistry,
    AsyncStorage,
    TextInput,
    TouchableHighlight,
    
    StyleSheet,
} from 'react-native';
 import list from './list';
 import PushNotification from 'react-native-push-notification';
PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    //senderID: "YOUR GCM (OR FCM) SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
 import DatePicker from 'react-native-datepicker';
import moment from 'moment';

 export default class index extends Component{
     constructor(props){
         super(props);
         this.state={
             title:'',
             subtitle:'',
             comment:'',
             date:'',

         }
     }
     changeTitle(title)
    {
        this.setState({title})
    }
    changeSubtitle(subtitle){
        this.setState({subtitle})
    }
    changeComment(comment){
        this.setState({comment})
    }
    listofthings(){
        this.props.navigator.push({
            title:'list of things',
            component:list
        })
    }
    buttonPressed(){
        const arrayData=[];
        if(this.state.comment && this.state.title && this.state.subtitle){
            const data={
                title:this.state.title,
                subtitle:this.state.subtitle,
                comment:this.state.comment,
                date:this.state.date,

            }
            arrayData.push(data);
        try{
            AsyncStorage.getItem('notifications_push').then((value)=>{
                if(value !== null){
                    const d = JSON.parse(value);
                    d.push(data)
                    AsyncStorage.setItem('notifications_push',JSON.stringify(d)).then((list)=>
                       { PushNotification.localNotificationSchedule({
                           message:d[d.length-1].title,
                           date:moment(d[d.length-1].date,"YYYY-MM-DD HH:mm").toDate()
                       })
                           this.props.navigator.push({
                            title:'list of things',
                            component:list
                        })
                    })
                }
                else{
                    AsyncStorage.getItem('notifications_push',JSON.stringify(arrayData)).then((list)=>
                        {
                            PushNotification.localNotificationSchedule({
                                message:data.title,
                                date:moment(data.date,"YYYY-MM-DD HH:mm").toDate()
                            })
                            this.props.navigator.push({
                                title:'list of things',
                                component:list,
                        })
                        })
                }
            })
        }catch(err){
            alert(err)
        }

    }
    
    
 }
 render(){
     return(
         <View>
             <TextInput 
             placeholder="title"
             placeholderTextColor='black'
             onChangeText={(title)=>this.changeTitle(title)}
             />
              <TextInput 
             placeholder="subtitle"
             placeholderTextColor='black'
             onChangeText={(subtitle)=>this.changeSubtitle(subtitle)}
             />
              <TextInput 
             placeholder="comment"
             placeholderTextColor='black'
             onChangeText={(comment)=>this.changeComment(comment)}
             />
              <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="datetime"
        placeholder="select date"
        format="YYYY-MM-DD HH:mm"
        minDate="2019-04-09"
        maxDate="2019-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
             <TouchableHighlight style={{backgroundColor:'red'}} onPress={()=> this.buttonPressed()}>
             <Text>
                 send
             </Text>
                 </TouchableHighlight>
                 <TouchableHighlight style={{backgroundColor:'red'}}onPress={()=> this.listofthings()}>
             <Text>
                 send
             </Text>
                 </TouchableHighlight>
                      </View>

     )
 }
}