import React, { useCallback, useRef, useState } from 'react';
import { View, StatusBar, SafeAreaView, Button, Text } from 'react-native';
import { Calendar, ThemeType } from 'react-native-calendario';
import moment from 'moment';
import { MarkedDays } from 'react-native-month';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetModalProvider,
  SCROLLABLE_TYPE,
  createBottomSheetScrollableComponent,
} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

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

const AnimatedFlatList = Animated.createAnimatedComponent<RNFlatListProps<any>>(
  RNFlatList
);

const BottomSheetFlatListComponent = createBottomSheetScrollableComponent<
  BottomSheetFlatListMethods,
  BottomSheetFlatListProps<any>
>(SCROLLABLE_TYPE.FLATLIST, AnimatedFlatList);

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
  '2020-01-08': {
    theme: {
      dayContainerStyle: {
        backgroundColor: 'lightgray',
      },
    },
  },
};

const App = () => {
  const calendarRef = useRef<BottomSheetModal>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(
    INITIAL_STATE.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    INITIAL_STATE.endDate
  );

  const handleChangeDate = useCallback(
    (date) => {
      if (startDate) {
        if (endDate) {
          setStartDate(date);
          setEndDate(undefined);
        } else if (date < startDate) {
          setStartDate(date);
        } else if (date > startDate) {
          setEndDate(date);
        } else {
          setStartDate(date);
          setEndDate(date);
        }
      } else {
        setStartDate(date);
      }
    },
    [startDate, endDate]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'lightgray' }}>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <View
            style={{
              paddingTop: StatusBar.currentHeight,
            }}
          >
            <Button
              title="Open Calendar"
              onPress={() => calendarRef.current?.present()}
            />
            <BottomSheetModal ref={calendarRef} snapPoints={['65%', '90%']}>
              <Text
                style={{ color: 'green', textAlign: 'right', marginRight: 10 }}
                onPress={() => calendarRef.current.close()}
              >
                Close
              </Text>
              <Calendar
                onPress={handleChangeDate}
                startDate={startDate}
                endDate={endDate}
                startingMonth={'2023-10-01'}
                markedDays={markedDays}
                monthHeight={370}
                numberOfMonths={13}
                initialListSize={4}
                firstDayMonday
                theme={THEME}
                disableOffsetDays
                viewableRangeOffset={5}
                renderer={BottomSheetFlatListComponent}
              />
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
