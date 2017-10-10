/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Router from './src/components/Router';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class agenda extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('agenda', () => agenda);
