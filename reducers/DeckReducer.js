import { DeckActions } from '../actions/DeckActions'
import { Alert } from 'react-native'

const initialState = {
  lastAddedDeckKey : null,
  isNewDeckCreated : false,
  decks : null
}

export function DeckReducer(state = initialState,action){
  switch (action.type) {

    case DeckActions.CREATE_NEW_DECK :

      return Object.assign({}, state, {
        ...state,
        isNewDeckCreated : action.isNewDeckCreated,
        decks : {
          ...state.decks,
          ...action.newDeck
        },
        lastAddedDeckKey : action.newDeckKey
      })

    case DeckActions.Reset_Is_New_Deck_Created :

      return Object.assign({}, state, {
        ...state,
        isNewDeckCreated : action.isNewDeckCreated,
        lastAddedDeckKey : null
      })

    case DeckActions.GET_ALL_DECKS :

      return Object.assign({}, state, {
        ...state,
        decks : action.decks
      })

    case DeckActions.RENAME_DECK :

      return Object.assign({}, state, {
        ...state,
        decks : {
          ...state.decks,
          [action.key] : {
            ...state.decks[action.key],
            Title : action.title
          }
        }
      })

    case DeckActions.DELETE_DECK :

      let decks = state.decks;

      delete decks[action.key];

      return Object.assign({}, state, {
        ...state,
        decks : {
          ...decks
        }
      })

    case DeckActions.UPDATE_QUESTIONS_COUNT :

      return Object.assign({}, state, {
        ...state,
        decks : {
          ...state.decks,
          [action.key.toString()] : {
            ...state.decks[action.key],
            QuestionsCount : action.QuestionsCount
          }
        }
      })

    default:
     return state;
  }
}
