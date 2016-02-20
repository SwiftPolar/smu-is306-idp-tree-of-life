import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router"

//front page stuff non-app
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';

import { Home } from '../Pages/Home.jsx';
import { App } from './App.jsx';
import { About } from '../Pages/About.jsx';
import TaskList from '../containers/task_list.js';
import Task from '../containers/task_view.js';

export const Routes = () => {
    requireAuth = (nextState, replace) => {
        if(!Meteor.userId()) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    };
    isUserLoggedIn = (nextState, replace) => {
        if(Meteor.userId()) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }
    return (
        <Router history={browserHistory}>
        <Route path="/login" component={Login} onEnter={isUserLoggedIn}></Route>
            <Route path="/register" component={Register} onEnter={isUserLoggedIn}></Route>
        <Route path="/" component={App} onEnter={requireAuth}>
            <IndexRoute component={Home} />
            <Route path="/about(/:id)" component={About}></Route>
            <Route path="/tasks" component={TaskList}></Route>
            <Route path="/tasks/:id" component={Task}></Route>
        </Route>

    </Router>
    );
};