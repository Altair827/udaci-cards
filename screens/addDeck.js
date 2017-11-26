import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class AddDeck extends React.Component {
  static navigationOptions = {
    title: 'Add Deck'
  }
  render() {
    return (
      <View>
        <Text>
          Add Deck
        </Text>
      </View>
    )
  }
};
