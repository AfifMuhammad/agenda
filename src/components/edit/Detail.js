import React, { Component } from 'react';
import {
  Text,
  BackHandler,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import Button from './Button';
import Header from '../Header';

export default class Edit extends Component{
  constructor(props){
    super(props)
    this._confirm = this._confirm.bind(this);
    this.backAndroidHandler = this.backAndroidHandler.bind(this);
    this.state = {
      jumlah:null, tgl_mulai:null, tgl_selesai:null, isi_agenda:null,
      jam_mulai : null, jam_selesai : null
    };
  }

  componentWillMount(){
    
    fetch(`http://rpl.camara.co.id/api/agenda/${this.props.username}`, {
      method: "GET",
      headers: {
        'Authorization': this.props.token
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      
      this.setState({jumlah : Object.keys(responseData.data).length})

      for (let j = 0; j < this.state.jumlah; j++) {
        if(responseData.data[j].id_agenda==this.props.idA){
          this.setState({
            tgl_mulai:responseData.data[j].tgl_mulai, 
            tgl_selesai:responseData.data[j].tgl_selesai,
            isi_agenda:responseData.data[j].isi_agenda,
            jam_mulai:responseData.data[j].jam_mulai,
            jam_selesai:responseData.data[j].jam_selesai
          })
        }
      }

    }).catch(error => {
      alert(error);
    });
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.backAndroidHandler);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroidHandler);
  }

 

    render() {
      
      return (
        <View>
          <Header username = {this.props.username}/>
          <View style={styles.container}>
            <Text>ISI AGENDA :</Text>
            <View style={styles.input}>
                <Text>
                    {this.state.isi_agenda}
                </Text>
            </View>

            <Text>WAKTU MULAI :</Text>
            <View style={styles.input}>
                <Text>
                    {this.state.tgl_mulai}  ({this.state.jam_mulai})
                </Text>
            </View>

            <Text>WAKTU SELESAI :</Text>
            <View style={styles.input}>
                <Text>
                    {this.state.tgl_selesai}  ({this.state.jam_selesai})
                </Text>
            </View>

            <Button _hapus = {this._confirm}/>
            
            </View>
        </View>
      ); 
    }

    _confirm(){
      Alert.alert(
        'Hapus',
        'Hapus Agenda ?',
        [
          {text: 'Batal'},
          {text: 'Ya', onPress: this.hapus.bind(this)},
        ],
      )
    }

    hapus = () =>{
      fetch(`http://rpl.camara.co.id/api/agenda/${this.props.idA}`, {
        method: "DELETE",
        headers: {
          'Authorization': this.props.token
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.goToMain();
  
      })
      .done();
    }

    backAndroidHandler(){
      this.props.navigator.pop()
      return true;
    } 

    goToMain = () => {
      this.props.navigator.push({
         name: 'Main',
         title: 'Main',
         token : this.props.token,
         username : this.props.username
      });
    }
}

const styles = StyleSheet.create({
  container: {
    padding :20,
    marginBottom : 100
  },
  input:{
    minWidth:300,
    flexWrap:'wrap',
    height : 40,
    paddingHorizontal : 10,
    marginBottom : 10,
  }
});