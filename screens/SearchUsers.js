import React, {Component} from 'react'
import {
    Text,
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    Dimensions,
    Image,
    Animated,
    TextInput,
    Modal,
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import   data  from './api/users'
import Navbar from './api/Navbar'

const {width, height} = Dimensions.get('window')

export default class SearchUsers extends Component {
    constructor(props){
        super(props)
       
      
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
          modalVisible:false,
          userSelected:[],
            isLoaded: false,
            isOpenMenu: false,
            dataSource: ds.cloneWithRows(data),
           
            text: ''
        }
    }

   
    clickEventListener = (item) => {
        this.setModalVisible(true);
      this.setState({userSelected: item}, () =>{
        
      });
    }
    
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  gotobooking(){
    navigate('Calc', {
        JSON_ListView_Clicked_Item: this.state.isLoaded,
      });
    
      //this.props.navigation.navigate('Calc',{JSON_ListView_Clicked_Item: this.state.userSelected})
  }
Return(){
    this.props.navigation.navigate('Patient')
}
    renderRow(rowData){
        const { navigate } = this.props.navigation;
        //const img = rowData.image
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.Return.bind(this)}>
              <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/windows/32/ffffff/reply-arrow.png' }} />
            </TouchableOpacity>
            <TouchableHighlight style={styles.card} onPress={() => { this.clickEventListener(rowData) }}>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{rowData.title}</Text>
                <Text style={styles.body}>{rowData.body}</Text>
                <Text style={[styles.text, styles.textBy]}>By {rowData.id}</Text>
              </View>
            </TouchableHighlight>
            <Modal
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => this.setModalVisible(false)}
              visible={this.state.modalVisible}>

              <View style={styles.popupOverlay}>
                <View style={styles.popup}>
                  <View style={styles.popupContent}>

                    <ScrollView contentContainerStyle={styles.modalInfo}>
                      <Image style={styles.image}
                        source={{ uri: 'https://previews.123rf.com/images/megaflopp/megaflopp1512/megaflopp151200051/49794208-belle-m%C3%A9decin-de-la-m%C3%A9decine-de-femme-m%C3%A9decin-ou-votre-pharmacien-assis-%C3%A0-la-table-de-travail-tenant-pot-de-.jpg' }} />

                      <Text style={styles.name}>{this.state.userSelected.title}</Text>

                      <Text style={styles.about}>{this.state.userSelected.body}</Text>
                    </ScrollView>
                  </View>
                  <View style={styles.popupButtons}>
                    <TouchableOpacity onPress={() => this.setModalVisible(false)} style={styles.btnClose}>
                      <Text style={styles.txtClose}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Calc', {
                      JSON_ListView_Clicked_Item: this.state.userSelected.title,
                    })} style={[styles.btnClose, { marginLeft: 10 }]}>
                      <Text style={styles.txtClose}>Book an appointment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )
    }
    filterSearch(text){
        const newData = data.filter(function(item){
            const itemData = item.title.toUpperCase()+item.body.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }
    render(){
        
        return (
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.filterSearch(text)}
              value={this.state.text}
              placeholder="enter your search "
            />
            <ListView
              enableEmptySections={true}
              style={styles.listContainer}
              renderRow={this.renderRow.bind(this)}
              dataSource={this.state.dataSource}
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee"
  },
  header: {
    backgroundColor: "#00CED1",
    height: 200
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderColor: '#cecece',
    marginBottom: 10,
    marginHorizontal: 10
  },
  content: {
    zIndex: 1
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#555566'
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row'
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5
  },
  listContainer: {
    marginHorizontal: 10
  },
  text: {
    color: '#fff'
  },
  containerCell: {
    marginBottom: 10
  },
  textTitle: {
    fontSize: 13
  },
  textBy: {
    fontSize: 12
  },
  textMenu: {
    fontSize: 20,
    color: '#fff'
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#008080",
    fontWeight: 'bold'
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#696969"
  },
  about: {
    marginHorizontal: 10
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: 'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    height: 20,
    backgroundColor: '#20b2aa',
    padding: 30,
    marginBottom: 10,
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 6
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 5,
    color: '#000000',
  },
})