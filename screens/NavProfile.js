import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image,TouchableOpacity } from 'react-native';
import { createDrawerNavigator , createAppContainer, DrawerActions} from 'react-navigation'; 

export class HeaderNavigationBar extends Component {
    render() {
        return (<View style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
             <TouchableOpacity style={{ marginRight: 10, marginTop: 15 }}
                onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
                />
            </TouchableOpacity>
        </View>);
    }
}

 export   class NavProfile extends Component {

    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}> 
        <HeaderNavigationBar {...this.props} />
            <View style={{
                flex: 1,
                backgroundColor: '#4885ed',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
           
            
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Home Screen
                </Text>
                
            </View>
        </View>);
    }
}

export  class InfoScreen extends Component {

    render() {
        return (<View style={{
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
        </View>);
    }

}
const MyDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:NavProfile
      },
      Info:{
        screen:InfoScreen
      }
    },{
        initialRouteName:'Home',
        drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle'
    }
  );
 export default createAppContainer(MyDrawerNavigator);

/*export default createDrawerNavigator (
    {
      Home:{
        screen:NavProfile
      },
      Info:{
        screen:InfoScreen
      }
    },{
        initialRouteName:'Home',
        drawerOpenRoute: 'DrawerOpen',
drawerCloseRoute: 'DrawerClose',
drawerToggleRoute: 'DrawerToggle'
    }
)

*/