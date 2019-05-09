import React ,{Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  FlatList,
  ListView,
  Button,
  AsyncStorage,
  Switch,
} from 'react-native';

import * as firebase from 'firebase';
import { Icon } from 'native-base';
//import styles from './styles';
import Spinner from "react-native-loading-spinner-overlay";

var name, uid, email;


export default class  ListsForChat extends Component{
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: true,
            disable:true,
          };
          this.friendsRef = this.getRef().child("/users/");
          this.doctorRef = this.getRef().child("/doctors/");
        }
      
        getRef() {
          return firebase.database().ref();
        }
    ListUsers(type) {
        if (type === 1) {
            this.listenForPatientsItems(this.friendsRef);
        }
        else if (type === 0) {
           this.listenForDoctorsItems();
        }
    }
    listenForDoctorsItems(){
        
        var user = firebase.auth().currentUser;
    firebase.database().ref('/allUsers/').on('value',(data)=>{
        const { currentuuser } = firebase.auth().currentUser.uid;
          var itemsss=[];
          data.forEach(doctor=>{
            if(doctor.val().email != user.email)
            itemsss.push({
              name:doctor.val().email,
             // uid:doctor.val().uid,
            });
         // console.log(doctor.val());
    
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(itemsss),
            loading: false
          });
          this.setState({disable:true})
         
        });
    }
    listenForPatientsItems(friendsRef) {
        var user = firebase.auth().currentUser;
    
        friendsRef.on("value", snap => {
          // get children as an array
          var items = [];
          snap.forEach(child => {
            if (child.val().email != user.email)
              items.push({
               name:child.val().name,
                uid: child.val().uid,
                email: child.val().email
              });
          });
    
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            loading: false
          });
          this.setState({disable:false})
        });
      
      }
    componentDidMount() {
        this.listenForDoctorsItems();

        AsyncStorage.getItem('image').then((token) => {
            this.setState({
                image: token
            });
        });

    }
    Return() {
        this.props.navigation.navigate('Home')
    }


    renderRow = rowData => {
        return (
          <TouchableOpacity
    
            onPress={() => {
              name = rowData.name;
              email = rowData.email;
              uid = rowData.uid;
              this.props.navigation.navigate("Chat", {
                  name:this.state.name,    
                email: email,
                uid: uid
              });
            }}
          >
            <View style={styles.profileContainer}>
            <Icon 
            name='person'
            color='blue'/>

             
              <Text style={styles.profileName}>{rowData.name}</Text>
            </View>
          </TouchableOpacity>
        );
      };
      /*render() {
        return (
          <View style={styles.container}>
            <View style={styles.topGroup}>
            
              <Text style={styles.myFriends}>My Friends</Text>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
            <Spinner visible={this.state.loading} />
          </View>
        );
      }
    */
   toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({disable: value})
    firebase.database().ref('/allUsers/'+firebase.auth().currentUser.uid).update({
        available:value
    });
    //state changes according to switch
    //which will result in re-render the text
 }
render(){
    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={this.Return.bind(this)}>
        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/windows/32/000000/reply-arrow.png'}}/>
        
        </TouchableOpacity>
            <Image
                style={[{ marginTop: 25, width: 32, height: 32 }, styles.avatar]}

                source={require('../images/chatpng.jpg')} />
            <View style={styles.extraWidgetsContainer}>
                <TouchableOpacity

                    onPress={() => this.ListUsers(0)}
                    style={[
                        styles.buttonContainer,
                        styles.loginButton
                      ]}
                    >
                    <Text
                        style={styles.buttonText}>
                        Doctors
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.ListUsers(1)}
                    style={[
                        styles.buttonContainer,
                        styles.loginButton,
                        {marginRight:'1%'}
                      ]}
                >
                    <Text
                         style={styles.buttonText}>
                        My Patients
                    </Text>
                </TouchableOpacity>
            </View>
            <Switch
            style={{marginTop:70,marginBottom:20}}
        onValueChange={this.toggleSwitch}
        value = {this.state.disable}
        /*thumbTintColor="#ffffff"
        tintColor="#ffffff"*/
        />
            <ListView style={{marginTop:20}}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
         

        </View>

          
                
    );
}
}
const styles = StyleSheet.create({
    error: {
        borderBottomColor: 'red',
        borderBottomWidth: 3
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        //height:100,


        // marginTop: '30%',
        //backgroundColor: '#DCDCDC',
        //  position: 'relative',
        //  top: '30%',
        //  width: '80%',
        //  height: '40%',

    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#ffffff",
        //marginBottom: 10,
        //alignSelf: 'center',

        marginTop: 10
    },
    extraWidgetsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
        height: 10,
    },
    helpLink: {

        paddingVertical: 10,

    },
    helpLinkText: {
        fontSize: 14,
        color: '#660029',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        width: '50%',
        marginRight: '1%',
        //borderRadius:30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        width: '50%',
        textAlign: 'center',
        marginTop: 20,
        height: 45,
        backgroundColor: "#00b5ec",
        shadowColor: "#808080",

    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'

    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 6,
        marginBottom: 8
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 6
    },
    profileName: {
        marginLeft: 6,
        fontSize: 16
    },
    icon:{
        width:30,
        height:30,
        marginTop:15,
        //color:'#2b8475',
      },

    // flex: 0.5,

});