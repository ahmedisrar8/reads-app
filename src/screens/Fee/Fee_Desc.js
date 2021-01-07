import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet,Linking} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DialogInput from 'react-native-dialog-input';
import Toast from 'react-native-tiny-toast';
export default class Fee extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          sid:'20083',
          dataSource:null,
          status:"UNPAID",c_id:"",
          isDialogVisible:false,c:"",vno:""
        }
         this.getprofile = this.getprofile.bind(this);
         this.sendInput = this.sendInput.bind(this);
    }
    sendInput(email)
    {

      this.setState({
        visible:true
      })
      fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/send_email.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'app lication/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
          email: email,
          c : this.state.c,
          vno:this.state.vno
      
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        
      const toast=Toast.showSuccess('Email Sent Successfully');
      this.setState({
        visible: true
    });
    setTimeout(() => {
      // Recommend
      Toast.hide(toast) 
      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
     }, 2000)
        
       })
       .catch((error)=>{
       console.error(error);
       });
      this.setState({
        isDialogVisible:false
      })
    }
  
    getprofile()
    {
      
        const { sid,dataSource,c_id} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/fee1.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            id: sid,
            c_id : c_id
        
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
    
     this.state.sid = navigation.getParam('id');
  this.state.status = navigation.getParam('status');
     this.state.c_id = navigation.getParam('c_id');
  
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
var color = "#FF0000";


    if(this.state.status==="PAID")
    {
      color="#008000"
    } 
    let cond;
    if(this.state.status==="UNPAID")
    {
        cond = <Grid>
            
        <Row style={{borderTopWidth:1,borderTopColor:"#ccc",padding:wp('5%')}}> 
            <Col style={{width:wp('20%')}}> 
            <Thumbnail square  small style={{marginRight:wp('3%'),width:wp('15%'),height:hp('5.5%')}} source={require('../../img/easypaisa-logo.png')} />
            </Col>
            <Col style={{padding:wp('4%')}}>
            <Text style={{color:"#858585",fontFamily:"manjari"}}>Coming Soon</Text>
            </Col>
               
        </Row>
        <Row style={{borderTopWidth:1,borderTopColor:"#ccc",padding:wp('5%')}}> 
            <Col style={{width:wp('20%')}}> 
            <Thumbnail square  small style={{marginRight:wp('3%'),width:wp('18%'),height:hp('5.5%')}} source={require('../../img/JazzCash_logo.png')} />
            </Col>
            <Col style={{padding:wp('3%')}}>
            <Text style={{color:"#858585",fontFamily:"manjari"}}>Coming Soon</Text>
            </Col>
               
        </Row>
        <Row style={{borderTopWidth:1,borderTopColor:"#ccc",padding:wp('5%')}} onTouchStart={()=>{Linking.openURL('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/PrintInvoiceForApp?student_chalan_id='+this.state.dataSource[0].chalanpaid_id)}}>  
            <Col style={{width:wp('20%'),height:"auto"}}> 
            <Thumbnail square   style={{marginRight:wp('3%'),width:wp('13%'),height:hp('7%')}} source={require('../../img/bank.png')} />
            </Col>
            <Col style={{padding:wp('3%')}}>
            <Text style={{color:"#858585",fontFamily:"manjari"}}>Pay Via Bank </Text>
            </Col>
               
        </Row>
        <Row style={{borderTopWidth:1,borderTopColor:"#ccc",padding:wp('5%')}} onTouchStart={()=>{this.setState({
          isDialogVisible:true,
          c:this.state.dataSource[0].chalanpaid_id,
          vno:this.state.dataSource[0].voucherno
        })}}>  
            <Col style={{width:wp('20%'),height:"auto"}}> 
            <Thumbnail square   style={{marginRight:wp('3%'),width:wp('13%'),height:hp('7%')}} source={require('../../img/email.png')} />
            </Col>
            <Col style={{padding:wp('3%')}}>
            <Text style={{color:"#858585",fontFamily:"manjari"}}>Send Email</Text>
            </Col>
               
        </Row>
        </Grid>;
        
    }
    else
    {
        cond =  <Row style={{borderTopWidth:1,borderTopColor:"#ccc",padding:wp('5%')}}> 
        <Col style={{width:"auto",height:"auto"}}> 
      
        <Text style={{color:"#858585",fontWeight:"bold",fontFamily:"manjari-bold"}}>Paid Via {this.state.dataSource[0].cashbank}</Text>
        </Col>
           
    </Row>;
    }
  return (

    <Container style={{backgroundColor:"#f3f4f5"}}>
     
     <Content>
     <Header noShadow style={{backgroundColor:"#transperent",borderBottomWidth:0,height:hp('10%'),marginTop:wp('5%')}}>
     <StatusBar barStyle="light-content"/>
      
      <Left>
      <Button style={{height:'auto'}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{fontSize:wp('6%'),color:"#000"}} name="chevron-left" type="FontAwesome5"   onPress={() => this.props.navigation.goBack()}/>
              <Text style={{color:"#000",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Fee Detail</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
  
     
<Grid style={{height:"auto", backgroundColor:"#fff",margin:wp('3%'),borderRadius:wp('3%'), shadowRadius:5,shadowColor:"#000",elevation:10,marginBottom:wp("5%"),shadowOpacity:0.5}} >
<Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%')}}>
        <Text style={{color:"#343333",fontWeight:"bold"}}>Voucher Details</Text>
    </Row>
   <Row style={{height:"auto", backgroundColor:"#fff",borderRadius:wp('3%'),marginTop:wp('3%'),paddingBottom:wp('3%')}}> 

   <Grid>
   <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Voucher No.</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].voucherno}</Text></Right>
  </Row>

  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Issue Date:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].timestamp}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Reads ID:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].studentid}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Name:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].studentname}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Class:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].admissionclass}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Validity Date:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].validitydate}</Text></Right>

  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Due Date:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].due}</Text></Right>

  </Row>
 
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Month Of:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dataSource[0].month}</Text></Right>

  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#e9ebf0"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Amount:</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:"#343333",fontFamily:"manjari"}}>Rs {this.state.dataSource[0].amount}</Text></Right>

  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('3%'),marginTop:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#fff"}}>
  <Left><Text style={{fontSize:wp('3%'),color:"#a8a8a8",fontFamily:"manjari"}}>Status</Text></Left>
  <Right><Text style={{fontSize:wp('3%'),color:color,fontWeight:"bold",fontFamily:"manjari-bold"}}>{this.state.status}</Text></Right>

  </Row>
   </Grid>

    </Row>

     
{cond}
  
  
  
  


   


  </Grid>
 
  <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Send Email"}
            message={"Enter email address"}
            hintInput ={"abc@xyz.com"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.setState({
              isDialogVisible:false
            })}}>
</DialogInput>
  </Content>
      </Container>

  );
    }
}