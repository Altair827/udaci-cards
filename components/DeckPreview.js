import React from 'react'
import { Text, View, StyleSheet, Button, AsyncStorage,
         Dimensions,TouchableNativeFeedback, Platform,
         Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class DeckPreview extends React.Component {

  state = {
    isControlVisible : false
  }

  SetControlVisible = () => {
    this.setState({
      isControlVisible : true
    })
  }

  HideControl = () => {
    this.setState({
      isControlVisible : false
    })
  }

  DeleteDeck = () => {
    Alert.alert('Do you want to delete this deck?');
  }

  render(){
    return (

      <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate('DeckScreen')}
        onLongPress={() => this.SetControlVisible()}
        background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
      >
        <View style={styles.card}>

          {this.state.isControlVisible &&
            <View>

              <TouchableNativeFeedback
                onPress={() => {this.HideControl()}}
              >
                <Text style={styles.closeButton}>
                  x Close
                </Text>
              </TouchableNativeFeedback>

              <View style={styles.controlView}>

                <TouchableNativeFeedback
                  onPress={() => {}}
                >
                  <Text style={styles.editButton}>
                    <MaterialIcons name="edit" color="black" />
                    Edit
                  </Text>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                  onPress={() => this.DeleteDeck()}
                >
                  <Text style={styles.deleteButton}>
                    <MaterialIcons name="delete" color="white" />
                    Delete
                  </Text>
                </TouchableNativeFeedback>

              </View>
            </View>
          }

          <View style={styles.alignCenter}>
            <Text style={styles.deckHeading}>Yolo</Text>
            <Text style={styles.deckCards}>5 Cards</Text>
          </View>
        </View>

      </TouchableNativeFeedback>

    )}
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
  }
});
