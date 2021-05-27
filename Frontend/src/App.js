import React, { useState } from 'react';
import {BrowserRouter as Router,Route,Switch,  Redirect} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {ForceRender} from './index'
import AddTodo from './components/AddTodo.component'
import UpdateTodo from './components/UpdateTodo.component'
import TodoList from './components/TodoList.component'
import TodoInfo from './components/TodoInfo.component'
import Navbar from './components/Navbar.component';
import useToken from './components/useToken';

function App() {
const authGuard = (Component) => () => {
  
  return localStorage.getItem("token") ? (
    
    <Route component={Component} />
) : (
    ForceRender()
  );
};
  return (
    <div className="container">
        <Router>

          <Navbar/>
          <Route path="/" exact render={authGuard(TodoList)} />
          <Route  path="/addtodo" render={authGuard(AddTodo)} />
          <Route  path="/updatetodo" render={authGuard(UpdateTodo)}/>
          <Route  path="/info" render={authGuard(TodoInfo)} />
        </Router>
    </div>
  );
}

export default App;
