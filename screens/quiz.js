import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { FetchAllQuestions } from '../actions/CardActions'

class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deck : this.props.navigation.state.params.deck
    }
    this.props.FetchAllQuestions(this.state.deck.key);
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  render() {
    return (
      <View>
        <Text>
          {JSON.stringify(this.props.questions)}
        </Text>
      </View>
    )
  }
};

const mapStateToProps = ({ CardReducer }) => {
  return {
    questions : CardReducer.ActiveDeckQuestions
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAllQuestions : (deckKey) => dispatch(FetchAllQuestions(deckKey))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz);
