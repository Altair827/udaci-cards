import { combineReducers } from 'redux'
import { DeckReducer } from './DeckReducer'
import { CardReducer } from './CardReducer'

const reducer = combineReducers({
  DeckReducer,
  CardReducer
});

export default reducer;
