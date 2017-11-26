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

    const newDeck = {
      [deck.replace(/\s/g,'')] : {
        title : [deck],
        questions : null
      }
    };

    AsyncStorage.mergeItem('Decks', JSON.stringify(newDeck),(error) => {
      dispatch(NewDeck(false));
    });

    dispatch(NewDeck(true));

  }
}
