
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Picker,
  AsyncStorage,
  FlatList,
  Alert,

} from 'react-native';
import DatePicker from '../datepicker';
import * as firebase from 'firebase';
//let items=[]
export default class Calc extends Component {

  constructor(props) {
    super(props);
    this.items=[],
    this.state = {
      date: '',
      time: '',
      datetime: '2019-04-27 10:28',
      datetime1: '2016-05-05 20:00',
      toto : this.props.navigation.state.params.JSON_ListView_Clicked_Item,
      datas:[],
      shift:' ',
      data:'',
      StartTime:'',
      EndTime:'',
    };
    this.data = [],
   this.shift='Sunday' ,
   this.array=[]
  }
  componentWillMount(){
    this.setState({shift:'Sunday'})
    this.setState({ data:this.state.data })
    
  }
componentDidMount(){
  var tot = this.state.toto.split(".",2)
  firebase.database().ref('/slots/'+'reem').once('value',snapshot=>{
    // console.log(snapshot.child('members').child('0').child('title').val())
    let membersarray=snapshot.child('members')
     for(let i=0;i<membersarray.numChildren();i++)
     {
       console.log(membersarray.child(i).child('title').val())
       let appday = membersarray.child(i).child('title').val()
       let str = appday.split(" ",3)
      // this.array.push({title:str[1]})
       if(this.state.shift === str[0])
       {
         this.array.push({title:(str[1]+str[2])})

        }
        this.setState( {data:[...this.array] })
     }
     /* snapshot.child('members').forEach(function(child){
   let appday = child.child('title').val();
   let str = appday.split(" ",2);
   if(this.shift === str[0]){
    this.array.push({title:str[1]})

   }
   this.setState( {data:[...this.array] })
 });*/
    });
  //let datas=[]
  //this.setState({})
  firebase.database().ref('/slots/'+'reem').once('value',snap=>
  { 
    
  this.items.push({
     day:snap.val().day,
     starttime:snap.val().starttime,
     endtime:snap.val().endtime, 
    });
  
    this.setState({datas:this.items})
    console.log(this.state.datas);
    
  });
}
funSave=()=>{
  Alert.alert(
    '',
    'Confirm Appointment Request',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
     
      {text: 'Send Appointment Request', onPress:this.Save((new Date(this.state.date)).getDay(),this.state.date,item.title,this.state.toto)
    },
     
     
    ],
  
    {cancelable: false},
  );
 }
  Save(day,date,StartAndEnd,toto){
    var ToAndFromTimes = StartAndEnd.split("-",2)
    var Savedweekday = new Array(7);
    Savedweekday[0] =  "Sunday";
    Savedweekday[1] = "Monday";
    Savedweekday[2] = "Tuesday";
    Savedweekday[3] = "Wednesday";
    Savedweekday[4] = "Thursday";
    Savedweekday[5] = "Friday";
    Savedweekday[6] = "Saturday";
    var user = firebase.auth().currentUser
    let q = firebase.database().ref('/appointments/');
        var finished=[];
        q.once('value',snapshot =>{
          snapshot.forEach(function(data){
            let result = data.val();
            result["key"] = data.key;
            finished.push(result);
           // this.state.email=finished.email;
            console.log(finished);
            var tott = toto.split(".",2)
           firebase.database().ref('/appointments/'+user.uid)
  .update({
    day:Savedweekday[day],
    date:date,
   
    StartTime:ToAndFromTimes[0],
    EndTime:ToAndFromTimes[1],
    doctor:(tott[1].toUpperCase()),
    available:true,

  });
  
  firebase.database().ref('/doctorslots/'+tott.toUpperCase()).update({
    day:Savedweekday[day],
   patientid:user.uid,
   date:date,
   
   StartTime:ToAndFromTimes[0],
   EndTime:ToAndFromTimes[1],
    
  });

}         
);
     }
        );
    }
  
    showSlots = (toto,date) => {
      var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
      this.array=[]
      this.setState({date})
      //this.setState({shift})
      //this.shift =  this.state.shift
      var totta = toto.split(".",2)
           firebase.database().ref('/slots/'+'reem').once('value',snapshot=>{
           // console.log(snapshot.child('members').child('0').child('title').val())
           let membersarray=snapshot.child('members')
            var count = membersarray.numChildren();
            for(let i=0;i<count;i++)
            {
              console.log(membersarray.child(i).child('title').val())
              let appday = membersarray.child(i).child('title').val()
              let str = appday.split(" ",3)
             // this.array.push({title:str[1]})
              if( (weekday[((new Date(date))).getDay()]) === str[0])
              {
              /* firebase.database().ref('/appointments/'+'reem').once('value',snapd=>{
                  if((snapd.child('available').val())){*/
                    this.array.push({title:(str[1]+str[2])})
                    this.setState({StartTime:str[1]});
                    this.setState({EndTime:str[2]});
             /* }
                });
               */
     
               }
               this.setState( {data:[...this.array] })
               this.setState({StartTime:str[1]});
               this.setState({EndTime:str[2]});
            }
            /* snapshot.child('members').forEach(function(child){
          let appday = child.child('title').val();
          let str = appday.split(" ",2);
          if(this.shift === str[0]){
           this.array.push({title:str[1]})

          }
          this.setState( {data:[...this.array] })
        });*/
           });
    }
  Cancel(){
    this.props.navigation.navigate('Patients')
  }
  componentWillMount() {
    this.setState({shift:'Sunday'})
    this.setState({ data:this.state.data })
   
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }
  GetItem(item) {
     var titleelements = item.split("-",2)
    Alert.alert(titleelements[0]+titleelements[1]);

  }
  GotoChatting(){
    //مؤقتتته
    firebase.database().ref('/allUsers/').on('value',snapval=>{
      if(snapval.val().available)
      {
        this.props.navigation.navigate('Chat')
      }
      else {
        alert('Sorry 🙄 , the doctor is inactive \n please try  next time 😀 ')
      }
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Book an appointment
        </Text>
        <TouchableOpacity onPress={this.GotoChatting()}>
          <Text>
            Chat
          </Text>
        </TouchableOpacity>
        <Text style={[styles.instructions,{marginLeft:40}]}>date: {this.state.date}</Text>
        <Picker style={{flex:1,color:'black',width:'50%',height:'30%'}}
      selectedValue={this.state.shift}
      
     // onValueChange={(shift)=>{this.setState({shift:shift})}}
      onValueChange={(shift)=>this.showSlots(this.state.toto,shift)}
      value={this.state.shift}
      >
      <Picker.Item label="Sunday" value="Sunday" />
      <Picker.Item label="Monday" value="Monday" />
      <Picker.Item label="Tuesday" value="Tuesday" />
      <Picker.Item label="Wednesday" value="Wednesday" />
      <Picker.Item label="Thursday" value="Thursday" />
      <Picker.Item label="Friday" value="Friday" />
      <Picker.Item label="Saturday" value="Saturday" />

       
      </Picker>
      <FlatList 

data={this.state.data}

width='100%'


extraData={this.state.data}

keyExtractor={(index) => index.toString()}
numColumns={3}
//ItemSeparatorComponent={this.FlatListItemSeparator}

renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
<Text style={styles.GridViewInsideTextItemStyle} 
//onPress={this.GetItem.bind(this, item.title)} 
onPress={this.funSave}
>{item.title} 
</Text>
</View>}
/>


        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="choose date"
          format="YYYY-MM-DD"
          minDate="2019-03-29"
          maxDate="2019-12-30"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={require('../google_calendar.png')}
          
          //onDateChange={(date) => {this.setState({date: date});}}
          onDateChange={(date)=>this.showSlots(this.state.toto,date)}
        />
     
       <Text>{this.props.navigation.state.params.JSON_ListView_Clicked_Item
            ? this.props.navigation.state.params.JSON_ListView_Clicked_Item
            : 'No Value Passed'} </Text>
            <Text style={styles.instructions}>{this.state.datas.map(item =>{
              return item.day
            })}
  </Text>
<View style={{marginTop:90,flexDirection:'row'}}>
<View style={{marginBottom:10}}>     
  
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton,{marginLeft:20}]}
onPress={()=>this.Save((new Date(this.state.date)).getDay(),this.state.date,this.state.StartTime,this.state.EndTime,this.state.toto)}
>
   <Text style={styles.loginText}>Save</Text>
</TouchableOpacity>

</View>      
<View style={{marginBottom:10}}>       
<TouchableOpacity style={[styles.buttonContainer, styles.loginButton,{marginLeft:10}]}
onPress={this.Cancel.bind(this)}
>
   <Text style={styles.loginText}>Cancel</Text>
</TouchableOpacity>


</View>      
</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
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
  GridViewBlockStyle: {
 
    justifyContent: 'center',
    flex:0.3,

    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: '#00BCD4'
   
  },
   
  GridViewInsideTextItemStyle: {
   
     color: '#fff',
     padding: 10,
     fontSize: 14,
     justifyContent: 'center',
     
   },
});


