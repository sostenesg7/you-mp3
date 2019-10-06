import { createStackNavigator } from 'react-navigation-stack';
import Home from '../containers/HomeContainer';
import Settings from '../containers/SettingsContainer';
import History from '../containers/HistoryContainer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Text } from 'react-native';

export default createMaterialBottomTabNavigator(
  {
    Home: {
      path: 'http',
      screen: Home,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              fontFamily: 'Poppins-Light'
            }}
          >
            Início
          </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              fontFamily: 'Poppins-Light'
            }}
          >
            Histórico
          </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="history" color={tintColor} size={24} />
        )
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              fontFamily: 'Poppins-Light'
            }}
          >
            Configurações
          </Text>
        ),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="settings" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    activeColor: Colors.SecondaryColor,
    inactiveColor: Colors.LightWhite,
    barStyle: { backgroundColor: Colors.MainColor },
    labelStyle: {
      fontSize: 1
    }
  }
);
