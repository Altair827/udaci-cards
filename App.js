import React from 'react'
import { View } from 'react-native'
import Home from './screens/home'
import CustomStatusBar from './components/statusbar'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <CustomStatusBar />
        <Home />
      </View>
    );
  }
};
