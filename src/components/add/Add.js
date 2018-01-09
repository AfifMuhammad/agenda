import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  BackHandler,
  Alert
} from 'react-native';
import Button from './Button';
import Header from '../Header';

export default class Add extends Component{
  constructor(props){
    super(props)
    this.backAndroidHandler = this.backAndroidHandler.bind(this);
    //this._submitData = this._submitData.bind(this);
    this._confirm = this._confirm.bind(this);
    this.state = {
      date:null, dateSelesai:null, agenda:null, tempat: null,
      jam_mulai : null, jam_selesai : null, fulldate: null,fulldateS:null
    }
  }

  componentWillMount(){
    const date = new Date();
    var d = date.toISOString();

    this.setState({
      date : d.substr(0,10), dateSelesai : d.substr(0,10), 
      jam_mulai : d.substr(11,5), jam_selesai: d.substr(11,5)
    })


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
            <TextInput
              placeholder = "Agenda"
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              autoCorrect = {false}
              style = {styles.input}
              onChangeText={(agenda) => this.setState({agenda})}
              >
            </TextInput>

            <Text>TANGGAL MULAI</Text>
            <DatePicker
              style={styles.input}
              date={this.state.fulldate}
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              minuteInterval={10}
              onDateChange={(datetime) => {
                this.setState({
                  fulldate: datetime ,date: datetime.substr(0,10), jam_mulai: datetime.substr(11,5)
                  })
                  }}
            />

            <Text>TANGGAL SELESAI</Text>
            <DatePicker
              style={styles.input}
              date={this.state.fulldateS}
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              minuteInterval={10}
              onDateChange={(datetimes) => {
                this.setState(
                  {fulldateS: datetimes ,dateSelesai: datetimes.substr(0,10), jam_selesai: datetimes.substr(11,5)
                  });
                  }}
            />

            {/* <TextInput
              placeholder = "Tempat"
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              autoCorrect = {false}
              style = {styles.input}
              onChangeText={(tempat) => this.setState({tempat})}
              >
            </TextInput> */}

            <Button _submitData = {this._confirm}/>
            
            </View>
        </View>
      );
      
    }

    backAndroidHandler(){
      this.props.navigator.pop()
      return true;
    } 


    _confirm(){
      Alert.alert(
        'Tambah Agenda',
        'Tambahkan Agenda ?',
        [
          {text: 'Batal'},
          {text: 'Ya', onPress: this._submitData.bind(this)},
        ],
      )
    }

    _submitData = () =>{
      fetch(`http://rpl.camara.co.id/api/agenda/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this.props.token
        },
        body: `username=${this.props.username}&tgl_mulai=${this.state.date}&tgl_selesai=${this.state.dateSelesai}&isi_agenda=${this.state.agenda}&jam_mulai=${this.state.jam_mulai}&jam_selesai=${this.state.jam_selesai}`
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.goToMain();
      }).catch(error => {
        alert(error);
      });
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