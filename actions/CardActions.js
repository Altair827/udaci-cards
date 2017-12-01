import { AsyncStorage, Alert } from 'react-native'
import { UpdateQuestionsCount } from './DeckActions'

export const CardActions = {
  "CREATE_NEW_CARD" : "CREATE_NEW_CARD",
  "Reset_NEW_CARD" : "Reset_NEW_CARD"
}

export const AddCard = (isNewCardCreated,newCard) => ({
  type : CardActions.CREATE_NEW_CARD,
  isNewCardCreated,
  newCard
})

export const ResetIsNewCardCreated = () => ({
  type : CardActions.Reset_NEW_CARD
})

export const AddNewCard = (deck, card) => {

  return (dispatch) => {

    const deckKey = deck.key;

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

      AsyncStorage.mergeItem('Questions', JSON.stringify(newCard)).then(() => {

        AsyncStorage.setItem('QuestionsIdCount', JSON.stringify({
          Value : QuestionIdCount
        }),(error) => {

          if(error == null){

            const updatedDeck = {
              [deckKey.toString()] : {
                QuestionsCount : deck.QuestionsCount + 1,
                QuestionIds : deck.QuestionsCount === 0 ? [QuestionIdCount] : deck.QuestionIds.concat([QuestionIdCount])
              }
            }

            AsyncStorage.mergeItem('Decks', JSON.stringify(updatedDeck)).then(() => {
              dispatch(UpdateQuestionsCount(deckKey,updatedDeck[deckKey.toString()]));
              dispatch(AddCard(true,newCard));
            });

          }
          else {
            Alert.alert('Oooooo');
          }

        })
      });
    });

  }
}
