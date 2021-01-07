import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Attendance extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          pid:'',
          sid:'20083',
          name:'Ahmed Israr',

        }
        //  this.getprofile = this.getprofile.bind(this);
         
    }
    
    // getprofile()
    // {
      
    //     const { pid} = this.state;
        
    //     fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/profile.php',{
    //       method:'post',
    //       header:{
    //         'Accept': 'application/json',
    //         'Content-type': 'app lication/json'
    //       },
    //       body:JSON.stringify({
    //         // we will pass our input data to server
    //         id: pid
    //       })
          
          
    //     })
    //     .then((response) => response.json())
    //      .then((responseJson)=>{
          
          
    //        this.setState({
    //         "dob" : responseJson.dob,
    //        "Gender" : responseJson.gender,
    //         "mobile" : responseJson.cell,
    //         "adm_class" : responseJson.class,
    //         "adm_date" : responseJson.adm_date,
    //         "email" : responseJson.email
           
           
    //        });
           
    //      })
    //      .catch((error)=>{
    //      console.error(error);
    //      });
    //     }
   
    render() {
 
      const { navigation } = this.props;
     // const uri = navigation.getParam('img');
    //   this.state.pid = navigation.getParam('pid');
     this.state.sid = navigation.getParam('id');
    //  this.state.name = navigation.getParam('name');


    
  return (

    <Container style={{backgroundColor:"#f3f4f5"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
            <Button style={{height:'auto'}} transparent  onPress={() => this.props.navigation.goBack()} >
              <Icon style={{color:"#343333",fontSize:wp('6%')}} name="chevron-left" type="FontAwesome5"  />
              <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Attendance</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%'),marginBottom:('5%'), shadowRadius:5,shadowColor:"#000",elevation:10,shadowOpacity:0.4}} >

  <Row style={{backgroundColor:"#fff",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%')}}> 
  <Grid style={{marginBottom:wp('10%')}}>
  <Row style={{height:0,padding:wp('4%'),backgroundColor:"#fff",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
       
    </Row>
    <Row style={{height:hp('15%')}}  onTouchStart={()=>{this.props.navigation.navigate("Attendance_Gate",{id:this.state.sid})}}>
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderTopWidth:1,borderColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="door-open" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),fontWeight:"bold",color:"#26306D",fontFamily:"manjari-bold"}}>Gate Attendance</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>
    <Row style={{height:hp('15%')}}  onTouchStart={()=>{this.props.navigation.navigate("Class_Attendance",{id:this.state.sid})}} > 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="ruler" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
  
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),fontWeight:"bold",color:"#26306D",fontFamily:"manjari-bold"}}>Class Attendance</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>
   
  </Grid>


   
  </Row>

  </Grid>
  </Content>
      </Container>

  );
    }
}