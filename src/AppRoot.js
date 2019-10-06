import React, { Component } from 'react';
import { Root } from 'native-base';
import { connect } from 'react-redux';
import SwitchNavigator from './routers/SwitchNavigator';
import { createAppContainer } from 'react-navigation';
import { Linking } from 'react-native';

const AppContainer = createAppContainer(SwitchNavigator);

import { createDeepLinkingHandler } from 'react-native-deep-link';

/**
 * This function receives a result of url parsing,
 * you can find the structure of this object in the API docs below, and returns a function.
 * The returned function receives component props.
 */
const handle = ({ params }) => ({ dispatch }) => {
  // addCurrentUserToChannel is a redux-thunk action,
  // which was defined somewhere in the code.
  alert(JSON.stringify(params));
};

const schemes = [
  {
    name: 'http:',
    routes: [
      {
        expression: '/www.abc.com',
        callback: handle
      }
    ]
  }
];

const withDeepLinking = createDeepLinkingHandler(schemes);

class RootClass extends Component {
  state = {};

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = event => {
    const url = event.url;
    alert(JSON.stringify(url));
  };
  componentWillReceiveProps = () => {};

  render() {
    return (
      <Root>
        <AppContainer
          ref={() => {
            /*  if (r && !this.state.navigation) {
              NavigationService.configure(r);
              this.setState({ navigation: r });
            } */
          }}
          /* uriPrefix={prefix} */
        />
      </Root>
    );
  }
}
const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDeepLinking(RootClass));
