import { DeckActions } from '../actions/DeckActions'

const initialState = {
  isNewDeckCreated : false,
  decks : {}
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
        }
      })

    case DeckActions.Reset_Is_New_Deck_Created :

      return Object.assign({}, state, {
        ...state,
        isNewDeckCreated : action.isNewDeckCreated
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

    default:
     return state;
  }
}
