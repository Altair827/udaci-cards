import React from 'react'
import { View } from 'react-native'
import Home from './screens/home'
import CustomStatusBar from './components/statusbar'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'
import { setLocalNotification } from './helper'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <CustomStatusBar />
          <Home />
        </View>
      </Provider>
    );
  }
};
