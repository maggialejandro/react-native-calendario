import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import {
  Calendar,
  DayType,
  ThemeType,
  RangeType,
} from 'react-native-calendario';
import moment from 'moment';
import { MarkedDays } from 'react-native-month';

const THEME: ThemeType = {
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
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
  nonTouchableDayTextStyle: {
    fontSize: 15,
  },
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

type Props = {};

type State = {
  minDate: Date;
  maxDate: Date;
  startDate: Date;
  endDate?: Date;
};

const START_DATE_1 = '2020-03-10';
const END_DATE_1 = '2020-04-15';
const MIN_DATE_1 = '2020-03-12';
const MAX_DATE_1 = '2020-04-10';

const FORMAT = 'YYYY-MM-DD';

const INITIAL_STATE = {
  startDate: moment(START_DATE_1, FORMAT).toDate(),
  endDate: moment(END_DATE_1, FORMAT).toDate(),
  minDate: moment(MIN_DATE_1, FORMAT).toDate(),
  maxDate: moment(MAX_DATE_1, FORMAT).toDate(),
};

const markedDays: MarkedDays = {
  '2020-03-12': {
    dots: [
      {
        color: 'red',
        selectedColor: 'green',
      },
      {
        color: 'blue',
        selectedColor: 'yellow',
      },
    ],
  },
};

export default class App extends React.PureComponent<Props, State> {
  state = {
    ...INITIAL_STATE,
  };

  onChange = ({ startDate, endDate }: RangeType) =>
    this.setState({ startDate, endDate });

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
      <SafeAreaView>
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
          }}
        >
          <Calendar
            disableRange
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startingMonth="2020-01-10"
            markedDays={markedDays}
            monthHeight={370}
            numberOfMonths={24}
            renderAllMonths
            initialListSize={4}
            onChange={this.onChange}
            theme={THEME}
            disabledDays={DISABLED_DAYS}
            // renderDayContent={this.renderDayContent}
          />
        </View>
      </SafeAreaView>
    );
  }
}
