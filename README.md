# React Native Calendar


## Installation
```console
npm install react-native-calendar --save
```

Using yarn
```console
yarn add react-native-calendar
```

## Usage
```js
import Calendar from 'react-native-calendar';
```

```js
<Calendar
  onChange={range => console.log(range)}
  minDate="2018-04-20"
  startDate="2018-04-30"
  endDate="2018-05-05"
  theme={{
    weekColumnTextStyle: {
      color: 'red',
    },
    weekColumnStyle: {
      paddingVertical: 20,
    },
    weekColumnsContainerStyle: {
      backgroundColor: 'lightgrey',
    },
    monthTitleStyle: {
      color: 'blue',
    },
    nonTouchableDayContainerStyle: {
      backgroundColor: 'red',
    },
    nonTouchableDayTextStyle: {
      color: 'green',
    },
    dayTextStyle: {
      color: 'blue',
    },
    activeDayContainerStyle: {
      backgroundColor: 'lightgrey',
    },
    activeDayTextStyle: {
      color: 'red',
    },
  }}
/>
```

## API
| Prop | Description | Required? | Default |
|---|---|---|---|
|**`onChange`**|Callback called when a day is pressed. |yes| |
|**`minDate`**|Minimum date that can be selected. |no|null|
|**`maxDate`**|Maximum date that can be selected. |no|null|
|**`startDate`**|Selected start date |no|null|
|**`endDate`**|Selected end date |requires *startDate*|null|
|**`theme`**|Calendar StyleSheet |no|null|
|**`showWeekdays`**|Show Week columns |no|true|
|**`showMonthTitle`**|Show Month title |no|true|
|**`initialListSize`**|FlatList initialNumToRender |no|2|
|**`numberOfMonths`**|Number of months to render |no|12|


## License
MIT
