import React from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './src/Screens/HomeScreen';
import { store } from './src/StateManagement/store';
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor='transparent'
      />
      <HomeScreen />
    </Provider>
  )
};
const styles = StyleSheet.create({
});
export default App;
