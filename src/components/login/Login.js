
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Button from './Button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.logoConten}>
            <Image
             style = {styles.logo}
             source={require('../images/logo.png')} />
          <Text style = {styles.titleApp}>OPO TO IKI?</Text>
          </View>
          <LoginForm style ={{flex:0}}/>
          <Button goToMain = {this.goToMain}/>
      </View>
    );
  }
  openMenu = () =>{
    alert("Menu button pressed!")
  }
  goToMain = () => {
    this.props.navigator.push({
       name: 'Main',
       title: 'Main',
       openMenu: this.openMenu
    });
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop : 0,
  },
  logoConten:{
    flexGrow :1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleApp: {
    width : 200,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color :'#000000'
  },
  logo:{
    marginTop : 150,
    width:150,
    height: 200
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
