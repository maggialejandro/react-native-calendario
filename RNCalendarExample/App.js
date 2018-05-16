/**
 * RNCalendar Example
 * @flow
 */

import React from 'react';
import { View, Modal, Text, Platform } from 'react-native';
import Calendar from 'react-native-calendario';

const iOS = Platform.OS === 'ios';

function CloseButton({ onClose, children }) {
  return (
    <View style={{ marginTop: iOS ? 20 : 0 }}>
      <Text
        style={{ fontSize: 20, marginLeft: 10 }}
        onPress={() => onClose()}
      >
        Close
      </Text>
      {children}
    </View>
  );
}

export default class App extends React.PureComponent<{}, {
  isVisibleModalCustom: boolean
}> {
  state = {
    isVisibleModalCustom: false,
  }

  handleOpenCustomModal = () => {
    this.setState({ isVisibleModalCustom: true });
  };

  handleCloseCustomModal = () => {
    this.setState({ isVisibleModalCustom: false });
  };

  render() {
    return (
      <View style={{ marginTop: iOS ? 20 : 0 }}>
        <Text
          style={{
            color: '#6d95da',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 50,
          }}
          onPress={this.handleOpenCustomModal}
        >
          Open Calendar
        </Text>

        <Modal
          animationType="fade"
          onRequestClose={() => this.setState({ isVisibleModalCustom: false })}
          visible={this.state.isVisibleModalCustom}
        >
          <CloseButton onClose={this.handleCloseCustomModal}>
            <Calendar
              monthHeight={370}
              startingMonth="2017-02-20"
              initialListSize={2}
              onChange={console.log}
              theme={{
                weekColumnTextStyle: {
                  color: '#b6c1cd',
                  fontSize: 13,
                },
                weekColumnStyle: {
                  paddingVertical: 10,
                },
                weekColumnsContainerStyle: {
                },
                monthTitleStyle: {
                  color: '#6d95da',
                  fontWeight: '300',
                  fontSize: 16,
                },
                emptyMonthTextStyle: {
                  fontWeight: '200',
                },
                nonTouchableDayTextStyle: {
                  color: 'white',
                },
                dayContainerStyle: {
                  marginVertical: 3,
                },
                dayTextStyle: {
                  color: '#2d4150',
                  fontWeight: '200',
                  fontSize: 15,
                },
                activeDayContainerStyle: {
                  backgroundColor: '#6d95da',
                },
                activeDayTextStyle: {
                  color: 'white',
                },
              }}
            />
          </CloseButton>
        </Modal>
      </View>
    );
  }
}
