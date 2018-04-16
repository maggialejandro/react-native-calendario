/**
 * RNCalendar Example
 * @flow
 */

import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import Calendar from 'react-native-calendar';

type Props = {};

type State = {
  isVisibleModal: boolean
};

export default class App extends React.PureComponent<Props, State> {
  state = {
    isVisibleModal: false,
  }

  handleModalOpen = () => {
    console.time('Calendar.mount');
    this.setState({ isVisibleModal: true });
  };

  render() {
    return (
      <View style={{ marginTop: 20, justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ padding: 20, backgroundColor: 'red' }}
          onPress={this.handleModalOpen}
        >
          <Text>Show Modal</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          onRequestClose={() => this.setState({ isVisibleModal: false })}
          visible={this.state.isVisibleModal}
        >
          <Calendar />
        </Modal>
      </View>
    );
  }
}
