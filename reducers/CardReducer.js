import { CardActions } from '../actions/CardActions'

const initialState = {
  isNewCardCreated : false,
  Questions : {}
}

export function CardReducer(state = initialState,action){
  switch (action.type) {

    case CardActions.CREATE_NEW_CARD :

      return Object.assign({}, state, {
        ...state,
        isNewCardCreated : action.isNewCardCreated,
        Questions : {
          ...state.Questions,
          ...action.newCard
        }
      })

    default :
      return state;

  }
}
