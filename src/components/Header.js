import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
 } from 'react-native'

 export default class Header extends Component{
    render(){
        return(
          <View style = {styles.buttonContainer}>
            <Text style ={styles.text}>{this.props.username}</Text>
          </View>
        );
    }
 }

 const styles = StyleSheet.create({
  buttonContainer:{
    backgroundColor: "#006400",
    paddingVertical:10,
    minWidth:300,
    height : 60,
    paddingHorizontal : 2
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    textAlign:'center'
  }
});