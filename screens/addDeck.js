import React from 'react'
import { connect } from 'react-redux'
import { Text, View, KeyboardAvoidingView, TextInput, Button, StyleSheet,Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CreateNewDeck,ResetIsNewDeckCreated } from '../actions/DeckActions'

class AddDeck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deckName: ''
    };
  }
  static navigationOptions = {
    title: 'Add Deck'
  }
  componentWillReceiveProps(newProps){
    if(newProps.isNewDeckCreated === true){

      Alert.alert(
        'Deck Alert',
        '"' + this.state.deckName + '" has been created successfully',
        [
          {text: 'OK', onPress: () => this.props.navigation.goBack()}
        ]
      );

      this.setState({
        deckName: ''
      }, () => {
        this.props.ResetIsNewDeckCreated();
      });

    }
  }

  ConfirmNewDeckCreation = () => {
    Alert.alert(
      'Deck Alert',
      'Do you want to create a new deck "' + this.state.deckName + '"?',
      [
        {text: 'Yes', onPress: () => this.props.CreateNewDeck(this.state.deckName)},
        {text: 'Review',style:'cancel'}
      ]
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={Styles.MainContainer}>
        <Text
            style={{fontSize : 24}}
        >Name Your New Deck</Text>
        <TextInput
          style={Styles.NewDeckInput}
          autoCapitalize='words'
          underlineColorAndroid='#448AFF'
          selectionColor='#448AFF'
          onChangeText={(deckName) => this.setState({deckName})}
          value={this.state.deckName}
        />
        <Button
          onPress={() => this.ConfirmNewDeckCreation()}
          title="Add Deck"
        />
      </KeyboardAvoidingView>
    )
  }
}

const Styles = StyleSheet.create({
  MainContainer : {
    flex : 1,
    justifyContent  : 'center',
    alignItems : 'center',
  },
  NewDeckInput : {
    width : 250,
    height : 50,
    margin : 10,
    paddingRight : 6,
    paddingLeft : 6,
    padding : 3,
    fontSize : 16
  }
});


const mapStateToProps = ({ DeckReducer }) => {
  return {
    isNewDeckCreated : DeckReducer.isNewDeckCreated
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    CreateNewDeck : (deckName) => dispatch(CreateNewDeck(deckName)),
    ResetIsNewDeckCreated : () => dispatch(ResetIsNewDeckCreated())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
