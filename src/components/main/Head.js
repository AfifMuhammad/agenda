import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

import { Header } from 'react-native-elements';

export default class Head extends Component{
    render(){
        return(
            <Header
            leftComponent={<Image style = {styles.foto}
             source={require('../images/afif.jpg')}/>}
            centerComponent={{ text: '15650045', style: { color: '#fff' } }} 
            rightComponent={{ icon: 'exit-to-app', color: '#fff' }}
            outerContainerStyles={{ backgroundColor: '#006400' }}
            />
        );
    }
}

const styles = StyleSheet.create({
    foto: {
        width:40,
        height: 40,
        borderRadius: 40/2
    }
})