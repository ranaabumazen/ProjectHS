import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import { ImagePicker,Permissions } from 'expo';
import { createDrawerNavigator , createAppContainer, DrawerActions} from 'react-navigation';  
import { Icon } from 'native-base';
import SettingsList from 'react-native-settings-list' ;
import HomeLoginScreen from '../screens/HomeScreen';
import LoginToChat from '../screens/LoginToChat';
import PatientEditProfile from '../screens/PatientEditProfile';
export  class Patient extends Component {
  state = { image: "https://bootdey.com/img/Content/avatar/avatar7.png" }
  logout() {
    this.props.navigation.navigate('HomeLoginScreen')
  }
  booking() {
    this.props.navigation.navigate('SearchUsers')
  }
  getpdf() {
    this.props.navigation.navigate('doctorAppointments')
  }
  PatientEditProfile() {
    this.props.navigation.navigate('PatientEditProfile')
  }
  funim = () => {
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
  componentDidMount() {
    Alert.alert(
      '',
      '',
      [
        {
          text: 'Welcome to your profile 😃 '+'\n\n'
        },

      ],
    );
    AsyncStorage.getItem('image').then((token) => {
      this.setState({
        image: token
      });
    });

  }
  render() {
    let { image } = this.state;
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
          <TouchableOpacity onPress ={this.funim} >
            <Image source={{ uri: image }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
            {user && user.email}
            </Text>
            <TouchableOpacity style={[styles.buttonContainer,{marginTop:60}]} onPress={this.booking.bind(this)}>
              <Text style={{color:'white'}}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer,{marginTop:3}]} onPress={this.getpdf.bind(this)}>
              <Text style={{color:'white'}}>Get Record</Text>
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
    firebase.database().ref('/doctors/' + firebase.auth().currentUser.uid).on("value", snapp => {
      // get children as an array


      this.itemss.push({
        // name: child.val().email,
        image: snapp.val().image,
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

        <View style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
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
const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Patient,
    navigationOptions:{
      drawerLabel:'Home',
      drawerIcon:
      <Icon name="home" />
    },
    },
    
  Settings: {
    screen: PatientEditProfile,
    navigationOptions: {
      drawerLabel: 'EditSettings',
      color:'#196c87',
      drawerIcon:
      <Icon name="settings" />
    },
  },
  Chatting: {
    screen: LoginToChat,
    navigationOptions: {
      drawerLabel: 'Chatting',
      color:'#196c87',
      drawerIcon:
      <Icon name="chatboxes" />
    },
  
  },
  ///LLogout:() =>this.GoToInfo.bind(this)
  Logout: {
    screen: HomeLoginScreen,
    navigationOptions: {
      drawerLabel: 'LogOut',
      color:'#196c87',
      drawerIcon:
      <Icon name="log-out" />
      
    },
    
  }
},
  {
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


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#00BFFF",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 100
  },
  name: {
    fontSize: 22,
    color: "#014960",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
 
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
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
 