import { DeckActions } from '../actions/DeckActions'

const initialState = {
  isNewDeckCreated : false
}

export function DeckReducer(state = initialState,action){
  switch (action.type) {

    case DeckActions.CREATE_NEW_DECK :

      return Object.assign({}, state, {
        isNewDeckCreated : action.isNewDeckCreated
      })

    case DeckActions.Reset_Is_New_Deck_Created :

      return Object.assign({}, state, {
        isNewDeckCreated : action.isNewDeckCreated
      })

    default:
     return state;
  }
}
