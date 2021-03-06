import React from 'react'
import { Text, View, StyleSheet, Button, AsyncStorage,
         Dimensions,TouchableNativeFeedback, Platform,
         Alert, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import ControlButton from './ControlButtons'
import { connect } from 'react-redux'
import { EditDeckTitle, RemoveDeck } from '../actions/DeckActions'

class DeckPreview extends React.Component {

  state = {
    isControlVisible : false,
    isEditDeckName : false,
    newName : this.props.decks[this.props.deckId].Title
  }

  SetControlVisible = () => {
    this.setState({
      isControlVisible : !this.state.isEditDeckName
    })
  }

  SetEditDeckName = () => {
    this.setState({
      isEditDeckName : true
    })
  }

  HideControl = () => {
    this.setState({
      isControlVisible : false
    })
  }

  HideEditControls = () => {
    this.setState({
      isEditDeckName : false
    })
  }

  SaveEdit = () => {

    const deck = this.props.decks[this.props.deckId]

    Alert.alert(
      'Deck Alert',
      'Do you want to rename the deck "'+ deck.Title +'" to "' + this.state.newName + '"?',
      [
        {text: 'Yes', onPress: () => {
            this.props.EditDeckTitle(deck.key,this.state.newName);
            this.HideEditControls();
          }
        },
        {text: 'Review',style:'cancel'}
      ]
    );

  }

  DeleteDeck = () => {
    const deck = this.props.decks[this.props.deckId]

    Alert.alert(
      'Deck Alert',
      'Do you want to delete the deck "' + deck.Title + '" ?',
      [
        {text: 'Yes', onPress: () => {
            this.props.RemoveDeck(deck.key);
            this.HideControl();
          }
        },
        {text: 'No',style:'cancel'}
      ]
    );
  }

  EditDeckName = () => {
    this.HideControl();
    this.SetEditDeckName();
  }

  OnCardPress = () => {

    if(this.state.isEditDeckName || this.state.isControlVisible){
      this.setState({
        isControlVisible : false,
        isEditDeckName : false
      });
    }
    else {
      this.props.navigation.navigate('DeckScreen',{ key : [this.props.deckId]});
    }

  }

  render() {

    const Deck = this.props.decks[this.props.deckId];

    return (
      <TouchableNativeFeedback
        onPress={() => this.OnCardPress()}
        onLongPress={() => this.SetControlVisible()}
        background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
      >
        <View style={styles.card}>

          {this.state.isControlVisible &&
            <View>

              <ControlButton
                onPress={() => this.HideControl()}
                style={styles.closeButton}
                icon="close"
                iconColor="white"
                text="Close"
              />

              <View style={styles.controlView}>

                <ControlButton
                  onPress={() => this.EditDeckName()}
                  style={styles.editButton}
                  icon="edit"
                  iconColor="black"
                  text="Edit"
                />

                <ControlButton
                  onPress={() => this.DeleteDeck()}
                  style={styles.deleteButton}
                  icon="delete"
                  iconColor="white"
                  text="Delete"
                />

              </View>
            </View>
          }

          {
            this.state.isEditDeckName &&
            <View>
              <ControlButton
                onPress={() => this.HideEditControls()}
                style={styles.cancelButton}
                icon="close"
                iconColor="white"
                text="Cancel"
              />

              <ControlButton
                onPress={() => this.SaveEdit()}
                style={styles.saveButton}
                icon="save"
                iconColor="black"
                text="Save"
              />
            </View>

          }

          <View style={styles.alignCenter}>

            {
              this.state.isEditDeckName ?
                  <TextInput
                    style={styles.NewDeckName}
                    autoCapitalize='words'
                    underlineColorAndroid='#448AFF'
                    onChangeText={(newName) => this.setState({newName})}
                    value={this.state.newName}
                  />
                :
                <Text style={styles.deckHeading}>{Deck.Title}</Text>
            }

            <Text style={styles.deckCards}>{Deck.QuestionsCount} Cards</Text>

          </View>
        </View>

      </TouchableNativeFeedback>
    )
  }
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({

  card : {
    width : window.width - 10,
    height : window.height/5,
    marginLeft  : 5,
    marginRight : 5,
    marginTop : 3,
    marginBottom : 3,
    backgroundColor: '#F5F5F5',
    padding : 5,
    borderRadius : 6,
    borderColor : 'grey',
    elevation : 2
  },
  deckHeading : {
    fontSize : 26,
    margin : 5
  },
  deckCards : {
    fontSize : 20
  },
  alignCenter : {
    flex : 1,
    justifyContent  : 'center',
    alignItems : 'center'
  },
  deleteButton : {
    paddingLeft : 3,
    paddingRight : 3,
    backgroundColor : '#ef5350',
    borderRadius : 3,
    marginLeft : 3,
    elevation : 2,
    color : 'white'
  },
  editButton : {
    paddingLeft : 3,
    paddingRight : 3,
    backgroundColor : '#00E676',
    borderRadius : 3,
    elevation : 2
  },
  controlView : {
    position : 'absolute',
    margin : 3,
    flexDirection : 'row',
    justifyContent : 'flex-end',
    right : 0
  },
  closeButton : {
    paddingLeft : 3,
    paddingRight : 3,
    backgroundColor : '#455A64',
    borderRadius : 3,
    elevation : 2,
    color : 'white',
    position : 'absolute',
    margin : 3,
    flexDirection : 'row'
  },
  cancelButton : {
    paddingLeft : 3,
    paddingRight : 3,
    backgroundColor : '#455A64',
    borderRadius : 3,
    elevation : 2,
    color : 'white',
    position : 'absolute',
    margin : 6,
    flexDirection : 'row'
  },
  saveButton : {
    paddingLeft : 3,
    paddingRight : 3,
    backgroundColor : '#00E676',
    borderRadius : 3,
    elevation : 2,
    color : 'black',
    position : 'absolute',
    margin : 6,
    flexDirection : 'row',
    right : 0
  },
  NewDeckName : {
    width : 250,
    height : 50,
    margin : 3,
    paddingRight : 6,
    paddingLeft : 6,
    padding : 3,
    fontSize : 26
  }
});

const mapStateToProps = ({ DeckReducer }) => {
  return {
    decks : DeckReducer.decks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditDeckTitle : (key, title) => dispatch(EditDeckTitle(key,title)),
    RemoveDeck : (key) => dispatch(RemoveDeck(key))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckPreview);
