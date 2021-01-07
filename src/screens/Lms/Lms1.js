import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,Linking,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Col,Icon, Left, Right, Body, Row, Accordion,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Attendance extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          cid:'',
          dataSource:null

        }
         this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { cid,dataSource} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/course_material.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            id: cid
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
        }
   
    render() {
 
      const { navigation } = this.props;
      const uri = navigation.getParam('img');
    //   this.state.pid = navigation.getParam('pid');
      this.state.cid = navigation.getParam('id');
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
  
     
<Grid style={{height:"auto", backgroundColor:"transperent",margin:wp('3%'),borderRadius:wp('3%'), elevation:10,marginBottom:wp("5%"),shadowRadius:5,shadowColor:"#000",shadowOpacity:0.4}} >

  <Row style={{backgroundColor:"#fff",height:"auto",borderRadius:wp('3%'),marginTop:wp('3%')}}> 
  <Grid style={{marginBottom:wp('10%')}}>
  <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
        <Text style={{color:"#343333",fontWeight:"bold",fontFamily:"manjari-bold"}}>Course Material</Text>
    </Row>
    {this.state.dataSource.map((value, index) => {
         var color_code,row_icon;
         if(value.category==="E-Book")
         {
             color_code = "#26306D";
             row_icon = "book";
         }
         else if (value.category==="Notes")
         {
            color_code = "#008000";
            row_icon = "sticky-note";
         }
         else if (value.category==="Past Papers")
         {
            color_code = "#F3BA1D";
            row_icon = "paperclip";
         }
         else if (value.category==="Videos")
         {
            color_code = "#c4302b";
            row_icon = "youtube";
         }
        return  <Row style={{height:"auto"}} key={index}  > 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name={row_icon}style={{color:color_code,fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc",fontFamily:"manjari"}}>{value.category}</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('4%'),color:color_code,fontFamily:"manjari"}}>{value.file}</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
            <Button transparent  onPress={()=>{Linking.openURL('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/coursematerial/'+value.file)}}> 
            <Text></Text>
            <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Button>
            </Col>
        </Grid>
    </Row>})}
    {/* <Row style={{height:"auto"}}> 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="book" style={{color:"#26306D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc"}}>E-book</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('4%'),color:"#26306D"}}>Introduction to Computer Programming 2 Ed</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>

    <Row style={{height:"auto"}}> 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="sticky-note" style={{color:"#008000",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc"}}>Notes</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('4%'),color:"#008000"}}>Intro Notes</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>

    <Row style={{height:"auto"}}> 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="paperclip" style={{color:"#F3BA1D",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc"}}>Past Papers</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('4%'),color:"#F3BA1D"}}>Final Exam Term 4</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>
    <Row style={{height:"auto"}}> 
        <Grid style={{padding:wp('3%'),justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderBottomColor:"#e9ebf0",height:"auto"}}>
            <Col style={{width:"auto",marginRight:wp('4%')}}>
            <Icon name="youtube" style={{color:"#c4302b",fontSize:wp('9%')}} type="FontAwesome5" ></Icon>
            </Col>
            <Col>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('3%'),fontWeight:"400",color:"#ccc"}}>Video</Text></Row>
                <Row style={{height:"auto"}}><Text style={{fontSize:wp('4%'),color:"#c4302b"}}>Lecture 1</Text></Row>
            </Col>
            <Col style={{alignItems:"flex-end",width:"auto",marginLeft:wp('3%')}}>
         <Icon name="chevron-right" style={{color:"#ccc",fontSize:wp('7%'),marginRight:wp('3%')}} type="FontAwesome5" ></Icon>
            </Col>
        </Grid>
    </Row>*/}

  
  </Grid>   
  </Row>
  </Grid>
  </Content>
      </Container>

  );
    }
}