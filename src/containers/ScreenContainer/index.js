import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ScreenContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MainColor }}>
        <StatusBar />

        <Container style={{ flex: 1, backgroundColor: Colors.MainColor }}>
          <StatusBar translucent={false} />
          {this.props.header}
          {this.props.top}
          <View style={{ flex: 1 }}>
            <Content
              //padder
              refreshControl={this.props.refreshControl}
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: Colors.MainColor
              }}
            >
              <View
                style={
                  this.props.padder
                    ? {
                        flex: 1,
                        paddingHorizontal: 30,
                        justifyContent: 'space-between',
                        paddingVertical: 20
                      }
                    : { flex: 1 }
                }
              >
                {this.props.children}
              </View>
            </Content>
          </View>

          {this.props.bottom}
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenContainer);
