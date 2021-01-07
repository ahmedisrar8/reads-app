import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Library_log extends React.Component {
 

    constructor(props)
    {
        super(props);
        const { navigation } = this.props;
        
        this.state = {
          sid: navigation.getParam('id'),dataSource:null
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { sid,dataSource} = this.state;
      
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/book_log.php?student_id='+sid,{
          method:'get',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          }
          
          
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
     componentWillMount()
     {
       this.getprofile();
     }
    render() {
 
     

     
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
     <Header noShadow style={{backgroundColor:"transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
      <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Library Log</Text> 
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

    <Row style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>

    <Col><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#343333",fontFamily:"manjari"}}>Title</Text></Col>
    <Col  style={{alignItems:"flex-end",width:wp('25%'),alignContent:"center",justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#008000",alignSelf:"center",fontFamily:"manjari"}}>Issue</Text></Col>
  
   
       <Col style={{alignItems:"flex-end",width:wp('25%'),alignItems:"center"}}><Text style={{fontSize:wp('3.5%'),fontWeight:"bold",color:"#c4302b",fontFamily:"manjari"}}>Due</Text></Col>
    
      
    </Row>
    
    {this.state.dataSource.map((value, index) => {
        return <Row key={index} style={{height:"auto",marginLeft:wp('3%'),marginRight:wp('3%'),padding:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>

    <Col><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#343333",fontFamily:"manjari"}}>{value.bookname.substring(0,20) }...</Text></Col>
    <Col  style={{alignItems:"center",width:wp('25%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#008000",fontFamily:"manjari"}}>{value.issuedate}</Text></Col>
  
   
       <Col style={{alignItems:"center",width:wp('25%')}}><Text style={{fontSize:wp('3.5%'),fontWeight:"500",color:"#c4302b",fontFamily:"manjari"}}>{value.duedate}</Text></Col>
    
      
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