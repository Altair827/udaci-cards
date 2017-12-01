import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class Quiz extends React.Component {
  static navigationOptions = {
    title: 'Quiz'
  }
  render() {
    return (
      <View>
        <Text>
          Quiz
        </Text>
      </View>
    )
  }
};
