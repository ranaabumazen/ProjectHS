
import React, { Component } from 'react';

import { StyleSheet,AsyncStorage, FlatList, Text, View, Alert, TouchableOpacity, TextInput,Picker } from 'react-native';
import DatePicker from '../datepicker';
import moment from "moment";
import TimePicker from 'react-native-navybits-date-time-picker';
import { Card ,CardSection } from "react-native-elements";
import * as firebase from 'firebase';


export default class BuilddoctorTableScreen  extends Component {

  constructor (props) {
  
    super(props);
    this.state = {
      date: '',
      time: '',
      datetime: '2019-03-29 20:00',
      datetime1: '2016-05-05 20:00',
      Endtime:'',
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD"),
      data:'',
      shift:' ',
      newDoctorName: this.props.navigation.state.params.JSON_Item,
      
    }
    this.shift='Sunday',
   
    this.array = [],
    
    this.data = [],
       
      this.state={

        arrayHolder:[],

        textInput_Holder:'',
       
      }
      

  }
  componentWillMount(){
    this.setState({newDoctorName:this.props.navigation.state.params.JSON_Item})
    this.setState({shift:'Sunday'})
    this.setState({ data:this.state.data })
    
  }
  componentDidMount() {
    AsyncStorage.getItem("appoint").then((value) => {
      this.setState({"appoint": value});
  }).done();
    //this.setState({data: [...this.data] })
    this.setState({ data:this.state.data })
    
   // this.setState( { shift:this.state.shift})

  }


   joinData = async (newDoctorName) => {
     await AsyncStorage.setItem("appoint",this.state.shift +" "+this.state.time+"-"+this.state.Endtime);
    
    const today = this.state.date;
    const days = moment(today).format("dddd");
    this.shift =  this.state.shift
    if(this.state.time === null)
    {
      alert("Please enter time")
      return;
    }
    if(this.state.time > this.state.Endtime){
      alert("Pleae enter valid time period")
      return;
    }
    firebase.database().ref('/slots/'+newDoctorName).once('value',snapshot=>{
     
      if((this.state.shift === snapshot.child('day').val()) && (this.state.time === snapshot.child('starttime').val()) && (this.state.Endtime === snapshot.child('endtime').val())){
       return null
      }
     else{
       //console.log(this.state.time)
      this.array.push({title :this.state.shift +" "+this.state.time+"-"+this.state.Endtime});
    
      firebase.database().ref('/slots/'+newDoctorName).update({
        day:this.shift,
        endtime:this.state.Endtime,
        starttime:this.state.time,
        members:this.array
      })
  
      this.setState({ data: [...this.array] })
      this.setState({textInput_Holder:''});
      
     }
      });  
    
  

  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetItem(item) {

    Alert.alert(item);

  }


  render() {
   
//const dates = moment(today).format("MMMM D, YYYY");
    return (

      <View style={[styles.MainContainer,{marginTop:20}]}>

      <Picker style={{flex:1,color:'black',width:'50%',height:'30%'}}
      selectedValue={this.state.shift}
      
      onValueChange={(shift)=>{this.setState({shift:shift})}}
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

       
        <View style={{flexDirection:'row'}}>
        <DatePicker
          style={{width: 150}}
          
          mode="time"
          is24Hour={false}
          
          placeholder="choose time"
          format="hh:mm a"
          date={this.state.Endtime}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={30}
          onDateChange={(Endtime) => {this.setState({Endtime:Endtime});}}
        />
        
        
        <DatePicker
          style={{width: 150,marginLeft:10}}
          
          mode="time"
          is24Hour={false}
          
          placeholder="choose time"
          format="hh:mm a"
          date={this.state.time}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={30}
          onDateChange={(time) => {this.setState({time:time});}}
        />
        </View>
        <TouchableOpacity onPress={()=>this.joinData(this.state.newDoctorName)} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.buttonText}> 
          Add slot 
          </Text>

        </TouchableOpacity>


        <FlatList 

          data={this.state.data}

          width='100%'
          

          extraData={this.state.data}

          keyExtractor={(index) => index.toString()}
          numColumns={3}
          //ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
          <Text style={styles.GridViewInsideTextItemStyle} 
          onPress={this.GetItem.bind(this, item.title)} 
          >{item.title} 
          </Text>
          </View>}
          />


          </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2

  },

  item: {
    padding: 10,
    fontSize: 14,
    height: 44,
  },

  textInputStyle: {

    textAlign: 'center',
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 12
  },

  button: {

    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
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