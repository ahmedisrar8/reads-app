import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Class1 extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'',dataSource:[]
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { sid,dataSource} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/class_att.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            id: sid
          })
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
          
          this.setState({
            dataSource: responseJson
          })
         })
         .catch((error)=>{
         console.error(error);
         });
        }
    render() {
 
      const { navigation } = this.props;
      this.state.sid = navigation.getParam('id');

      this.getprofile();
       
    
  return (

    <Container style={{backgroundColor:"#f3f4f5"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
            <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{color:"#343333",fontSize:wp('6$')}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Class Attendance</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%'),elevation:10,marginBottom:wp("5%"), shadowRadius:5,shadowColor:"#000",shadowOpacity:0.4}} >

  <Row style={{backgroundColor:"#fff",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%')}}> 
  <Grid style={{marginBottom:wp('10%')}}>
  <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
        <Text style={{color:"#343333",fontWeight:"bold"}}>Class Attendance</Text>
    </Row>
    <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>

    <Col style={{width:wp('23%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Date</Text></Col>
    <Col style={{width:wp('15%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Subject</Text></Col>
    <Col style={{width:wp('15%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Room</Text></Col>
    <Col  style={{alignItems:"flex-end",width:wp('17%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#008000",fontFamily:"manjari"}}>Check In</Text></Col>
  
   
       <Col style={{alignItems:"flex-end",width:wp('15%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#c4302b",fontFamily:"manjari"}}>Check Out</Text></Col>
    
      
    </Row>
    
    {this.state.dataSource.map((value, index) => {
        return <Row key={index} style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>

    <Col style={{width:wp('23%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#343333",fontFamily:"manjari"}}>{value.date}</Text></Col>

    <Col style={{alignItems:"center",width:wp('15%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#343333",fontFamily:"manjari"}}>{value.subject}</Text></Col>

    <Col style={{width:wp('15%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#343333",fontFamily:"manjari"}}>{value.roomcode}</Text></Col>
    <Col  style={{alignItems:"flex-end",width:wp('17%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#008000",fontFamily:"manjari"}}>{value.checkin}</Text></Col>
  
   
       <Col style={{alignItems:"flex-end",width:wp('15%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#c4302b",fontFamily:"manjari"}}>{value.checkout}</Text></Col>
    
      
    </Row>
    })}
  </Grid>


   
  </Row>

  </Grid>
  </Content>
      </Container>

  );
    }
}