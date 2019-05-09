import {
    Text,
    View,
    AsyncStorage,
    StyleSheet,
    ScrollView
} from 'react-native';
import React,{ Component} from 'react';

export default class list extends Component{
constructor(props){
    super(props);
    this.state={
        list:'',
    }
    try{
        AsyncStorage.getItem('notifications_push').then((value) =>{
            this.setState({
                list:JSON.parse(value)
            })
        })
    }catch(err){
        console.log(err)

        
    }
}
parseData(){
    if(this.state.list){
        return this.state.list.map((data,i)=>{
            return(
                <View
                style={styles.dataList}
                key={i} >
                <Text>
                    {data.title}
                </Text>
                <Text>
                    {data.subtitle}
                </Text>
                <Text>
                    {data.comment}
                </Text>
                </View>

            )
        }
        )
    }
}
render(){
    return(
        <ScrollView style={styles.container}>
{this.parseData()}
        </ScrollView>
    )
}
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    dataList:{
        color:'black',
        marginTop:20,
    }
})