import React,{Component} from 'react';

import {  AppRegistry,StyleSheet,ActivityIndicator,StatusBar,ImageBackground,Platform,AsyncStorage,Linking,Vibration} from "react-native";
import { Grid,Row,Col,Thumbnail,Container,Content,Item,Input,Icon,Text, CheckBox, Left, Right,Button} from "native-base";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import  DropdownAlert from 'react-native-dropdownalert';
import * as LocalAuthentication from 'expo-local-authentication';

export default class Login extends React.Component {

  state = {
    compatible: false,
  };

    constructor()
    {
        super();

        this.state = {
            username: '',
            password: '',
            token:'',
            title: 'Hello World',
            body:'say ',
            fontLoaded:false
        }
        AsyncStorage.setItem("count","0");
        AsyncStorage.setItem("badge","no");
        this.navigateFunc = this.navigateFunc.bind(this);
        this.registerdevice = this.registerdevice.bind(this);
      
        this.loginbio = this.loginbio.bind(this);
       // AsyncStorage.clear();
  }  
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
     var token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ token: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };
   ///Biometric Game
   async componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    await Font.loadAsync({
      'manjari': require('../../../assets/Fonts/Montserratregular.ttf'),
      'manjari-bold': require('../../../assets/Fonts/Montserrat700.ttf'),
    });  
    this.setState({ fontLoaded: true });
    this.checkDeviceForHardware();
    
  }
  _handleNotification = notification => {
   
    Vibration.vibrate(100);
    console.log(notification);
    this.setState({ notification: notification });
    
  };


  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
    if (!compatible) {
      this.showIncompatibleAlert();
    }
  };

  showIncompatibleAlert = () => {
    this.dropdown.alertWithType(
      'error',
      'Incompatible Device',
      'Current device does not have the necessary hardware to use this API.'
    );
  };

  checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      this.dropdown.alertWithType(
        'warn',
        'No Biometrics Found',
        'Please ensure you have set up biometrics in your OS settings.'
      );
    } else {
      this.handleLoginPress();
    }
  };
  
  handleLoginPress = () => {
    if (Platform.OS === 'android') {
      this.showAndroidAlert();
    } else {
      this.scanBiometrics();
    }
  };

  showAndroidAlert = () => {
    this.dropdown.alertWithType(
      'warn',
      'Touch Sensor',
      'Touch Sensor To Continue.'
    );
    this.scanBiometrics();
  };

  scanBiometrics = async () => {
    let result = await LocalAuthentication.authenticateAsync('Biometric Scan.');
    if (result.success) {
     
      AsyncStorage.multiGet(['token','touch']).then((data)=>
      {
        this.setState({
          token: data[0][1]
        });
         
        if(data[1][1]==='false')
        {
          this.dropdown.alertWithType(
            'warn',
            'Tocuh ID Not Enabled!',
            'Please Enable Touch Id in Settings.'
          );
        }
        else if(data[1][1]==='true'){
          this.dropdown.alertWithType(
          'success',
          'Authenticated',
          'Login Succeeded.'
        );
    

        this.loginbio();
        }
        else
        {
          this.dropdown.alertWithType(
            'warn',
            'Tocuh ID Not Enabled!',
            'Please Enable Touch Id in Settings.'
          );
        }
      });
    } else {
      this.dropdown.alertWithType(
        'error',
        'Authentication Failed!',
        'Authentication failed or canceled.'
      );
    }
  };
  ///
    
   
    registerdevice(pid)
    {
      fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/register_device.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'app lication/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
          pid: pid,
          imitoken:this.state.token
          
          
        })
      
      })
      .then((response) => response.json())
       .then((responseJson)=>{
         
       })
       .catch((error)=>{
        alert(error);
       });

       AsyncStorage.setItem("token",this.state.token);
      }
    navigateFunc()
    {

        const { username, password } = this.state;
  
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/login.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'app lication/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            username:username,
            pass:password

          })
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
           var res = responseJson.success;
           var msg = responseJson.message;
           var id = responseJson.id;
           var pid = responseJson.pid;
           var name = responseJson.name;
           var img = responseJson.image;
           if(res == 1){
             // redirect to profile page
             //alert(msg);


             this.registerdevice(pid);
            
           AsyncStorage.setItem("login","yes");  
           this.props.navigation.navigate("Dashboard",{id:id,name:name,img:img,pid,pid});
           }
           else{
          
            this.dropdown.alertWithType(
              'error',
              'Login Failed',
              'Invalid Username Or Password'
            );
             
           }
         })
         .catch((error)=>{
          this.dropdown.alertWithType(
            'warn',
            'No Internet Access',
            'Unable to reach the server. Please make sure you are connected to the internet'
          );
 
         });
        }
       // this.props.navigation.navigate('Dashboard')
          loginbio()
    {

     
        const { token } = this.state;
       
        fetch('http://readsschoolandcollege.edu.pk/readsform/AdminPanel/WebService/loginbio.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            // we will pass our input data to server
            token:token,

          })
          
        })
        .then((response) => response.json())
         .then((responseJson)=>{
           var res = responseJson.success;
           var msg = responseJson.message;
           var id = responseJson.id;
           var pid = responseJson.pid;
           var name = responseJson.name;
           var img = responseJson.image;

           ////console.log(res);
           if(res == 1){
           
           this.props.navigation.navigate("Dashboard",{id:id,name:name,img:img,pid,pid});
           }else{
           
            this.dropdown.alertWithType(
              'error',
              'Login Failed',
              'Invalid Username Or Password'
            );
             
           }
         })
         .catch((error)=>{
          this.dropdown.alertWithType(
            'warn',
            'No Internet Access',
            'Unable to reach the server. Please make sure you are connected to the internet'
          );
 
         });
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

     if (!this.state.fontLoaded) {
     
      return (<ActivityIndicator
        animating={true}
        style={styles.indicator}
        size="large"
      />);
  }
  else{
   
  return (

   <Container style={{backgroundColor:"#fff"}}>
   <ImageBackground
  source={require('../../img/bgl.png')}
  style={{width: '100%', height: '100%' ,resizeMode:"conntain"}}
>  
     {/* <image source={require('../../img/bgl.png')} style={{flex:1,resizeMode:"contain"}}></image> */}
      <StatusBar barStyle="light-content"/>
  
<Content>
      <Grid  style={{padding:wp('5%'),marginTop:wp('24%'),height:hp('100%'),backgroundColor:'transperent',borderTopLeftRadius:wp('5%'),borderTopRightRadius:wp('5%'),marginLeft:wp('10%'),marginRight:wp('10%'),borderBottomLeftRadius:wp('5%'),borderBottomRightRadius:wp('5%')}}  >
  <Row style={{justifyContent:"center",height:hp('10%'),alignItems:"center",borderTopLeftRadius:wp('3%'),borderTopRightRadius:wp('3%'),paddingTop:wp('5%')}}>
     
  <Thumbnail square  large source={require("../../img/logow.png")}  style={{resizeMode:"contain",width:wp('70%'),height:hp('70%'),marginBottom:wp('15%')}} /> 
  </Row>
   <Row style={{paddingLeft:wp('3%'),height:"auto",paddingTop:wp('10%')}}>
        
        <Text style={{color:"#343333",fontWeight:"500",alignSelf:"flex-start",fontSize:wp('5%'),fontFamily:"manjari"}}>Login</Text>
      
    </Row>

      <Row style={{height:"auto",alignItems:"center",marginTop:wp('2%'),justifyContent:"center",paddingLeft:wp('3%'),paddingRight:wp('3%')}}> 
     
      <Item>

            <Icon active name='user'  style={{color:"#343333",fontSize:wp('5%')}} type="FontAwesome5" />
            <Input style={{fontSize:wp('4%'),fontFamily:"manjari"}}  placeholder='Username' onChangeText={(e)=> this.state.username = e} />
          </Item>
      </Row>
      
      <Row style={{height:"auto",marginTop:wp('3%'),alignItems:"center",justifyContent:"center",paddingLeft:wp('3%'),paddingRight:wp('3%')}}> 
     
     <Item>

           <Icon active name='key'  style={{color:"#343333",fontSize:wp('5%')}} type="FontAwesome5" />
           <Input style={{fontSize:wp('4%'),fontFamily:"manjari"}}  onChangeText={(e)=> this.state.password = e} placeholder='Password' secureTextEntry/>
         </Item>
         
     </Row>
     <Row style={{height:"auto",marginTop:wp('6%'),alignItems:"center",justifyContent:"center",padding:wp('3%')}}> 
 <Col>
 <Button    onPress={ this.navigateFunc } block style={{backgroundColor:"#26306E",height:hp('6%'),borderRadius:wp('2%')}} >
            <Text style={{fontSize:wp('5%'),fontFamily:"manjari",color:"#fff",textTransform:"capitalize"}}>Login</Text>
          </Button>
 </Col>

    </Row>

    <Row style={{height:hp('100%'),alignContent:"center",alignItems:"center",height:"auto",alignItems:"center",justifyContent:"center",paddingLeft:wp('3%'),paddingRight:wp('3%'),MarginTop:wp('10%'),borderBottomLeftRadius:wp('5%'),borderBottomRightRadius:wp('5%')}}> 
 <Col style={{marginTop:wp('10%')}}>
 
           <Icon name="fingerprint" style={{fontSize:wp('15%'),color:'#26306E',alignSelf:"center"}} type="FontAwesome5" onPress={
            this.state.compatible
              ? this.checkForBiometrics
              : this.showIncompatibleAlert
          }></Icon>
          
          <Text style={{alignSelf:"center",color:"#343333",marginTop:wp('2%'),fontSize:wp('3.5%')}}>Login With Touch ID</Text>
 </Col>

    </Row>
    {/* <Row style={{marginTop:wp('12%'),width:wp('30%'),alignSelf:"center",height:wp('12%'),marginBottom:wp('7%')}} onTouchStart={()=>{ Linking.openURL('http://readsschoolandcollege.edu.pk/~readsschoolandco/readsform/ALevelForm')} }>
      <Col>
      <Thumbnail style={{alignSelf:"center",width:wp('30%'),resizeMode:"contain"}} square   source={require("../../img/admission.png")}  /> 
      </Col>
    </Row> */}

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
        </ImageBackground>
    </Container> 
   
  );
}

}
}


  
