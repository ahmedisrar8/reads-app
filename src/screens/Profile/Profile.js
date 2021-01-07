import React from "react";
import { Font } from 'expo';
import {  TextInput,View,StatusBar,ActivityIndicator,StyleSheet} from "react-native";
import { Container, Header,Grid, Button,Footer,FooterTab, Icon, Left, Right, Body, Row, Col, Thumbnail,List,ListItem ,Text, Content} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Profile extends React.Component {
 

    constructor()
    {
        super();
        this.state = {
          pid:'',
          sid:'',
          name:'',
          dob:'',
          Gender:'',
          mobile:'',
          adm_class:'',
          adm_date:'',email:'',
          address:'',cnic:'',
          datasource:null
          

        }
          this.getprofile = this.getprofile.bind(this);
         
    }
    
    getprofile()
    {
      
        const { pid} = this.state;
        
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/profile.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            id: pid
          })
          
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
          
          
           this.setState({
            "dob" : responseJson[0].dateofbirth,
           "Gender" : responseJson[0].gender,
            "mobile" : responseJson[0].cellno,
            "adm_class" : responseJson[0].admissionclass,
            "adm_date" : responseJson[0].admissiondate,
            "email" : responseJson[0].email,
           "address":responseJson[0].address,
           "cnic":responseJson[0].cnic,
datasource:responseJson
           });
         console.log(this.state.datasource);
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
     this.state.pid = navigation.getParam('pid');
     this.state.sid = navigation.getParam('id');
     this.state.name = navigation.getParam('name');

     


const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});
if (!this.state.datasource) {
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
      
      <Left>
            <Button transparent style={{width:wp('100%')}} onPress={() => this.props.navigation.goBack()} >
            <Icon style={{color:"#343333",fontSize:wp('6%')}} name="chevron-left" type="FontAwesome5"   />
                <Text style={{color:"#343333",fontSize:wp('6%'),fontWeight:"bold",marginLeft:wp('3%'),width:wp('100%'),textTransform:"capitalize",fontFamily:"manjari-bold"}}>Profile</Text> 
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right>
          <Button transparent >
            </Button>
          </Right>
        </Header>
        <Grid style={{backgroundColor:"#fff",borderTopLeftRadius:wp('5%'),borderTopRightRadius:wp('5%'),margin:20,shadowRadius:5,elevation:30,shadowColor:"#000",shadowOpacity:0.4,borderBottomLeftRadius:wp('3%'),borderBottomRightRadius:wp('3%')}}>
  <Row style={{height:hp('26%'),paddingTop:wp('3%'),borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:"#26306D"}}> 
   <Col style={{alignItems:"center",justifyContent:"center",shadowRadius:10,shadowColor:'#F3BA1D',shadowOpacity:0.7}}>
   <Thumbnail   large  source={{uri:uri}}  style={{width:wp('35%'),height:hp('20%'),borderWidth:1.5,borderRadius:wp('17.5%'),borderColor:"#F3BA1D"}} />
   </Col>
  </Row>
  <Row style={{height:"auto",padding:wp('5%'),paddingBottom:wp('-5%'),backgroundColor:"#26306D"}}>
    <Text style={{fontSize:wp('4%'),fontWeight:"bold",color:"#fff",fontFamily:"manjari"}}>{this.state.name}</Text>
    
  </Row>
  <Row style={{height:"auto",padding:20,paddingTop:-10,backgroundColor:"#26306D"}}>  
  <Text style={{fontSize:wp('3%'),color:"#F3BA1D",fontFamily:"manjari"}}>{this.state.sid}</Text>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Class</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.adm_class}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Email</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.email}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Cell</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.mobile}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Cnic</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.cnic}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Gender</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.Gender}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Birthday</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.dob}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginBottom:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%')}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Admission Date</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.adm_date}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('1%'),marginBottom:wp('3%'),marginLeft:wp('3%'),marginRight:wp('3%')}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Address</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.address}</Text></Right>
  </Row>
  <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",marginTop:wp('5%')}}>
          <Text style={{color:"#343333",fontWeight:"bold",fontFamily:"manjari"}}>Father's Information</Text>
      </Row>

      <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Father's Name</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].fathername}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Father's Cell No.</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].fathercontactno}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Father's Email</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].fatheremail}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Father's Occupation</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].fatheroccupation}</Text></Right>
  </Row>
  <Row style={{height:"auto",padding:wp('4%'),backgroundColor:"#e9ebf0",marginTop:wp('5%')}}>
          <Text style={{color:"#343333",fontWeight:"bold",fontFamily:"manjari"}}>Mother's Information</Text>
      </Row>

      <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Mother's Name</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].mothername}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Mother's Cell No.</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].mothercontactno}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Mother's Email</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].motheremail}</Text></Right>
  </Row>
  <Row style={{backgroundColor:"#fff",justifyContent:"center",height:hp('5%'),marginTop:wp('5%'),marginLeft:wp('3%'),marginRight:wp('3%'),borderBottomWidth:1,borderBottomColor:"#ccc"}}>
  <Left><Text style={{fontSize:wp('3.5%'),color:"#a8a8a8",fontFamily:"manjari"}}>Mother's Occupation</Text></Left>
  <Right><Text style={{fontSize:wp('3.5%'),color:"#343333",fontFamily:"manjari"}}>{this.state.datasource[0].motheroccupation}</Text></Right>
  </Row>
  </Grid>

  </Content>
      </Container>

  );
    }
}