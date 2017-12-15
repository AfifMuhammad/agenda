import React, { Component } from 'react';
import {
  Text,
  BackHandler,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default class Edit extends Component{
  constructor(props){
    super(props)
    this.state = {
      jumlah:null, tgl_mulai:null, tgl_selesai:null, isi_agenda:null,
      jam_mulai : null, jam_selesai : null
    };
  }

  componentWillMount(){
    //console.log(this.props.token, this.props.username)
    
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

    })
    .done();
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop()
      return true;
    });
    console.log(this.props.idA)
  }

  
    render() {
      
      return (
        <View>
          <View style={styles.container}>
            <Text>ISI AGENDA</Text>
            <TextInput
              value = {this.state.isi_agenda}
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              autoCorrect = {false}
              style = {styles.input}
              onChangeText={(isi_agenda) => this.setState({isi_agenda})}
              >
            </TextInput>

            <Text>TANGGAL MULAI</Text>
            <TextInput
              value = {this.state.tgl_mulai}
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              autoCorrect = {false}
              style = {styles.input}
              onChangeText={(tgl_mulai) => this.setState({tgl_mulai})}
              >
            </TextInput>

            <Text>TANGGAL SELESAI</Text>
            <TextInput
              value = {this.state.tgl_selesai}
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              autoCorrect = {false}
              style = {styles.input}
              onChangeText={(tgl_selesai) => this.setState({tgl_selesai})}
              >
            </TextInput>

            <TextInput
              placeholder = "Tempat"
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              autoCorrect = {false}
              style = {styles.input}
              //onChangeText={(tempat) => this.setState({tempat})}
              >
            </TextInput>

            <Button _submitData = {this._confirm}/>
            
            </View>
        </View>
      ); 
    }
}

const styles = StyleSheet.create({
  container: {
    padding :20,
    marginBottom : 100,
    marginTop : 100
  },
  input:{
    minWidth:300,
    flexWrap:'wrap',
    height : 40,
    paddingHorizontal : 10,
    marginBottom : 10,
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
  submitbutton:{
    color: '#ffffff',
    textAlign:'center',
    fontWeight:'700'
  }
});