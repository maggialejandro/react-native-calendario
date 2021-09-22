import React from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Calendar, DayType, ThemeType } from 'react-native-calendario';
import moment from 'moment';
import { MarkedDays } from 'react-native-month';

const styles = StyleSheet.create({
  customDayContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
  endDate?: Date;
};

const START_DATE_1 = '2020-01-10';
const END_DATE_1 = '2020-04-15';
const MIN_DATE_1 = '2020-01-02';
const MAX_DATE_1 = '2020-04-20';

const FORMAT = 'YYYY-MM-DD';

const INITIAL_STATE = {
  disableRange: false,
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

  handlePress = (date: Date) => {
    const { disableRange, startDate, endDate } = this.state;

    if (disableRange) {
      this.setState({ startDate: date });
    } else {
      if (startDate) {
        if (endDate) {
          this.setState({ startDate: date, endDate: undefined });
        } else if (date < startDate!) {
          this.setState({ startDate: date });
        } else if (date > startDate!) {
          this.setState({ endDate: date });
        } else {
          this.setState({ startDate: date, endDate: date });
          console.log('update 4');
        }
      } else {
        this.setState({ startDate: date });
      }
    }
  };

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    return (
      <View style={styles.customDayContent}>
        <Text
          style={[
            { color: isActive ? 'green' : 'grey' },
            THEME.dayTextStyle,
            isActive ? THEME.activeDayTextStyle : {},
          ]}
        >
          {date.getDate()}
        </Text>
        <Text>{item.date.getDate()}</Text>
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
            onPress={this.handlePress}
            disableRange={this.state.disableRange}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startingMonth="2019-11-10"
            markedDays={markedDays}
            monthHeight={370}
            numberOfMonths={100}
            initialListSize={4}
            firstDayMonday
            theme={THEME}
            disabledDays={DISABLED_DAYS}
            // renderDayContent={this.renderDayContent}
          />
        </View>
      </SafeAreaView>
    );
  }
}
