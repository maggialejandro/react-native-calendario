import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Calendar,
  DayType,
  ThemeType,
  RangeType,
} from 'react-native-calendario';
import moment from 'moment';

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
  isVisibleModalCustom: boolean;
  minDate: Date;
  maxDate: Date;
  startDate: Date;
  endDate?: Date;
};

const START_DATE_1 = '2020-03-10';
const START_DATE_2 = '2020-02-01';

const END_DATE_1 = '2020-04-15';
const END_DATE_2 = '2020-04-01';

const MIN_DATE_1 = '2020-03-12';
const MIN_DATE_2 = '2020-03-02';

const MAX_DATE_1 = '2020-04-10';
const MAX_DATE_2 = '2020-04-25';

const FORMAT = 'YYYY-MM-DD';

const INITIAL_STATE = {
  startDate: moment(START_DATE_1, FORMAT).toDate(),
  endDate: moment(END_DATE_1, FORMAT).toDate(),
  minDate: moment(MIN_DATE_1, FORMAT).toDate(),
  maxDate: moment(MAX_DATE_1, FORMAT).toDate(),
};

const ALTERNATIVE_STATE = {
  startDate: moment(START_DATE_2, FORMAT).toDate(),
  endDate: moment(END_DATE_2, FORMAT).toDate(),
  minDate: moment(MIN_DATE_2, FORMAT).toDate(),
  maxDate: moment(MAX_DATE_2, FORMAT).toDate(),
};

export default class App extends React.PureComponent<Props, State> {
  state = {
    isVisibleModalCustom: false,
    ...INITIAL_STATE,
  };

  handleOpenCustomModal = () => {
    this.setState({ isVisibleModalCustom: true });
  };

  handleCloseCustomModal = () => {
    this.setState({ isVisibleModalCustom: false });
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
          <View
            style={{
              backgroundColor: '#6d95da',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={this.handleOpenCustomModal}
            >
              <Text style={{ color: 'white' }}>Open</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            onRequestClose={() =>
              this.setState({
                isVisibleModalCustom: false,
              })
            }
            visible={this.state.isVisibleModalCustom}
          >
            <SafeAreaView>
              <View>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <View
                  style={{
                    backgroundColor: '#6d95da',
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={this.handleCloseCustomModal}
                  >
                    <Text style={{ color: 'white' }}>Close</Text>
                  </TouchableOpacity>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{
                      flexDirection: 'row',
                    }}
                  >
                    {/* TOGGLE MIN DATE */}
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() =>
                        this.setState((state) => ({
                          minDate:
                            moment(state.minDate).format(FORMAT) === MIN_DATE_1
                              ? ALTERNATIVE_STATE.minDate
                              : INITIAL_STATE.minDate,
                        }))
                      }
                    >
                      <Text style={{ color: 'white' }}>Toggle min date</Text>
                    </TouchableOpacity>
                    {/* TOGGLE MAX DATE */}
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() =>
                        this.setState((state) => ({
                          maxDate:
                            moment(state.maxDate).format(FORMAT) === MAX_DATE_1
                              ? ALTERNATIVE_STATE.maxDate
                              : INITIAL_STATE.maxDate,
                        }))
                      }
                    >
                      <Text style={{ color: 'white' }}>Toggle max date</Text>
                    </TouchableOpacity>
                    {/* TOGGLE START DATE */}
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() =>
                        this.setState((state) => ({
                          startDate:
                            moment(state.startDate).format(FORMAT) ===
                            START_DATE_1
                              ? ALTERNATIVE_STATE.startDate
                              : INITIAL_STATE.startDate,
                        }))
                      }
                    >
                      <Text style={{ color: 'white' }}>Toggle startDate</Text>
                    </TouchableOpacity>
                    {/* TOGGLE END DATE */}
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() =>
                        this.setState((state) => ({
                          endDate:
                            moment(state.endDate).format(FORMAT) === END_DATE_1
                              ? ALTERNATIVE_STATE.endDate
                              : INITIAL_STATE.endDate,
                        }))
                      }
                    >
                      <Text style={{ color: 'white' }}>Toggle endDate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() => this.setState({ ...INITIAL_STATE })}
                    >
                      <Text style={{ color: 'white' }}>reset</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>

                <Calendar
                  disableRange
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  startingMonth="2020-01-10"
                  monthHeight={370}
                  numberOfMonths={12}
                  initialListSize={4}
                  onChange={this.onChange}
                  theme={THEME}
                  disabledDays={DISABLED_DAYS}
                  // renderDayContent={this.renderDayContent}
                />
              </View>
            </SafeAreaView>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
