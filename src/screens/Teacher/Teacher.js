import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet,AsyncStorage} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Teacher extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'30057',
          dataSource:null
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { sid,dataSource} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/getteacher.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            id: 30057
          })
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
          console.log(responseJson);
          this.setState({
            dataSource: responseJson
          })
         })
         .catch((error)=>{
         console.error(error);
         });
    //     console.log(this.state.dataSource);
        }

        componentWillMount()
        {
            this.getprofile();
        }
   
     
    render() {
 
      const { navigation } = this.props;
      const uri = navigation.getParam('img');
    //   this.state.pid = navigation.getParam('pid');
     this.state.sid = navigation.getParam('id');
    //  this.state.name = navigation.getParam('name');
    
  
   // this.getprofile();
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
                <Icon style={{color:"#343333",fontSize:wp('6%')}} name="chevron-left" type="FontAwesome5"   />
                <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Start Converation</Text> 
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
    <Row style={{height:1,padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
          
      </Row>
      {this.state.dataSource.map((value, index) => {
       
          return     <Row style={{height:hp('15%')}} key={index} >
          <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
              <Col style={{width:"auto",marginRight:wp('4%')}}>
              <Icon name="user" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
              </Col>
              <Col onPress={()=>{this.props.navigation.navigate("Chat",{id:this.state.sid,ti:value["teacherid"],name:value["teachername"]})}}>
              <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc",fontFamily:"manjari"}}>{value["teacherid"]}</Text></Row>
                  <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc",fontFamily:"manjari"}}>{value["coursename"]}</Text></Row>
                  <Row style={{height:"auto"}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#26306D",fontFamily:"manjari"}}>{value["teachername"]}</Text></Row>
              </Col>
   
             
          </Grid>
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