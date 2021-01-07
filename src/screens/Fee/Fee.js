import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Fee extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'20083',
          dataSource:null
        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { sid,dataSource} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/fee.php',{
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
      <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Fee</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%'), shadowRadius:5,shadowColor:"#000",shadowOpacity:0.4}} >

{this.state.dataSource.map((value, index) => {
    var color = "#FF0000"
    ,status = "UNPAID";
    if(value["paid"]==="1")
    {
      color = "#008000";
      status = "PAID";
    } 
    else if(value["paid"]==="3")
    {
      color = "#343333";
      status = "EXPIRED";
    }


     return    <Row style={{backgroundColor:"#fff",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%'),shadowColor:"#000",shadowRadius:5,shadowOpacity:0.5,elevation:8}}> 
  <Grid>
  <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
       <Col><Text style={{color:"#343333",fontWeight:"bold",fontFamily:"manjari"}}>{value["month"]}</Text></Col>

        <Col style={{justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}><Text style={{color:color,fontWeight:"bold",fontSize:wp('3%'),fontFamily:"manjari"}}>{status}</Text></Col>
    </Row>
       <Row style={{height:hp('15%')}} >
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon type="FontAwesome5" name="file-invoice-dollar"  style={{color:"#26306D",fontSize:wp('9%')}} ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc",fontFamily:"manjari"}}>{value["voucher_no"]}</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),fontWeight:"bold",color:"#26306D",fontFamily:"manjari"}}>Rs {value["amount"]}</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}} onPress={()=>{this.props.navigation.navigate("Fee_Desc",{id:this.state.sid,status:status,c_id:value["chalanid"]})}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>

        </Grid>
       
    </Row>
   
   <Row style={{justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
 <Text style={{color:"#343333",fontWeight:"bold",height:"auto",margin:wp('5%'),fontFamily:"manjari"}}>Due: {value["due"]}</Text>
     </Row>
  
  
  
  </Grid>


   
  </Row>

})}
  </Grid>
  </Content>
      </Container>

  );
    }
}