import { AsyncStorage, Alert } from 'react-native'
import { UpdateQuestionsCount } from './DeckActions'

export const CardActions = {
  "CREATE_NEW_CARD" : "CREATE_NEW_CARD",
  "Reset_NEW_CARD" : "Reset_NEW_CARD",
  "GET_QUESTIONS" : "GET_QUESTIONS"
}

export const AddCard = (isNewCardCreated) => ({
  type : CardActions.CREATE_NEW_CARD,
  isNewCardCreated
})

const UpdateActiveDeckQuestions = (questions) => ({
  type : CardActions.GET_QUESTIONS,
  questions
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
                QuestionsCount : deck.QuestionsCount + 1
              }
            }

            AsyncStorage.mergeItem('Decks', JSON.stringify(updatedDeck)).then(() => {
              dispatch(UpdateQuestionsCount(deckKey,updatedDeck[deckKey.toString()]));
              dispatch(AddCard(true));
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

export const FetchAllQuestions = (deckKey) => {
  return (dispatch) => {

    AsyncStorage.getItem('Questions').then((result) => {
      if(result != null){

        var questions = Object.values(JSON.parse(result)).filter(question => question.deckKey == deckKey);

        dispatch(UpdateActiveDeckQuestions(questions));

      }
    });
  }
}
