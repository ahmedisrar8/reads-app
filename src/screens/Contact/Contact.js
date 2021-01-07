import React from "react";
import {  TextInput,View,StatusBar,Linking} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Contact extends React.Component {
 

    constructor()
    {
        super();
    }
    
    
   
    render() {
 
     
    
  return (

    <Container style={{backgroundColor:"#f3f4f5"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
      <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Contact</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:800, backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%')}} >

<Row style={{width:"90%",backgroundColor:"#fff",justifyContent:"center",alignItems:"center",padding:wp('5%'),marginLeft:wp('5%'),marginRight:wp('5%'),marginTop:wp('5%'),borderRadius:wp('3%'),height:hp('14%'), shadowRadius:5,shadowColor:"#000",elevation:30,shadowOpacity:0.6}}>
    <Col style={{width:"auto"}}>
    <Thumbnail square  small style={{marginRight:wp('5%')}} source={require('../../img/address.png')} />
    </Col>
    <Col style={{justifyContent:"center",paddingTop:wp('1%')}} onTouchStart={()=>{Linking.openURL('https://goo.gl/maps/QfV4Vh1DkQVCKo8D9')}}>
    <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Address</Text></Row>
    <Row><Text  style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>193-D, Block 7, Gulshan e Iqbal
74800 Karachi, Pakistan</Text></Row>
    </Col>
    </Row>
    <Row style={{width:"90%",backgroundColor:"#fff",justifyContent:"center",alignItems:"center",padding:wp('5%'),marginLeft:wp('5%'),marginRight:wp('5%'),marginTop:wp('5%'),borderRadius:wp('3%'),height:hp('14%'), shadowRadius:5,shadowColor:"#000",elevation:30,shadowOpacity:0.6}}>
    <Col style={{width:"auto"}}>
    <Thumbnail square  small style={{marginRight:wp('5%')}} source={require('../../img/www.png')} />
    </Col>
    <Col style={{justifyContent:"center",paddingTop:wp('2%')}} onTouchStart={()=>{Linking.openURL('http://readsschoolandcollege.edu.pk')}}>
    <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Website</Text></Row>
    <Row><Text  style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>https://readsschoolandcollege.edu.pk</Text></Row>
    </Col>
    </Row>
    <Row style={{width:"90%",backgroundColor:"#fff",justifyContent:"center",alignItems:"center",padding:wp('5%'),marginLeft:wp('5%'),marginRight:wp('5%'),marginTop:wp('5%'),borderRadius:wp('3%'),height:hp('14%'), shadowRadius:5,shadowColor:"#000",elevation:30,shadowOpacity:0.6}}>
    <Col style={{width:"auto"}}>
    <Thumbnail square  small style={{marginRight:wp('5%')}} source={require('../../img/email.png')} />
    </Col>
    <Col style={{justifyContent:"center",paddingTop:wp('2%')}}>
    <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Email</Text></Row>
    <Row><Text  style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>admin@readsschoolandcollege.edu.pk</Text></Row>
    </Col>
    </Row>
    <Row style={{width:"90%",backgroundColor:"#fff",justifyContent:"center",alignItems:"center",padding:wp('5%'),marginLeft:wp('5%'),marginRight:wp('5%'),marginTop:wp('5%'),borderRadius:wp('3%'),height:hp('14%'), shadowRadius:5,shadowColor:"#000",elevation:30,shadowOpacity:0.6}}>
    <Col style={{width:"auto"}}>
    <Thumbnail square  small style={{marginRight:wp('5%')}} source={require('../../img/phonebook.png')} />
    </Col>
    <Col style={{justifyContent:"center",paddingTop:wp('2%')}}>
    <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Phone</Text></Row>
    <Row><Text  style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>+92 309 2229111</Text></Row>
    </Col>
    </Row>
    <Row style={{width:"90%",backgroundColor:"#fff",justifyContent:"center",alignItems:"center",padding:wp('5%'),marginLeft:wp('5%'),marginRight:wp('5%'),marginTop:wp('5%'),borderRadius:wp('3%'),height:hp('14%'), shadowRadius:5,shadowColor:"#000",elevation:30,shadowOpacity:0.6}}>
    <Col style={{width:"auto"}}>
    <Thumbnail square  small style={{marginRight:wp('5%')}} source={require('../../img/schedule.png')} />
    </Col>
    <Col style={{justifyContent:"center",paddingTop:wp('2%')}}>
    <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Working Hours</Text></Row>
    <Row><Text  style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>8am to 5pm</Text></Row>
    </Col>
    </Row>
  </Grid>
  </Content>
      </Container>

  );
    }
}