# React Native Calendar 📆
[![NPM version](https://img.shields.io/npm/v/react-native-calendario.svg)](https://www.npmjs.com/package/react-native-calendario) [![npm](https://img.shields.io/npm/dw/react-native-calendario.svg)](https://github.com/maggialejandro/react-native-calendario)


![](https://media.giphy.com/media/eu8fFCG3rs3IEYwyYk/giphy.gif) ![](https://media.giphy.com/media/g0pZuxQ16frVSmEBSt/giphy.gif)


## Installation
```console
npm install react-native-calendario --save
```

Using yarn
```console
yarn add react-native-calendario
```

## Usage
```js
import Calendar from 'react-native-calendario';
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
|**`locale`**|Calendar language |no|'en'|
|**`showWeekdays`**|Show Week columns |no|true|
|**`showMonthTitle`**|Show Month title |no|true|
|**`initialListSize`**|FlatList initialNumToRender |no|2|
|**`startingMonth`**|First month to render |no|current month|
|**`numberOfMonths`**|Number of months to render |no|12|
|**`disableRange`**|Turn off range date selection |no|false|
|**`firstDayMonday`**|Monday as first day of the week |no|false|
|**`monthHeight`**|Change Month row height |no|370|

## Example
To run the example project change package.json main path to like this
```json
"main": "lib/index.js",
```

## License
MIT
