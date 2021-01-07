import React from "react";
import {AsyncStorage} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NavigationActions } from 'react-navigation'
export default class Sidebar extends React.Component {
 

    constructor(props)
    {
        super(props);
        this.state = {
         id: '',
         name: '',
         img : '',pid:''
        }
    this.logout = this.logout.bind(this);
    }
    
    logout()
    {
     //  AsyncStorage.clear();
       this.props.navigation.navigate("Home");
    } 
   
    render = () => {

      
      this.state.name =this.props.name;
      this.state.img = this.props.img;
      this.state.pid = this.props.pid;
      this.state.id = this.props.id;

    
   
    
  return (

    <Container style={{backgroundColor:"#fff"}}>
     
     <Content>
        <Grid>
            <Row style={{height:"auto",backgroundColor:"#26306D",shadowRadius:wp('10%'),shadowOpacity:0.7,shadowColor:"#000"}}>
            
    <Thumbnail circular   style={{marginTop:wp('5%'),marginBottom:wp('3%'),marginLeft:wp('5%'),borderColor:"#ccc"}} source={{uri:this.state.img}} />
    
    
    
   
            </Row>
            <Row style={{marginBottom:wp('5%'),backgroundColor:"#26306D"}}>
            <Text style={{fontSize:wp('4%'),marginLeft:wp('5%'),marginBottom:"4%",width:"100%",color:"#f3f4f5",fontFamily:"manjari"}}>{this.state.name}</Text>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={()=>{ this.props.navigation.navigate("Profile",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}}>
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="user" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Profile</Text></Col>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={() => {  this.props.navigation.navigate("Attendance",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}}>
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="check-circle" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Attendance</Text></Col>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={()=>{  this.props.navigation.navigate("Lms",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}}>
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="book-open" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Books & Notes</Text></Col>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={() => {this.props.navigation.navigate("Annoucements")}}>
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="bullhorn" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Announcements</Text></Col>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={()=>{  this.props.navigation.navigate("Schedule",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}}>
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="calendar-alt" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Schedule</Text></Col>
            </Row>
      
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} navigation={this.props.navigation}  onTouchStart={()=>{this.props.navigation.navigate("Contact")}}> 
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="envelope" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Contact</Text></Col>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={()=>{  this.props.navigation.navigate("Setting",{id:this.state.id})}} >
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="cog" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Settings</Text></Col>
            </Row>
            <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomColor:"#e9ebf0",borderBottomWidth:1}} onTouchStart={() => {this.logout()}} >
               <Col style={{width:wp('10%'),justifyContent:"center",alignItems:"center",marginRight:wp('3%')}}><Icon style={{color:"#343333",fontSize:wp('5%')}} name="power-off" type="FontAwesome5"/></Col>
               <Col  style={{width:"auto",justifyContent:"center",alignItems:"center" }}><Text style={{color:"#343333",fontSize:wp('4%'),fontFamily:"manjari"}}>Logout</Text></Col>
            </Row>
           
        </Grid>
  </Content>
      </Container>

  );
    }
    
}
