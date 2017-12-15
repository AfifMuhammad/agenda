import React, { Component } from 'react';
import Button from './Button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  StatusBar
} from 'react-native';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this._userLogin = this._userLogin.bind(this);

    this.state = {user: '', pass: '', status : '', tkn : ''};
    
} 

  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.logoConten}>
            <Image
             style = {styles.logo}
             source={require('../images/logo.png')} />
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
          </KeyboardAvoidingView>
          <Button _userLogin = {this._userLogin}/>
      </View>
    );
  }
  openMenu = () =>{
    Alert.alert("aaa")
  }

  _userLogin() {
      fetch(`http://rpl.camara.co.id/rest/generate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${this.state.user}&password=${this.state.pass}`
      })
      .then((response) => response.json())
      .then((responseData) => {
        // alert(
        //   JSON.stringify(responseData.status)
        // )
        this.setState({status: responseData.status});
        if(this.state.status=="0"){
          alert(JSON.stringify(responseData.message))
        }
        else{
          // alert(
          //   JSON.stringify(responseData)
          // )
          this.setState({tkn: responseData.token});
        //   this.props.navigator.push({
        //     name: 'Main',
        //     title: 'Main',
        //     openMenu: this.openMenu,
        //     token : this.state.tkn,
        //     username : this.state.user
        //  });
        this.goToMain();
        }
      })
      .done();
  }

  goToMain = () => {
    this.props.navigator.push({
       name: 'Main',
       title: 'Main',
       openMenu: this.openMenu,
       token : this.state.tkn,
       username : this.state.user
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
    width:150,
    height: 200
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
