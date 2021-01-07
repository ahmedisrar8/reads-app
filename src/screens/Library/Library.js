import React from "react";

import {  TouchableOpacity,TextInput,Image,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Badge,FooterTab, Icon, Left, Right, Body, Row, Col, Textarea,List,Item ,Text, Content, Input, View} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Library extends React.Component {
 

    constructor(props)
    {
        super(props);
        const { navigation } = this.props;
        this.state = {
          sid:navigation.getParam('id'),
          dataSource:null,search:''

        }
         this.getprofile = this.getprofile.bind(this);
         this.navigateFunc = this.navigateFunc.bind(this);
    }
    navigateFunc()
    {

      
         const { search } = this.state;
        //  console.log(search);
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/get_allbooks.php?q='+search,{
          method:'get',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          }
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
          //console.log(responseJson);
          this.setState({
            dataSource: responseJson
          })
         })
         .catch((error)=>{
         console.error(error);
         });
   
        }
    getprofile()
    {
      
        // console.log(this.state.dataSource);
        }
   componentDidMount()
   {
    
    fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/get_allbooks.php',{
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

   
    render() {
 
      const { navigation } = this.props;
      const uri = navigation.getParam('img');
    //   this.state.pid = navigation.getParam('pid');
   // this.state.sid = navigation.getParam('id');
    //  this.state.name = navigation.getParam('name');

  
    
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

    <Container style={{backgroundColor:"#F3F4F5"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
            <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Browse</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%')}} >

<Row><Badge style={{backgroundColor:"#2956BD"}} onTouchStart={()=>{this.props.navigation.navigate("Library_log",{id:this.state.sid})}}>
            <Text style={{color:"#F3F4F5"}}>Library Log</Text>
          </Badge></Row>
<Row >
  <Col style={{width:wp("85%")}}>

  <Input  style={{fontSize:wp('4%'),padding:0,borderBottomWidth:1,borderColor:"#ccc"}}  placeholder='Search'   onChangeText={(e)=> this.state.search = e} />
  
  
  
  
  </Col><Col style={{alignItems:"center",flex:1,paddingTop:wp('3%')}} >
  <Icon type="FontAwesome5" style={{fontSize:wp('5%')}} name="search" onPress={ this.navigateFunc }></Icon></Col>
</Row>

{this.state.dataSource.map((value, index) => {
    var colore = "#FF0000"
    ,status = "Unavailable",book="Pre Book",color1="#2956bd";
    if(value["text"]==="Book")
    {
      colore = "#7bbb5e";
      status = "Available";
      book="Book Now";
      color1="#F3BA1D";
    } 


     return    <Row style={{backgroundColor:"transperent",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%')}} key={value["bookid"]}> 
  <Grid>
<Row style={{backgroundColor:"transperent",height:"auto",padding:wp("2")}}>
<Grid>
  <Row style={{backgroundColor:"#fff",borderRadius:10,shadowColor:"#000",shadowOpacity:0.5,shadowRadius:10,elevation:30}}> 
    <Col style={{width:wp('30%'),borderRadius:10,shadowRadius:10,margin:'5%',shadowColor:"#000",shadowOpacity:0.8,elevation:65}}>

<Image source={{uri : "http://readsschoolandcollege.edu.pk/readsform/AdminPanel/images/books/"+value["image"]}} resizeMode="stretch" resizeMethod="resize" style={{height:hp('25%'),borderWidth:0,borderColor:"#000",borderRadius:10}}  />




    
   
    </Col >
   
    <Col style={{backgroundColor:"transperent",padding:"3%",shadowColor:"#000",height:hp("30%")}}>
    <Text style={{color:colore,fontSize:wp('3.5%'),marginTop:"6%",fontFamily:"manjari"}} >{status}</Text>
    <TextInput editable={false}  multiline={true} style={{fontSize:wp('5%'),fontFamily:"manjari-bold",textTransform:"capitalize"}}  value={value["bookname"]}/>
  <Text style={{color:"#B1BCCF",fontSize:wp('4%'),marginTop:"4%",fontFamily:"manjari"}} >By {value["author1"]}</Text>
  
 
  

<TouchableOpacity style={{height:hp('11%'),width:wp('30%'),padding:"3%",flexDirection:"row",borderRadius:wp('2%'),backgroundColor:color1,marginTop:"5%",height:"auto"}} onPress={()=>{this.props.navigation.navigate("Book_detail",{id:this.state.sid,book:book,publish:value["publisher"],cat:value["cat"],by:value["author1"],img:value["image"],title:value['bookname'],b_id:value["bookid"]})}}>
<Text style={{color:"#f3f4f5",width:wp("20%"),alignSelf:"flex-start",marginLeft:0,fontFamily:"manjari",fontSize:wp('3.5%')}}>{value["text"]}</Text>
<Icon style={{fontSize:wp('4%'),color:"#f3f4f5"}} name="arrow-right" type="FontAwesome5"  />
</TouchableOpacity>
  {/* <Button  style={{width:wp('25%'),alignItems:"center",alignContent:"center",justifyContent:"center",backgroundColor:colore,marginTop:"5%",height:"auto"}} onPress={()=>{this.props.navigation.navigate("Book_detail",{id:this.state.sid,book:book,publish:value["publisher"],cat:value["cat"],by:value["author1"],img:value["image"],title:value['bookname'],b_id:value["bookid"]})}} > 
<Text style={{color:"#f3f4f5",width:wp("25%"),textAlign:"center",marginLeft:0,fontFamily:"manjari",fontSize:wp('3%'),alignSelf:"flex-end"}}>{value["text"]}</Text>

  </Button> */}
 
    </Col> 
  </Row>
</Grid>
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