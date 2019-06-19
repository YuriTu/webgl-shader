import React, {Component} from 'react';
import {HashRouter, Switch, Route,Redirect} from "react-router-dom";

import home from '@/pages/home';



export class Routers extends Component{
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path = '/' exact component = {home}></Route>
                    <Redirect to = '/'/>
                </Switch>
            </HashRouter>
        )
    }
}
