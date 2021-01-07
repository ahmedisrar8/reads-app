import React from "react";
import { AsyncStorage,TextInput,View,StatusBar,Linking} from "react-native";
import { Container, Header,Switch, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Setting extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'',
          touch:false,
          token:null
        }
        this.reg = this.reg.bind(this);
    }
    
    componentWillMount()
    {
      AsyncStorage.multiGet(['touch']).then((data)=>
      {
        if(data[0][1]===null)
        {
            this.setState({
              touch:false
            })
        }
        else if(data[0][1]==='false')
        {
          this.setState({
            touch:false
          })
        }
        else if(data[0][1]==='true')
        {
          this.setState({
            touch:true
          })
        }
        
      });
      AsyncStorage.multiGet(['touch']).then((data)=>
      {
        console.log(data[0][1]);
      });
    }

    reg()
    {
      if(this.state.touch ===false)
      {
        AsyncStorage.setItem("touch",'true');
       
        this.setState({
          touch:true
        })
      }
      else
      {
        this.setState({
          touch:false
        })
        AsyncStorage.setItem("touch",'false');
      }
    

    }
    
   
    render() {
 
      const { navigation } = this.props;
    this.state.sid = navigation.getParam('id');
  return (

    <Container style={{backgroundColor:"#fff"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
      <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Setting</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
        <List style={{marginRight:wp('5%')}}>
            <ListItem icon style={{borderBottomColor:"#ccc",borderBottomWidth:1}}  onTouchStart={()=>{  this.props.navigation.navigate("Password",{id:this.state.sid})}} >
             
              <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon color="#fff" name="lock" />
                </Button>
              </Left>
              <Body>
                <Text style={{fontFamily:"manjari"}}>Change Password</Text>
              </Body>
            </ListItem>

            <ListItem icon style={{borderBottomColor:"#ccc",borderBottomWidth:1}}  onTouchStart={this.reg}>
             
             <Left>
             <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon color="#fff" name="fingerprint" type="FontAwesome5"/>
               </Button>
             </Left>
             <Body>
               <Text style={{fontFamily:"manjari"}}>TouchID</Text>
             </Body>
             <Right>
             <Switch value={this.state.touch}  />
             </Right>
           </ListItem>
            </List>
  </Content>
      </Container>

  );
    }
}