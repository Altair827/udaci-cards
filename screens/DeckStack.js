import { StackNavigator } from 'react-navigation'
import Deck from './deck'
import Card from './card'
import AddCard from './addCard'

const DeckStack = StackNavigator({
  DeckScreen : {
    screen : Deck
  },
  CardScreen : {
    screen : Card
  },
  AddCardScreen : {
    screen : AddCard
  }
},{
  headerMode : 'none'
});

export default DeckStack;
