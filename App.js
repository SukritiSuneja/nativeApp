import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AppNavigation from './src/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/index';



export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        {/* <NavigationContainer> */}
          <AppNavigation />
        {/* </NavigationContainer> */}
      </Provider>
    );
  }
}
