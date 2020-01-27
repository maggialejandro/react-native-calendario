import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  activeDate: {
    backgroundColor: '#3b5998',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    marginVertical: 5,
    paddingVertical: 10,
  },
  endDate: {
    borderBottomRightRadius: 60,
    borderTopRightRadius: 60,
  },
  startDate: {
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
  },
});

const NonTouchableDay = React.memo(
  (props) => {
    const { isMonthDate, isActive, isOutOfRange, theme, date, isToday } = props;

    return (
      <View
        style={[
          styles.container,
          theme.dayContainerStyle,
          theme.nonTouchableDayContainerStyle,
          isToday && !isActive ? theme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isOutOfRange ? theme.dayOutOfRangeContainerStyle : {},
        ]}
      >
        <Text
          style={[
            { color: '#d3d3d3' },
            theme.nonTouchableDayTextStyle,
            isMonthDate ? theme.nonTouchableLastMonthDayTextStyle : {},
            isToday ? theme.todayTextStyle : {},
            isOutOfRange ? theme.dayOutOfRangeTextStyle : {},
          ]}
        >
          {date.getDate()}
        </Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return !(
      prevProps.isActive !== nextProps.isActive ||
      prevProps.isVisible !== nextProps.isVisible
    );
  }
);

const Day = React.memo(
  (props) => {
    const {
      item: {
        date,
        isVisible,
        isActive,
        isStartDate,
        isEndDate,
        isMonthDate,
        isOutOfRange,
        isToday,
        isHidden,
      },
      theme,
      disabled,
    } = props;

    console.log('disabled', disabled);

    if (isHidden) {
      return <View style={[styles.container]} />;
    }

    if (!isVisible) {
      return (
        <NonTouchableDay
          isActive={isActive}
          date={date}
          theme={theme}
          isMonthDate={isMonthDate}
          isOutOfRange={isOutOfRange}
          isVisible={isVisible}
          isToday={isToday}
        />
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.container,
          theme.dayContainerStyle,
          isToday && !isActive ? theme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isStartDate ? styles.startDate : {},
          isStartDate ? theme.startDateContainerStyle : {},
          isEndDate ? styles.endDate : {},
          isEndDate ? theme.endDateContainerStyle : {},
        ]}
        onPress={() => props.onPress(props.item.date)}
      >
        {props.renderDayContent ? (
          props.renderDayContent(props.item)
        ) : (
          <Text
            style={[
              { color: isActive ? 'white' : 'black' },
              theme.dayTextStyle,
              isToday ? theme.todayTextStyle : {},
              isActive ? theme.activeDayTextStyle : {},
              { color: disabled ? 'red' : 'black' },
            ]}
          >
            {date.getDate()}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return !(
      prevProps.item.isActive !== nextProps.item.isActive ||
      prevProps.item.isVisible !== nextProps.item.isVisible ||
      prevProps.item.isStartDate !== nextProps.item.isStartDate ||
      prevProps.item.isEndDate !== nextProps.item.isEndDate ||
      prevProps.renderDayContent !== nextProps.renderDayContent ||
      nextProps.disabled ||
      prevProps.disabled
    );
  }
);

export default Day;
