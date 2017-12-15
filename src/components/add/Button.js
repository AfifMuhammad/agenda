import React, { Component } from 'react'
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet
} from 'react-native'

export default Button = (props) => {
    return (
       <View style = {styles.container}>
          <TouchableOpacity style = {styles.buttonContainer}
          onPress = {props._submitData}>
          <Text style ={styles.loginbutton}>SIMPAN</Text>
          </TouchableOpacity>
       </View>
    )
 }

 const styles = StyleSheet.create({
    container: {
      padding :20,
      marginBottom : 100,
    },
    buttonContainer:{
      backgroundColor: "#006400",
      paddingVertical:10,
      marginTop:15,
      marginBottom:20,
      minWidth:300,
      flexWrap:'wrap',
      height : 40,
      paddingHorizontal : 10,
    },
    loginbutton:{
      color: '#ffffff',
      textAlign:'center',
      fontWeight:'700'
    }
  });