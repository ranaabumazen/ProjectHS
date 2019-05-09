import React,{Component} from 'react';
import { View,Text,TouchableOpacity} from 'react-native';

export default class adminScreen extends Component{
    constructor(props){
        super(props);
       
    }
    add(){
        this.props.navigation.navigate('addDoctor')
    }
    render(){
        return(
            <View style={{alignItems:'center',alignContent:'center',marginTop:60}}>
            <TouchableOpacity onPress={this.add.bind(this)}>
                <Text>
                    add Doctor
                </Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={{marginTop:20}}>
                <Text>
                    delete doctor
                </Text>
                </TouchableOpacity>
            </View>
        );
    }
}