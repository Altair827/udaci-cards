import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { FetchAllQuestions } from '../actions/CardActions'
import CustomizableButton from '../components/CustomizableButton'

class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deck : this.props.navigation.state.params.deck,
      isQuestionVisible : true
    }
    this.props.FetchAllQuestions(this.state.deck.key);
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  render() {

    const questionsRetrived = this.props.questions !== null;

    return (
      <View style={styles.mainContainer}>

        { questionsRetrived ?

          <View style={styles.mainContainer}>

            <View style={styles.questionTrackerContainer}>
              <Text style={styles.questionTrackerText}>{'1/' + this.state.deck.QuestionsCount}</Text>
            </View>

            <View style={styles.cardContainer}>

              <View style={[styles.QuestionContainer,{display : this.state.isQuestionVisible ? 'flex' : 'none'}]}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{this.props.questions[0].Question}</Text>
                </View>
                <View style={styles.flipContainer}>
                  <Text onPress={() => this.setState({isQuestionVisible : false})} style={styles.flipButton}>Show Answer</Text>
                </View>
              </View>

              <View style={[styles.AnswerContainer,{display : this.state.isQuestionVisible ? 'none' : 'flex'}]}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{this.props.questions[0].Answer}</Text>
                </View>
                <View style={styles.flipContainer}>
                  <Text onPress={() => this.setState({isQuestionVisible : true})} style={styles.flipButton}>Go Back</Text>
                </View>
              </View>

            </View>

            <View style={styles.controlConatiner}>
              <CustomizableButton
                onPress={() => {}}
                buttonStyle={[styles.button,styles.correctButton]}
                textStyle={styles.correctText}
                text="Correct"
              />

              <CustomizableButton
                onPress={() => {}}
                buttonStyle={[styles.button,styles.incorrectButton]}
                textStyle={styles.incorrectText}
                text="Incorrect"
              />
            </View>
          </View>

          :

          <ActivityIndicator
               animating={!questionsRetrived}
               color='#bc2b78'
               size="large"
               style={styles.loader}
          />

        }

      </View>
    )
  }
};

const window = Dimensions.get('window');

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
  },
  loader : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  cardContainer : {
    flex : 2,
    justifyContent : 'center',
    alignItems : 'center',
    elevation : 2,
    margin : 8,
    borderRadius : 3
  },
  controlConatiner : {
    flex : 2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  button : {
    width : window.width / 2,
    height : 60,
    margin : 10,
    justifyContent : 'center',
    alignItems : 'center',
    elevation : 2,
    borderRadius : 3
  },
  correctButton : {
    backgroundColor : '#4CAF50'
  },
  correctText : {
    color : 'white',
    fontSize : 24
  },
  incorrectText : {
    color : 'white',
    fontSize : 24
  },
  incorrectButton : {
    backgroundColor : '#d32f2f'
  },
  cardText : {
    fontSize : 28
  },
  flipButton : {
    fontSize : 16,
    color : '#D500F9'
  },
  flipContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  cardTextContainer : {
    margin : 16,
    flex : 4,
    justifyContent : 'center',
    alignItems : 'center'
  },
  QuestionContainer : {
    flex : 1
  },
  AnswerContainer : {
    flex : 1
  }
})

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
