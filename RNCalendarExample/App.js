/**
 * RNCalendar Example
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-calendar';

import type { Element } from 'react';

type Props = {};

export default class App extends React.PureComponent<Props> {
  render(): Element<*> {
    return (
      <View style={{ marginTop: 20 }}>
        <Calendar />
      </View>
    );
  }
}
