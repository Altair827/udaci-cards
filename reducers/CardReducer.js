import { CardActions } from '../actions/CardActions'

const initialState = {
  isNewCardCreated : false,
  ActiveDeckQuestions : {}
}

export function CardReducer(state = initialState,action){
  switch (action.type) {

    case CardActions.CREATE_NEW_CARD :

      return Object.assign({}, state, {
        ...state,
        isNewCardCreated : action.isNewCardCreated
      })

    case CardActions.Reset_NEW_CARD :

      return Object.assign({}, state, {
        ...state,
        isNewCardCreated : false
      })

    case CardActions.GET_QUESTIONS :

      return Object.assign({}, state, {
        ...state,
        ActiveDeckQuestions : action.questions
      })

    default :
      return state;

  }
}
