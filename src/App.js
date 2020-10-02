import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Questions from '../src/Questions';
import AppRouting from '../src/AppRouting';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index';



function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <AppRouting />
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
