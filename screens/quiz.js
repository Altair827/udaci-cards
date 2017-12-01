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
      isQuestionVisible : true,
      currentQuestion : null,
      score : 0,
      currentQuestionCount : 0,
      isQuestionsReady : false,
      isQuizEnd : false
    }
    this.props.FetchAllQuestions(this.state.deck.key);
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  componentWillReceiveProps(newProps){
    if(typeof newProps.questions !== null && typeof this.state.currentQuestion !== null){
      this.setState({
        currentQuestion : newProps.questions[0],
        currentQuestionCount : 1,
        isQuestionsReady : true,
        isQuizEnd : false
      })
    }
  }

  answer = (bool) => {

    if(this.state.currentQuestionCount !== this.state.deck.QuestionsCount){

      this.setState((prevState) => {
        return {
          currentQuestionCount: prevState.currentQuestionCount + 1,
          currentQuestion : this.props.questions[prevState.currentQuestionCount],
          score : (bool === prevState.currentQuestion.IsCorrect) ? prevState.score + 1 : prevState.score
        };
      });

    }
    else if(this.state.currentQuestionCount === this.state.deck.QuestionsCount) {
      this.setState((prevState) => {
        return {
          currentQuestionCount: 0,
          currentQuestion : null,
          score : (bool === prevState.currentQuestion.IsCorrect) ? prevState.score + 1 : prevState.score,
          isQuestionsReady : false,
          isQuizEnd : true
        };
      });
    }

  }

  retry = () => {
    this.setState({
      currentQuestion : this.props.questions[0],
      currentQuestionCount : 1,
      isQuestionsReady : true,
      isQuizEnd : false,
      score : 0
    })
  }

  render() {

    const questionsRetrived = this.state.isQuestionsReady && !this.state.isQuizEnd;

    return (
      <View style={styles.mainContainer}>

        { questionsRetrived &&

          <View style={styles.mainContainer}>

            <View style={styles.questionTrackerContainer}>
              <Text style={styles.questionTrackerText}>{this.state.currentQuestionCount + '/' + this.state.deck.QuestionsCount}</Text>
            </View>

            <View style={styles.cardContainer}>

              <View style={[styles.QuestionContainer,{display : this.state.isQuestionVisible ? 'flex' : 'none'}]}>
                <Text style={styles.helpText}>Question</Text>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{this.state.currentQuestion.Question}</Text>
                </View>
                <View style={styles.flipContainer}>
                  <Text onPress={() => this.setState({isQuestionVisible : false})} style={styles.flipButton}>Show Answer</Text>
                </View>
              </View>

              <View style={[styles.AnswerContainer,{display : this.state.isQuestionVisible ? 'none' : 'flex'}]}>
                <Text style={styles.helpText}>Answer</Text>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{this.state.currentQuestion.Answer}</Text>
                </View>
                <View style={styles.flipContainer}>
                  <Text onPress={() => this.setState({isQuestionVisible : true})} style={styles.flipButton}>Go Back</Text>
                </View>
              </View>

            </View>

            <View style={styles.controlConatiner}>
              <CustomizableButton
                onPress={() => this.answer(true)}
                buttonStyle={[styles.button,styles.correctButton]}
                textStyle={styles.correctText}
                text="Correct"
              />

              <CustomizableButton
                onPress={() => this.answer(false)}
                buttonStyle={[styles.button,styles.incorrectButton]}
                textStyle={styles.incorrectText}
                text="Incorrect"
              />
            </View>
          </View>

        }

        {

          !this.state.isQuestionsReady && !this.state.isQuizEnd &&

          <ActivityIndicator
               animating={!questionsRetrived}
               color='#bc2b78'
               size="large"
               style={styles.loader}
          />

        }

        {
          this.state.isQuizEnd &&

            <View style={styles.scoreContainer}>

              <Text style={{fontSize : 24, margin : 15}}>Your Score Is</Text>
              <Text style={{fontSize : 40, color : '#6200EA', margin : 30}}>{this.state.score / this.state.deck.QuestionsCount * 100}%</Text>

              <CustomizableButton
                onPress={() => this.retry()}
                buttonStyle={[styles.button,{backgroundColor : '#1E88E5'}]}
                textStyle={styles.buttonText}
                text="Retry Quiz"
              />

              <CustomizableButton
                onPress={() => this.props.navigation.goBack()}
                buttonStyle={[styles.button,{backgroundColor : '#388E3C'}]}
                textStyle={styles.buttonText}
                text="Back To Deck"
              />

            </View>

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
  },
  scoreContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    elevation : 2,
    borderRadius : 4,
    margin : 5
  },
  buttonText : {
    color : 'white',
    fontSize : 24
  },
  helpText : {
    fontSize : 16,
    top : 10,
    left : 10,
    alignSelf : 'flex-start',
    color : '#009688'
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
