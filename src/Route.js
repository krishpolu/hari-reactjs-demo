import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/home';
import ReduxDemo from './Login/ReduxDemo';
import thankyou from './Login/thankyou';
import forgotpassword from './Login/forgetpassword';
import Posts from './components/posts'
class RouteApp extends Component {
    render() {
        return (
            <Switch>
                <Route exact="exact" path='/login' component={Login}/>
                <Route exact="exact" path='/home' component={Home}/>
                <Route exact="exact" path='/thank-you' component={thankyou}/>
                <Route exact="exact" path='/forgot-password' component={forgotpassword}/>
                <Route exact="exact" path='/posts' component={Posts}/>
                <Route exact="exact" path='/reduxdemo' component={ReduxDemo}/>
                <Redirect from="/" to="/login"/>
            </Switch>
        );
    }
}

export default RouteApp;