import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Attendance extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'',
          dataSource:null
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { sid,dataSource} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/course.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
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
         })
         .catch((error)=>{
         console.error(error);
         });
        // console.log(this.state.dataSource);
        }
   
    render() {
 
      const { navigation } = this.props;
      const uri = navigation.getParam('img');
    //   this.state.pid = navigation.getParam('pid');
      this.state.sid = navigation.getParam('id');
    //  this.state.name = navigation.getParam('name');

  
    this.getprofile();
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
      <Button transparent style={{width:wp('100%')}} onPress={() => this.props.navigation.goBack()} >
            <Icon style={{color:"#343333",fontSize:wp('6%')}} name="chevron-left" type="FontAwesome5"   />
                <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Books & Notes</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%'), shadowRadius:5,elevation:10,marginBottom:wp("5%"),shadowColor:"#000",shadowOpacity:0.4}} >

  <Row style={{backgroundColor:"#fff",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%')}}> 
  <Grid style={{marginBottom:wp('10%')}}>
  <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
        <Text style={{color:"#343333",fontWeight:"bold"}}>Courses</Text>
    </Row>
    {this.state.dataSource.map((value, index) => {
     
        return     <Row style={{height:hp('15%')}} key={index} onTouchStart={()=>{this.props.navigation.navigate("Lms_1",{id:value.courseid})}}>
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="cubes" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc",fontFamily:"manjari"}}>{value.course_group}</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),fontWeight:"bold",color:"#26306D",fontFamily:"manjari"}}>{value.coursename}</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>
     })}
    {/* <Row style={{height:hp('15%')}}> 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="cubes" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc"}}>CPL-001</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),fontWeight:"bold",color:"#26306D"}}>Computer Programming</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>
    <Row style={{height:hp('15%')}}> 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="cubes" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc"}}>PAK-002</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),fontWeight:"bold",color:"#26306D"}}>Pakistan Studies</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row> */}
  
  
  
  </Grid>


   
  </Row>

  </Grid>
  </Content>
      </Container>

  );
    }
}