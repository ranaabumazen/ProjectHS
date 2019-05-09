import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  ListView
} from 'react-native';

export default class ListWithSearchView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {icon:"https://png.icons8.com/user-folder/color/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"},
        {icon:"https://png.icons8.com/find-user-male/color/100/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
        {icon:"https://png.icons8.com/desktop/office/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
        {icon:"https://png.icons8.com/firefox/color/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
        {icon:"https://png.icons8.com/pc-on-desk/color/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
        {icon:"https://png.icons8.com/mandriva/color/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
        {icon:"https://png.icons8.com/microsoft-access/color/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"}, 
        {icon:"https://png.icons8.com/user-folder/office/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"},
        {icon:"https://png.icons8.com/facebook-messenger/color/40/2ecc71", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit"},
      ]),
    };
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/2ecc71'}}/>
            <TextInput style={styles.inputs}
                ref={'txtPassword'}
                placeholder="Search"
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({name_address})}/>
          </View>

          <TouchableHighlight style={styles.saveButton} onPress={() => this.clickEventListener('search')}>
            <Image style={[styles.icon, styles.iconBtnSearch]} source={{uri: 'https://png.icons8.com/search/androidL/100/ffffff'}}/>
          </TouchableHighlight>
        </View>

        <ListView style={styles.notificationList} enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(notification) => {
            return (
              <View style={styles.notificationBox}>
                <Image style={styles.image}
                  source={{uri: notification.icon}}/>
                
                <Text style={styles.description}>{notification.description}</Text>
              </View>
            )}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  saveButton: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:70,
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
    borderRadius:30,
  },
  saveButtonText: {
    color: 'white',
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius:10,
  },
  image:{
    width:45,
    height:45,
  },
  description:{
    fontSize:18,
    color: "#3498db",
    marginLeft:10,
  },
}); 