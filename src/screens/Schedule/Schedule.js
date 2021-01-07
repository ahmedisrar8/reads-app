import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Schedule extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'10459',
          dataSource:null,
          title:null,
          data:[]
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { sid,dataSource} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/timetable.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
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
          
          console.log(responseJson)
         })
         .catch((error)=>{
         console.error(error);
         });
        }
   
        componentDidMount()
        {
          this.getprofile();
        }

     
    render() {
 
      const { navigation } = this.props;
      const uri = navigation.getParam('img');
    //   this.state.pid = navigation.getParam('pid');
   this.state.sid = navigation.getParam('id');
   
      console.log(this.state.sid);
  
   
    const styles = StyleSheet.create({
      indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
      }
    });
    if (!this.state.dataSource) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
 
    return (

      <Container style={{backgroundColor:"#f3f4f5"}}>
       
       <Content>
       <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
       <StatusBar barStyle="light-content"/>
        
        <Left>
        <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Class Schedule</Text> 
            </Button>
            </Left>
            <Body>
              
            </Body>
            <Right>
            <Button transparent >
              </Button>
            </Right>
          </Header>
    
       
    <List style={{backgroundColor:"#fff",borderRadius:wp('5%'),height:"80%",height:hp("60%"),marginBottom:wp('5%'),margin:wp('2%'),paddingTop:"7%",elevation:10       , shadowRadius:5,shadowColor:"#000",shadowOpacity:0.4}}>
    {this.state.dataSource.map((value, index) => {
        return<ListItem key={index} onTouchStart={()=>{  this.props.navigation.navigate("Schedule1",{id:this.state.sid,day:value['days']})}}>
      <Left><Text style={{fontFamily:"manjari"}}>{value['days']}</Text></Left>
      <Right><Icon name="arrow-forward" /></Right>
    </ListItem>
     })}
  </List>
    </Content>
        </Container>
  
    );
    }
}