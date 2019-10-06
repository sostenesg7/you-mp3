import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideoInformation } from '../../actions';
import {
  Alert,
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  Text,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Dimensions
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toast } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import Modal from 'react-native-modalbox';
import ScreenContainer from '../ScreenContainer';
class FreightRequestContainer extends Component {
  state = {};

  render() {
    return (
      <ScreenContainer padder={true}>
        <Text>text</Text>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(FreightRequestContainer));
