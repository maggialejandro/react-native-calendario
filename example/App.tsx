import React from 'react';
import { View, Modal, Text, Platform } from 'react-native';
import { Calendar, DayType, ThemeType } from 'react-native-calendario';

const iOS = Platform.OS === 'ios';
const THEME: ThemeType = {
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  emptyMonthContainerStyle: {},
  emptyMonthTextStyle: {
    fontWeight: '200',
  },
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {},
  nonTouchableDayTextStyle: {},
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {},
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  todayContainerStyle: {},
  todayTextStyle: {
    color: '#6d95da',
  },
  activeDayContainerStyle: {
    backgroundColor: '#6d95da',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  nonTouchableLastMonthDayTextStyle: {},
};

const truthyValue = true;

const DISABLED_DAYS = {
  '2019-11-20': truthyValue,
  '2019-11-10': truthyValue,
};

export default class App extends React.PureComponent<
  {},
  {
    isVisibleModalCustom: boolean;
  }
> {
  state = {
    isVisibleModalCustom: false,
  };

  handleOpenCustomModal = () => {
    this.setState({ isVisibleModalCustom: true });
  };

  handleCloseCustomModal = () => {
    this.setState({ isVisibleModalCustom: false });
  };

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={[
            { color: isActive ? 'green' : 'grey' },
            THEME.dayTextStyle,
            isActive ? THEME.activeDayTextStyle : {},
          ]}
        >
          {date.getDate()}
        </Text>
        <Text style={{ fontSize: 7 }}>asd</Text>
      </View>
    );
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
          <View style={{ marginTop: iOS ? 40 : 0 }}>
            <Text
              style={{ fontSize: 20, marginLeft: 10 }}
              onPress={this.handleCloseCustomModal}
            >
              Close
            </Text>
            <Calendar
              locale="es"
              monthHeight={370}
              numberOfMonths={600}
              initialListSize={4}
              onChange={console.log}
              theme={THEME}
              disabledDays={DISABLED_DAYS}
              // renderDayContent={this.renderDayContent}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
