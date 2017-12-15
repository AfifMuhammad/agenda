import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Calendar from './Calendar'
//import Head from './Head';

export default class Main extends Component{

  
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar token = {this.props.token} username = {this.props.username} _goToDetail = {this.goToDetail.bind(this)}/>
          <TouchableOpacity style={styles.fab} onPress={this.goToAdd}>
            <Text style ={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  goToAdd = () => {
    this.props.navigator.push({
       name: 'Add',
       title: 'Add',
       token : this.props.token,
       username : this.props.username
    });
 }

 goToDetail(id){
  this.props.navigator.push({
     name: 'Detail',
     title: 'Detail',
     token : this.props.token,
     username : this.props.username,
     idA : id
  });
}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop : 0,
  },
  Header: {
    flex: 1
  },
  calendar: {
    flex: 1,
    marginTop : 75,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#006400',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  plus: {
    color: '#ffffff',
    textAlign:'center',
    fontSize: 40
  }
});