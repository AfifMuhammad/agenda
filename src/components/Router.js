import React, { Component } from 'react'
import { Navigator } from 'react-native-deprecated-custom-components';
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   BackHandler
} from 'react-native'


import Login from './login/Login'
import Main from './main/Main'
import Add from './add/Add'
import Detail from './edit/Detail'

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token : null
    };
  }

  

   render() {
      return (
         <Navigator
            initialRoute = {{ name: 'Login', title: 'Login', token : 'kosong' }}
            renderScene = { this.renderScene.bind(this) }
         />
      );
   }

   renderScene(route, navigator) {
    let component;
    
      if(route.name == 'Login') {
         return (
            <Login
               navigator = {navigator}
               {...route.passProps} 
            />
         )
      }
      if(route.name == 'Main') {
         return (
           component =
            <Main
               navigator = {navigator}
               {...route.passProps} 
               token = {route.token}
               username = {route.username}
               nama = {route.nama}
            />
         )
      }
      if(route.name == 'Add') {
        return (
          component =
           <Add
              navigator = {navigator}
              {...route.passProps} 
              token = {route.token}
              username = {route.username}
           />
        )
     }
    if(route.name == 'Detail') {
      return (
        component =
         <Detail
            navigator = {navigator}
            {...route.passProps} 
            token = {route.token}
            username = {route.username}
            idA = {route.idA}
         />
      )
    }

   }
}



