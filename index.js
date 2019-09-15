/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Linking, LinkingStatic} from 'react-native';


Linking.addListener('url', _handleOpenURL);

Linking.addEventListener('url', _handleOpenURL);

//Linking.removeEventListener('url', _handleOpenURL);

const _handleOpenURL = event => {
  
  alert(event);
};

Linking.getInitialURL().then(url => {
 // alert(url);
});

AppRegistry.registerComponent(appName, () => App);
