import React from 'react'
import { Text, View, StyleSheet, Button, AsyncStorage, Dimensions,TouchableNativeFeedback, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import DeckPreview from '../components/DeckPreview'

export default class DeckList extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Decks'
  }

  getDecks = () => {
    AsyncStorage.getItem('Decks').then((value) => {});
  }

  render() {
    return (
      <View>

        <DeckPreview navigation={this.props.navigation} />
        <DeckPreview navigation={this.props.navigation} />
        <DeckPreview navigation={this.props.navigation} />

      </View>
    )
  }
};
