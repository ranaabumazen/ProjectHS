import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Button,
  FlatList,
  Alert,
  AsyncStorage,
} from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import * as firebase from 'firebase';
import { createDrawerNavigator , createAppContainer, DrawerActions} from 'react-navigation';  

import SettingsList from 'react-native-settings-list' ;

import Calc from '../screens/Calc' ;
import DoctorsUsers from '../screens/Doctors';

import { Icon } from 'native-base';

import Notifications from '../screens/Notifications';
import doctorAppointments from '../screens/doctorAppointments';
import { ImagePicker, Permissions } from 'expo';

import { counter } from './SignUp';
import LoginToChat from '../screens/LoginToChat';
import HomeLoginScreen from '../screens/HomeScreen';
import ListsForChat from '../screens/ListsForChat';


const DrawerIcon = ({ iconName, iconSize, iconColor, polygonWidth, polygonHeight }) => (
  <Image source={{uri:'https://img.icons8.com/windows/32/000000/stethoscope.png'}} style={styles.iconWrapper}>
    <Icon name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
  </Image>
);

  
const configgU = {
  apiKey: 'AIzaSyAqVNbGz0SOca6qZ4HppFoMRTyj-QQdqSA',
  authDomain: 'newpr-8a746.firebaseapp.com',
  databaseURL: 'https://newpr-8a746.firebaseio.com',
  projectId: 'newpr-8a746',
  storageBucket: 'newpr-8a746.appspot.com',
  messagingSenderId: '291968886604'
};
export  class Navo extends Component {
  state={ DoctorCount : counter,uriimage:'',image:"https://bootdey.com/img/Content/avatar/avatar7.png"}
  
    static navigationOptions = {
      drawer: () => ({
        label: 'Home',
        icon: () => <DrawerIcon iconName="home" iconSize={25} iconColor="#000" />
      })
    };
   
    state = { currentUser: null }
    componentDidMount() {
     
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
  }
  showAppointment(){
    this.props.navigation.navigate('Calc')
  }
    LogOut(){
      firebase.auth().signOut().then(function () {
        alert('SignOut is succedded')
      }, function (error) {
        // An error happened.
      });

     
     }
     funim=()=>{
       Alert.alert(
         '',
         'Change picture',
         [
           {
             text: 'Cancel',
             onPress: () => console.log('Cancel Pressed'),
             style: 'cancel',
           },

           { text: 'choose from gallary', onPress: this.btnGalleryClicked },
           { text: 'take from camera', onPress: this.btnCameraClicked },

         ],

         { cancelable: false },
       );
     }
  componentDidMount() {
    Alert.alert(
      '',
      '',
      [
        {
          text: 'Welcome to your profile 😃 ' + '\n\n'
        },
      ],
    );
   
    AsyncStorage.getItem('image').then((token) => {
      this.setState({
        image: token
      });
    });

  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  btnGalleryClicked = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      AsyncStorage.setItem('image', result.uri)
      firebase.database().ref('/doctors/' + firebase.auth().currentUser.uid).update({
        image: result.uri
      })


    }
  };

  btnCameraClicked = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync(
      {
        allowsEditing: true,
        aspect: [4, 3],
      }
    );
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      AsyncStorage.setItem('image', result.uri)
    }
  };
  render() {
    let { image } = this.state;
    const { currentUser } = this.state
    var user = firebase.auth().currentUser
     
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              style={{ width: 32, height: 32 }}
              source={{ uri: 'https://png.icons8.com/ios/2x/menu-filled.png' }}
            />
          </TouchableOpacity>
       
        
          <TouchableOpacity onPress={this.funim}>
              <Image source={{ uri: image }} style={styles.avatar} />
            </TouchableOpacity>
            </View>
            <View style={styles.body}>
            <View style={styles.bodyContentp}>           
             <Text style={styles.name}>
              {user && user.email}!
            </Text>
            <TouchableOpacity style={[styles.buttonContainer,{marginTop:70}]} >
              <Text style={{color:'white'}}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer,{marginTop:3}]}>
              <Text style={{color:'white'}}>Create PDF Record</Text>
            </TouchableOpacity>
            </View>
            </View>
        
      </View>
      );
    }
  }
  
  

export class UserProfileScreen extends Component{
  
  constructor(props){
    super(props);
    this.itemss=[];
  }
  render(){
    firebase.database().ref('/allUsers/'+firebase.auth().currentUser.uid).on("value", snapp => {
      // get children as an array
    
      
          this.itemss.push({
           // name: child.val().email,
           role:snapp.val().role
           // email: child.val().email
           
          });
         // this.setState({uriimage:snapp.val().avatarSource});    
        //  console.log(snapp.val().key);
    
      
     
    });
   
      if(!(this.itemss.role)){
        return ( <Navo />)
      }
  else {
    return ( <Patient /> )
  }
  }
}
  
