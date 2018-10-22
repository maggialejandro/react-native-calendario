# React Native Calendar 📆
![Coverlogo](https://imgur.com/LINQ6HZ.png)

[![Greenkeeper badge](https://badges.greenkeeper.io/maggialejandro/react-native-calendario.svg)](https://greenkeeper.io/)

[![BuildStatus](https://img.shields.io/travis/maggialejandro/react-native-calendario/master.svg)](https://travis-ci.org/maggialejandro/react-native-calendario)
[![NPM version](https://img.shields.io/npm/v/react-native-calendario.svg)](https://www.npmjs.com/package/react-native-calendario) [![npm](https://img.shields.io/npm/dw/react-native-calendario.svg)](https://github.com/maggialejandro/react-native-calendario)  [![CodeFactor](https://www.codefactor.io/repository/github/maggialejandro/react-native-calendario/badge)](https://www.codefactor.io/repository/github/maggialejandro/react-native-calendario) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/832690f286a5451cacdae664d63be3b9)](https://www.codacy.com/app/maggialejandro/react-native-calendario?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maggialejandro/react-native-calendario&amp;utm_campaign=Badge_Grade)

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
| Prop | Description | Required? | Default | Type
|---|---|---|---|---|
|**`onChange`**|Callback called when a day is pressed. |yes| | Function |
|**`minDate`**|Minimum date that can be selected. |no|null| 'YYYY-MM-DD' |
|**`maxDate`**|Maximum date that can be selected. |no|null| 'YYYY-MM-DD' |
|**`startDate`**|Selected start date |no|null| 'YYYY-MM-DD' |
|**`endDate`**|Selected end date |requires *startDate*|null| 'YYYY-MM-DD' |
|**`theme`**|Calendar StyleSheet |no|null| Object |
|**`locale`**|Calendar language |no|'en'| string |
|**`showWeekdays`**|Show Week columns |no|true| boolean |
|**`showMonthTitle`**|Show Month title |no|true| boolean |
|**`initialListSize`**|FlatList initialNumToRender |no|2| number |
|**`startingMonth`**|First month to render |no|current month| 'YYYY-MM-DD' |
|**`numberOfMonths`**|Number of months to render |no|12| number |
|**`disableRange`**|Turn off range date selection |no|false| boolean |
|**`firstDayMonday`**|Monday as first day of the week |no|false| boolean |
|**`monthHeight`**|Change Month row height |no|370| number |
|**`renderDayContent`**|Render custom Day content |no|null| Function |
|**`extraData`**|FlatList extraData |no|null| any |
|**`viewableItemsChanged`**|handleViewableItemsChange callback |no|null| Function |

## License
MIT
