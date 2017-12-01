import { StackNavigator } from 'react-navigation'
import Deck from './deck'
import Quiz from './quiz'
import AddCard from './addCard'

const DeckStack = StackNavigator({
  DeckScreen : {
    screen : Deck
  },
  CardScreen : {
    screen : Quiz
  },
  AddCardScreen : {
    screen : AddCard
  }
},{
  headerMode : 'none'
});

export default DeckStack;
