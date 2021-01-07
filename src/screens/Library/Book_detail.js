import React from "react";
import { Font } from 'expo';
import {  TextInput,Image,StatusBar,ImageBackground} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content, Input} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import  DropdownAlert from 'react-native-dropdownalert';
export default class Book_detail extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:20083,
          dataSource:null,search:'',b_id:null

        }
        this.book = this.book.bind(this);
    }

    book()
    {
      console.log(this.state.sid+" "+this.state.b_id);
      fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/book.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'appication/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
          studentid: this.state.sid,
          bookid:this.state.b_id
          
          
        })
      
      })
      .then((response) => response.json())
       .then((responseJson)=>{
         
       })
       .catch((error)=>{
        alert(error);
       });
      this.dropdown.alertWithType(
        'success',
        'Booked',
        'Book has been added to your library log'
      );
    }

   
    render() {
 
      const { navigation } = this.props;
      const uri = navigation.getParam('img');
      const title = navigation.getParam('title');
      const by = navigation.getParam('by');
      const publish = navigation.getParam('publish');
      const status = navigation.getParam('book');
      const cat = navigation.getParam('cat');
    //   this.state.pid = navigation.getParam('pid');
    this.state.sid = navigation.getParam('id');
    this.state.b_id = navigation.getParam('b_id');
    //  this.state.name = navigation.getParam('name');


  return (
    


<Container style={{backgroundColor:"#fff"}}>

  
  <Header transparent style={{backgroundColor:"transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
    
      <Left>
            <Button style={{height:'auto',marginLeft:wp('3%'),shadowColor:"#ccc" , shadowOpacity:1, shadowRadius:20}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{color:"#000",fontSize:wp('6%')}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
  
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
        <Content>
      <Grid style={{height:"auto",backgroundColor:"transperent"}}> 
        <Row style={{margin:"4%",paddingLeft:wp('2%'),paddingTop:"5%",borderRadius:20,alignItems:"center",backgroundColor:"#f3f4f5",width:wp("100%"),height:"auto"}}>
        <Col style={{height:"auto",justifyContent:"center",alignItems:"center",width:wp('40%')}} >
        <Image source={{uri : "http://readsschoolandcollege.edu.pk/readsform/AdminPanel/images/books/"+uri}} resizeMode="stretch" resizeMethod="resize" style={{height:hp('30%'),width:wp('35%'),borderWidth:0,borderColor:"#000",borderRadius:15}}  />
        </Col>
        <Col style={{height:hp('30%'),marginLeft:wp("1.5%")}}>
        <TextInput editable={false}  multiline={true} style={{fontSize:wp('6%'),fontFamily:"manjari",textTransform:"capitalize"}}  value={title}/>

        <Text style={{color:"#B1BCCF",fontSize:wp('4%'),marginTop:"4%",fontFamily:"manjari"}} > By {by}</Text>
   
        
        </Col>
        </Row>
        <Row style={{width:"100%"}}>
          <Col style={{width:"50%",justifyContent:"center",alignItems:"center"}}>  
          
          <Text style={{color:"#000",fontSize:wp('5%'),margin:"4%",fontFamily:"manjari",textTransform: 'capitalize'}} >category</Text>
          
          </Col>
          <Col style={{width:"50%",justifyContent:"center",alignItems:"flex-start",borderLeftWidth:1,borderColor:"#B1BCCF"}}> 
          
           <Text style={{color:"#2956bd",fontSize:wp('5%'),margin:"4%",fontFamily:"manjari",textTransform: 'capitalize'}} >{cat}</Text>
          </Col>
        </Row>
        <Row style={{width:"100%"}}>
          <Col style={{width:"50%",justifyContent:"center",alignItems:"center"}}>  
          
          <Text style={{color:"#000",fontSize:wp('5%'),margin:"4%",fontFamily:"manjari",textTransform: 'capitalize'}} >Publisher</Text>
          
          </Col>
          <Col style={{width:"50%",justifyContent:"center",alignItems:"flex-start",borderLeftWidth:1,borderColor:"#B1BCCF"}}> 
          
           <Text style={{color:"#c9450d",fontSize:wp('5%'),margin:"4%",fontFamily:"manjari",textTransform: 'capitalize'}} >{publish}</Text>
          </Col>
        </Row>
        <Row style={{width:"100%",padding:wp('5%')}}>
    <Button transparent style={{width:"100%",backgroundColor:"#2956bd",borderRadius:8,justifyContent:"center"}} onPress={this.book}>
      <Text style={{color:"#f3f4f5",fontFamily:"manjari",fontSize:wp('5%'),alignContent:"center"}}>{status}</Text>
      </Button>
        </Row>
      </Grid>
        </Content>
  
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          closeInterval={5000}
          defaultTextContainer={{ padding: 10, paddingTop: 20, marginHorizontal: 5 }} // iPhone X
          // elevation={4}
          translucent // android
          // updateStatusBar={false}
      
        />
        </Container>


  );
    }
}