class Patient extends Component {
  state={image:"https://bootdey.com/img/Content/avatar/avatar7.png"}
  logout(){
      this.props.navigation.navigate('HomeLoginScreen')
  }
  booking(){
      this.props.navigation.navigate('SearchUsers')
  }
getpdf(){
      this.props.navigation.navigate('doctorAppointments')
  }
  PatientEditProfile(){
    this.props.navigation.navigate('PatientEditProfile')
  }
  funim=()=>{
    Alert.alert(
      '',
      'Change picture',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        { text: 'choose from gallary', onPress: this.btnGalleryClicked },
        { text: 'take from camera', onPress: this.btnCameraClicked },

      ],

      { cancelable: false },
    );
  }
  componentDidMount(){

    AsyncStorage.getItem('image').then((token) => {
      this.setState({
        image: token
      });
    });
    
  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  btnGalleryClicked = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
   AsyncStorage.setItem('image',result.uri)
   
   
    }
  };

  btnCameraClicked = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync(
      {
        allowsEditing: true,
        aspect: [4, 3],}
      );
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      AsyncStorage.setItem('image',result.uri)
    }
  };
  
render() {

    let { image } = this.state;
 // const { currentUser } = this.state
  var user = firebase.auth().currentUser
  return (
    <View style={styles.containerp}>
      <View style={styles.headerp}>
        <TouchableOpacity onPress={this.funim}>
          <Image source={{ uri: image }} style={styles.avatar} />
        </TouchableOpacity>

      </View>

      <View style={styles.bodyp}>

        <View style={styles.bodyContentp}>

          <Text style={styles.namep}>{user && user.email}</Text>
          <Text style={styles.infop}>Welcome to your profile</Text>

          <TouchableOpacity style={[styles.buttonContainerp,{marginTop:60}]} onPress={this.booking.bind(this)}>
            <Text>Book Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainerp} onPress={this.getpdf.bind(this)}>
            <Text>Get Record</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    </View>
  );
}
}

export  class InfoScreen extends Component {
  state= {currentUserr: firebase.auth().currentUser}
  
  constructor(){
    super();
    this.itemss=[]
  }
  Return(){
    firebase.database().ref('/doctors/'+firebase.auth().currentUser.uid).on("value", snapp => {
      // get children as an array
     
      
          this.itemss.push({
           // name: child.val().email,
           image:snapp.val().image,
           // email: child.val().email
           
          });
         // this.setState({uriimage:snapp.val().avatarSource});    
        //  console.log(snapp.val().key);
        this.props.navigation.navigate('ChangeEmailAndPassScreen')
      
    });
   // return <View > { FormView } </View> 
    
    
  
  }
  GoToInfo(){
    this.props.navigation.navigate('PersonalInfoForm')
  }
  render() {
   

    return (
      <View style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
        <View style={{ borderBottomWidth: 1, backgroundColor: '#263238', borderColor: '#c8c7cc' }}>
          <TouchableOpacity style={{ marginRight: 30 }}
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              style={{ width: 32, height: 29, marginTop: 10 }}
              source={{ uri: 'https://png.icons8.com/ios/2x/menu-filled.png' }}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white', marginTop: 15, marginBottom: 15, marginLeft: 30, fontWeight: 'bold', fontSize: 20 }}>Settings</Text>
        </View>

        <View style={{backgroundColor:'#f6f6f6',flex:1}}>
          <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
           
            <SettingsList.Item onPress={() => this.GoToInfo()}
              icon={
                <View style={styles.imageStyle}>
                  <Image style={{ alignSelf: 'center', height: 22, width: 22 }} source={{ uri: 'https://img.icons8.com/windows/32/000000/user-credentials.png' }} />
                </View>
              }
              hasNavArrow={false}
              itemWidth={70}
              titleStyle={{ color: 'black', fontSize: 16, marginRight: 10 }}
              title='Personal Information'
            />
           
            
           
            <SettingsList.Item onPress={() => this.Return()}
              icon={
                <View style={styles.imageStyle}>
                  <Image style={{ alignSelf: 'center', height: 22, width: 22 }} source={{ uri: 'https://img.icons8.com/windows/32/000000/edit-user-female.png' }} />
                </View>
              }
              title='Edit Profile'
              itemWidth={70}
              titleStyle={{ color: 'black', fontSize: 16, marginRight: 10 }}
              hasNavArrow={false}
            />
          
         
           
          </SettingsList>
          
        </View>
      </View>
    );
  }
}
export class Appointments extends Component{
  render(){
    return( <Calc /> );
  }
}
export class Doctors extends Component{
  render(){
    return( <DoctorsUsers /> );
  }
}
var name, uid, email;
  
