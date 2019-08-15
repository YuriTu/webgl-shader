import React, {Component} from 'react';
import {HashRouter, Switch, Route,Redirect} from "react-router-dom";

import Home from '../pages/home';
import {Shader} from '../pages/shader';
import {ReactHelloWorld} from '../pages/react';



export class Routers extends Component{
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path = '/' exact component = {Home}></Route>
                    <Route path = '/react' component = {ReactHelloWorld}></Route>
                    <Route path = '/shader' component = {Shader}></Route>
                    <Redirect to = '/'/>
                </Switch>
            </HashRouter>
        )
    }
}
