import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class Card extends React.Component {
  static navigationOptions = {
    title: 'Answer Card'
  }
  render() {
    return (
      <View>
        <Text>
          Card
        </Text>
      </View>
    )
  }
};