export class Chatting extends Component{
  //state ={pass:this.props.navigation.state.params.pass};

    state = {
      name: "",
      uid: null,
      email: ""
    };
    constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        loading: true
      };
      this.friendsRef = this.getRef().child("users");
    }
  
    getRef() {
      return firebase.database().ref();
    }
  
    listenForItems(friendsRef) {
      var user = firebase.auth().currentUser;
  
      friendsRef.on("value", snap => {
        // get children as an array
        var items = [];
        snap.forEach(child => {
          if (child.val().email != user.email)
            items.push({
              name: child.val().email,
              uid: child.val().uid,
              email: child.val().email
            });
        });
  
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          loading: false
        });
      });
    }
  
    componentDidMount() {
      this.listenForItems(this.friendsRef);
    }
  
    static navigationOptions = {
      headerStyle: {
        backgroundColor: "#16a085",
        elevation: null
      },
      headerRight: (
        <Button
          primary
          title="Logout"
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(
                () => {
                  this.props.navigation.navigate("Login");
                },
                function(error) {
                  // An error happened.
                }
              );
          }}
        >
          Log out
        </Button>
      )
    };
  
    renderRow = rowData => {
      return (
        <TouchableOpacity
          onPress={() => {
            name = rowData.name;
            email = rowData.email;
            uid = rowData.uid;
            this.props.navigation.navigate("Chat", {
              name: name,
              email: email,
              uid: uid
            });
          }}
        >
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: "https://www.gravatar.com/avatar/"
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{rowData.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    render() {
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

  }
  
  /*render() {
      return (
      /*<View style={{
          flex: 1,
          flexDirection: 'column',
      }}> 
      <HeaderNavigationBar {...this.props} />
          <View style={{
              flex: 1,
              backgroundColor: '#4734ac',
              alignItems: 'center',
              justifyContent: 'center'
          }}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                  This is Info Screen
              </Text>
              
          </View>
      </View>
      );
  }*/

export class Notification extends Component{
  render(){
    return( <Notifications /> );
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: UserProfileScreen,
    navigationOptions:{
      drawerLabel:'Home',
      drawerIcon:
      <Icon name="home" />
    },
  },

    

  Settings: {
    screen: InfoScreen,
    navigationOptions: {
      drawerLabel: 'Settings',
      color:'#196c87',
      drawerIcon:
      <Icon name="settings" />
    },
  },

  /*Doctors: {
    screen: DoctorsUsers,
    navigationOptions: {
      drawerLabel: 'Doctors',
    },
  },*/
 
  Chatting: {
    //screen: LoginToChat,
    screen:ListsForChat,
    navigationOptions: {
      drawerLabel: 'Chatting',
      color:'#196c87',
      drawerIcon:
      <Icon name="chatboxes" />
    },
  
  },
  Notification: {
    screen: Notifications,
    navigationOptions: {
      drawerLabel: 'Notifications',
      color:'#196c87',
      drawerIcon:
      <Icon name="notifications" />
    },
  },
  Logout: {
    screen: HomeLoginScreen,
    navigationOptions: {
      drawerLabel: 'LogOut',
      color:'#196c87',
      drawerIcon:
      <Icon name="log-out" />
    },
  }
}, {
    initialRouteName: 'Home',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerPosition: 'right',
     
    contentOptions: {
      labelStyle: {
        fontFamily: 'SomeFont',
        color: '#196c87',
        
      },
  }
}
);
export default createAppContainer(MyDrawerNavigator);

const offset = 16;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height:200
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#00BFFF",
    marginBottom: 10,
    alignSelf: 'center',
    
    marginTop: 100
  },
  name: {
    fontSize: 22,
    color: "#014960",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  containerFlat: {
    flex: 1,
    paddingTop: 22
  },
  itemFlat: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  imageStyle: {
    marginLeft: 15,
    marginRight: 20,
    alignSelf: 'center',
    width: 20,
    height: 24,
    justifyContent: 'center'
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    marginRight: 10,
    marginLeft: 10
  },
  rightButton: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    padding: 0
  },
  topGroup: {
    flexDirection: "row",
    margin: 10
  },
  myFriends: {
    flex: 1,
    color: "#3A5BB1",
    //tintColor: "#fff",
    //secondaryColor: '#E9E9E9',
    //grayColor: '#A5A5A5',
    fontSize: 16,
    padding: 5
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
  headerp: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatarp: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  namep: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  bodyp: {
    marginTop: 40,
  },
  bodyContentp: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  namep: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  infop: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  descriptionp: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    // marginTop: 10,
     height: 45,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 20,
     width: 250,
     borderRadius: 30,
     backgroundColor: "#00BFFF",
     color:'white',
     fontWeight: '600',
   },
});
