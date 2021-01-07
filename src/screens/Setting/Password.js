import React from "react";
import {  TextInput,View,StatusBar,Linking} from "react-native";
import { Container, Header,Item, Button,Input,FooterTab, Icon, Left, Right, Body, Row, Col,Grid, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import  DropdownAlert from 'react-native-dropdownalert';

export default class Password extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'',
          c1pass:null,
          cpass:null,
          npass:null,
          cnpass:null
        }
        this.changepass =this.changepass.bind(this);
    }
    
    componentWillMount()
    {
      const { navigation } = this.props;
      this.state.sid = navigation.getParam('id');
      const { sid } = this.state;
  
      fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/password.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'app lication/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
          id:sid

        })
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
         this.setState({
           c1pass: responseJson.pass

         })
     
       })
       .catch((error)=>{
  
       });
    }
    
    changepass()
   {
    const { c1pass,cpass,npass, cnpass,sid } = this.state;

  if(c1pass===cpass)
  {
    if(npass===cnpass) 
    {
      if((npass!==null && cnpass !==null))
      {

        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/password.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
          sid:sid,
          pass:cnpass

        })
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
         this.setState({
           cpass:'',
           npass:'',
           cnpass:''
         })

         this.setState({
          cpass:null,
          npass:null,
          cnpass:null
        })
        this.dropdown.alertWithType(
          'success',
          'Password Changed',
          'Password Change Successfully'
        );

       })
       .catch((error)=>{
        
       });
      }
      else
      {
        this.dropdown.alertWithType(
          'warn',
          'Empty Fields',
          'Fields cannot be empty!'
        );
      }
    }
    else
    {
      this.dropdown.alertWithType(
        'error',
        'Confirm Password',
        'Confirm password Does not match'
      );
    }
  }
  else
  {
    this.dropdown.alertWithType(
      'error',
      'Invalid Current Password',
      'Current Password Is Incorrect'
    );
  }
   }
    render() {
 
  return (

    <Container style={{backgroundColor:"#fff"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
      <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Change Password</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
      <Grid style={{margin:wp('5%')}}>
        <Row>
          <Col >
          <Item regular >
            <Input placeholder='Current Password' style={{fontFamily:"manjari"}} value={this.state.cpass}  onChangeText={(e)=> this.state.cpass = e}  secureTextEntry/>
          </Item>
          </Col>
        </Row>
        <Row>
        <Col style={{marginTop:wp('3%')}}>
          <Item regular >
            <Input placeholder='New Password' style={{fontFamily:"manjari"}} value={this.state.npass} onChangeText={(e)=> this.state.npass = e} secureTextEntry/>
          </Item>
          </Col>
        </Row>
        <Row>
        <Col style={{marginTop:wp('3%')}}>
          <Item regular >
            <Input placeholder='Confirm Password' style={{fontFamily:"manjari"}} value={this.state.cnpass} onChangeText={(e)=> this.state.cnpass = e} secureTextEntry/>
          </Item>
          </Col>
        </Row>
       

        <Row>
        <Col style={{marginTop:wp('3%')}}>
        <Button block style={{backgroundColor:"#26306E",fontFamily:"manjari"}}  onPress={ this.changepass } secureTextEntry>
            <Text style={{color:"#fff"}}>Submit</Text>
          </Button>
          </Col>
        </Row>
      </Grid>
      <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          closeInterval={2000}
          defaultTextContainer={{ padding: 10, paddingTop: 20, marginHorizontal: 5 }} // iPhone X
          // elevation={4}
          translucent // android
          // updateStatusBar={false}
      
        />
      </Content>
      </Container>

  );
    }
}