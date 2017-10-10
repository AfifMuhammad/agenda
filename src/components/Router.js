import React, { Component } from 'react'
import { Navigator } from 'react-native-deprecated-custom-components';
import {
   StyleSheet,
   Text,
   TouchableOpacity
} from 'react-native'


import Login from './login/Login'
import Main from './main/Main'
import Add from './add/Add'

export default class Router extends Component {

   render() {
      return (
         <Navigator
            initialRoute = {{ name: 'Login', title: 'Login' }}
            renderScene = { this.renderScene }
         />
      );
   }
   renderScene(route, navigator) {
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
            <Main
               navigator = {navigator}
               {...route.passProps} 
            />
         )
      }
      if(route.name == 'Add') {
        return (
           <Add
              navigator = {navigator}
              {...route.passProps} 
           />
        )
     }
   }
}



