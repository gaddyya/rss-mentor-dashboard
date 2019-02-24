# Jest XLSX Loader

Imports and parses xlsx files for usage with the [xlsx npm module](https://www.npmjs.com/package/xlsx).

For webpack usage, see the [webpack xlsx npm module](https://github.com/seveibar/xlsx-loader).

## Install

```
npm install --save-dev jest-xlsx-loader
```

## Usage

Add this to your `package.json`. Note: `babel-jest` is only required if
you want to continue transpiling js with babel.

```json
"jest": {
  "transform": {
    "\\.jsx?$": "babel-jest",
    "\\.xlsx$": "jest-xlsx-loader"
  }
}
```

You can then directly import and use `xlsx` to manipulate your excel spreadsheet
(if you need more complicated functionality).

```javascript
import spreadsheet from './spreadsheet.xlsx'
import xlsx from 'xlsx'

test('that spreadsheet correctly imported', () => {
  expect(spreadsheet.SheetNames).toEqual(jasmine.arrayContaining([jasmine.any(String)]))

  const csvString = xlsx.utils.sheet_to_csv(spreadsheet.Sheets['Sheet1'])
})
```

## License

MIT © [Severin Ibarluzea](github.com/seveibar)
