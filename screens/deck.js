import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableNativeFeedback, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import CustomizableButton from '../components/CustomizableButton'

class Deck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      params : this.props.navigation.state.params
    }
  }

  componentWillMount(){
    this.props.navigation.setParams({
      title: this.props.decks[this.state.params.key].Title
    })
  }

  static navigationOptions = ({ navigation  }) => ({
    title: navigation.state.params !== undefined ? navigation.state.params.title : 'Deck'
  })

  render() {

    const params = this.state.params;

    const deck = this.props.decks[params.key];

    return (
      <View style={styles.mainContainer}>

        <View style={styles.deckDetailsContainer}>
          <Text style={styles.title}>{deck.Title}</Text>
          <Text style={styles.details}>{deck.QuestionsCount} Cards</Text>
        </View>

        <View style={styles.controlsContainer}>

          <CustomizableButton
            onPress={() => this.props.navigation.navigate('CardScreen', {name: 'Lucy'})}
            buttonStyle={[styles.button,styles.startButton,{display : deck.QuestionsCount > 0 ? 'flex' : 'none'}]}
            textStyle={styles.startText}
            text="Start Quiz"
          />

          <CustomizableButton
            onPress={() => this.props.navigation.navigate('AddCardScreen', {deckKey: params.key})}
            buttonStyle={[styles.button,styles.addButton]}
            textStyle={styles.addText}
            text="Add Card"
          />

        </View>
      </View>
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
  deckDetailsContainer : {
    flex : 2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  controlsContainer : {
    flex : 1,
    justifyContent : 'flex-start',
    alignItems : 'center'
  },
  title : {
    fontSize : 48,
    color : '#263238',
    margin : 16
  },
  details : {
    fontSize : 24,
    color : '#607D8B',
    margin : 2
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
  startButton : {
    backgroundColor : '#9C27B0'
  },
  startText : {
    color : 'white',
    fontSize : 24
  },
  addText : {
    color : 'white',
    fontSize : 24
  },
  addButton : {
    backgroundColor : '#00B0FF'
  }
})

const mapStateToProps = ({ DeckReducer }) => {
  return {
    decks : DeckReducer.decks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Deck);
