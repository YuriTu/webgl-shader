import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {AppContainer} from "react-hot-loader";

import {Routers} from "./router";
import {store} from "./store";

import './index.css';
import * as serviceWorker from './serviceWorker';



const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>
        , document.getElementById('root'));
};

render(Routers)


// hot-loader

if (module.hot) {
    module.hot.accept('./router/', () => {
        render(Routers);
    })
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
