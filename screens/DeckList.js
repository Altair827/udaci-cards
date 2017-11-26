import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class DeckList extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('DeckScreen', {name: 'Lucy'})}
          title="Open Deck"
        />
      </View>
    )
  }
};
