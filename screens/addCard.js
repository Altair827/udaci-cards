import React from 'react'
import { Text, View, StyleSheet,TextInput, Dimensions, Alert, CheckBox,
          KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import CustomizableButton from '../components/CustomizableButton'
import { connect } from 'react-redux'
import { AddNewCard, ResetIsNewCardCreated } from '../actions/CardActions'

class AddCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      questionContainerStyle : {
        elevation : 0,
        borderColor : '#4fc3f7'
      },
      answerContainerStyle : {
        elevation : 0,
        borderColor : '#4fc3f7'
      },
      question : '',
      answer : '',
      isCorrectAnswer : false,
      params : this.props.navigation.state.params,
      deck : this.props.decks[this.props.navigation.state.params.deckKey]
    }
  }

  static navigationOptions = {
    title: 'Add Card'
  }

  componentWillReceiveProps(newProps){
    if(newProps.isNewCardCreated === true){
      this.props.ResetIsNewCardCreated();
      this.props.navigation.goBack();
    }
  }

  setInputContainerStyle = (input) => {
    this.setState({
      [input] : {
        elevation : 2,
        borderColor : '#0277bd'
      }
    })
  }

  resetInputContainerStyle = (input) => {
    this.setState({
      [input] : {
        elevation : 0,
        borderColor : '#4fc3f7'
      }
    })
  }

  addCard = () => {
    if(this.state.question === '' || this.state.answer === ''){
      Alert.alert('Card Alert','Fields shouldn\'t be left empty');
    }
    else{
      Alert.alert(
        'Card Alert',
        'Do you want to add this card ?',
        [
          {text: 'Yes', onPress: () => this.AddNewCard()},
          {text: 'Review',style:'cancel'}
        ]
      );
    }
  }

  AddNewCard = () => {

    const deck = this.state.deck;

    const card = {
      Question : this.state.question,
      Answer : this.state.answer,
      IsCorrect : this.state.isCorrectAnswer
    }

    this.props.AddNewCard(deck,card);

  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
            <View style={styles.inputsContainer}>
              <Text style={styles.header}>Question</Text>
              <View style={[styles.inputContainer,this.state.questionContainerStyle]}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='words'
                  underlineColorAndroid='transparent'
                  selectionColor='#448AFF'
                  onChangeText={(question) => this.setState({question})}
                  value={this.state.deckName}
                  multiline={true}
                  placeholder='Question'
                  numberOfLines={9}
                  onFocus={() => this.setInputContainerStyle('questionContainerStyle')}
                  onBlur={() => this.resetInputContainerStyle('questionContainerStyle')}
                />
              </View>
              <Text style={styles.header}>Answer</Text>
              <View style={[styles.inputContainer,this.state.answerContainerStyle]}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='words'
                  underlineColorAndroid='transparent'
                  selectionColor='#448AFF'
                  onChangeText={(answer) => this.setState({answer})}
                  value={this.state.deckName}
                  multiline={true}
                  placeholder='Answer'
                  numberOfLines={9}
                  onFocus={() => this.setInputContainerStyle('answerContainerStyle')}
                  onBlur={() => this.resetInputContainerStyle('answerContainerStyle')}
                />
              </View>
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxText}>Is Answer Correct?</Text>
              <CheckBox
                onValueChange={(isCorrectAnswer) => this.setState({isCorrectAnswer})}
                value={this.state.isCorrectAnswer}
              />
            </View>
            <View style={styles.controlContainer}>
              <CustomizableButton
                onPress={() => this.addCard()}
                buttonStyle={styles.addCardButton}
                textStyle={styles.buttonText}
                text="Add Card"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer : {
    flex : 1,
    elevation : 4,
    borderRadius : 5,
    margin : 8
  },
  inputsContainer : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'space-around'
  },
  input : {
    width : 250,
    height : 50,
    margin : 10,
    paddingRight : 6,
    paddingLeft : 6,
    padding : 3,
    fontSize : 16,
    flex : 1,
    justifyContent : 'flex-start'
  },
  inputContainer : {
    borderRadius : 7,
    margin : 5,
    borderWidth : 1,
    flex : 1
  },
  controlContainer : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  addCardButton : {
    width : window.width / 2,
    height : 60,
    margin : 10,
    justifyContent : 'center',
    alignItems : 'center',
    elevation : 2,
    borderRadius : 3,
    backgroundColor : '#03a9f4'
  },
  buttonText : {
    color : 'white',
    fontSize : 24
  },
  header : {
    fontSize : 20,
    alignSelf : 'flex-start',
    margin : 10
  },
  checkboxContainer : {
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  checkboxText : {
    color : 'black',
    fontSize : 24
  }
})

const mapStateToProps = ({ CardReducer, DeckReducer }) => {
  return {
    isNewCardCreated : CardReducer.isNewCardCreated,
    decks : DeckReducer.decks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    AddNewCard : (deck,card) => dispatch(AddNewCard(deck,card)),
    ResetIsNewCardCreated : () => dispatch(ResetIsNewCardCreated())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCard);
