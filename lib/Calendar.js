// @flow
import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';

type PropsType = {

};


export default class Calendar extends React.Component<PropsType> {
  componentWillMount() {
    const today = moment();
  }

  render() {
    return (
      <Text>Calendar</Text>
    );
  }
}
