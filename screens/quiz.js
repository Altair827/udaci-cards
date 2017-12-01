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
      <View style={styles.mainContainer}>
        <View style={styles.questionTrackerContainer}>
          <Text style={styles.questionTrackerText}>{'1/' + this.state.deck.QuestionsCount}</Text>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  mainContainer :{
    flex : 1
  },
  questionTrackerContainer : {
    alignItems : 'flex-start',
    margin : 10,
    padding : 5,
    justifyContent : 'center'
  },
  questionTrackerText : {
    fontSize : 20,
    color : '#4caf50'
  }
})

const mapStateToProps = ({ CardReducer }) => {
  return {
    questions : Object.values(CardReducer.ActiveDeckQuestions)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchAllQuestions : (deckKey) => dispatch(FetchAllQuestions(deckKey))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz);
