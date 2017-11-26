import React from 'react'
import { Text, View, StyleSheet,Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class Deck extends React.Component {
  static navigationOptions = {
    title: 'Deck'
  }
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('CardScreen', {name: 'Lucy'})}
          title="Start Deck"
        />
        <Button
          onPress={() => this.props.navigation.navigate('AddCardScreen', {name: 'Lucy'})}
          title="Add Card"
        />
      </View>
    )
  }
};
