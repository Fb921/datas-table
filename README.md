# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React version

Needs react version ^18.2.0.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run build-lib`

Builds the app for production into a module and commonjs format to the `dist` folder.\
Allows the use of the project with import (es6) syntax.


## Required parameters

### `head`

Array of the table's head labels. Every element should be an object with a key (for react key id) and value (data to display in the head cell) property.

### `datas`

Array of datas to display in the table. Each element of this array should be an object which should contain as much property as object there is in the head parameter. Each of these properties's name should coincide with the key of the label it refers to in the head parameter. 

### `tableId`

Table id (html attribute). Will also be used to improve the accebility score.



