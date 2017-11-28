import { AsyncStorage } from 'react-native'


export const DeckActions = {
  "CREATE_NEW_DECK" : "CREATE_NEW_DECK",
  "Reset_Is_New_Deck_Created" : "Reset_Is_New_Deck_Created"
}

export const NewDeck = (isNewDeckCreated) => ({
  type : DeckActions.CREATE_NEW_DECK,
  isNewDeckCreated
})

export const ResetIsNewDeckCreated = () => ({
  type : DeckActions.CREATE_NEW_DECK,
  isNewDeckCreated : false
})

export const CreateNewDeck = (deck) => {

  return (dispatch) => {

    AsyncStorage.getItem('DeckCount').then((result) => {

      let count = 1;

      if(result != null){
        const resultObject = JSON.parse(result);
        count = resultObject.Value + 1;
      };

      const newDeck = {
        [count.toString()] : {
          Title : deck,
          QuestionsCount : 0,
          Questions : null
        }
      };

      AsyncStorage.mergeItem('Decks', JSON.stringify(newDeck), () => {
        dispatch(NewDeck(false));
      });

      AsyncStorage.setItem('DeckCount', JSON.stringify({
        Value : count
      }), () => {
        dispatch(NewDeck(false));
      });
    });

    dispatch(NewDeck(true));

  }
}
