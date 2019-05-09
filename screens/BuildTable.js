import React,{Component } from 'react';
import { View , Text} from 'react-native';
import moment from 'moment';
import styles from './styles';

export default class BuildTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date:'',
            time:'',
            datetime:'2019-04-26 23:00',
            datetime1:'2019-12-30 23:00',
            Endtime:'',
            currentDate:new Date(),
            markedDate: moment(new Date()).format("YYYY-MM-DD"),
            data:data,
            shift:'',
            arrayHolder:[],
            textInput_Holder:''
        }
        this.data=[
            {
                title:'Sunday',
            },
            {
                title:'Monday',
            },
            {
                title:'Tuesday'
            },
            {
                title:'Wednesday'
            },
            {
                title:'Thuresday'
            },
            {
                title:'Friday',
            },
            {
                title:'Saturday'
            }
        ]
    }
    componentDidMount(){
        this.setState({ arrayHolder :[...this.array]});
        this.setState({data:this.data});
    }
    joinData=()=>{
        const today = this.state.date;
        const days = moment(today).format("dddd");
        if(this.state.time === null){
            alert("Please enter time")
            return;
        }
        if(this.state.time > this.state.Endtime){
            alert("Please enter valid time period")
            return;
        }
        this.array.push({title :this.state.shift +" "+this.state.time+"-"+this.state.Endtime});
        firebase.database().ref('/slots/'+'reem').update({
            day:this.state.shift,
            starttime:this.state.time,
            endtime:this.state.Endtime,
        })
        this.setState( { arrayHolder: [...this.array] })
        this.setState({textInput_Holder:''});
    }
    FlatListItemSeparator=()=>{
        return(
            <View
            style={{
                height:1,
                width:"100%",
                backgroundColor:"#607D88",
            }}
            />
        );
    }
    GetItem(item){
        alert(item);
    }
    render(){
        return(
            <View style={[styles.MainContainer,{marginTop:20}]}>
                <Text>
                    Hello
                </Text>
            </View>
        )
    }
}