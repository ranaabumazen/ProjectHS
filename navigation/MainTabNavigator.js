import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createNavigationContainer ,createAppContainer,createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/SignUp';
import SettingsScreen from '../screens/SettingsScreen';
import SignUp from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import Loading from '../screens/Loading';
import Slot from '../screens/Slot';
import Calc from '../screens/Calc' ;
import UserDetail from '../screens/UserDetail';
import MyHomeScreen from '../screens/MyHomeScreen';
import Feed from '../screens/Feed';
import DatabaseComponent from '../screens/DatabaseComponent';
import PersonalInfo  from '../screens/PersonalInfo' ;
import NavProfile from '../screens/NavProfile';
import PersonalInfoForm from '../screens/PersonalInfoForm' ;
import DoctorsUsers from '../screens/Doctors' ;
import InfoScreen from '../screens/UserProfileScreen' ;
import ChangeEmailAndPassScreen from '../screens/ChangeEmailAndPassScreen';
import Patients from '../screens/SearchUsers' ;
import  Notifications from '../screens/Notifications';
import Backend from '../screens/BackendScreen' ;
import Login from '../components/Login';

import CreateAccount from '../components/CreateAccount';
import Chat from '../screens/Chat';
import doctorAppointments from '../screens/doctorAppointments';
import addDoctor from '../screens/addDoctor';
import Patient from '../screens/Patient';
import Navo from '../screens/UserProfileScreen';
import SearchUsers from '../screens/SearchUsers';
import BuilddoctorTableScreen from '../screens/BuilddoctorTableScreen';
import adminScreen from '../screens/adminScreen';
import BuildTable from '../screens/BuildTable';
import assistantScreen from '../screens/assistantScreen';
import LoginToChat from '../screens/LoginToChat';
import PatientFirstRegInfo from '../screens/PatientFirstRegInfo';
import PatientEditProfile from '../screens/PatientEditProfile';
import ListsForChat from '../screens/ListsForChat';
import AdsScreen from '../screens/AdsScreen';

const HomeStack = createStackNavigator({
  Loading:Loading,
  HomeLoginScreen:{
  screen :HomeScreen
},
Calc:{
  screen :Calc
},
UserDetail:{
  screen :UserDetail
},
Slot:{
  screen :Slot
},
  SignUp:{
    screen:SignUp
  },
  ForgotPasswordScreen:{
    screen:ForgotPasswordScreen
  },
  UserProfileScreen:{
    screen:UserProfileScreen
  },
  MyHomeScreen:{
    screen:MyHomeScreen
  },
  Feed:{
    screen:Feed
  },
  DatabaseComponent:{
    screen:DatabaseComponent
  },
  PersonalInfo:{
    screen:PersonalInfo
  },
  NavProfile:{
    screen:NavProfile
  },
  PersonalInfoForm:{
    screen:PersonalInfoForm
  },
 /* Doctors:{
    screen:Doctors,
  },*/
  InfoScreen:{
    screen:InfoScreen,
  },
  ChangeEmailAndPassScreen:
  {
    screen:ChangeEmailAndPassScreen,
  },
  DoctorsUsers:{
    screen:DoctorsUsers,
  },
  Patients:{
    screen:Patients,
  },
  Login: { screen: Login },
  CreateAccount: { screen: CreateAccount },
  Chat: { screen: Chat },
 Backend:{
   screen:Backend,
 },
 Notifications:{
   screen: Notifications,
 },
 doctorAppointments:{
   screen:doctorAppointments,
 },
 addDoctor:{
   screen:addDoctor,
 },
Patient:{
  screen:Patient,
},
Navo:{
  screen:Navo,
},
SearchUsers:{
  screen:SearchUsers,
},
BuilddoctorTableScreen:{
  screen:BuilddoctorTableScreen,
},
adminScreen:{
  screen:adminScreen,
},
BuildTable:{
  screen:BuildTable,
},
assistantScreen:{
  screen:assistantScreen,
},
LoginToChat:{
  screen:LoginToChat,
},
PatientFirstRegInfo:{
  screen:PatientFirstRegInfo,
},
PatientEditProfile:{
  screen:PatientEditProfile,
},
ListsForChat:{
  screen:ListsForChat,
},
AdsScreen:{
  screen:AdsScreen,
},
    /*efaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
    },*/
  
}
);

HomeStack.navigationOptions = {
  tabBarLabel: 'SignUp',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const App = createAppContainer(HomeStack);
export default createAppContainer(createSwitchNavigator(
  {
    HomeLoginScreen: HomeScreen,
    Loading:Loading,
    SignUp:SignUp,
    ForgotPasswordScreen:ForgotPasswordScreen,
    UserProfileScreen:UserProfileScreen,
    Calc:Calc,
    Slot:Slot,
    UserDetail:UserDetail,
    MyHomeScreen:MyHomeScreen,
    Feed:Feed,
    DatabaseComponent:DatabaseComponent,
    PersonalInfo:PersonalInfo,  
    NavProfile:NavProfile,
    PersonalInfoForm:PersonalInfoForm,
    DoctorsUsers:DoctorsUsers,
    InfoScreen:InfoScreen,
    ChangeEmailAndPassScreen:ChangeEmailAndPassScreen,
    Login:Login,
    CreateAccount:CreateAccount,
    Chat:Chat,
   Backend:Backend,
   Notifications: Notifications,
   doctorAppointments:doctorAppointments,
   addDoctor:addDoctor,
   Patient:Patient,
   Navo:Navo,
   SearchUsers:SearchUsers,
   BuilddoctorTableScreen:BuilddoctorTableScreen,
   adminScreen:adminScreen,
   BuildTable:BuildTable,
   assistantScreen:assistantScreen,
   LoginToChat:LoginToChat,
   PatientFirstRegInfo:PatientFirstRegInfo,
   PatientEditProfile:PatientEditProfile,
   ListsForChat:ListsForChat,
   AdsScreen:AdsScreen,
   
  },
  {
    initialRouteName: 'Loading',
  }
));
