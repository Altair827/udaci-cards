import DeckList from './DeckList'
import AddDeck from './addDeck'
import DeckStack from './DeckStack'
import { TabNavigator,StackNavigator } from 'react-navigation'

const HomeScreen = TabNavigator({
                Deck: {
                  screen: DeckList,
                  navigationOptions: {
                    tabBarLabel: 'Home'
                  }
                },
                AddDeck: {
                  screen: AddDeck,
                  navigationOptions: {
                    tabBarLabel: 'Add Deck'
                  }
                }
              }, {
                tabBarPosition : 'bottom',
                tabBarOptions: {
                  style: {
                    backgroundColor: '#536DFE'
                  }
                },
              });


const Home = StackNavigator({
                HomeScreen : {
                  screen : HomeScreen
                },
                DeckScreen : {
                  screen : DeckStack
                }
              },{
                navigationOptions : {
                  headerStyle : {
                    backgroundColor: '#536DFE'
                  },
                  headerTintColor : '#fff'
                }
              });

export default Home;
