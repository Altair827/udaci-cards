import React from 'react'
import { Text, TouchableNativeFeedback, Platform, View } from 'react-native'

export default class CustomizableButton extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => {this.props.onPress()}}
        background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
      >
        <View style={this.props.buttonStyle}>
          <Text style={this.props.textStyle}>
            {this.props.text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
};
