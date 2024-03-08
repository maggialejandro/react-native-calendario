import React, { useCallback, useState } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { Calendar, ThemeType } from 'react-native-calendario';
import { DateString, MarkedDays } from 'react-native-month';

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
  '2024-03-20': truthyValue,
  '2024-04-10': truthyValue,
};

const START_DATE = '2024-01-12';
const END_DATE = '2024-02-15';
const MIN_DATE = '2024-01-10';
const MAX_DATE = '2024-04-20';

const markedDays: MarkedDays = {
  '2024-02-12': {
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
  '2024-01-08': {
    theme: {
      dayContainerStyle: {
        backgroundColor: 'lightgray',
      },
    },
  },
};

type Range = {
  start?: DateString;
  end?: DateString;
};

const App = () => {
  const [range, setRange] = useState<Range>({
    start: START_DATE,
    end: END_DATE,
  });

  const handleChangeDate = useCallback((date: DateString) => {
    setRange((prevRange) => {
      if (prevRange?.start) {
        if (prevRange.end) {
          return {
            start: date,
            end: undefined,
          };
        } else if (date < prevRange.start) {
          return {
            start: date,
            end: prevRange.end,
          };
        } else if (date > prevRange.start) {
          return {
            start: prevRange.start,
            end: date,
          };
        } else {
          return {
            start: date,
            end: date,
          };
        }
      } else {
        return {
          start: date,
        };
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Calendar
          onPress={handleChangeDate}
          startDate={range.start}
          endDate={range.end}
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
          startingMonth={'2024-01-01'}
          markedDays={markedDays}
          monthHeight={370}
          numberOfMonths={12}
          initialListSize={4}
          firstDayMonday
          theme={THEME}
          disabledDays={DISABLED_DAYS}
          showsVerticalScrollIndicator={false}
          calculateMonthHeightDynamically
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
