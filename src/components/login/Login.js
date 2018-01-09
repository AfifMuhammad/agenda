import React, { Component } from 'react';
import Button from './Button';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  StatusBar
} from 'react-native';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this._userLogin = this._userLogin.bind(this);

    this.state = {user: '', pass: '', status : '', tkn : '', nama: ''};
    
} 

  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.logoConten}>
            <Image
             style = {styles.logo}
             source={require('../images/logoapp.png')} />
          <Text style = {styles.titleApp}>AGENDA UIN SUKA</Text>
          </View>
          {/* <LoginForm style ={{flex:0}}/> */}

          <KeyboardAvoidingView behavior = "padding" style={styles.container2}>
          <StatusBar
            barStyle = "light-content"
          />
            <TextInput
              placeholder = "NIM"
              placeholderTextColor = '#cccccc'
              returnKeyType="next"
              //keyboardType = "numeric"
              autoCorrect = {false}
              autoCapitalize = "none"
              onSubmitEditing = {()=> this.passwordInput.focus()}
              onChangeText={(user) => this.setState({user})}
              style = {styles.input}>
            </TextInput>

            <TextInput
              placeholder ="Password"
              placeholderTextColor ='#cccccc'
              secureTextEntry
              returnKeyType="go"
              ref = {(input)=>this.passwordInput = input}
              onChangeText={(pass) => this.setState({pass})}
              style = {styles.input}>
            </TextInput>
            <Button _userLogin = {this._userLogin}/>
          </KeyboardAvoidingView>
      </View>
    );
  }

  token() {
      fetch(`http://rpl.camara.co.id/rest/generate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${this.state.user}&password=${this.state.pass}`
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({status: responseData.status});
        if(this.state.status=="0"){
          console.log("salah")
        }
        else{
          this.setState({tkn: responseData.token});
        //this.goToMain();
        }
      }).catch(error => {
        console.log(error)
      });
  }

  generate() {
    fetch(`http://rpl.camara.co.id/rest/generate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=afif&password=afa`
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({tkn: responseData.token});
      console.log(this.state.tkn)
      this.goToMain();
    }).catch(error => {
      console.log(error)
    });
}

  _userLogin() {
    fetch(`http://mobile.learning.uin-suka.ac.id/tmp900/login?auth=8f304662ebfee3932f2e810aa8fb628736&username=${this.state.user}&password=${this.state.pass}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({status: responseData.data[0].success});
      if(this.state.status=="false"){
        alert("Username/Password salah")
      }
      else{
        this.setState({nama: responseData.data[0].nama});
        this.generate();
      }
    }).catch(error => {
      alert(error);
    });
}

  goToMain = () => {
    console.log(this.state.nama)
    this.props.navigator.push({
       name: 'Main',
       title: 'Main',
       token : this.state.tkn,
       username : this.state.user,
       nama: this.state.nama
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
  container2: {
    padding :20,
    marginBottom : 100,
  },
  input:{
    minWidth:300,
    flexWrap:'wrap',
    height : 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal : 10,
    color:'#000',
    marginBottom : 10,
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
    width:200,
    height: 200
  }
});
