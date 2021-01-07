import React from "react";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem , Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { StatusBar,StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  state = {
    sid:'',
    ti:'',
    name:'',
    messages: [
      ]
  };

  getprofile()
    {
      
        const { sid,ti} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/fetchchat.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            sid: sid,
            ti: ti
          })
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
   if(responseJson==null)
   {}
    else{ this.setState({ messages:  responseJson});}
         })
         .catch((error)=>{
         console.error(error);
         });
        // console.log(this.state.dataSource);
        }

  onSend = messages => {
    
    this.setState({ messages: [...messages, ...this.state.messages] });
    const { sid,ti} = this.state;
    console.log(messages);
    fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/sendmessage.php',{
          method:'post', 
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            sid: sid,
            ti: ti,
            msg: messages[0].text,
            time: messages[0].createdAt,
            id: messages[0]._id
          })
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
    this.getprofile();
         })
         .catch((error)=>{this.getprofile();

       //  console.error(error);
         });
  }
  componentDidMount()
  {
   this.getprofile();
   
  }
render() {
  const { navigation } = this.props;
    
  this.state.sid = navigation.getParam('id');
  this.state.ti = navigation.getParam('ti');
  this.state.name = navigation.getParam('name');
    return (
      
      <Container style={{backgroundColor:"#fff"}}>
  
        <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
       <StatusBar barStyle="light-content"/>
        
        <Left>
              <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={{color:"#343333",fontSize:wp('6%')}} name="chevron-left" type="FontAwesome5"   />
    <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>{this.state.name.substr(0,this.state.name.indexOf(' '))}</Text> 
              </Button>
            </Left>
            <Body>
              
            </Body>
            <Right>
            <Button transparent >
              </Button>
            </Right>
          </Header>
    
      <View style={styles.container}>
        <GiftedChat messages={this.state.messages}
          onSend={this.onSend} user={{
            _id: this.state.sid
          }}   showUserAvatar />
      </View>
      
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});