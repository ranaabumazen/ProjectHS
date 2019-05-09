import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import { TextInput as TextInputPaper } from 'react-native-paper';



export default class assistantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      Editable: true,
      Day: '',
      Date: '',
      Doctor: '',
      From: '',
      To: '',
      ID: '',

    };
    this.data = [],
      this.dattt = []
  }

  componentWillMount() {
    this.setState({ data: this.state.data })

  }

  componentDidMount() {
    firebase.database().ref('/appointments/').once('value', snap => {

      snap.forEach(datas => {
        this.dattt.push({
          Day: "Day: " + datas.child('day').val(), Date: 'Date: ' + datas.child('date').val(), Doctor: 'Doctor:' + datas.child('doctor').val(), From: 'From: ' + datas.child('StartTime').val()
          , To: "To: " + datas.child('EndTime').val()
        })
      })


      this.setState({ data: [...this.dattt] })

    });
  }
  Edit() {
    this.setState({ Editable: false })
  }
  Save(day, date, StartAndEnd, toto) {
    var ToAndFromTimes = StartAndEnd.split("-", 2)
    var Savedweekday = new Array(7);
    Savedweekday[0] = "Sunday";
    Savedweekday[1] = "Monday";
    Savedweekday[2] = "Tuesday";
    Savedweekday[3] = "Wednesday";
    Savedweekday[4] = "Thursday";
    Savedweekday[5] = "Friday";
    Savedweekday[6] = "Saturday";
    var user = firebase.auth().currentUser
    let q = firebase.database().ref('/appointments/');
    var finished = [];
    q.once('value', snapshot => {
      snapshot.forEach(function (data) {
        let result = data.val();
        result["key"] = data.key;
        finished.push(result);
        // this.state.email=finished.email;
        console.log(finished);
        var tott = toto.split(".", 2)
        firebase.database().ref('/appointments/' + toto.toUpperCase())
          .update({
            day: Savedweekday[day],
            date: date,

            StartTime: ToAndFromTimes[0],
            EndTime: ToAndFromTimes[1],
            doctor: (toto.toUpperCase()),
            available: true,

          });

        firebase.database().ref('/doctorslots/' + toto.toUpperCase()).update({
          day: Savedweekday[day],
          patientid: "mm",//user.uid,
          date: date,

          StartTime: ToAndFromTimes[0],
          EndTime: ToAndFromTimes[1],

        });

      }
      );
    }
    );
  }

  deleteItemById = ID => {
    /*const filteredData = this.state.data.filter(item => (item.id) !== ID);
     this.setState({ data: filteredData });**/
  }
  Remove = ID => {

    Alert.alert(
      '',
      'Delete Appointment Request',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: 'Delete Appointment Request', onPress: this.deleteItemById(ID)
        },


      ],

      { cancelable: false },
    );

  }
  render() {
    return (
      <View style={styles.container}>

        <FlatList

          data={this.state.data}
          style={{ backgroundColor: 'white' }}
          width='100%'

          numColumns={2}
          extraData={this.state.data}

          //keyExtractor={(index) => index.toString()}
          keyExtractor={({ item }) => item.id}

          //ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({ item }) =>
            <View style={{ flex: 0.5, marginLeft: 10, marginRight: 10, marginBottom: 10, backgroundColor: '#00BCD4' }}>

              <TextInputPaper
                placeholder={item.Day}
                disabled={this.state.Editable}
                onChangeText={(Day) => this.setState({ Day })}
              />


              <TextInputPaper
                placeholder={item.Doctor}
                disabled={this.state.Editable}
                onChangeText={(Doctor) => this.setState({ Doctor })}
              />

              <TextInputPaper
                placeholder={item.Date}
                disabled={this.state.Editable}
                onChangeText={(Date) => this.setState({ Date })}
              />
              <TextInputPaper
                placeholder={item.From}
                disabled={this.state.Editable}
                onChangeText={(From) => this.setState({ From })}
              />
              <TextInputPaper
                placeholder={item.To}
                disabled={this.state.Editable}
                onChangeText={(To) => this.setState({ To })}

              />




              <View style={{ flexDirection: 'row', flex: 0.3, alignContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: "powderblue", marginTop: 20, width: '33%', marginBottom: 4, marginLeft: 10 }}
                  onPress={() => this.Save((new Date(this.state.Date)).getDay(), this.state.Date, this.state.From, this.state.To, this.state.Doctor)}
                >
                  <Text> Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "powderblue", marginTop: 20, width: '33%', marginRight: 5, marginLeft: 5, marginBottom: 4 }}
                  onPress={() => this.Edit()}>
                  <Text> Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "powderblue", marginTop: 20, width: '33%', marginRight: 5, marginLeft: 5, marginBottom: 4 }}
                  onPress={() => this.Remove(this.state.ID)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
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
  GridViewBlockStyle: {

    justifyContent: 'center',
    flex: 0.5,

    alignItems: 'center',
    height: 150,
    margin: 3,
    backgroundColor: '#00BCD4'

  },

  GridViewInsideTextItemStyle: {

    color: '#fff',
    padding: 10,
    fontSize: 14,
    justifyContent: 'center',

  },
});