import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

export default (signedIn = false) => 
  createAppContainer(
    createSwitchNavigator({
      Sign: createSwitchNavigator({
        SignIn,
        SignUp,
      }),
      App: createBottomTabNavigator({
        Dashboard
      }, {
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#FFF',
          inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
          style: {
            backgroundColor: '#00695c',
            
          }
        }
      })
    }, {
      initialRouteName: signedIn !== false ? 'App': 'Sign'
    })
  );