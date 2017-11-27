import React from 'react'
import { Text, TouchableNativeFeedback, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class ControlButton extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.onPress()}
      >
        <Text style={this.props.style}>
          <MaterialIcons name={this.props.icon} color={this.props.iconColor} />
          {this.props.text}
        </Text>
      </TouchableNativeFeedback>
    )
  }
};
