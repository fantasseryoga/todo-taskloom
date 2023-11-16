import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const defaultState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  userName: localStorage.getItem('username'),
}

const reducer = (state = defaultState, action) => {
  if (action.type === "SET_TOKEN") {
    return { ...state, token: action.payload }
  }

  if (action.type === "SET_AUTH") {
    return { ...state, isAuthenticated: action.payload }
  }

  if (action.type === "SET_USER_NAME") {
    return { ...state, userName: action.payload }
  }

  return state
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
