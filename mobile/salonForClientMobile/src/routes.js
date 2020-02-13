import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import Confirm from './pages/New/Confirm';
import SelectDateTime from './pages/New/SelectDateTime';

export default (signedIn = false) => 
  createAppContainer(
    createSwitchNavigator({
      Sign: createSwitchNavigator({
        SignIn,
        SignUp,
      }),
      App: createBottomTabNavigator({
        Dashboard,
        New: {
          screen: createStackNavigator({
            SelectProvider,
            SelectDateTime,
            Confirm
          }),
          
        },
        Profile
      }, {
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#FFF',
          inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
          style: {
            backgroundColor: '#424242',
            borderTopColor:'#424242',
            paddingBottom: 2
          }
        }
      })
    }, {
      initialRouteName: signedIn !== false ? 'App': 'Sign'
    })
  );