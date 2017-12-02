import React from 'react'
import { Text, View, StyleSheet, Button, AsyncStorage, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import DeckPreview from '../components/DeckPreview'
import { connect } from 'react-redux'
import { GetAllDecks } from '../actions/DeckActions'

class DeckList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text : '',
      count : ''
    }

    this.getDecks();
  }

  static navigationOptions = {
    title: 'Decks'
  }

  getDecks = () => {
    AsyncStorage.getItem('Questions').then((value) => this.setState({
      text : value
    }));
    AsyncStorage.getItem('Decks').then((value) => this.setState({
      count : value
    }));
    this.props.GetAllDecks();
  }

  render() {

    const DeckIds = this.props.Decks !== null ? Object.keys(this.props.Decks) : [];

    return (
      <View style={{ flex: 1}}>
        {
          DeckIds.length !== 0 ?

          <KeyboardAvoidingView behavior='position' style={{ flex: 1}} >
            <FlatList
              data={DeckIds}
              keyExtractor={item => item}
              renderItem={({item}) => <DeckPreview deckId={item} navigation={this.props.navigation} />}
              keyboardShouldPersistTaps='always'
              overScrollMode='always'
            />
          </KeyboardAvoidingView>

          :

          <View style={styles.EmptyListContainer}>
            <Text style={styles.AddDeckText} onPress={() => this.props.navigation.navigate('AddDeck')}>Add Deck</Text>
          </View>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  EmptyListContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  AddDeckText : {
    fontSize : 24,
    color : '#1565C0'
  }
})

const mapStateToProps = ({ DeckReducer }) => {
  return {
    Decks : DeckReducer.decks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllDecks : () => dispatch(GetAllDecks()),
    EditDeckName : (key, title) => dispatch(EditDeckName(key,title))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
