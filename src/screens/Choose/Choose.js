import React,{Component} from 'react';

import {  AppRegistry,TextInput,View,StatusBar,ActivityIndicator,StyleSheet,AsyncStorage} from "react-native";
import { Grid,Row,Col,Thumbnail,Container,Content,Item,Input,Icon,Text, CheckBox, Left, Right,Button} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {  Notifications } from 'expo'
import * as Permissions from 'expo-permissions'


export default class Choose extends React.Component {

    constructor()
    {
        super();

        this.state = {
            id:null,
            name:null,
            img:null,
            pid:null
        }

     
       //this.check = this.check.bind(this);
      
     
      
      
    }
 
    componentWillMount()
    {
      try{
        AsyncStorage.multiGet(['id','pid','name','img']).then((data)=>
        {
         
            if(data[3][1]!==null)
            {
            this.props.navigation.navigate("Dashboard",{id: data[0][1],name:data[2][1],img:data[3][1],pid:data[1][1]});
            }
        })
      
       
      }
      catch
      {

      }
    }
  
        
    

    render() {
      
      
  return (

   <Container style={{backgroundColor: '#F3BA1D'}}>
      <StatusBar barStyle="light-content"/>
      
      <Thumbnail square  large source={require("../../img/su.png")}  style={{marginTop:wp('15%'),resizeMode:"stretch",width:wp('40%'),height:hp('20%')}} />
      
     <Grid  style={{marginTop:wp('15%'),width:wp('60%'),alignSelf:"center",height:"auto",backgroundColor:"transperent",borderRadius:wp('5%'),marginLeft:wp('10%'),marginRight:wp('10%'), shadowRadius:5,shadowColor:"#000",shadowOpacity:0.4}}  >
  
    <Row  onTouchStart={()=>{  this.props.navigation.navigate("Login",{type:"Parent"})}} style={{height:hp('8%'),alignItems:"center",justifyContent:"center",backgroundColor:"#F3BA1D",marginTop:wp('5%'),marginRight:wp('5%'),marginLeft:wp('5%'),borderWidth:1,borderColor:"#000"}}>
    <Text style={{color:"#343333",alignSelf:"center",fontSize:wp('6%')}}>Parent</Text>
    </Row>
    <Row onTouchStart={()=>{  this.props.navigation.navigate("Login",{type:"Student"})}}  style={{height:hp('8%'),alignItems:"center",justifyContent:"center",backgroundColor:"#F3BA1D",marginTop:wp('2%'),marginRight:wp('5%'),marginLeft:wp('5%'),borderWidth:1,borderColor:"#000"}}> 
    <Text style={{color:"#343333",alignSelf:"center",fontSize:wp('6%')}}>Student</Text>
    </Row>
    </Grid>
    
    <Thumbnail square  large source={require("../../img/sd.png")}  style={{resizeMode:"stretch",width:wp('55%'),height:hp('25%'),alignSelf:"flex-end"}} />
   

         
    </Container> 
  );
}
  }
  
