import React from "react";
import {AsyncStorage} from "react-native";
import { Drawer,Container, Header, Title, Grid,Card,Badge, Button,Footer,FooterTab, Icon, Left, Right, Body, Text, Row, Col, Thumbnail,CardItem, Content } from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SideBar from '../Sidebar/Sidebar'; 
import { NavigationEvents } from 'react-navigation';

export default class Dashboard extends React.Component {
  
  
    constructor()
    {
        super();
        this.state = {
          id: '',
          name: '',
          img : '',pid:'',
          no:'',badge:'no',refresh:'no'
      }
      this.att = this.att.bind(this);
        this.profile = this.profile.bind(this);
        this.book = this.book.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.get = this.get.bind(this);
        this.refresh = this.refresh.bind(this);

        
    }
  

    
  
  get()
  {
    fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/count.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        // we will pass our input data to server
        id:'123'
      })
      
      
    })
    .then((response) => response.json())
     .then((responseJson)=>{
      
      this.setState({
        no: responseJson[0].no
      })
     
      AsyncStorage.multiGet(['count','badge']).then((data)=>
      {
       
          if(data[0][1]!==this.state.no)
          {
          AsyncStorage.setItem("count",this.state.no);
          AsyncStorage.setItem("badge","yes");
          this.setState({badge:'yes'})
       
          }
          else
          {
            this.setState({badge:data[1][1]});
          
          }
      })
     })
     .catch((error)=>{
     console.error(error);
     });

 


  }
 
    
     profile()
    {
      this.props.navigation.navigate("Profile",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid});
    }

    att()
    {
      this.props.navigation.navigate("Attendance",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid});
    }
    refresh()
    { 
      this.get();
      this.setState({
        refresh:'yes'
      })
    }
  componentWillMount()
  {
    this.get();
    const { navigation } = this.props;
    const name = navigation.getParam('name');
  const id = navigation.getParam('id');
  const uri ="http://readsschoolandcollege.edu.pk/readsform/AdminPanel/images/"+navigation.getParam('img');

  this.state.id = id;
  this.state.pid = navigation.getParam('pid');
  this.state.name = name;
  this.state.img = uri;
  }
  
    book()
    {
      this.props.navigation.navigate("Lms",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid});
    }
    closeDrawer ()  {
      this.drawer._root.close()
    };
  
  openDrawer () { this.drawer._root.open() };
    render() {
      
    
    
      
    
let cond;


if(this.state.badge==='yes')
{
  cond= <Badge style={{width:wp('3%'),height:wp('3%')}}>
    <Text>
      </Text>
      </Badge>;

     
}



      
  return (

    <Drawer
    ref={(ref) => { this.drawer = ref; }}
    content={<SideBar navigator={this.navigator} navigation={this.props.navigation} id={this.state.id} pid={this.state.pid} name={this.state.name} img = {this.state.img} />}
    onClose={() => this.closeDrawer()} >
    
    <Container style={{backgroundColor:"#f3f4f5"}} >
  
     <Content>
     <Header noShadow style={{backgroundColor:"transperent",borderBottomWidth:0,height:'auto',marginTop:wp('5%')}}>
      
      <Left >
            <Button transparent style={{width:wp('100%'),height:'auto'}}  onPress={() => this.openDrawer()}>
              <Icon style={{color:"#343333",fontSize:wp('6%')}} name="stream" type="FontAwesome5"  />
           <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Home</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right style={{width:wp('20%')}}>
       <Button  transparent 
       style={{width:wp('15%'),alignContent:"center",alignItems:"center",height:"auto"}}
       onPress={()=>{this.props.navigation.navigate("Teacher",{id:this.state.id})}}
      >
              <Icon type="Feather" name='message-square' style={{color:"#343333",margin:0,fontSize:wp('6%')}}  />
            </Button>
             <Button style={{height:"auto"}} transparent  onPress={() => this.props.navigation.navigate("Annoucements")}> 
              <Icon style={{color:"#343333",fontSize:wp('6%')}} type="Feather"   name="bell" />
              {cond}
            
            </Button>
           
          </Right>
        </Header>
        <NavigationEvents
                onDidFocus={() =>this.refresh()}
                />
<Grid style={{backgroundColor:"#fff",margin:wp('3%'),borderRadius:wp('5%'), shadowRadius:5,shadowColor:"#000",elevation:10,marginBottom:wp("5%"),shadowOpacity:0.4}} >
  <Row style={{marginBottom:wp('5%'),backgroundColor:"#26306D",height:hp('17%'),borderTopLeftRadius:wp('5%'),borderTopRightRadius:wp('5%')}}> 
    <Col style={{width:"auto"}} onTouchStart={this.profile} >
    <Thumbnail circular  large style={{margin:wp('5%'),borderWidth:1.5,borderColor:"#F3BA1D"}} source={{uri:this.state.img}}  />
    </Col>
    <Col style={{flex:1,justifyContent:"center",marginTop:wp('10%')}}>
    <Row style={{height:"auto"}}><Text style={{fontSize:wp('5%'),color:"#fff",fontFamily:"manjari"}}>{this.state.name}</Text></Row>
    <Row style={{marginTop:5}}><Text  style={{fontSize:wp('3.75%'),color:"#F3BA1D",fontFamily:"manjari"}}>{this.state.id}</Text></Row>
   
    </Col>
  </Row>
  <Row style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),height:"auto"}}> 
  
  <Col  >  
    <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
            <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true} onPress={this.att}>
              <Body style={{alignItems:"center",justifyContent:"center"}}>
                <Icon type="FontAwesome5" name="check-circle" style={{fontSize:wp('10%'),color:"#26306D"}} />
                <Text style={{fontSize:wp('2.5%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                   Attendance
                </Text>
              </Body>
            </CardItem>
          

          </Card>
    </Col>
    <Col  style={{marginLeft:wp('2%'),marginRight:wp('2%')}} > 
    <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
            <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true}   onPress={() => this.props.navigation.navigate("Communication",{id:this.state.id})}>
              <Body style={{alignItems:"center",justifyContent:"center"}}>
                <Icon type="FontAwesome5" name="bullhorn" style={{fontSize:wp('10%'),color:"#26306D"}} />
                <Text style={{fontSize:wp('2.1%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                Communication
                </Text>
              </Body>
            </CardItem>
          

          </Card>
    </Col>

    <Col >
    <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
            <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}  button={true} onPress={this.book}>
              <Body style={{alignItems:"center",justifyContent:"center"}}>
                <Icon type="FontAwesome5" name="book-open" style={{fontSize:wp('10%'),color:"#26306D"}} />
                <Text style={{fontSize:wp('2.1%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                   Books & Notes
                </Text>
              </Body>
            </CardItem>
          

          </Card>
    </Col>
  </Row>

  <Row style={{paddingTop:wp('1%'),paddingLeft:wp('5%'),paddingRight:wp('5%'), height:"auto"}}> 
  
    

    <Col > 
    <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
            <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true}   onPress={() => this.props.navigation.navigate("Result",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}>
              <Body style={{alignItems:"center",justifyContent:"center"}}>
                <Icon type="FontAwesome5" name="percentage" style={{fontSize:wp('10%'),color:"#26306D"}} />
                <Text style={{fontSize:wp('2.5%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                   Assessment
                </Text>
              </Body>
            </CardItem>
          

          </Card>
    </Col>
    <Col  style={{marginLeft:wp('2%'),marginRight:wp('2%')}} >
    <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} >
            <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true} onPress={() => this.props.navigation.navigate("Fee",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}>
              <Body style={{alignItems:"center",justifyContent:"center"}}>
                <Icon type="FontAwesome5" name="file-invoice-dollar" style={{fontSize:wp('10%'),color:"#26306D"}} />
                <Text style={{fontSize:wp('2.5%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                   Fee
                </Text>
              </Body>
            </CardItem>
          

          </Card>
    </Col>
    <Col >
  <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
          <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}  button={true} onPress={this.book} onPress={() => this.props.navigation.navigate("Schedule",{id:this.state.id,name:this.state.name,img:this.state.img,pid:this.state.pid})}>
            <Body style={{alignItems:"center",justifyContent:"center"}}>
              <Icon type="FontAwesome5" name="calendar-alt" style={{fontSize:wp('10%'),color:"#26306D"}} />
              <Text style={{fontSize:wp('2.1%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                Schedule
              </Text>
            </Body>
          </CardItem>
        

        </Card>
  </Col>

  </Row>
  <Row style={{paddingTop:wp('1%'),paddingLeft:wp('5%'),paddingRight:wp('5%'), height:"auto"}}> 
  
  
  <Col > 
  <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
          <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true} onPress={() => this.props.navigation.navigate("Canteen",{id:this.state.id})}>
            <Body style={{alignItems:"center",justifyContent:"center"}}>
              <Icon type="FontAwesome5" name="hamburger" style={{fontSize:wp('10%'),color:"#26306D"}} />
              <Text style={{fontSize:wp('2.5%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                 Canteen
              </Text>
            </Body>
          </CardItem>
        

        </Card>
  </Col>
  <Col  style={{marginLeft:wp('2%'),marginRight:wp('2%')}} >
  <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} >
          <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true} onPress={() => this.props.navigation.navigate("Library",{id:this.state.id})}>
            <Body style={{alignItems:"center",justifyContent:"center"}}>
              <Icon type="FontAwesome5" name="book-reader" style={{fontSize:wp('10%'),color:"#26306D"}} />
              <Text style={{fontSize:wp('2.5%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                 Library
              </Text>
            </Body>
          </CardItem>
        

        </Card>
  </Col>
  <Col> 
  <Card style={{borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}}>
          <CardItem style={{backgroundColor:'#e9ebf0',borderRadius:wp('5%'),height:hp('15.5%'),width:wp('27%')}} button={true} onPress={() =>this.props.navigation.navigate("Annoucements")}>
            <Body style={{alignItems:"center",justifyContent:"center"}}>
              <Icon type="FontAwesome5" name="satellite-dish" style={{fontSize:wp('10%'),color:"#26306D"}} />
              <Text style={{fontSize:wp('2.5%'),marginTop:5,color:"#26306D",fontFamily:"manjari"}}>
                 Annoucement
              </Text>
            </Body>
          </CardItem>
        

        </Card>
  </Col>
</Row>

  <Row style={{backgroundColor:"#e9ebf0",height:"auto",marginTop:wp('5%'),borderBottomLeftRadius:wp('5%'),borderBottomRightRadius:wp('5%')}}>
      <Col style={{padding:wp('5%'),height:"25%"}}>
      {/* <Row ><Text style={{color:"#343333",fontSize:wp('4.5%'),fontWeight:"bold"}}>Activities</Text></Row> */}
      <Row >
        <Col style={{padding:wp('3%')}}><Thumbnail  square large source={require("../../img/how.png")} style={{resizeMode:"contain",width:wp('40%'),height:hp('8%')}} /></Col>
        <Col style={{padding:wp('3%')}}><Thumbnail  square large source={require("../../img/iread.png")} style={{resizeMode:"center",width:wp('40%'),height:hp('8%')}} /></Col>
      </Row>
      </Col>
  </Row>
</Grid>

</Content>

      </Container>
      </Drawer>
  );
    }
}