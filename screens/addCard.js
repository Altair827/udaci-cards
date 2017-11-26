import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class AddCard extends React.Component {
  static navigationOptions = {
    title: 'Add Card'
  }
  render() {
    return (
      <View>
        <Text>
          Add Card
        </Text>
      </View>
    )
  }
};
