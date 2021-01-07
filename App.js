import React from 'react';
import Dashboard from './src/screens/Dashboard/Dashboard'
import Login from './src/screens/Login/Login'
import test from './src/screens/Login/test'
import Profile from './src/screens/Profile/Profile'
import Attendance from './src/screens/Attendance/Attendance'
import Class_Attendance from './src/screens/Attendance/Class1.js'
import Fee from './src/screens/Fee/Fee'
import Fee_Desc  from './src/screens/Fee/Fee_Desc'
import Lms from './src/screens/Lms/Lms'
import Lms_1 from './src/screens/Lms/Lms1'
import Attendance_Gate from './src/screens/Attendance/gate.js'
import Annoucements from './src/screens/Annoucements/Annoucements.js'
import Contact from './src/screens/Contact/Contact.js'
import Result from './src/screens/Result/Result'
import Communication from './src/screens/Communication/Communication'
import Schedule from './src/screens/Schedule/Schedule'
import Schedule1 from './src/screens/Schedule/Schedule1'
import Choose from './src/screens/Choose/Choose'
import Parent_Dashboard from './src/screens/Parent_Dashboard/Parent_Dashboard'
import Setting from './src/screens/Setting/Setting'
import Password from './src/screens/Setting/Password'
import Library from './src/screens/Library/Library'
import Book_detail from './src/screens/Library/Book_detail'
import Library_log from './src/screens/Library/Library_log'
import Canteen from './src/screens/Canteen/Canteen'
import Canteen_log from './src/screens/Canteen/Canteen_log'
import Chat from './src/screens/Chat/Chat'
import Teacher from './src/screens/Teacher/Teacher'


import { zoomOut, zoomIn } from 'react-navigation-transitions';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';

class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'manjari-bold': require('./assets/Fonts/Manjari-Bold.ttf'),
    });
  }

}

  const StackNavigator = createStackNavigator ({
    Home: {screen: Login},
    Teacher : {screen: Teacher},
    Chat : {screen: Chat},
    Book_detail : {screen: Book_detail},
    Library_log : {screen:Library_log},
    Schedule1 : {screen:Schedule1},
    Password:{screen:Password},
    Dashboard: {screen: Dashboard},
    Profile: {screen:Profile},
     Attendance: {screen:Attendance},
     Lms : {screen: Lms},
    Class_Attendance: {screen: Class_Attendance},
    Lms_1 : {screen:Lms_1},
    Attendance_Gate: {screen:Attendance_Gate},
     Annoucements: {screen:Annoucements},
     Contact:{screen:Contact},
     Result: {screen:Result},
     Fee: {screen:Fee},
     Fee_Desc:{screen: Fee_Desc},
     Communication:{screen:Communication},
     Schedule : {screen:Schedule},
     //Login:{screen:Login},
     Parent_Dashboard:{screen:Parent_Dashboard},
     Setting:{screen:Setting},
     Library:{screen:Library},
     Canteen:{screen:Canteen},
     Canteen_log:{screen:Canteen_log}
  },

  {
    headerMode: 'none',
    initialRouteName: 'Home',
    transitionConfig: () => zoomIn()
  }
  )
  

  const Navigator = createAppContainer(StackNavigator);

  export default Navigator;



  

