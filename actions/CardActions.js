import { AsyncStorage, Alert } from 'react-native'

export const CardActions = {
  "CREATE_NEW_CARD" : "CREATE_NEW_CARD",
  "Reset_NEW_CARD" : "Reset_NEW_CARD"
}

export const AddCard = (isNewCardCreated,newCard) => ({
  type : CardActions.CREATE_NEW_CARD,
  isNewCardCreated,
  newCard
})

export const AddNewCard = (deckKey, card) => {

  return (dispatch) => {

    AsyncStorage.getItem('QuestionsIdCount').then((result) => {

      let QuestionIdCount = 1;

      if(result != null){
        const resultObject = JSON.parse(result);
        QuestionIdCount = resultObject.Value + 1;
      };

      const newCard = {
        [QuestionIdCount.toString()] : {
          Question : card.Question,
          Answer : card.Answer,
          IsCorrect : card.IsCorrect,
          key : QuestionIdCount,
          deckKey : deckKey
        }
      };

      AsyncStorage.mergeItem('Questions', JSON.stringify(newCard));

      AsyncStorage.setItem('QuestionsIdCount', JSON.stringify({
        Value : QuestionIdCount
      }));

      dispatch(AddCard(true,newCard));

    });

  }
}
