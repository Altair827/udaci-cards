import { AsyncStorage, Alert } from 'react-native'


export const DeckActions = {
  "CREATE_NEW_DECK" : "CREATE_NEW_DECK",
  "Reset_Is_New_Deck_Created" : "Reset_Is_New_Deck_Created",
  "GET_ALL_DECKS" : "GET_ALL_DECKS",
  "RENAME_DECK" : "RENAME_DECK",
  "DELETE_DECK" : "DELETE_DECK"
}

export const NewDeck = (isNewDeckCreated,newDeck, newDeckKey) => ({
  type : DeckActions.CREATE_NEW_DECK,
  isNewDeckCreated,
  newDeck,
  newDeckKey
})

export const ResetIsNewDeckCreated = () => ({
  type : DeckActions.CREATE_NEW_DECK,
  isNewDeckCreated : false
})

const setDecks = (decks) => ({
  type : DeckActions.GET_ALL_DECKS,
  decks
})

const RenameDeck = (key, title) => ({
  type : DeckActions.RENAME_DECK,
  key,
  title
})

const DeleteDeck = (key) => ({
  type : DeckActions.DELETE_DECK,
  key
})

export const CreateNewDeck = (deck) => {

  return (dispatch) => {

    AsyncStorage.getItem('DeckIdCount').then((result) => {

      let count = 1;

      if(result != null){
        const resultObject = JSON.parse(result);
        count = resultObject.Value + 1;
      };

      const newDeck = {
        [count.toString()] : {
          Title : deck,
          key : count,
          QuestionsCount : 0,
          QuestionId : []
        }
      };

      AsyncStorage.mergeItem('Decks', JSON.stringify(newDeck), () => {
        dispatch(NewDeck(false));
      });

      AsyncStorage.setItem('DeckIdCount', JSON.stringify({
        Value : count
      }), () => {
        dispatch(NewDeck(false));
      });

      dispatch(NewDeck(true,newDeck,count));

    });

  }
}

export const GetAllDecks = () => {

  return (dispatch) => {

    AsyncStorage.getItem('Decks').then((decks) => {

      if(decks != null){
        dispatch(setDecks(JSON.parse(decks)));
      }

    });
  }
}

export const EditDeckTitle = (key, title) => {

  return (dispatch) => {

    const deck = {
      [key.toString()] : {
        Title : title
      }
    }

    AsyncStorage.mergeItem('Decks', JSON.stringify(deck), () => {});

    dispatch(RenameDeck(key,title));

  }
}

export const RemoveDeck = (key) => {

  return (dispatch) => {

    AsyncStorage.getItem('Decks').then((result) => {
      if(result!=null){

        let decks = JSON.parse(result);

        delete decks[key];

        AsyncStorage.setItem('Decks', JSON.stringify(decks), () => {});

      }
    }).then(()=>{
      dispatch(DeleteDeck(key));
    });

  }
}
