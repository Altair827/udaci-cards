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
    AsyncStorage.getItem('Decks').then((value) => this.setState({
      text : value
    }));
    AsyncStorage.getItem('DeckIdCount').then((value) => this.setState({
      count : value
    }));
    this.props.GetAllDecks();
  }

  render() {

    const DeckIds = Object.keys(this.props.Decks);

    return (
      <KeyboardAvoidingView behavior='position' style={{ flex: 1}} >
        { false &&
          <View>
            <Button
              onPress={() => this.getDecks()}
              title="Get Decks"
            />
          <Text>{this.state.text}</Text>
          <Text>{this.state.count}</Text>
          <Text>{JSON.stringify(this.props.Decks)}</Text>
        </View>
        }
        <FlatList
          //style={{ flex: 1}}
          data={DeckIds}
          keyExtractor={item => item}
          renderItem={({item}) => <DeckPreview deckId={item} navigation={this.props.navigation} />}
          keyboardShouldPersistTaps='always'
          overScrollMode='always'
        />
      </KeyboardAvoidingView>
    )
  }
};

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
