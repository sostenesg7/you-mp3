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
  Dimensions,
  Image,
  Linking
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toast } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import Modal from 'react-native-modalbox';
import ScreenContainer from '../ScreenContainer';
import Colors from '../../constants/Colors';
const Screen = Dimensions.get('window');
class FreightRequestContainer extends Component {
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

  render() {
    return (
      <ScreenContainer>
        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors.SecondaryColor,
            height: Screen.height,
            width: Screen.height,
            alignSelf: 'center',
            transform: [{ translateX: 100 }, { translateY: -300 }],
            borderRadius: Screen.width * 2
          }}
        >
          <View
            style={{
              backgroundColor: Colors.GrayPrimary,
              height: Screen.height,
              width: Screen.height,
              alignSelf: 'center',
              transform: [{ translateX: 0 }, { translateY: -10 }],
              borderRadius: Screen.width * 2,
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
              overflow: 'hidden'
            }}
          >
            <View
              style={{
                height: Screen.width + 20,
                width: Screen.width + 100,
                backgroundColor: Colors.GrayPrimary
              }}
            >
              <Image
                source={{
                  uri:
                    'https://img.youtube.com/vi/zXUTmb8eSbc/maxresdefault.jpg',
                  height: Screen.width + 20,
                  width: Screen.width + 100
                }}
                style={{
                  backgroundColor: 'red',
                  alignSelf: 'flex-start',
                  opacity: 0.8
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            //bottom: 0,
            //right: 0,
            //alignSelf: 'center'
            height: 50,
            width: 50,
            top: 30,
            right: 30,
            backgroundColor: Colors.GrayPrimary,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            opacity: 0.9,
            borderWidth: 1,
            borderColor: Colors.SecondaryColor
          }}
        >
          <Icon name={'cloud-download'} color={Colors.LightWhite} size={30} />
        </TouchableOpacity>
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
