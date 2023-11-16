import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { useState, useCallback, useEffect } from 'react'
import { useRoutes } from './router'
import { BrowserRouter as Router } from 'react-router-dom'
import background from './img/ballons.png'
import "./index.css"

function App() {
  const token = useSelector(state => state.token)
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const routes = useRoutes(isAuthenticated)

  return (
    <Router>
      <div className='body-back' style={{ backgroundImage: `url(${background})` }}>
        {routes}
      </div>
    </Router>
  );
}

export default App;
