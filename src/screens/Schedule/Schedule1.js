import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Schedule1 extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'10459',
          day:null,
          dataSource:null,
          title:null,
          data:[]
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { day,sid,dataSource} = this.state;
        console.log(day);
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/timetable.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            sid: sid,
            day:day
          })
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
          
          this.setState({
            dataSource: responseJson,
            title:responseJson
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
  this.state.day = navigation.getParam('day');

  
   
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
    
       
  <Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%'),elevation:10,marginBottom:wp("5%"), shadowRadius:5,shadowColor:"#000",shadowOpacity:0.4}} >
  
    <Row style={{backgroundColor:"#fff",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%')}}> 
    <Grid style={{marginBottom:wp('10%')}}>
    <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
          <Text style={{color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Class Schedule</Text>
      </Row>
   
   <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>


<Col><Text style={{fontSize:wp('2.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Course</Text></Col>
<Col><Text style={{fontSize:wp('2.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Subject</Text></Col>
<Col><Text style={{fontSize:wp('2.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Room</Text></Col>
<Col><Text style={{fontSize:wp('2.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Timing</Text></Col>

</Row>
    
{this.state.dataSource.map((value, index) => {
        return<Row key={index} style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>

      
        <Col><Text style={{fontSize:wp('2.5%'),color:"#343333",fontFamily:"manjari"}}>{value['coursename']}</Text></Col>
        <Col><Text style={{fontSize:wp('2.5%'),color:"#343333",fontFamily:"manjari"}}>{value['subject']}</Text></Col>
        <Col><Text style={{fontSize:wp('2.5%'),color:"#343333",fontFamily:"manjari"}}>{value['roomcode']}</Text></Col>
        <Col><Text style={{fontSize:wp('2.5%'),color:"#343333",fontFamily:"manjari"}}>{value['classstartingtime']+" - "+value['classendtime']}</Text></Col>
        
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